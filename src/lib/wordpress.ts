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

// PROXY_BYPASS_GUARD=REMOVE_OR_RETIRED: native article rendering reads the
// WordPress REST API and no longer fetches public WordPress article URLs.
