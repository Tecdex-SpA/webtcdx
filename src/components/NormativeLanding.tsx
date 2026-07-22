"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  FolderKanban,
  ListChecks,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  UsersRound,
} from "lucide-react";

const modules = [
  ["Diagnóstico normativo", "Evalúa el estado inicial de cumplimiento en tu software ISO, identifica brechas y ayuda a priorizar el trabajo según la normativa activa.", ClipboardCheck],
  ["Controles y evidencias", "Administra controles, responsables, estados y evidencias asociadas para saber qué está respaldado y qué falta.", FileCheck2],
  ["Matriz de riesgos", "Ordena riesgos, impactos, probabilidades, tratamientos y responsables en una vista trazable.", TriangleAlert],
  ["Planes de acción", "Convierte brechas y tareas pendientes en acciones concretas con responsable, fecha y estado.", ListChecks],
  ["Hallazgos y no conformidades", "Registra observaciones, hallazgos y no conformidades para mantener continuidad de mejora.", Target],
  ["Auditorías / preauditoría", "Apoya la preparación de revisiones internas y auditorías formales sin depender de información dispersa.", ShieldCheck],
  ["IA Auditor", "Asistente de análisis que detecta focos de atención y sugiere preguntas, siempre con revisión humana.", BrainCircuit],
  ["Reportes ejecutivos", "Genera reportes PDF ejecutivos para dirección, responsables internos o consultores normativos.", BarChart3],
] as const;

const problems = [
  "Evidencias distribuidas en distintas carpetas.",
  "Controles sin responsable claro.",
  "Riesgos sin seguimiento.",
  "Acciones vencidas sin visibilidad.",
  "Auditorías preparadas a última hora.",
  "Reportes manuales difíciles de mantener.",
];

const standards = [
  ["9001:2015", "Gestión de calidad ISO 9001", "Para ordenar procesos, responsabilidades, evidencias, acciones correctivas y mejora continua."],
  ["27001:2022", "Gestión ISO 27001", "Para gestionar controles, riesgos, activos, evidencias y preparación frente a auditorías de seguridad de la información."],
  ["42001:2023", "Gestión de inteligencia artificial ISO 42001", "Para organizaciones que requieren gobernanza, control y trazabilidad sobre el uso de inteligencia artificial."],
];

const includes = [
  "Usuarios sin límite comercial inicial",
  "Dashboard ejecutivo",
  "Diagnóstico normativo",
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

const steps = [
  ["01", "Evaluamos el alcance", "Revisamos la normativa ISO de interés, el estado actual, los responsables y el nivel de avance."],
  ["02", "Configuramos la base", "Activamos empresa, normativa, módulos, responsables y estructura inicial."],
  ["03", "Ordenamos evidencias", "Centralizamos controles, evidencias, riesgos, hallazgos y planes de acción."],
  ["04", "Revisamos brechas", "IA Auditor apoya el análisis, siempre con revisión y criterio humano."],
  ["05", "Reportamos avances", "Generamos visibilidad ejecutiva para dirección, responsables y consultores."],
];

const audiences = [
  ["Gerencia general", "Reportes ejecutivos y visibilidad sobre estado, riesgos y acciones críticas."],
  ["Gerencia TI", "Controles, activos, riesgos, evidencias y seguimiento de seguridad."],
  ["Calidad y cumplimiento", "Brechas, planes de acción, hallazgos y preparación de auditorías."],
  ["Seguridad de la información", "Evidencias, riesgos y controles de seguridad de la información."],
  ["Consultores normativos", "Seguimiento mensual, implementaciones ordenadas y reportes más claros."],
  ["Empresas con planillas", "Menos carpetas dispersas, correos aislados y reportes manuales."],
];

const faqs = [
  ["¿TCDX Compliance certifica automáticamente a una empresa?", "No. La plataforma ayuda a ordenar, operar y preparar mejor la gestión normativa, pero no emite certificaciones ni reemplaza a una casa certificadora."],
  ["¿IA Auditor reemplaza a un auditor o consultor?", "No. IA Auditor funciona como apoyo de análisis y orientación. Sus resultados deben ser revisados por responsables humanos, consultores o auditores según corresponda."],
  ["¿Por qué partir con 1 o 2 normativas?", "En etapa inicial recomendamos un alcance controlado para configurar bien procesos, evidencias, responsables y reportes antes de escalar."],
  ["¿Los usuarios tienen límite?", "En la oferta fundadora no se define un límite comercial inicial de usuarios. El alcance se revisa durante la evaluación comercial y el onboarding."],
  ["¿La plataforma sirve para ISO 27001, 9001 y 42001?", "Sí. TCDX Compliance está diseñada para ISO 9001 (calidad), ISO 27001 (seguridad de la información) e ISO 42001 (gestión de IA), permitiendo 1 o 2 normativas por cliente en etapa inicial."],
];

function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">{eyebrow}</p> : null}
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

function NormativeLandingContent() {
  const searchParams = useSearchParams();
  // Modo embebido: la app se muestra dentro de un iframe en
  // https://tecdex.net/iso/, que ya tiene su propio header y su propio
  // widget de Zoho SalesIQ. Ocultamos el header propio para evitar un
  // "doble header" cuando se accede vía ?embedded=1.
  const isEmbedded = searchParams.get("embedded") === "1";

  return (
    <main className="min-h-screen bg-brand-soft">
      {!isEmbedded ? (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy/95 backdrop-blur-xl">
          <div className="section-shell flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-3 text-white" aria-label="TCDX Compliance" />
            <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
              <a className="hover:text-white" href="#problema">Problema</a>
              <a className="hover:text-white" href="#solucion">Solución</a>
              <a className="hover:text-white" href="#como-funciona">Cómo funciona</a>
              <a className="hover:text-white" href="#planes">Planes</a>
              <a className="hover:text-white" href="#faq">FAQ</a>
            </nav>
            <a href="#contacto" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-sky">Solicitar demo</a>
          </div>
        </header>
      ) : null}

      <section id="top" className="relative overflow-hidden bg-brand-navy py-20 text-white sm:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(11,31,58,0.96),rgba(11,31,58,0.86)),radial-gradient(circle_at_15%_20%,rgba(250,204,21,0.22),transparent_24%),radial-gradient(circle_at_82%_8%,rgba(56,189,248,0.30),transparent_32%),radial-gradient(circle_at_55%_85%,rgba(37,99,235,0.42),transparent_38%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-soft to-transparent" />
        <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 shadow-soft backdrop-blur">
              <Sparkles className="h-4 w-4 text-brand-sky" />
              Etapa fundadora abierta · máximo 5 empresas
            </div>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">TCDX Compliance</h1>
            <p className="mt-6 text-2xl font-semibold text-brand-sky sm:text-3xl">Plataforma de gestión normativa ISO 27001, 9001 y 42001, simple y trazable</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Centraliza controles, evidencias, riesgos, planes de acción, auditorías y reportes ejecutivos en una plataforma SaaS chilena, con onboarding asistido por TECDEX.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-7 py-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-500">Solicitar demo <ArrowRight className="h-4 w-4" /></a>
              <a href="#fundadores" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/15">Ver cupos fundadores</a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-white/70 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">1 a 2 normativas por cliente</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Onboarding asistido TECDEX</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">IA con revisión humana</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-brand-sky/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-soft backdrop-blur">
              <div className="rounded-[1.5rem] bg-white p-5 text-brand-slate">
                <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                  <div><p className="text-sm font-semibold text-brand-muted">Dashboard ejecutivo</p><p className="text-xl font-bold">Estado de cumplimiento</p></div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Trazable</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[["Controles activos", "86%", ShieldCheck], ["Evidencias cargadas", "124", FileText], ["Riesgos críticos", "7", TriangleAlert], ["Acciones en curso", "18", FolderKanban]].map(([label, value, Icon]) => {
                    const LucideIcon = Icon as typeof ShieldCheck;
                    return <div key={String(label)} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><LucideIcon className="mb-4 h-5 w-5 text-brand-blue" /><p className="text-2xl font-black">{String(value)}</p><p className="text-sm text-brand-muted">{String(label)}</p></div>;
                  })}
                </div>
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3"><BrainCircuit className="mt-1 h-5 w-5 text-brand-blue" /><div><p className="font-bold">IA Auditor</p><p className="mt-1 text-sm leading-6 text-brand-muted">Sugiere focos de revisión y preguntas de auditoría para validación humana.</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-6 relative z-10"><div className="section-shell"><div className="grid gap-4 rounded-[2rem] border border-brand-line bg-white p-5 shadow-soft md:grid-cols-3">
        <div className="flex gap-4 rounded-3xl bg-brand-soft p-5"><Building2 className="h-6 w-6 flex-none text-brand-blue" /><div><p className="font-bold text-brand-slate">Desarrollado por TECDEX</p><p className="mt-1 text-sm leading-6 text-brand-muted">Empresa chilena de infraestructura TI, seguridad, nube, soporte y software empresarial.</p></div></div>
        <div className="flex gap-4 rounded-3xl bg-brand-soft p-5"><ShieldCheck className="h-6 w-6 flex-none text-brand-blue" /><div><p className="font-bold text-brand-slate">Alcance prudente</p><p className="mt-1 text-sm leading-6 text-brand-muted">Inicio recomendado con 1 o 2 normativas para reducir complejidad operativa.</p></div></div>
        <div className="flex gap-4 rounded-3xl bg-brand-soft p-5"><UsersRound className="h-6 w-6 flex-none text-brand-blue" /><div><p className="font-bold text-brand-slate">Acompañamiento inicial</p><p className="mt-1 text-sm leading-6 text-brand-muted">Onboarding asistido para configurar base, responsables y flujo inicial de trabajo.</p></div></div>
      </div></div></section>

      <section id="problema" className="py-20 sm:py-24"><div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">Problema</p><h2 className="text-3xl font-bold tracking-tight text-brand-slate sm:text-4xl">¿Tu gestión normativa depende de planillas y carpetas dispersas?</h2><p className="mt-5 text-lg leading-8 text-brand-muted">Muchas empresas intentan sostener su cumplimiento normativo con Excel, documentos aislados, correos y carpetas compartidas. Eso dificulta saber qué evidencia existe, qué controles están pendientes, quién es responsable y qué brechas deben cerrarse antes de una auditoría.</p></div><div className="grid gap-3 sm:grid-cols-2">{problems.map((item) => <div key={item} className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50"><TriangleAlert className="h-5 w-5 text-red-500" /></div><p className="text-sm font-medium leading-6 text-slate-700">{item}</p></div>)}</div></div></section>

      <section id="solucion" className="bg-white py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Solución" title="Una plataforma para operar tu cumplimiento normativo día a día" description="Reúne diagnóstico, controles, evidencias, riesgos, acciones, hallazgos, auditorías y reportes para la dirección en un solo lugar." /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{modules.map(([title, description, Icon]) => <article key={title} className="card-hover rounded-3xl border border-brand-line bg-white p-6 shadow-sm"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50"><Icon className="h-6 w-6 text-brand-blue" /></div><h3 className="text-lg font-bold text-brand-slate">{title}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p></article>)}</div></div></section>

      <section id="como-funciona" className="py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Cómo funciona" title="Un proceso claro para comenzar a operar tu gestión normativa" description="TCDX Compliance se implementa con un alcance inicial controlado, acompañamiento de TECDEX y foco en trazabilidad operativa." /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{steps.map(([number, title, description]) => <article key={number} className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm"><p className="text-sm font-black text-brand-blue">{number}</p><h3 className="mt-4 text-lg font-bold text-brand-slate">{title}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p></article>)}</div></div></section>

      <section id="fundadores" className="bg-brand-navy py-20 text-white sm:py-24"><div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">Clientes fundadores</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">5 cupos para empresas que quieran ordenar su gestión normativa desde el inicio</h2><p className="mt-5 text-lg leading-8 text-white/70">La etapa fundadora está pensada para implementar con foco, acompañamiento y aprendizaje controlado. No buscamos vender volumen sin cuidar la experiencia inicial.</p><a href="#contacto" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-brand-navy transition hover:bg-brand-sky">Postular a cupo fundador <ArrowRight className="h-4 w-4" /></a></div><div className="grid gap-4 sm:grid-cols-2">{[["01", "Alcance inicial", "1 o 2 normativas por cliente para configurar una base operativa sólida."], ["02", "Onboarding asistido", "Acompañamiento de TECDEX para parametrización inicial y puesta en marcha."], ["03", "Precio fundador", "Condiciones preferentes para las primeras empresas participantes."], ["04", "Validación humana", "IA Auditor opera como apoyo; las conclusiones se revisan por responsables humanos."]].map(([number, title, text]) => <div key={title} className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"><p className="text-sm font-black text-brand-sky">{number}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{text}</p></div>)}</div></div></section>

      <section id="normas" className="py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Alcance inicial" title="Comienza con 1 o 2 normativas" description="Para los primeros clientes recomendamos partir con un alcance controlado, activando solo las normativas que realmente necesitan operar." /><div className="mt-12 grid gap-6 lg:grid-cols-3">{standards.map(([title, subtitle, description]) => <article key={title} className="rounded-3xl border border-brand-line bg-white p-7 shadow-sm"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{title}</p><h3 className="mt-4 text-2xl font-black text-brand-slate">{subtitle}</h3><p className="mt-4 text-sm leading-6 text-brand-muted">{description}</p></article>)}</div></div></section>

      <section id="ia-auditor" className="bg-brand-navy py-20 text-white sm:py-24"><div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">IA con criterio prudente</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">IA Auditor como apoyo, no como reemplazo humano</h2><p className="mt-6 text-lg leading-8 text-white/75">IA Auditor ayuda a revisar información cargada, detectar focos de atención, sugerir preguntas de auditoría y orientar acciones. Sus resultados deben ser revisados por responsables humanos y no reemplazan una auditoría certificadora.</p><p className="mt-5 text-sm leading-6 text-white/55">La inteligencia artificial se utiliza como herramienta de apoyo para análisis y orientación. Las decisiones, validaciones, aprobaciones y conclusiones formales deben permanecer bajo responsabilidad de personas autorizadas por la organización.</p></div><div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur"><ul className="space-y-4">{["Sugiere focos de revisión", "Identifica brechas y riesgos", "Recomienda acciones", "Apoya preparación de auditorías", "Requiere validación humana"].map((item) => <li key={item} className="flex gap-3 text-white/80"><CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-brand-green" /><span>{item}</span></li>)}</ul></div></div></section>

      <section id="planes" className="py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Oferta fundadora" title="Planes fundadores para la etapa inicial" description="Precio preferente, onboarding asistido y alcance controlado para empresas que quieran dejar de gestionar cumplimiento normativo con planillas dispersas." /><div className="mt-12 grid gap-6 lg:grid-cols-2"><article className="rounded-3xl border border-brand-line bg-white p-8 shadow-sm"><h3 className="text-2xl font-black text-brand-slate">Plan 1 Normativa</h3><p className="mt-5 text-4xl font-black text-brand-slate">CLP $79.000</p><p className="mt-1 text-sm text-brand-muted">+ IVA mensual</p><p className="mt-5 text-sm leading-6 text-brand-muted">Setup inicial desde <strong>CLP $150.000 + IVA</strong>.</p><p className="mt-4 text-sm leading-6 text-brand-muted">Incluye activación inicial, acompañamiento de puesta en marcha y configuración base para una normativa.</p><a href="#contacto" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-slate px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-blue">Postular a cupo fundador</a></article><article className="relative rounded-3xl border-2 border-brand-blue bg-white p-8 shadow-soft"><div className="absolute right-6 top-6 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand-blue">Más recomendado</div><h3 className="text-2xl font-black text-brand-slate">Plan 2 Normativas</h3><p className="mt-5 text-4xl font-black text-brand-slate">CLP $129.000</p><p className="mt-1 text-sm text-brand-muted">+ IVA mensual</p><p className="mt-5 text-sm leading-6 text-brand-muted">Setup inicial desde <strong>CLP $220.000 + IVA</strong>.</p><p className="mt-4 text-sm leading-6 text-brand-muted">Pensado para empresas que necesitan operar dos normativas con una gestión más integrada desde el inicio.</p><a href="#contacto" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-500">Solicitar evaluación comercial</a></article></div><p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-brand-muted">Oferta válida para primeros clientes fundadores, con onboarding asistido y alcance controlado. La disponibilidad de cupos y condiciones finales se confirman luego de una evaluación inicial.</p></div></section>

      <section className="bg-white py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Incluye" title="Qué incluye TCDX Compliance" /><ul className="mt-12 grid gap-4 rounded-3xl border border-brand-line bg-brand-soft p-6 sm:grid-cols-2 lg:grid-cols-3">{includes.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul></div></section>

      <section id="para-quien-es" className="py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Para quién es" title="Diseñado para equipos que necesitan visibilidad y trazabilidad normativa" description="La plataforma ayuda a ordenar el trabajo de quienes deben preparar, operar o acompañar procesos de cumplimiento." /><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{audiences.map(([title, description]) => <article key={title} className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm"><h3 className="text-lg font-bold text-brand-slate">{title}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{description}</p></article>)}</div></div></section>

      <section className="bg-white py-20 sm:py-24"><div className="section-shell"><div className="rounded-[2rem] border border-brand-line bg-brand-soft p-8 shadow-sm lg:p-12"><div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:items-center"><div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50"><LockKeyhole className="h-9 w-9 text-amber-600" /></div><div><h2 className="text-3xl font-bold tracking-tight text-brand-slate">Transparencia desde el inicio</h2><p className="mt-5 text-lg leading-8 text-brand-muted">TCDX Compliance no reemplaza a una casa certificadora, no garantiza certificación automática y no sustituye la responsabilidad del equipo interno o auditor externo. Es una plataforma para ordenar, operar y preparar mejor la gestión normativa.</p></div></div></div></div></section>

      <section id="faq" className="py-20 sm:py-24"><div className="section-shell"><SectionHeading eyebrow="Preguntas frecuentes" title="Respuestas claras antes de solicitar una demo" description="La etapa fundadora está diseñada con expectativas realistas, alcance controlado y acompañamiento humano." /><div className="mx-auto mt-12 grid max-w-4xl gap-4">{faqs.map(([question, answer]) => <article key={question} className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm"><h3 className="text-lg font-bold text-brand-slate">{question}</h3><p className="mt-3 text-sm leading-6 text-brand-muted">{answer}</p></article>)}</div></div></section>

      <section id="contacto" className="bg-brand-navy py-20 text-white sm:py-24"><div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">Contacto</p><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Solicita una demo de TCDX Compliance</h2><p className="mt-5 text-lg leading-8 text-white/70">Cuéntanos sobre tu empresa y la normativa que necesitas gestionar. TECDEX revisará tu caso y te contactará para coordinar una demo comercial.</p><p className="mt-6 text-sm leading-6 text-white/50">Al enviar este formulario, autorizas a TECDEX a contactarte para entregar información comercial sobre TCDX Compliance. La demo y condiciones comerciales estarán sujetas a evaluación del alcance requerido.</p></div><form className="grid gap-4 rounded-[2rem] bg-white p-6 text-brand-slate shadow-soft sm:grid-cols-2"><input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Empresa" /><input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Nombre" /><input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Cargo" /><input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Correo" type="email" /><input className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" placeholder="Teléfono" /><select className="rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue" defaultValue=""><option value="" disabled>Normativa de interés</option><option>9001</option><option>27001</option><option>42001</option><option>No estoy seguro</option><option>Otra</option></select><textarea className="min-h-32 rounded-2xl border border-brand-line px-4 py-3 outline-none focus:border-brand-blue sm:col-span-2" placeholder="Cuéntanos brevemente cómo gestionan hoy su cumplimiento normativo, qué normativa les interesa y si ya cuentan con implementación, consultor o auditoría programada." /><button className="rounded-full bg-brand-blue px-7 py-4 text-sm font-bold text-white transition hover:bg-blue-500 sm:col-span-2" type="button">Solicitar demo</button><p className="flex items-center gap-2 text-xs text-brand-muted sm:col-span-2"><Mail className="h-4 w-4" /> El envío del formulario será conectado posteriormente con Zoho Forms.</p></form></div></section>

      <footer className="border-t border-white/10 bg-brand-navy py-12"><div className="section-shell grid gap-8 text-sm text-white/70 lg:grid-cols-[1.2fr_0.8fr_0.8fr]"><div><p className="text-lg font-bold text-white">TCDX Compliance</p><p className="mt-3 max-w-xl leading-6">Plataforma SaaS de TECDEX SpA para gestión normativa simple, trazable y asistida por IA bajo revisión humana.</p><p className="mt-4 leading-6">IA Auditor opera como herramienta de apoyo para análisis y orientación. No reemplaza auditorías certificadoras, consultores, auditores ni responsables internos.</p></div><div><p className="font-bold text-white">Contacto</p><a className="mt-3 block hover:text-white" href="mailto:contacto@tecdex.net">contacto@tecdex.net</a><a className="mt-2 block hover:text-white" href="https://www.tecdex.net">www.tecdex.net</a></div><div><p className="font-bold text-white">Información</p><a className="mt-3 block hover:text-white" href="#contacto">Solicitar demo</a><Link className="mt-2 block hover:text-white" href="/politica-privacidad">Política de privacidad</Link><p className="mt-5 text-white/45">© {new Date().getFullYear()} TECDEX SpA. Todos los derechos reservados.</p></div></div></footer>
    </main>
  );
}

export function NormativeLanding() {
  // useSearchParams necesita un límite Suspense en el App Router.
  // fallback={null}: la lectura del query param es instantánea en el
  // cliente, así que no hay flash visible de contenido.
  return (
    <Suspense fallback={null}>
      <NormativeLandingContent />
    </Suspense>
  );
}
