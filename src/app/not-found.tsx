import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-brand-soft py-24">
        <div className="section-shell max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">Error 404</p>
          <h1 className="mt-4 text-4xl font-black text-brand-slate">Página no encontrada</h1>
          <p className="mt-5 text-lg text-brand-muted">La dirección solicitada no existe o dejó de estar disponible.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link className="rounded-full bg-brand-blue px-6 py-3 font-semibold text-white" href="/">Ir al inicio</Link>
            <Link className="rounded-full border border-brand-line bg-white px-6 py-3 font-semibold text-brand-slate" href="/blog">Ver el blog</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
