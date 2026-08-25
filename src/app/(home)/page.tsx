import type { Metadata } from "next";
import { HomeCanonical } from "@/components/HomeCanonical";
import { NormativeLanding } from "@/components/NormativeLanding";

export const metadata: Metadata = {
  openGraph: { url: "https://isos.tecdex.net/" },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://isos.tecdex.net/#software",
  name: "TECDEX Compliance",
  url: "https://isos.tecdex.net/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  publisher: { "@id": "https://tecdex.net/#organization" },
};

export default function Home() {
  return (
    <>
      <HomeCanonical />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c") }}
      />
      <NormativeLanding />
    </>
  );
}
