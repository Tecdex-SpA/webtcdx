import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CommercialSections } from "@/components/CommercialSections";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tcdx.cl"),
  title: {
    default: "TCDX Compliance | Plataforma SaaS chilena para gestión ISO",
    template: "%s | TCDX Compliance",
  },
  description:
    "Centraliza controles, evidencias, riesgos, planes de acción, auditorías y reportes ejecutivos para normas ISO con TCDX Compliance, plataforma SaaS chilena desarrollada por TECDEX.",
  keywords: [
    "TCDX Compliance",
    "TECDEX",
    "gestión ISO Chile",
    "software ISO",
    "ISO 9001",
    "ISO 27001",
    "ISO 42001",
    "cumplimiento ISO",
    "auditoría ISO",
    "evidencias ISO",
  ],
  authors: [{ name: "TECDEX" }],
  creator: "TECDEX",
  publisher: "TECDEX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "TCDX Compliance | Gestión ISO simple, trazable y asistida por IA",
    description:
      "Plataforma SaaS chilena de TECDEX para centralizar controles, evidencias, riesgos, auditorías, planes de acción y reportes ejecutivos para gestión ISO.",
    url: "https://tcdx.cl",
    siteName: "TCDX Compliance",
    type: "website",
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TCDX Compliance - Gestión ISO simple, trazable y asistida por IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TCDX Compliance | Gestión ISO simple, trazable y asistida por IA",
    description:
      "Plataforma SaaS chilena de TECDEX para centralizar controles, evidencias, riesgos, auditorías, planes de acción y reportes ejecutivos para gestión ISO.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>
        {children}
        <CommercialSections />
      </body>
    </html>
  );
}
