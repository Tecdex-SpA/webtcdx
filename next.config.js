const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // Solución temporal: permitir que isos.tecdex.net (TCDX Compliance) se
    // embeba en un iframe SOLO desde tecdex.net, para reutilizar el widget
    // de Zoho SalesIQ del sitio padre mientras se desarrolla el nuevo chatbot.
    // Ver: https://tecdex.net/iso/
    // No existía Content-Security-Policy ni X-Frame-Options previos en este
    // proyecto (verificado en headers de respuesta), por lo que esta directiva
    // se agrega desde cero y no reemplaza ninguna política existente.
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://tecdex.net https://www.tecdex.net",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
