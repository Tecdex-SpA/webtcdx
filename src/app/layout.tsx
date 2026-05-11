import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tcdx.cl"),
  title: {
    default: "TCDX Compliance | Plataforma SaaS chilena para gestión normativa",
    template: "%s | TCDX Compliance",
  },
  description:
    "Centraliza controles, evidencias, riesgos, planes de acción, auditorías y reportes ejecutivos para gestión normativa con TCDX Compliance, plataforma SaaS chilena desarrollada por TECDEX.",
  keywords: [
    "TCDX Compliance",
    "TECDEX",
    "gestión normativa Chile",
    "software cumplimiento normativo",
    "cumplimiento normativo",
    "auditoría normativa",
    "evidencias de cumplimiento",
    "matriz de riesgos",
    "reportes ejecutivos",
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
    title: "TCDX Compliance | Gestión normativa simple, trazable y asistida por IA",
    description:
      "Plataforma SaaS chilena de TECDEX para centralizar controles, evidencias, riesgos, auditorías, planes de acción y reportes ejecutivos de cumplimiento normativo.",
    url: "https://tcdx.cl",
    siteName: "TCDX Compliance",
    type: "website",
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TCDX Compliance - Gestión normativa simple, trazable y asistida por IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TCDX Compliance | Gestión normativa simple, trazable y asistida por IA",
    description:
      "Plataforma SaaS chilena de TECDEX para centralizar controles, evidencias, riesgos, auditorías, planes de acción y reportes ejecutivos de cumplimiento normativo.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
