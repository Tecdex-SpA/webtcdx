import assert from "node:assert/strict";
import test, { before, beforeEach } from "node:test";

process.env.GA4_MEASUREMENT_ID = "G-FCBC6HZ3M5";
// Valor ficticio: los tests interceptan fetch y nunca alcanzan la red.
process.env.GA4_API_SECRET = "test-secret";

// Import diferido: el tsconfig del proyecto usa `target: es5`, que no admite
// `await` a nivel de módulo, y las variables de entorno deben estar puestas
// antes de que el módulo se evalúe.
let GET: (request: Request) => Promise<Response>;

before(async () => {
  ({ GET } = await import("@/app/go/whatsapp/route"));
});

const BROWSER_UA = "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/128 Safari/537.36";
const REFERER = "https://isos.tecdex.net/blog/matriz-de-riesgos-y-controles";
const CLIENT_COOKIE = "_ga=GA1.1.1234567890.1724678901";
const GS2_COOKIE = "_ga_FCBC6HZ3M5=GS2.1.s1724678901$o3$g1$t1724679000$j60$l0$h0";
const GS1_COOKIE = "_ga_FCBC6HZ3M5=GS1.1.1724678901.3.1.1724679000.60.0.0";

type SentRequest = { url: string; body: Record<string, unknown> };
let sent: SentRequest[] = [];

beforeEach(() => {
  sent = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    sent.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    return new Response(null, { status: 204 });
  }) as typeof fetch;
});

function call(cookie?: string, userAgent: string = BROWSER_UA) {
  return GET(
    new Request(
      "https://isos.tecdex.net/go/whatsapp?content_id=home&source=google&medium=organic&placement=sticky_bubble",
      {
        headers: {
          "user-agent": userAgent,
          referer: REFERER,
          ...(cookie ? { cookie } : {}),
        },
      },
    ),
  );
}

function callWithPlacement(placement: string) {
  return GET(
    new Request(`https://isos.tecdex.net/go/whatsapp?content_id=home&source=google&placement=${placement}`, {
      headers: {
        "user-agent": BROWSER_UA,
        referer: REFERER,
        cookie: `${CLIENT_COOKIE}; ${GS2_COOKIE}`,
      },
    }),
  );
}

function eventParams(index = 0): Record<string, unknown> {
  const events = sent[index].body.events as Array<{ params: Record<string, unknown> }>;
  return events[0].params;
}

test("con cookies GS2 envía el evento con los identificadores de la sesión real", async () => {
  const response = await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);

  assert.equal(response.status, 302);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].body.client_id, "1234567890.1724678901");
  // `session_id` debe ir DENTRO de params, no en la raíz del payload.
  assert.equal(sent[0].body.session_id, undefined);
  assert.equal(eventParams().session_id, "1724678901");
  // Obligatorio para que GA4 cuente el hit como interacción de la sesión.
  assert.equal(eventParams().engagement_time_msec, "100");
});

test("con cookies GS1 (formato antiguo) también une la sesión", async () => {
  await call(`${CLIENT_COOKIE}; ${GS1_COOKIE}`);

  assert.equal(sent.length, 1);
  assert.equal(eventParams().session_id, "1724678901");
});

test("no añade parámetros de campaña: la atribución la hereda de la sesión", async () => {
  await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);

  const params = eventParams();
  for (const forbidden of ["campaign_source", "campaign_medium", "campaign_name", "campaign_id"]) {
    assert.equal(params[forbidden], undefined, `${forbidden} no debe enviarse`);
  }
  // Tampoco timestamp_micros: evita la ventana de descarte de 72 h.
  assert.equal(sent[0].body.timestamp_micros, undefined);
});

test("page_location apunta al artículo (Referer propio), no al endpoint de redirección", async () => {
  await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);
  assert.equal(eventParams().page_location, REFERER);
});

test("ignora un Referer de otro host", async () => {
  const response = await GET(
    new Request("https://isos.tecdex.net/go/whatsapp?content_id=home", {
      headers: {
        "user-agent": BROWSER_UA,
        referer: "https://evil.example.com/",
        cookie: `${CLIENT_COOKIE}; ${GS2_COOKIE}`,
      },
    }),
  );

  assert.equal(response.status, 302);
  assert.equal(eventParams().page_location, undefined);
});

test("sin cookies de GA4 omite el envío en vez de inventar un client_id", async () => {
  const response = await call(undefined);

  assert.equal(sent.length, 0);
  // El usuario debe llegar a WhatsApp igual: analytics nunca bloquea el flujo.
  assert.equal(response.status, 302);
  assert.match(response.headers.get("location") ?? "", /^https:\/\/wa\.me\/56989995290\?text=/);
});

test("con _ga pero sin _ga_<container> omite el envío", async () => {
  const response = await call(CLIENT_COOKIE);
  assert.equal(sent.length, 0);
  assert.equal(response.status, 302);
});

test("con _ga_<container> pero sin _ga omite el envío", async () => {
  const response = await call(GS2_COOKIE);
  assert.equal(sent.length, 0);
  assert.equal(response.status, 302);
});

test("un crawler no genera evento aunque traiga cookies", async () => {
  const response = await call(
    `${CLIENT_COOKIE}; ${GS2_COOKIE}`,
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  );

  assert.equal(sent.length, 0);
  assert.equal(response.status, 302);
});

test("una petición sin user-agent se trata como automatizada", async () => {
  const response = await GET(
    new Request("https://isos.tecdex.net/go/whatsapp?content_id=home", {
      headers: { cookie: `${CLIENT_COOKIE}; ${GS2_COOKIE}` },
    }),
  );

  assert.equal(sent.length, 0);
  assert.equal(response.status, 302);
});

test("si el envío a GA4 falla, el usuario llega a WhatsApp igual", async () => {
  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;

  const response = await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);
  assert.equal(response.status, 302);
  assert.match(response.headers.get("location") ?? "", /^https:\/\/wa\.me\//);
});

// --- site --------------------------------------------------------------------

test("envía site='isos' para separar este emisor del snippet de tecdex.net", async () => {
  await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);

  // Ambos hosts comparten measurement ID, así que `site` es lo único que los
  // distingue en los informes.
  assert.equal(eventParams().site, "isos");
});

test("site viaja en params del evento, no en la raíz del payload", async () => {
  await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);
  assert.equal(sent[0].body.site, undefined);
});

// --- placement ---------------------------------------------------------------

test("placement llega a GA4 y no se queda sólo en el query string", async () => {
  await call(`${CLIENT_COOKIE}; ${GS2_COOKIE}`);
  assert.equal(eventParams().placement, "sticky_bubble");
});

test("placement llega a GA4 sin traducir: cada valor sale tal como lo emite el sitio", async () => {
  for (const input of ["popup_cta", "hero", "body", "related", "footer", "sticky", "sticky_bubble"]) {
    sent = [];
    await callWithPlacement(input);
    assert.equal(sent.length, 1, `placement=${input} debía enviarse`);
    assert.equal(eventParams().placement, input, `placement=${input} no debe traducirse`);
  }
});

// Regresión de b6c7321: `body` y `related` se traducían ambos a `inline`, lo que
// fusionaba dos momentos distintos del funnel (CTA dentro del artículo vs.
// bloque del final) de forma irrecuperable. Deben seguir siendo distinguibles.
test("body y related son valores distintos y no colapsan en uno solo", async () => {
  sent = [];
  await callWithPlacement("body");
  const body = eventParams().placement;

  sent = [];
  await callWithPlacement("related");
  const related = eventParams().placement;

  assert.equal(body, "body");
  assert.equal(related, "related");
  assert.notEqual(body, related);
});

test("todo placement enviado pertenece al vocabulario canónico de isos", async () => {
  const ISOS = new Set(["sticky_bubble", "popup_cta", "hero", "body", "footer", "related"]);

  for (const input of ["popup_cta", "hero", "body", "related", "footer", "sticky_bubble"]) {
    sent = [];
    await callWithPlacement(input);
    assert.ok(ISOS.has(String(eventParams().placement)), `${input} produjo un valor fuera del vocabulario`);
  }
});

test("placement desconocido no se inventa: se omite y se marca como normalizado", async () => {
  await callWithPlacement("inventado");

  assert.equal(sent.length, 1);
  assert.equal(eventParams().placement, undefined);
  assert.equal(eventParams().params_normalized, "true");
  assert.match(String(eventParams().invalid_params), /placement/);
});

test("placement con otra caja se acepta y se normaliza a minúsculas", async () => {
  await callWithPlacement("POPUP_CTA");
  assert.equal(eventParams().placement, "popup_cta");
});
