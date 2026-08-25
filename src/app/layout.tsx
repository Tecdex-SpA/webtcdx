import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";
import { WhatsAppPopup } from "@/components/WhatsAppPopup";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const ga4MeasurementId = process.env.GA4_MEASUREMENT_ID?.trim();
const validGa4MeasurementId =
  ga4MeasurementId && /^G-[A-Z0-9]+$/.test(ga4MeasurementId) ? ga4MeasurementId : undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://isos.tecdex.net"),
  title: {
    default: "TECDEX Compliance | Plataforma GRC simple y trazable",
    template: "%s | TECDEX Compliance",
  },
  description:
    "Plataforma GRC simple y trazable para organizar controles, evidencias, riesgos, auditorías y acciones.",
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
    title: "TECDEX Compliance | Plataforma GRC simple y trazable",
    description: "Plataforma GRC simple y trazable desarrollada por TECDEX.",
    siteName: "TECDEX Compliance",
    type: "website",
    locale: "es_CL",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "TECDEX Compliance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TECDEX Compliance | Plataforma GRC simple y trazable",
    description: "Plataforma GRC simple y trazable desarrollada por TECDEX.",
    images: ["/opengraph-image"],
  },
};

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tecdex.net/#organization",
      name: "TECDEX",
      url: "https://tecdex.net/",
    },
    {
      "@type": "WebSite",
      "@id": "https://isos.tecdex.net/#website",
      url: "https://isos.tecdex.net/",
      name: "TECDEX Compliance",
      publisher: { "@id": "https://tecdex.net/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c") }}
        />
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WT7HRSGR');`}
        </Script>
        {validGa4MeasurementId ? (
          <>
            <Script id="ga4-init" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',${JSON.stringify(validGa4MeasurementId)},{send_page_view:false});`}
            </Script>
            <Script
              id="ga4-loader"
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(validGa4MeasurementId)}`}
              strategy="afterInteractive"
            />
          </>
        ) : null}
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WT7HRSGR"
            height="0"
            width="0"
            className="hidden"
            title="Google Tag Manager"
          />
        </noscript>
        <AnalyticsProvider />
        {children}
        <WhatsAppFloatButton />
        <WhatsAppPopup />
      </body>
    </html>
  );
}
