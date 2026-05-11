import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FolderKanban,
  Layers3,
  ListChecks,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  UsersRound,
} from "lucide-react";

const modules = [
  {
    title: "Diagnóstico ISO",
    description:
      "Evalúa el estado inicial de cumplimiento, identifica brechas y permite priorizar el trabajo según la norma activa.",
    icon: ClipboardCheck,
  },
  {
    title: "Controles y evidencias",
    description:
      "Administra controles, responsables, estados y evidencias asociadas para saber qué está respaldado y qué falta.",
    icon: FileCheck2,
  },
  {
    title: "Matriz de riesgos",
    description:
      "Ordena riesgos, impactos, probabilidades, tratamientos y responsables en una vista trazable.",
    icon: TriangleAlert,
  },
  {
    title: "Planes de acción",
    description:
      "Convierte brechas y tareas pendientes en acciones concretas con responsable, fecha y estado.",
    icon: ListChecks,
  },
  {
    title: "Hallazgos y no conformidades",
    description:
      "Registra observaciones, hallazgos y no conformidades para mantener continuidad de mejora.",
    icon: Target,
  },
  {
    title: "Auditorías / preauditoría",
    description:
      "Apoya la preparación de revisiones internas y auditorías formales sin depender de información dispersa.",
    icon: ShieldCheck,
  },
  {
    title: "IA Auditor",
    description:
      "Asistente de análisis que detecta focos de atención y sugiere preguntas, siempre con revisión humana.",
    icon: BrainCircuit,
  },
  {
    title: "Reportes ejecutivos",
    description:
      "Genera reportes PDF ejecutivos para dirección, responsables internos o consultores ISO.",
    icon: BarChart3,
  },
];

const problems = [
  "Evidencias distribuidas en distintas carpetas.",
  "Controles sin responsable claro.",
  "Riesgos sin seguimiento.",
  "Acciones vencidas sin visibilidad.",
  "Auditorías preparadas a última hora.",
  "Reportes manuales difíciles de mantener.",
];

const standards = [
  {
    title: "ISO 9001:2015",
    subtitle: "Gestión de calidad",
    description:
      "Para ordenar procesos, responsabilidades, evidencias, acciones correctivas y mejora continua.",
  },
  {
    title: "ISO 27001:2022",
    subtitle: "Seguridad de la información",
    description:
      "Para gestionar controles, riesgos, activos, evidencias y preparación frente a auditorías de seguridad.",
  },
  {
    title: "ISO/IEC 42001:2023",
    subtitle: "Sistema de gestión de inteligencia artificial",
    description:
      "Para organizaciones que requieren gobernanza, control y trazabilidad sobre el uso de IA.",
  },
];

const includes = [
  "Usuarios sin límite comercial inicial",
  "Dashboard ejecutivo",
  "Diagnóstico ISO",
  "Controles",
  "Evidencias",
  "Matriz de riesgos",
  "Planes de acción",
  "Hallazgos y no conformidades",
  "Auditorías / preauditoría",
  "IA Auditor asistido",
  "Reportes PDF ejecutivos",
  "Onboarding inicial por TECDEX",
];

const auditorItems = [
  "Sugiere focos de revisión",
  "Identifica brechas y riesgos",
  "Recomienda acciones",
  "Apoya preparación de auditorías",
  "Requiere validación humana",
];

const consultantItems = [
  "Mejora el seguimiento del cliente",
  "Reduce dependencia de planillas",
  "Permite entregar continuidad mensual",
  "Facilita preparación de auditorías",
  "Complementa, no reemplaza, la consultoría ISO",
];

function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-brand-slate sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-brand-muted">{description}</p> : null}
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-6 text-slate-700">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-green" />
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-soft">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy/90 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Layers3 className="h-5 w-5 text-brand-sky" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">TCDX Compliance</p>
              <p className="text-xs text-white/60">by TECDEX</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
            <a className="hover:text-white" href="#problema">Problema</a>
            <a className="hover:text-white" href="#solucion">Solución</a>
            <a className="hover:text-white" href="#normas">Normas</a>
            <a className="hover:text-white" href="#planes">Planes</a>
            <a className="hover:text-white" href="#contacto">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-sky"
          >
            Solicitar demo
          </a>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-brand-navy py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.28),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.35),transparent_36%)]" />
        <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-brand-sky" />
              Cupos fundadores disponibles para máximo 5 empresas
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">TCDX Compliance</h1>
            <p className="mt-6 text-2xl font-semibold text-brand-sky sm:text-3xl">
              Gestión ISO simple, trazable y asistida por IA
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Centraliza controles, evidencias, riesgos, planes de acción, auditorías y reportes ejecutivos en una plataforma SaaS chilena, con onboarding asistido por TECDEX.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-7 py-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-500">
                Solicitar demo <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#planes" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10">
                Ver planes fundadores
              </a>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-6 text-white/60">
              Desarrollado por TECDEX, empresa chilena con experiencia en infraestructura TI, seguridad, nube, soporte y desarrollo de soluciones empresariales.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5 text-brand-slate">
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-brand-muted">Dashboard ejecutivo</p>
                  <p className="text-xl font-bold">Estado cumplimiento ISO</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Trazable</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Controles activos", "86%", ShieldCheck],
                  ["Evidencias cargadas", "124", FileText],
                  ["Riesgos críticos", "7", TriangleAlert],
                  ["Acciones en curso", "18", FolderKanban],
                ].map(([label, value, Icon]) => {
                  const LucideIcon = Icon as typeof ShieldCheck;
                  return (
                    <div key={String(label)} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <LucideIcon className="mb-4 h-5 w-5 text-brand-blue" />
                      <p className="text-2xl font-black">{String(value)}</p>
                      <p className="text-sm text-brand-muted">{String(label)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <BrainCircuit className="mt-1 h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="font-bold">IA Auditor</p>
                    <p className="mt-1 text-sm leading-6 text-brand-muted">
                      Sugiere focos de revisión y preguntas de auditoría para validación humana.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problema" className="py-20 sm:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Problema</p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-slate sm:text-4xl">
              ¿Tu gestión ISO depende de planillas y carpetas dispersas?
            </h2>
            <p className="mt-5 text-lg leading-8 text-brand-muted">
              Muchas empresas intentan sostener su cumplimiento ISO con Excel, documentos aislados, correos y carpetas compartidas. Eso dificulta saber qué evidencia existe, qué controles están pendientes, quién es responsable y qué brechas deben cerrarse antes de una auditoría.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {problems.map((item) => (
              <div key={item} className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                  <TriangleAlert className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-sm font-medium leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solucion" className="bg-white py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Solución"
            title="Una plataforma para operar tu cumplimiento ISO día a día"
            description="Reúne diagnóstico, controles, evidencias, riesgos, acciones, hallazgos, auditorías y reportes para la dirección en un solo lugar."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.title} className="card-hover rounded-3xl border border-brand-line bg-white p-6 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                    <Icon className="h-6 w-6 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-slate">{module.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-muted">{module.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="normas" className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Alcance inicial"
            title="Comienza con 1 o 2 normas ISO"
            description="Para los primeros clientes recomendamos partir con un alcance controlado, activando solo las normas que realmente necesitan operar."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {standards.map((standard) => (
              <article key={standard.title} className="rounded-3xl border border-brand-line bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{standard.title}</p>
                <h3 className="mt-4 text-2xl font-black text-brand-slate">{standard.subtitle}</h3>
                <p className="mt-4 text-sm leading-6 text-brand-muted">{standard.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ia-auditor" className="bg-brand-navy py-20 text-white sm:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">IA con criterio prudente</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">IA Auditor como apoyo, no como reemplazo humano</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              IA Auditor ayuda a revisar información cargada, detectar focos de atención, sugerir preguntas de auditoría y orientar acciones. Sus resultados deben ser revisados por responsables humanos y no reemplazan una auditoría certificadora.
            </p>
            <p className="mt-5 text-sm leading-6 text-white/55">
              La inteligencia artificial se utiliza como herramienta de apoyo para análisis y orientación. Las decisiones, validaciones, aprobaciones y conclusiones formales deben permanecer bajo responsabilidad de personas autorizadas por la organización.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur">
            <ul className="space-y-4">
              {auditorItems.map((item) => (
                <li key={item} className="flex gap-3 text-white/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="planes" className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Oferta fundadora"
            title="Cupos fundadores para las primeras empresas"
            description="Estamos abriendo una etapa inicial para máximo 5 clientes, con precio preferente, onboarding asistido y alcance controlado."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-brand-line bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-black text-brand-slate">Plan 1 Norma</h3>
              <p className="mt-5 text-4xl font-black text-brand-slate">CLP $79.000</p>
              <p className="mt-1 text-sm text-brand-muted">+ IVA mensual</p>
              <p className="mt-5 text-sm leading-6 text-brand-muted">Setup inicial desde <strong>CLP $150.000 + IVA</strong>.</p>
              <p className="mt-4 text-sm leading-6 text-brand-muted">Incluye activación inicial, acompañamiento de puesta en marcha y configuración base para una norma ISO.</p>
              <a href="#contacto" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-slate px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-blue">
                Postular a cupo fundador
              </a>
            </article>
            <article className="relative rounded-3xl border-2 border-brand-blue bg-white p-8 shadow-soft">
              <div className="absolute right-6 top-6 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand-blue">Más recomendado</div>
              <h3 className="text-2xl font-black text-brand-slate">Plan 2 Normas</h3>
              <p className="mt-5 text-4xl font-black text-brand-slate">CLP $129.000</p>
              <p className="mt-1 text-sm text-brand-muted">+ IVA mensual</p>
              <p className="mt-5 text-sm leading-6 text-brand-muted">Setup inicial desde <strong>CLP $220.000 + IVA</strong>.</p>
              <p className="mt-4 text-sm leading-6 text-brand-muted">Pensado para empresas que necesitan operar dos normas ISO con una gestión más integrada desde el inicio.</p>
              <a href="#contacto" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-500">
                Solicitar evaluación comercial
              </a>
            </article>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-brand-muted">
            Oferta válida para primeros clientes fundadores, con onboarding asistido y alcance controlado. La disponibilidad de cupos y condiciones finales se confirman luego de una evaluación inicial.
          </p>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="section-shell">
          <SectionHeading eyebrow="Incluye" title="Qué incluye TCDX Compliance" />
          <ul className="mt-12 grid gap-4 rounded-3xl border border-brand-line bg-brand-soft p-6 sm:grid-cols-2 lg:grid-cols-3">
            {includes.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="rounded-[2rem] border border-brand-line bg-white p-8 shadow-sm lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50">
                <LockKeyhole className="h-9 w-9 text-amber-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-brand-slate">Transparencia desde el inicio</h2>
                <p className="mt-5 text-lg leading-8 text-brand-muted">
                  TCDX Compliance no reemplaza a una casa certificadora, no garantiza certificación automática y no sustituye la responsabilidad del equipo interno o auditor externo. Es una plataforma para ordenar, operar y preparar mejor la gestión ISO.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="consultores" className="bg-white py-20 sm:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Consultores ISO</p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-slate sm:text-4xl">También para consultores ISO</h2>
            <p className="mt-5 text-lg leading-8 text-brand-muted">
              Los consultores ISO pueden usar TCDX Compliance para ordenar implementaciones, dar seguimiento a evidencias, controlar brechas y entregar reportes más claros a sus clientes.
            </p>
          </div>
          <ul className="rounded-3xl border border-brand-line bg-brand-soft p-7 shadow-sm">
            {consultantItems.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
          </ul>
        </div>
      </section>

      <section id="contacto" className="bg-brand-navy py-20 text-white sm:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">Contacto</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Solicita una demo de TCDX Compliance</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              Cuéntanos sobre tu empresa y la norma ISO que necesitas gestionar. TECDEX revisará tu caso y te contactará para coordinar una demo comercial.
            </p>
            <p className="mt-6 text-sm leading-6 text-white/50">
              Al enviar este formulario, autorizas a TECDEX a contactarte para entregar información comercial sobre TCDX Compliance. La demo y condiciones comerciales estarán sujetas a evaluación del alcance requerido.
            </p>
          </div>
          <form className="grid gap-4 rounded-[2rem] bg-white p-6 text-brand-slate shadow-soft sm:grid-cols-2">
            <input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Empresa" />
            <input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Nombre" />
            <input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Cargo" />
            <input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Correo" type="email" />
            <input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Teléfono" />
            <select className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" defaultValue="">
              <option value="" disabled>Norma de interés</option>
              <option>ISO 9001</option>
              <option>ISO 27001</option>
              <option>ISO 42001</option>
              <option>No estoy seguro</option>
              <option>Otra</option>
            </select>
            <textarea className="min-h-32 rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue sm:col-span-2" placeholder="Cuéntanos brevemente cómo gestionan hoy sus normas ISO, qué norma les interesa y si ya cuentan con implementación, consultor o auditoría programada." />
            <button className="rounded-full bg-brand-blue px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-500 sm:col-span-2" type="button">
              Solicitar demo
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="section-shell flex flex-col gap-3 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TECDEX. TCDX Compliance.</p>
          <p>Gestión ISO simple, trazable y asistida por IA bajo revisión humana.</p>
        </div>
      </footer>
    </main>
  );
}
