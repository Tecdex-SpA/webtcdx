import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TCDX Compliance | Plataforma SaaS chilena para gestión ISO",
  description:
    "Centraliza controles, evidencias, riesgos, planes de acción, auditorías y reportes ejecutivos para normas ISO con TCDX Compliance, plataforma SaaS chilena desarrollada por TECDEX.",
  openGraph: {
    title: "TCDX Compliance | Gestión ISO simple, trazable y asistida por IA",
    description:
      "Plataforma SaaS chilena de TECDEX para centralizar controles, evidencias, riesgos, auditorías, planes de acción y reportes ejecutivos para gestión ISO.",
    type: "website",
    locale: "es_CL",
  },
  metadataBase: new URL("https://tcdx.cl"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
