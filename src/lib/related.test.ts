import assert from "node:assert/strict";
import test from "node:test";
import { canonicalBlogSlug, relatedPosts, type WpPost } from "./wordpress.ts";

// Corpus reducido con la forma real que devuelve WordPress: una sola categoría
// (103) y cero etiquetas, que es justo por lo que la relación se calcula sobre
// el texto.
function post(id: number, slug: string, title: string, excerpt: string): WpPost {
  return {
    id,
    slug,
    date: "2026-01-01T00:00:00",
    modified: "2026-01-01T00:00:00",
    title: { rendered: title },
    excerpt: { rendered: `<p>${excerpt}</p>` },
    featured_media: 0,
    author: 1,
    categories: [103],
    tags: [],
  };
}

const CORPUS: WpPost[] = [
  post(1, "pentesting-continuo-iso-27001", "Pentesting continuo e ISO 27001", "Qué debe quedar documentado tras cada pentesting."),
  post(2, "superficie-ataque-externa-iso-27001", "Superficie de ataque externa e ISO 27001", "Qué debe quedar documentado sobre la superficie de ataque."),
  post(3, "iso-9001-2026-que-cambia-como-prepararse", "ISO 9001:2026: qué cambia", "Cómo prepararse para la nueva versión de ISO 9001."),
  post(4, "plataforma-iso-9001-ordenar-cumplimiento", "Plataforma ISO 9001 para ordenar tu cumplimiento", "Centraliza el cumplimiento ISO 9001."),
  post(5, "beneficios-gestion-centralizada-identidades", "Beneficios de la gestión centralizada de identidades", "Identidades y control de acceso."),
];

test("no se incluye a sí mismo", () => {
  for (const item of CORPUS) {
    const related = relatedPosts(item, CORPUS);
    assert.ok(related.every((r) => r.id !== item.id), `${item.slug} se autorreferencia`);
  }
});

test("relaciona por solapamiento temático real, no por orden del listado", () => {
  const [pentesting] = CORPUS;
  const related = relatedPosts(pentesting, CORPUS);
  assert.equal(related[0].slug, "superficie-ataque-externa-iso-27001");

  const nueveMil = relatedPosts(CORPUS[2], CORPUS);
  assert.equal(nueveMil[0].slug, "plataforma-iso-9001-ordenar-cumplimiento");
});

test("es determinista: mismo corpus, mismo resultado", () => {
  for (const item of CORPUS) {
    const a = relatedPosts(item, CORPUS).map((r) => r.slug);
    const b = relatedPosts(item, [...CORPUS].reverse()).map((r) => r.slug);
    assert.deepEqual(a, b, `${item.slug} cambia según el orden de entrada`);
  }
});

// Regresión del bug que esto reemplaza: `posts.slice(0, 3)` devolvía el mismo
// trío en los 16 artículos del corpus.
test("no devuelve el mismo trío para todos los artículos", () => {
  const trios = new Set(
    CORPUS.map((item) => relatedPosts(item, CORPUS).map((r) => r.slug).sort().join("|")),
  );
  assert.ok(trios.size > 1, "todos los artículos comparten los mismos relacionados");
});

test("degrada mostrando menos, nunca rellenando con artículos sin relación", () => {
  const aislado = post(99, "tema-sin-relacion-alguna", "Bicicletas urbanas plegables", "Ruedas, cuadros y manillares.");
  const related = relatedPosts(aislado, [...CORPUS, aislado]);
  assert.ok(related.length < 3, `no debía rellenar: devolvió ${related.length}`);
});

test("un corpus de un solo artículo no produce relacionados", () => {
  assert.deepEqual(relatedPosts(CORPUS[0], [CORPUS[0]]), []);
});

test("usa el slug canónico, no el legado", () => {
  const legacy = post(50, "migrar-planillas-tcdx-compliance", "Cómo migrar desde planillas", "Migrar a una plataforma ISO sin partir de cero.");
  const related = relatedPosts(legacy, [...CORPUS, legacy]);
  assert.equal(canonicalBlogSlug(legacy.slug), "migrar-planillas-a-plataforma-iso");
  assert.ok(related.every((r) => r.id !== legacy.id));
});
