import Link from "next/link";

const navigation = [
  ["Plataforma GRC", "/tecdex-compliance"],
  ["ISO 27001", "/#normas"],
  ["ISO 9001", "/#normas"],
  ["Auditorías", "/#faq"],
  ["Evidencias", "/#solucion"],
  ["Mejora continua", "/#como-funciona"],
  ["Blog", "/blog"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="section-shell flex min-h-20 flex-wrap items-center justify-between gap-4 py-3">
        <Link className="text-lg font-black text-brand-slate" href="/">
          TECDEX Compliance
        </Link>
        <nav aria-label="Navegación principal" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-muted">
          {navigation.map(([label, href]) => (
            <Link key={label} className="hover:text-brand-blue" href={href}>
              {label}
            </Link>
          ))}
          <Link className="hover:text-brand-blue" href="/informacion-para-ia">
            Información para IA
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="section-shell flex flex-col justify-between gap-5 text-sm text-brand-muted sm:flex-row">
        <div>
          <p className="font-bold text-brand-slate">TECDEX Compliance</p>
          <p className="mt-1">Plataforma GRC simple y trazable</p>
        </div>
        <nav aria-label="Navegación del pie" className="flex flex-wrap gap-4">
          <Link href="/">Inicio</Link>
          <Link href="/tecdex-compliance">Plataforma GRC</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/informacion-para-ia">Información para IA</Link>
          <a href="https://tecdex.net/" rel="noopener noreferrer">TECDEX, empresa desarrolladora</a>
        </nav>
      </div>
    </footer>
  );
}
