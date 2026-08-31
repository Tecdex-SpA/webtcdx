const WORDPRESS_API = "https://tecdex.net/wp-json/wp/v2/posts";
const ISO_CATEGORY_ID = 103;

export const BLOG_REVALIDATE_SECONDS = 3600;
export const LEGACY_SLUG = "migrar-planillas-tcdx-compliance";
export const CANONICAL_MIGRATION_SLUG = "migrar-planillas-a-plataforma-iso";

type Rendered = { rendered: string };

export type WpPost = {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: Rendered;
  excerpt: Rendered;
  content?: Rendered;
  featured_media: number;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
      media_details?: { width?: number; height?: number };
    }>;
  };
};

export function canonicalBlogSlug(slug: string): string {
  return slug === LEGACY_SLUG ? CANONICAL_MIGRATION_SLUG : slug;
}

export function sourceBlogSlug(slug: string): string {
  return slug === CANONICAL_MIGRATION_SLUG ? LEGACY_SLUG : slug;
}

export function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function plainText(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function postsUrl(extra: Record<string, string>): URL {
  const url = new URL(WORDPRESS_API);
  url.searchParams.set("categories", String(ISO_CATEGORY_ID));
  url.searchParams.set("status", "publish");
  for (const [key, value] of Object.entries(extra)) url.searchParams.set(key, value);
  return url;
}

async function fetchPosts(url: URL): Promise<WpPost[]> {
  const response = await fetch(url, {
    next: { revalidate: BLOG_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`WordPress REST returned ${response.status}`);
  const value: unknown = await response.json();
  if (!Array.isArray(value)) throw new Error("WordPress REST returned a non-array payload");
  return value as WpPost[];
}

export async function getAllBlogPosts(): Promise<WpPost[]> {
  const url = postsUrl({
    per_page: "30",
    order: "desc",
    orderby: "date",
    _embed: "wp:featuredmedia",
    _fields:
      "id,slug,date,modified,title,excerpt,featured_media,author,categories,tags,_links,_embedded",
  });
  return fetchPosts(url);
}

export async function getBlogPost(slug: string): Promise<WpPost | null> {
  const url = postsUrl({ slug: sourceBlogSlug(slug), per_page: "1", _embed: "wp:featuredmedia" });
  const posts = await fetchPosts(url);
  return posts[0] ?? null;
}

export function featuredImage(post: WpPost) {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

// --- Artículos relacionados ---------------------------------------------------
// WordPress no expone nada que sirva para relacionar estos posts: los 16 están
// en la misma categoría (103) y ninguno tiene etiquetas. La relación se calcula
// entonces sobre el texto que sí hay —título, slug canónico y extracto— con
// pesado IDF: un término compartido pesa tanto menos cuanto más común sea en el
// corpus, así que "iso" (presente en casi todos) no relaciona nada y "9001",
// "pentesting" o "identidades" sí.
//
// Es determinista: mismo corpus, mismo resultado entre builds. El desempate por
// slug evita que dos candidatos con idéntica puntuación se alternen.
//
// No hay relleno: si un artículo no alcanza tres candidatos con solapamiento
// real, se muestran menos. Rellenar con los primeros del listado era justo el
// bug que esto reemplaza.
const RELATED_COUNT = 3;

const RELATED_STOPWORDS = new Set(
  ("de la el los las un una y o e u en para con por a al del que se su sus lo como que cual " +
    "cuales sin sobre ante tras entre es son ser esta este estas estos si no mas ya tu tus " +
    "cuando donde cada todo toda").split(" "),
);

function relatedTokens(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !RELATED_STOPWORDS.has(token));
}

function postTerms(post: WpPost): Set<string> {
  return new Set([
    ...relatedTokens(plainText(post.title.rendered)),
    ...relatedTokens(canonicalBlogSlug(post.slug).replace(/-/g, " ")),
    ...relatedTokens(plainText(post.excerpt.rendered)),
  ]);
}

export function relatedPosts(post: WpPost, posts: WpPost[], limit: number = RELATED_COUNT): WpPost[] {
  const corpus = posts.filter((candidate) => candidate.id !== post.id);
  if (corpus.length === 0) return [];

  const terms = new Map<number, Set<string>>();
  for (const candidate of [post, ...corpus]) terms.set(candidate.id, postTerms(candidate));

  const documentFrequency = new Map<string, number>();
  terms.forEach((set) => {
    set.forEach((term) => documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1));
  });

  const total = terms.size;
  const own = terms.get(post.id) ?? new Set<string>();

  return corpus
    .map((candidate) => {
      let score = 0;
      terms.get(candidate.id)?.forEach((term) => {
        if (!own.has(term)) return;
        score += Math.log(total / (documentFrequency.get(term) ?? total));
      });
      return { post: candidate, score };
    })
    // Solapamiento real: un candidato que sólo comparte términos presentes en
    // todo el corpus puntúa 0 y no entra.
    .filter((candidate) => candidate.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        canonicalBlogSlug(a.post.slug).localeCompare(canonicalBlogSlug(b.post.slug)),
    )
    .slice(0, limit)
    .map((candidate) => candidate.post);
}

export function rewriteCanonicalArticleLinks(html: string, posts: WpPost[]): string {
  const knownSlugs = new Set(posts.map((post) => post.slug));

  return html.replace(
    /href=(["'])https?:\/\/(?:www\.)?tecdex\.net\/([^/?#"']+)\/?([^"']*)\1/gi,
    (match, quote: string, slug: string, suffix: string) => {
      if (!knownSlugs.has(slug)) return match;
      return `href=${quote}/blog/${canonicalBlogSlug(slug)}${suffix}${quote}`;
    },
  );
}

// PROXY_BYPASS_GUARD_STATUS=STILL_ACTIVE: keep the WordPress guard and
// TCDX_PROXY_SECRET configured throughout the redirect consolidation cycle.
// Native rendering no longer fetches public WordPress article URLs, but guard
// cleanup waits until the redirects are active and zero proxy dependency has
// been verified in production.
