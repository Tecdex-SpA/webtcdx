import type { MetadataRoute } from "next";

const BASE_URL = "https://isos.tecdex.net";
const WP_POSTS_API = "https://tecdex.net/wp-json/wp/v2/posts";
const ISO_CATEGORY_ID = 103; // "ISO y Cumplimiento"

export const revalidate = 3600;

type WpPost = { slug?: string; modified_gmt?: string };

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/informacion-para-ia`,
    lastModified: new Date("2026-07-30"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    // WordPress caps per_page at 100. Add X-WP-TotalPages pagination if the
    // ISO category ever grows beyond that limit.
    const url =
      `${WP_POSTS_API}?categories=${ISO_CATEGORY_ID}` +
      `&per_page=100&status=publish&_fields=slug,modified_gmt`;

    const res = await fetch(url, {
      next: { revalidate },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return [];

    const posts: unknown = await res.json();
    if (!Array.isArray(posts)) return [];

    return (posts as WpPost[])
      .filter(
        (post): post is Required<Pick<WpPost, "slug">> & WpPost =>
          typeof post?.slug === "string" && post.slug.length > 0,
      )
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.modified_gmt
          ? new Date(`${post.modified_gmt}Z`)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogRoutes = await getBlogRoutes();
  return [...STATIC_ROUTES, ...blogRoutes];
}
