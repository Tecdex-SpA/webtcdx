import Link from "next/link";

const steps = [
  ["01", "Evaluamos el alcance ISO", "Revisamos norma de interés, estado actual, responsables y nivel de avance."],
  ["02", "Configuramos la base", "Activamos empresa, norma, módulos, responsables y estructura inicial."],
  ["03", "Ordenamos evidencias", "Centralizamos controles, evidencias, riesgos, hallazgos y planes de acción."],
  ["04", "Revisamos brechas", "IA Auditor apoya el análisis, siempre con revisión y criterio humano."],
  ["05", "Reportamos avances", "Generamos visibilidad ejecutiva para dirección, responsables y consultores."],
];

const audiences = [
  ["Gerencia general", "Reportes ejecutivos y visibilidad sobre estado, riesgos y acciones críticas."],
  ["Gerencia TI", "Controles, activos, riesgos, evidencias y seguimiento de seguridad."],
  ["Calidad y cumplimiento", "Brechas, planes de acción, hallazgos y preparación de auditorías."],
  ["Seguridad de la información", "Apoyo para ISO 27001, evidencias, riesgos y controles de seguridad."],
  ["Consultores ISO", "Seguimiento mensual, implementaciones ordenadas y reportes más claros."],
  ["Empresas con planillas", "Menos carpetas dispersas, correos aislados y reportes manuales."],
];

export function CommercialSections() {
  return (
    <>
      <section id="como-funciona" className="bg-white py-20 sm:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Cómo funciona</p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-slate sm:text-4xl">
              Un proceso claro para comenzar a operar tu gestión ISO
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-muted">
              TECDEX Compliance se implementa con un alcance inicial controlado, acompañamiento de TECDEX y foco en trazabilidad operativa.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {steps.map(([number, title, description]) => (
              <article key={number} className="rounded-3xl border border-brand-line bg-brand-soft p-6 shadow-sm">
                <p className="text-sm font-black text-brand-blue">{number}</p>
                <h3 className="mt-4 text-lg font-bold text-brand-slate">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="para-quien-es" className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Para quién es</p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-slate sm:text-4xl">
              Diseñado para equipos que necesitan visibilidad y trazabilidad ISO
            </h2>
            <p className="mt-4 text-lg leading-8 text-brand-muted">
              La plataforma ayuda a ordenar el trabajo de quienes deben preparar, operar o acompañar procesos ISO.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map(([title, description]) => (
              <article key={title} className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-brand-slate">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="commercial-footer border-t border-white/10 bg-brand-navy py-12">
        <div className="section-shell grid gap-8 text-sm text-white/70 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <p className="text-lg font-bold text-white">TECDEX Compliance</p>
            <p className="mt-3 max-w-xl leading-6">
              Plataforma SaaS de TECDEX SpA para gestión ISO simple, trazable y asistida por IA bajo revisión humana.
            </p>
            <p className="mt-4 leading-6">
              IA Auditor opera como herramienta de apoyo para análisis y orientación. No reemplaza auditorías certificadoras, consultores, auditores ni responsables internos.
            </p>
          </div>
          <div>
            <p className="font-bold text-white">Contacto</p>
            <a className="mt-3 block hover:text-white" href="mailto:contacto@tecdex.net">contacto@tecdex.net</a>
            <a className="mt-2 block hover:text-white" href="https://www.tecdex.net">www.tecdex.net</a>
          </div>
          <div>
            <p className="font-bold text-white">Información</p>
            <a className="mt-3 block hover:text-white" href="#contacto">Solicitar demo</a>
            <Link className="mt-2 block hover:text-white" href="/politica-privacidad">Política de privacidad</Link>
            <p className="mt-5 text-white/45">© {new Date().getFullYear()} TECDEX SpA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
