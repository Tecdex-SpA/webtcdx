/**
 * Lectura de los identificadores de GA4 que viven en cookies de primera parte.
 *
 * GA4 une un hit de Measurement Protocol con la sesión abierta en el navegador
 * SOLO si `client_id` y `session_id` coinciden con los que gtag.js escribió en
 * las cookies. Si falta cualquiera de los dos, GA4 abre una sesión nueva sin
 * source/medium y el evento cae en el canal "Unassigned".
 *
 * Por eso estas funciones NUNCA fabrican un valor: devuelven `undefined` y el
 * emisor decide omitir el envío. Un evento perdido es preferible a un evento
 * que ensucia la atribución.
 */

/** Devuelve todos los valores presentes para una cookie dada. */
export function readCookieValues(cookieHeader: string | null | undefined, name: string): string[] {
  if (!cookieHeader) return [];
  const prefix = `${name}=`;
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(prefix))
    .map((part) => part.slice(prefix.length));
}

/**
 * `client_id` desde la cookie `_ga`, con formato `GA1.1.<p1>.<p2>`.
 * El client_id son los dos últimos segmentos unidos por punto.
 */
export function parseGaClientId(cookieHeader: string | null | undefined): string | undefined {
  // El navegador puede enviar más de una cookie `_ga` (por ejemplo una con
  // scope `.tecdex.net` y otra con scope de host). Se toma la primera que
  // realmente parsea en lugar de la primera que aparece.
  for (const value of readCookieValues(cookieHeader, "_ga")) {
    const match = value.match(/^GA\d+\.\d+\.(\d+\.\d+)$/);
    if (match) return match[1];
  }
  return undefined;
}

/** Convierte a string sólo si es un entero seguro y positivo (timestamp unix). */
function normalizeSessionId(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const parsed = Number(raw);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return undefined;
  return String(parsed);
}

/**
 * `session_id` desde la cookie `_ga_<CONTAINER_ID>`, donde `<CONTAINER_ID>` es
 * el measurement ID sin el prefijo `G-`. Se soportan los dos formatos vigentes:
 *
 *   GS1 (antiguo):  GS1.1.1724678901.3.1.1724679000.60.0.0
 *                   -> session_id = tercer segmento
 *   GS2 (2024+):    GS2.1.s1724678901$o3$g1$t1724679000$j60$l0$h0
 *                   -> session_id = el número que sigue a `s` en el primer campo
 */
export function parseGaSessionId(
  cookieHeader: string | null | undefined,
  measurementId: string,
): string | undefined {
  const containerId = measurementId.trim().replace(/^G-/, "");
  if (!containerId) return undefined;

  for (const value of readCookieValues(cookieHeader, `_ga_${containerId}`)) {
    const sessionId =
      // GS2: el `s<timestamp>` va inmediatamente después de `GS2.<n>.`
      value.match(/^GS\d+\.\d+\.s(\d+)/)?.[1] ||
      // GS2 con campos reordenados: `$s<timestamp>` en cualquier posición.
      value.match(/\$s(\d+)/)?.[1] ||
      // GS1: tercer segmento numérico.
      value.match(/^GS\d+\.\d+\.(\d+)(?:\.|$)/)?.[1];

    const normalized = normalizeSessionId(sessionId);
    if (normalized) return normalized;
  }
  return undefined;
}
