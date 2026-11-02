import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileCheck2, ListChecks, ShieldCheck, Target, TriangleAlert } from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { EmbeddedModeController } from "@/components/EmbeddedModeController";

const features = [
  { icon: ClipboardCheck, title: "Guía por requisito", text: "Comprende qué pide tu norma, organiza la implementación y reúne cómo demostrarla." },
  { icon: FileCheck2, title: "Controles y evidencias", text: "Centraliza documentos, controles, responsables y evidencias para las revisiones." },
  { icon: TriangleAlert, title: "Riesgos bajo seguimiento", text: "Registra y evalúa riesgos en una matriz de probabilidad e impacto." },
  { icon: ListChecks, title: "Acciones y no conformidades", text: "Asigna responsables y sigue los hallazgos hasta su cierre." },
  { icon: ShieldCheck, title: "Auditoría interna", text: "Organiza el programa, la ejecución y los informes de auditoría." },
  { icon: Target, title: "Visión para la dirección", text: "Consulta el avance por norma y las prioridades del sistema de gestión." },
];

const plans = [
  { name: "Lite", price: "3", norms: "1 norma", detail: "ISO 9001 o ISO/IEC 27001, a elección", cta: "Comenzar con Lite" },
  { name: "Lite+", price: "4,5", norms: "2 normas", detail: "ISO 9001 e ISO/IEC 27001", cta: "Comenzar con Lite+" },
];

export function NormativeLanding() {
  return <main className="min-h-screen bg-[#F2F2F2] text-[#161616]">
    <Suspense fallback={null}><EmbeddedModeController /></Suspense>
    <header data-embedded-chrome className="sticky top-0 z-50 border-b border-white/15 bg-[#2B3944] text-white">
      <div className="section-shell flex min-h-[76px] items-center justify-between gap-4">
        <Link href="/" className="font-bold tracking-wide text-white" aria-label="Tecdex ISO">Tecdex ISO</Link>
        <nav className="hidden gap-7 text-sm md:flex" aria-label="Navegación principal">
          <a href="#solucion">Plataforma</a><a href="#planes">Planes</a><a href="#preguntas">Preguntas frecuentes</a>
        </nav>
        <a href="https://iso.tecdex.net/login" className="rounded-[15px] border border-white/50 px-5 py-3 text-sm font-semibold text-white">Ingresar</a>
      </div>
    </header>
    <section id="top" className="relative overflow-hidden bg-[#2B3944] py-20 text-white md:py-28">
      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
        <div className="min-w-0">
          <p className="mb-5 inline-block rounded-full border border-white/25 px-4 py-2 text-sm text-white/85">Gestión ISO para equipos que quieren avanzar</p>
          <h1 className="max-w-[640px] font-bold">Tu sistema ISO, claro y en movimiento.</h1>
          <p className="mt-6 text-xl leading-8 text-white/85">Implementa, mantén y mejora ISO 9001 y/o ISO/IEC 27001 desde una plataforma que conecta requisitos, responsables, evidencias y acciones.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#planes" className="inline-flex min-h-12 items-center gap-2 rounded-[15px] bg-[#2F7774] px-7 py-3 font-semibold text-white">Ver planes y precios <ArrowRight size={18}/></a>
            <a href="#contacto" className="inline-flex min-h-12 items-center rounded-[15px] border border-white/50 px-7 py-3 font-semibold text-white">Hablar con un asesor</a>
          </div>
          <p className="mt-5 text-sm text-white/70">Planes desde 3 UF + IVA al mes · Hasta 10 usuarios por organización</p>
        </div>
        <div className="rounded-[28px] border border-white/20 bg-white p-7 text-[#2B3944] shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5"><span className="font-bold">Tu trabajo ISO, organizado</span><span className="rounded-full bg-[#e6f3f2] px-3 py-1 text-xs font-semibold text-[#2F7774]">Vista conceptual</span></div>
          <div className="mt-6 space-y-4">{[
            ["01", "Comprender", "Qué pide cada requisito de tu norma"],
            ["02", "Implementar", "Quién hace qué y cómo avanza"],
            ["03", "Demostrar", "Evidencias y seguimiento en un solo lugar"],
          ].map(([number,title,description])=><div key={number} className="flex gap-4 rounded-xl bg-[#F2F2F2] p-5"><span className="text-2xl font-bold text-[#2F7774]">{number}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm text-[#54595F]">{description}</p></div></div>)}</div>
          <p className="mt-5 text-xs text-[#54595F]">Representación ilustrativa del flujo de trabajo, no una captura de datos reales.</p>
        </div>
      </div>
    </section>
    <section className="py-16 md:py-20"><div className="section-shell grid gap-6 md:grid-cols-3">
      {[
        ["Menos dispersión", "Reúne el trabajo que hoy puede estar repartido entre planillas, carpetas y correos."],
        ["Responsables claros", "Identifica tareas, acciones y evidencias pendientes."],
        ["Preparación continua", "Mantén visible el estado del sistema entre auditorías."],
      ].map(([title,text])=><div key={title} className="rounded-2xl bg-white p-7"><CheckCircle2 className="mb-5 text-[#2F7774]"/><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-7 text-[#54595F]">{text}</p></div>)}
    </div></section>
    <section id="solucion" className="bg-white py-20"><div className="section-shell">
      <p className="text-sm font-bold uppercase tracking-widest text-[#2F7774]">La plataforma</p>
      <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">Del diagnóstico a la mejora continua, con el trabajo a la vista.</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-[#54595F]">Funciones de gestión disponibles según la norma contratada. La plataforma acompaña la preparación de auditorías; la certificación corresponde a un organismo independiente.</p>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-[#D8D8D8] p-7"><Icon className="h-8 w-8 text-[#2F7774]"/><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-[#54595F]">{text}</p></article>)}</div>
      <p className="mt-8 text-sm text-[#54595F]">La declaración de aplicabilidad se utiliza con ISO/IEC 27001.</p>
    </div></section>
    <section id="planes" className="py-20"><div className="section-shell">
      <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#2F7774]">Planes claros</p><h2 className="mt-3 text-4xl font-bold">Elige la norma. Comienza a trabajar.</h2><p className="mt-5 text-lg text-[#54595F]">Dos planes mensuales para organizaciones con una sucursal y equipos acotados. Sin descuentos por pago anticipado.</p></div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">{plans.map(plan=><article key={plan.name} className="flex flex-col rounded-[24px] border border-[#D8D8D8] bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-[#2F7774]">{plan.name}</p><h3 className="mt-3 text-4xl font-bold">{plan.price} UF <span className="text-base font-medium text-[#54595F]">+ IVA / mes</span></h3>
        <p className="mt-5 text-xl font-semibold">{plan.norms}</p><p className="mt-2 text-[#54595F]">{plan.detail}</p>
        <ul className="mt-7 space-y-3 text-sm">{["Hasta 1 sucursal","Hasta 3 áreas","Hasta 10 usuarios","Habilitación autoservicio sin costo","Acompañamiento opcional según cotización"].map(item=><li key={item} className="flex gap-3"><CheckCircle2 size={18} className="shrink-0 text-[#2F7774]"/>{item}</li>)}</ul>
        <a href="#contacto" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[15px] bg-[#2F7774] px-6 py-3 font-bold text-white">{plan.cta} <ArrowRight className="ml-2" size={18}/></a>
        <p className="mt-3 text-center text-xs text-[#54595F]">Contratación asistida por el equipo comercial.</p>
      </article>)}</div>
      <div className="mt-8 rounded-2xl bg-[#2B3944] p-8 text-white md:flex md:items-center md:justify-between md:gap-8"><div><h3 className="text-2xl font-bold">¿Necesitas más capacidad?</h3><p className="mt-3 text-white/80">Conoce Credex GRC con asesoría de nuestro equipo.</p></div><a href="#contacto" className="mt-5 inline-flex min-h-12 shrink-0 items-center rounded-[15px] border border-white/50 px-6 py-3 font-semibold md:mt-0">Hablar con un asesor</a></div>
    </div></section>
    <section id="preguntas" className="bg-white py-20"><div className="section-shell max-w-5xl"><h2 className="text-4xl font-bold">Preguntas frecuentes</h2><div className="mt-10 grid gap-5">{[
      ["¿Tecdex ISO entrega certificaciones?", "No. La plataforma apoya la implementación, mantención y preparación de auditorías. La certificación la otorga un organismo independiente."],
      ["¿Puedo contratar una sola norma?", "Sí. Lite permite elegir ISO 9001 o ISO/IEC 27001. Lite+ incluye ambas normas."],
      ["¿Cuántos usuarios puedo incorporar?", "Ambos planes permiten hasta 10 usuarios, 3 áreas y 1 sucursal."],
      ["¿Cómo comienzo?", "El equipo comercial te orienta en la contratación y activación. El registro automático con pago se habilitará cuando esté disponible."],
      ["¿Puedo solicitar ayuda en la habilitación?", "Sí. La habilitación por autoservicio no tiene costo; el acompañamiento se cotiza según el alcance."],
    ].map(([q,a])=><article key={q} className="rounded-xl border border-[#D8D8D8] p-6"><h3 className="font-bold">{q}</h3><p className="mt-3 leading-7 text-[#54595F]">{a}</p></article>)}</div></div></section>
    <section id="contacto" className="bg-[#2B3944] py-20 text-white"><div className="section-shell grid gap-10 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-widest text-[#a7e1de]">Comienza esta semana</p><h2 className="mt-3 text-4xl font-bold">Conversemos sobre tu norma.</h2><p className="mt-5 text-lg leading-8 text-white/80">Cuéntanos si necesitas ISO 9001, ISO/IEC 27001 o ambas. Nuestro equipo te orientará para comenzar con el plan adecuado.</p></div><ContactActions /></div></section>
    <footer data-embedded-chrome className="bg-[#22303a] py-10 text-white"><div className="section-shell flex flex-col justify-between gap-5 text-sm md:flex-row"><div><strong>Tecdex ISO</strong><p className="mt-2 text-white/70">Plataforma SaaS desarrollada por TECDEX SpA.</p></div><div className="flex flex-wrap gap-5"><a href="https://iso.tecdex.net/login">Ingresar</a><a href="mailto:contacto@tecdex.net">Contacto</a><Link href="/politica-privacidad">Política de privacidad</Link></div></div></footer>
  </main>;
}
