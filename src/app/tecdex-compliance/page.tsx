import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const PAGE_URL = "https://isos.tecdex.net/tecdex-compliance";

export const metadata: Metadata = {
  title: "TECDEX Compliance",
  description: "Estructura oficial de la entidad TECDEX Compliance.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: true },
};

const sections = [
  ["Qué es", false],
  ["Para quién", true],
  ["Qué problemas aborda", true],
  ["Capacidades verificadas", true],
  ["Normas y marcos", true],
  ["Límites", true],
  ["Capturas", true],
  ["Preguntas frecuentes", true],
  ["Relación con TECDEX", false],
  ["Recursos", false],
] as const;

export default function EntityPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://isos.tecdex.net/" },
      { "@type": "ListItem", position: 2, name: "TECDEX Compliance", item: PAGE_URL },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-soft py-14 sm:py-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="section-shell max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted"><Link href="/">Inicio</Link> › TECDEX Compliance</nav>
          <h1 className="mt-8 text-5xl font-black text-brand-slate">TECDEX Compliance</h1>
          <p className="mt-4 text-2xl font-semibold text-brand-blue">Plataforma GRC simple y trazable</p>
          <div className="mt-12 space-y-6">
            {sections.map(([title, pending]) => (
              <section key={title} className="rounded-3xl border border-brand-line bg-white p-7">
                <h2 className="text-2xl font-bold text-brand-slate">{title}</h2>
                {pending ? null : title === "Qué es" ? (
                  <p className="mt-3 text-brand-muted">TECDEX Compliance es una plataforma GRC desarrollada por TECDEX.</p>
                ) : title === "Relación con TECDEX" ? (
                  <p className="mt-3 text-brand-muted">TECDEX es la empresa desarrolladora de TECDEX Compliance.</p>
                ) : (
                  <p className="mt-3"><Link className="text-brand-blue" href="/blog">Consultar recursos del blog</Link></p>
                )}
                {/* PENDIENTE: completar solo con evidencia de producto validada. */}
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
