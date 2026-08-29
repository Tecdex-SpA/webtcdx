import type { MetadataRoute } from "next";

const BASE_URL = "https://isos.tecdex.net";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/go/*` son redirecciones de salida (302 a wa.me), no contenido
      // indexable. Cada rastreo disparaba además un evento de Measurement
      // Protocol sin sesión de GA4 asociada, que terminaba en "Unassigned".
      disallow: "/go/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
