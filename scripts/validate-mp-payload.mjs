#!/usr/bin/env node
/**
 * Valida el payload de Measurement Protocol contra el endpoint de depuración
 * de GA4. El endpoint normal (/mp/collect) devuelve 204 pase lo que pase, así
 * que no sirve como señal de éxito; /debug/mp/collect devuelve
 * `validationMessages`, que debe volver vacío.
 *
 * Uso:
 *   GA4_MEASUREMENT_ID=G-XXXXXXXXXX GA4_API_SECRET=... node scripts/validate-mp-payload.mjs
 *
 * El secreto se lee sólo de la variable de entorno y nunca se imprime.
 */

const measurementId = process.env.GA4_MEASUREMENT_ID;
const apiSecret = process.env.GA4_API_SECRET;

if (!measurementId || !apiSecret) {
  console.error("Faltan GA4_MEASUREMENT_ID y/o GA4_API_SECRET en el entorno.");
  process.exit(2);
}

// Identificadores de ejemplo con la MISMA forma que producen los parsers de
// src/lib/gaCookies.ts. No corresponden a ninguna sesión real.
const payload = {
  client_id: "1234567890.1724678901",
  events: [
    {
      name: "whatsapp_click",
      params: {
        content_id: "home",
        source: "google",
        medium: "organic",
        placement: "sticky_bubble",
        params_normalized: "false",
        invalid_params: "none",
        page_location: "https://isos.tecdex.net/",
        session_id: "1724678901",
        engagement_time_msec: "100",
      },
    },
  ],
};

const endpoint = new URL("https://www.google-analytics.com/debug/mp/collect");
endpoint.searchParams.set("measurement_id", measurementId);
endpoint.searchParams.set("api_secret", apiSecret);

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  console.error(`El endpoint de depuración respondió ${response.status}.`);
  process.exit(1);
}

const body = await response.json();
const messages = body.validationMessages ?? [];

console.log("Payload enviado:");
console.log(JSON.stringify(payload, null, 2));

if (messages.length === 0) {
  console.log("\n✓ validationMessages vacío: el payload es válido para GA4.");
  process.exit(0);
}

console.error("\n✗ GA4 devolvió mensajes de validación:");
console.error(JSON.stringify(messages, null, 2));
process.exit(1);
