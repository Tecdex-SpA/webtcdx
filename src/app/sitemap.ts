import type { MetadataRoute } from "next";
import { canonicalBlogSlug, getAllBlogPosts } from "@/lib/wordpress";

const BASE_URL = "https://isos.tecdex.net";

export const revalidate = 3600;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${BASE_URL}/informacion-para-ia`,
    lastModified: new Date("2026-08-24"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await getAllBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${canonicalBlogSlug(post.slug)}`,
      lastModified: new Date(post.modified),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
    return [...STATIC_ROUTES, ...blogRoutes];
  } catch {
    return STATIC_ROUTES;
  }
}
