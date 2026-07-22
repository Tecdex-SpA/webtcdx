import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RouteRenderer } from "@/components/RouteRenderer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://isos.tecdex.net"),
  alternates: {
    canonical: "https://tecdex.net/iso",
  },
  title: {
    default: "Plataforma ISO 27001, 9001 y 42001 en Chile | TCDX Compliance — TecDex",
    template: "%s | TCDX Compliance",
  },
  description:
    "Software de gestión normativa para ISO 27001, 9001 y 42001: controles, evidencias, matriz de riesgos, auditorías y reportes ejecutivos. Plataforma SaaS chilena con onboarding asistido por TecDex.",
  keywords: [
    "TCDX Compliance",
    "TECDEX",
    "plataforma ISO Chile",
    "software ISO Chile",
    "plataforma ISO para empresas",
    "gestión ISO 27001",
    "plataforma ISO 27001",
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
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
  },
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
    title: "Plataforma ISO 27001, 9001 y 42001 en Chile | TCDX Compliance — TecDex",
    description:
      "Software de gestión normativa para ISO 27001, 9001 y 42001: controles, evidencias, matriz de riesgos, auditorías y reportes ejecutivos. Plataforma SaaS chilena con onboarding asistido por TecDex.",
    url: "https://tecdex.net/iso",
    siteName: "TCDX Compliance",
    type: "website",
    locale: "es_CL",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TCDX Compliance, plataforma ISO 27001, 9001 y 42001 en Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plataforma ISO 27001, 9001 y 42001 en Chile | TCDX Compliance — TecDex",
    description:
      "Software de gestión normativa para ISO 27001, 9001 y 42001: controles, evidencias, matriz de riesgos, auditorías y reportes ejecutivos. Plataforma SaaS chilena con onboarding asistido por TecDex.",
    images: ["/opengraph-image"],
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TCDX Compliance",
  url: "https://tecdex.net/iso",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Software de gestión normativa para ISO 27001, 9001 y 42001: controles, evidencias, matriz de riesgos, auditorías y reportes ejecutivos. Plataforma SaaS chilena con onboarding asistido por TecDex.",
  publisher: {
    "@type": "Organization",
    name: "TecDex",
    url: "https://tecdex.net",
  },
};

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    [
      "¿TCDX Compliance certifica automáticamente a una empresa?",
      "No. La plataforma ayuda a ordenar, operar y preparar mejor la gestión normativa, pero no emite certificaciones ni reemplaza a una casa certificadora.",
    ],
    [
      "¿IA Auditor reemplaza a un auditor o consultor?",
      "No. IA Auditor funciona como apoyo de análisis y orientación. Sus resultados deben ser revisados por responsables humanos, consultores o auditores según corresponda.",
    ],
    [
      "¿Por qué partir con 1 o 2 normativas?",
      "En etapa inicial recomendamos un alcance controlado para configurar bien procesos, evidencias, responsables y reportes antes de escalar.",
    ],
    [
      "¿Los usuarios tienen límite?",
      "En la oferta fundadora no se define un límite comercial inicial de usuarios. El alcance se revisa durante la evaluación comercial y el onboarding.",
    ],
    [
      "¿La plataforma sirve para ISO 27001, 9001 y 42001?",
      "Sí. TCDX Compliance está diseñada para ISO 9001 (calidad), ISO 27001 (seguridad de la información) e ISO 42001 (gestión de IA), permitiendo 1 o 2 normativas por cliente en etapa inicial.",
    ],
  ].map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={inter.className}>
        <RouteRenderer>{children}</RouteRenderer>
      </body>
    </html>
  );
}
