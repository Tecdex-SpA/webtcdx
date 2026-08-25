import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import {
  canonicalBlogSlug,
  decodeHtml,
  featuredImage,
  getAllBlogPosts,
  getBlogPost,
  plainText,
  rewriteCanonicalArticleLinks,
} from "@/lib/wordpress";

const SITE_URL = "https://isos.tecdex.net";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const canonicalSlug = canonicalBlogSlug(post.slug);
  const canonical = `${SITE_URL}/blog/${canonicalSlug}`;
  const title = decodeHtml(post.title.rendered);
  const description = plainText(post.excerpt.rendered);
  const image = featuredImage(post)?.source_url;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBlogPost(slug), getAllBlogPosts()]);
  if (!post) notFound();

  const canonicalSlug = canonicalBlogSlug(post.slug);
  if (slug !== canonicalSlug) notFound();

  const canonical = `${SITE_URL}/blog/${canonicalSlug}`;
  const title = decodeHtml(post.title.rendered);
  const image = featuredImage(post);
  const content = rewriteCanonicalArticleLinks(post.content?.rendered ?? "", posts);
  const index = posts.findIndex((candidate) => candidate.id === post.id);
  const previous = index >= 0 ? posts[index + 1] : undefined;
  const next = index > 0 ? posts[index - 1] : undefined;
  const related = posts.filter((candidate) => candidate.id !== post.id).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    mainEntityOfPage: canonical,
    datePublished: post.date,
    dateModified: post.modified,
    image: image?.source_url,
    author: { "@type": "Person", name: "Mario Cáceres" },
    publisher: { "@id": "https://tecdex.net/#organization" },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: canonical },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-soft py-12 sm:py-16">
        {[articleJsonLd, breadcrumbJsonLd].map((schema, schemaIndex) => (
          <script
            key={schemaIndex}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
          />
        ))}
        <article className="section-shell">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href="/">Inicio</Link> <span aria-hidden="true">›</span>{" "}
            <Link href="/blog">Blog</Link> <span aria-hidden="true">›</span> {title}
          </nav>
          <header className="mx-auto mt-8 max-w-4xl">
            <h1 className="text-4xl font-black leading-tight tracking-tight text-brand-slate sm:text-5xl">{title}</h1>
            <p className="mt-5 text-sm text-brand-muted">
              Por <span className="font-semibold text-brand-slate">Mario Cáceres</span> ·{" "}
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "UTC" }).format(
                  new Date(post.date),
                )}
              </time>
            </p>
          </header>
          {image?.source_url ? (
            <figure className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm">
              <Image
                src={image.source_url}
                alt={(image.alt_text || title).replace(/TCDX Compliance/g, "TECDEX Compliance")}
                width={image.media_details?.width || 1200}
                height={image.media_details?.height || 630}
                sizes="(max-width: 896px) 100vw, 896px"
                className="h-auto w-full"
              />
            </figure>
          ) : null}
          <div
            className="wp-article-content mx-auto mt-10 max-w-4xl rounded-3xl border border-brand-line bg-white p-6 shadow-sm sm:p-10"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <aside className="mx-auto mt-10 max-w-4xl rounded-3xl bg-brand-navy p-7 text-white">
            <h2 className="text-2xl font-bold">Conoce TECDEX Compliance</h2>
            <p className="mt-3 text-white/75">Plataforma GRC simple y trazable para organizar el trabajo de cumplimiento.</p>
            <a
              className="mt-5 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-brand-navy"
              href={`/go/whatsapp?content_id=${canonicalSlug}&placement=body`}
              data-analytics-event="cta_click"
              data-content-id={canonicalSlug}
              data-placement="body"
            >
              Consultar por WhatsApp
            </a>
          </aside>
          <section className="mx-auto mt-12 max-w-4xl" aria-labelledby="related-title">
            <h2 id="related-title" className="text-2xl font-bold text-brand-slate">Artículos relacionados</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((candidate) => (
                <li key={candidate.id} className="rounded-2xl border border-brand-line bg-white p-5">
                  <Link className="font-semibold text-brand-slate hover:text-brand-blue" href={`/blog/${canonicalBlogSlug(candidate.slug)}`}>
                    {decodeHtml(candidate.title.rendered)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <nav aria-label="Artículo anterior y siguiente" className="mx-auto mt-10 flex max-w-4xl justify-between gap-6 border-t border-brand-line pt-7 text-sm font-semibold">
            {previous ? <Link href={`/blog/${canonicalBlogSlug(previous.slug)}`}>← {decodeHtml(previous.title.rendered)}</Link> : <span />}
            {next ? <Link className="text-right" href={`/blog/${canonicalBlogSlug(next.slug)}`}>{decodeHtml(next.title.rendered)} →</Link> : <span />}
          </nav>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
