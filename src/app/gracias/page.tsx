import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solicitud recibida",
  description:
    "Gracias por solicitar una demo de TCDX Compliance. TECDEX revisará tu información y te contactará para coordinar los próximos pasos.",
};

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-brand-navy text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.28),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#0B1F3A,#102D55)]" />
        <div className="section-shell relative">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center shadow-soft backdrop-blur sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-300/25">
              <CheckCircle2 className="h-10 w-10 text-emerald-300" />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-brand-sky">
              Solicitud recibida
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Gracias por contactar a TECDEX
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/75">
              Recibimos tu solicitud de demo para TCDX Compliance. Nuestro equipo revisará la información enviada y te contactará para coordinar los próximos pasos comerciales.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 text-left text-sm leading-6 text-white/70">
              <p className="font-semibold text-white">Qué ocurre ahora:</p>
              <ul className="mt-3 space-y-2">
                <li>• Revisaremos empresa, cargo, contacto y normativa de interés.</li>
                <li>• Evaluaremos si el alcance calza con la etapa fundadora.</li>
                <li>• Te contactaremos para coordinar una demo o reunión comercial.</li>
              </ul>
            </div>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-brand-navy transition hover:bg-brand-sky"
              >
                Volver al inicio <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:contacto@tecdex.net"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> contacto@tecdex.net
              </a>
            </div>

            <p className="mt-8 text-xs leading-6 text-white/45">
              IA Auditor opera como apoyo de análisis y orientación. No reemplaza auditorías certificadoras, consultores, auditores ni responsables internos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
