import assert from "node:assert/strict";
import test from "node:test";
import { parseGaClientId, parseGaSessionId, readCookieValues } from "./gaCookies.ts";

const MEASUREMENT_ID = "G-FCBC6HZ3M5";
const GA_COOKIE = "_ga_FCBC6HZ3M5";

// --- client_id (cookie `_ga`) ------------------------------------------------

test("client_id: extrae los dos últimos segmentos de _ga", () => {
  assert.equal(parseGaClientId("_ga=GA1.1.1234567890.1724678901"), "1234567890.1724678901");
});

test("client_id: acepta otros índices de versión/dominio", () => {
  assert.equal(parseGaClientId("_ga=GA1.2.987654321.1700000000"), "987654321.1700000000");
  assert.equal(parseGaClientId("_ga=GA2.3.111.222"), "111.222");
});

test("client_id: no confunde _ga con _ga_<container>", () => {
  const header = `${GA_COOKIE}=GS2.1.s1724678901$o3; _ga=GA1.1.1234567890.1724678901`;
  assert.equal(parseGaClientId(header), "1234567890.1724678901");
});

test("client_id: si hay varias cookies _ga usa la primera que parsea", () => {
  const header = "_ga=corrupta; _ga=GA1.1.5.6";
  assert.equal(parseGaClientId(header), "5.6");
});

test("client_id: cookie ausente -> undefined (no se inventa valor)", () => {
  assert.equal(parseGaClientId(""), undefined);
  assert.equal(parseGaClientId(null), undefined);
  assert.equal(parseGaClientId(undefined), undefined);
  assert.equal(parseGaClientId(`${GA_COOKIE}=GS2.1.s1724678901$o3`), undefined);
});

test("client_id: cookie malformada -> undefined", () => {
  assert.equal(parseGaClientId("_ga=GA1.1.1234567890"), undefined);
  assert.equal(parseGaClientId("_ga=nonsense"), undefined);
  assert.equal(parseGaClientId("_ga="), undefined);
});

// --- session_id (cookie `_ga_<CONTAINER_ID>`) --------------------------------

test("session_id: formato GS1 (antiguo) -> tercer segmento", () => {
  const header = `${GA_COOKIE}=GS1.1.1724678901.3.1.1724679000.60.0.0`;
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), "1724678901");
});

test("session_id: formato GS2 (2024+) -> número tras la `s`", () => {
  const header = `${GA_COOKIE}=GS2.1.s1724678901$o3$g1$t1724679000$j60$l0$h0`;
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), "1724678901");
});

test("session_id: GS2 con índice de stream distinto", () => {
  const header = `${GA_COOKIE}=GS2.2.s1730000000$o12$g0$t1730000600$j45$l0$h0`;
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), "1730000000");
});

test("session_id: GS2 con `$s` en posición no inicial", () => {
  const header = `${GA_COOKIE}=GS2.1.o3$s1724678901$g1$t1724679000`;
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), "1724678901");
});

test("session_id: convive con otras cookies en el header", () => {
  const header = [
    "_ga=GA1.1.1234567890.1724678901",
    `${GA_COOKIE}=GS2.1.s1724678901$o3$g1$t1724679000$j60$l0$h0`,
    "tcdx-session=abc",
  ].join("; ");
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), "1724678901");
});

test("session_id: acepta el measurement id con o sin prefijo G-", () => {
  const header = `${GA_COOKIE}=GS2.1.s1724678901$o3`;
  assert.equal(parseGaSessionId(header, "FCBC6HZ3M5"), "1724678901");
});

test("session_id: cookie ausente -> undefined (no se inventa valor)", () => {
  assert.equal(parseGaSessionId("", MEASUREMENT_ID), undefined);
  assert.equal(parseGaSessionId(null, MEASUREMENT_ID), undefined);
  assert.equal(parseGaSessionId("_ga=GA1.1.1234567890.1724678901", MEASUREMENT_ID), undefined);
});

test("session_id: cookie de OTRO stream no se usa", () => {
  const header = "_ga_OTHER12345=GS2.1.s1724678901$o3";
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), undefined);
});

test("session_id: valores no numéricos o fuera de rango -> undefined", () => {
  assert.equal(parseGaSessionId(`${GA_COOKIE}=GS2.1.sABC$o3`, MEASUREMENT_ID), undefined);
  assert.equal(parseGaSessionId(`${GA_COOKIE}=basura`, MEASUREMENT_ID), undefined);
  assert.equal(parseGaSessionId(`${GA_COOKIE}=`, MEASUREMENT_ID), undefined);
  // 20 dígitos: supera Number.MAX_SAFE_INTEGER.
  assert.equal(parseGaSessionId(`${GA_COOKIE}=GS2.1.s99999999999999999999$o3`, MEASUREMENT_ID), undefined);
});

test("session_id: measurement id vacío -> undefined", () => {
  assert.equal(parseGaSessionId(`${GA_COOKIE}=GS2.1.s1724678901$o3`, "G-"), undefined);
});

test("cookies con la forma real que sirve producción (verificado 2026-08-30)", () => {
  // Capturado en el navegador sobre https://isos.tecdex.net: confirma que los
  // nombres y formatos que espera el parser son los que gtag.js escribe de
  // verdad, no una suposición.
  const header =
    "_ga_FCBC6HZ3M5=GS2.1.s1788128175$o1$g0$t1788128175$j60$l0$h41284443; " +
    "_ga=GA1.1.1783008182.1788128176; _gcl_au=1.1.123.456";

  assert.equal(parseGaClientId(header), "1783008182.1788128176");
  assert.equal(parseGaSessionId(header, MEASUREMENT_ID), "1788128175");
});

// --- helper ------------------------------------------------------------------

test("readCookieValues: devuelve todas las ocurrencias, no sólo la primera", () => {
  assert.deepEqual(readCookieValues("_ga=a; x=1; _ga=b", "_ga"), ["a", "b"]);
  assert.deepEqual(readCookieValues("_ga_ABC=z", "_ga"), []);
  assert.deepEqual(readCookieValues(null, "_ga"), []);
});
