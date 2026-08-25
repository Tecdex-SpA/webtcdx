import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { canonicalBlogSlug, decodeHtml, getAllBlogPosts, plainText } from "@/lib/wordpress";

const PAGE_URL = "https://isos.tecdex.net/blog";

export const metadata: Metadata = {
  title: "Blog de TECDEX Compliance",
  description: "Artículos sobre gestión, riesgos, controles, evidencias, auditorías y sistemas ISO.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: { url: PAGE_URL, type: "website", title: "Blog de TECDEX Compliance" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://isos.tecdex.net/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
  ],
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <SiteHeader />
      <main className="bg-brand-soft py-14 sm:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="section-shell">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-muted">
            <Link href="/">Inicio</Link> <span aria-hidden="true">›</span> Blog
          </nav>
          <header className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-black tracking-tight text-brand-slate sm:text-5xl">
              Blog de TECDEX Compliance
            </h1>
            <p className="mt-4 text-xl font-semibold text-brand-blue">Plataforma GRC simple y trazable</p>
            <p className="mt-5 text-lg leading-8 text-brand-muted">
              Recursos sobre gestión ISO, controles, riesgos, evidencias, auditorías y mejora continua.
            </p>
          </header>
          <ul className="mt-12 grid list-none gap-6 p-0 lg:grid-cols-2">
            {posts.map((post) => {
              const slug = canonicalBlogSlug(post.slug);
              return (
                <li key={post.id}>
                  <article className="h-full rounded-3xl border border-brand-line bg-white p-7 shadow-sm">
                    <h2 className="text-2xl font-bold leading-tight text-brand-slate">
                      <Link className="hover:text-brand-blue" href={`/blog/${slug}`}>
                        {decodeHtml(post.title.rendered)}
                      </Link>
                    </h2>
                    <time className="mt-4 block text-sm text-brand-muted" dateTime={post.date}>
                      {new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeZone: "UTC" }).format(
                        new Date(post.date),
                      )}
                    </time>
                    <p className="mt-4 leading-7 text-brand-muted">{plainText(post.excerpt.rendered)}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
