import { randomUUID } from "node:crypto";

const WHATSAPP_NUMBER = "56989995290";
const UNKNOWN_VALUE = "unknown";
const DIAGNOSTIC_MAX_LENGTH = 50;
const GA4_TIMEOUT_MS = 1500;

const VALID_SOURCE_PATTERN = /^[a-z0-9][a-z0-9._-]{0,63}$/;
const VALID_PLACEMENTS = new Set(["hero", "body", "footer", "sticky", "sticky_bubble", "popup_cta", "related"]);
const KNOWN_ARTICLE_SLUGS = new Set([
  "beneficios-gestion-centralizada-identidades",
  "gestion-evidencias-iso-27001-trazabilidad",
  "iso-9001-2026-que-cambia-como-prepararse",
  "jumpcloud-control-acceso-iso-27001",
  "matriz-de-riesgos-y-controles",
  "migrar-planillas-a-plataforma-iso",
  "pentesting-continuo-iso-27001",
  "plataforma-gestion-iso-controlar-evidencias",
  "plataforma-iso-27001-ordenar-cumplimiento",
  "plataforma-iso-9001-ordenar-cumplimiento",
  "plataforma-para-mantener-certificacion-iso",
  "seguridad-apis-publicas-empresariales-control",
  "sistema-gestion-vs-proyecto-certificacion",
  "software-iso-27001-control-evidencias-riesgos",
  "software-para-auditorias-internas",
  "superficie-ataque-externa-iso-27001",
]);
const KNOWN_STATIC_CONTENT_IDS = new Set([
  "home",
  "hub",
  "entity",
  "gracias",
  "informacion-para-ia",
  "politica-privacidad",
]);

const LEGACY_ARTICLE_SLUG = "migrar-planillas-tcdx-compliance";
const MIGRATED_ARTICLE_SLUG = "migrar-planillas-a-plataforma-iso";

type InputField = "content_id" | "source" | "medium" | "placement" | "campaign";

type ParsedInput = {
  present: boolean;
  valid: boolean;
  value?: string;
  diagnostic?: string;
};

type NormalizedParams = {
  contentId: string;
  source: string;
  medium?: string;
  placement?: string;
  campaign?: string;
  paramsNormalized: boolean;
  invalidParams: string;
  diagnostics: Record<string, string>;
};

function diagnosticValue(value: string): string | undefined {
  const sanitized = value
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, DIAGNOSTIC_MAX_LENGTH);
  return sanitized || undefined;
}

function parseInput(value: string | null, maxLength: number): ParsedInput {
  if (value === null) return { present: false, valid: false };

  const trimmed = value.trim();
  const hasControlCharacters = /[\u0000-\u001f\u007f-\u009f]/.test(value);
  const valid = Boolean(trimmed) && trimmed.length <= maxLength && !hasControlCharacters;

  return {
    present: true,
    valid,
    value: valid ? trimmed : undefined,
    diagnostic: diagnosticValue(value),
  };
}

function normalizeRequest(url: URL): NormalizedParams {
  const contentInput = parseInput(url.searchParams.get("content_id"), 160);
  const sourceInput = parseInput(url.searchParams.get("source"), 64);
  const mediumInput = parseInput(url.searchParams.get("medium"), 64);
  const placementInput = parseInput(url.searchParams.get("placement"), 32);
  const campaignInput = parseInput(url.searchParams.get("campaign"), 160);
  const normalizedFields = new Set<InputField>();
  const diagnostics: Record<string, string> = {};

  const markNormalized = (field: InputField, input: ParsedInput) => {
    normalizedFields.add(field);
    if (input.diagnostic) diagnostics[`original_${field}`] = input.diagnostic;
  };

  let contentId = UNKNOWN_VALUE;
  if (contentInput.valid && contentInput.value) {
    const lowered = contentInput.value.toLowerCase();
    const canonical = lowered === LEGACY_ARTICLE_SLUG ? MIGRATED_ARTICLE_SLUG : lowered;
    if (KNOWN_ARTICLE_SLUGS.has(canonical) || KNOWN_STATIC_CONTENT_IDS.has(canonical)) {
      contentId = canonical;
      if (contentInput.value !== canonical) markNormalized("content_id", contentInput);
    } else {
      markNormalized("content_id", contentInput);
    }
  } else {
    markNormalized("content_id", contentInput);
  }

  let source = UNKNOWN_VALUE;
  if (sourceInput.valid && sourceInput.value) {
    const lowered = sourceInput.value.toLowerCase();
    if (VALID_SOURCE_PATTERN.test(lowered)) {
      source = lowered;
      if (sourceInput.value !== lowered) markNormalized("source", sourceInput);
    } else {
      markNormalized("source", sourceInput);
    }
  } else {
    markNormalized("source", sourceInput);
  }

  let medium: string | undefined;
  if (mediumInput.present) {
    if (mediumInput.valid && mediumInput.value) {
      const lowered = mediumInput.value.toLowerCase();
      if (VALID_SOURCE_PATTERN.test(lowered)) {
        medium = lowered;
        if (mediumInput.value !== lowered) markNormalized("medium", mediumInput);
      } else {
        markNormalized("medium", mediumInput);
      }
    } else {
      markNormalized("medium", mediumInput);
    }
  }

  let placement: string | undefined;
  if (placementInput.present) {
    if (placementInput.valid && placementInput.value) {
      const lowered = placementInput.value.toLowerCase();
      if (VALID_PLACEMENTS.has(lowered)) {
        placement = lowered;
        if (placementInput.value !== lowered) markNormalized("placement", placementInput);
      } else {
        markNormalized("placement", placementInput);
      }
    } else {
      markNormalized("placement", placementInput);
    }
  }

  let campaign: string | undefined;
  if (campaignInput.present) {
    if (campaignInput.valid && campaignInput.value) {
      campaign = campaignInput.value;
    } else {
      markNormalized("campaign", campaignInput);
    }
  }

  const invalidParams = Array.from(normalizedFields).join(",") || "none";
  return {
    contentId,
    source,
    medium,
    placement,
    campaign,
    paramsNormalized: normalizedFields.size > 0,
    invalidParams,
    diagnostics,
  };
}

function naturalMessage(contentId: string): string {
  if (KNOWN_ARTICLE_SLUGS.has(contentId)) {
    const topic = contentId.replace(/-/g, " ");
    return `Hola, vengo del artículo sobre ${topic} y me gustaría saber más sobre TECDEX Compliance.`;
  }
  return "Hola, me gustaría saber más sobre TECDEX Compliance.";
}

function cookieValue(request: Request, name: string): string | undefined {
  const cookie = request.headers.get("cookie") || "";
  return cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function gaClientId(request: Request): string | undefined {
  const value = cookieValue(request, "_ga");
  if (!value) return undefined;
  const match = value.match(/^GA\d+\.\d+\.(\d+\.\d+)$/);
  return match?.[1];
}

function gaSessionId(request: Request, measurementId: string): number | undefined {
  const suffix = measurementId.replace(/^G-/, "");
  const value = cookieValue(request, `_ga_${suffix}`);
  if (!value) return undefined;
  const sessionId =
    value.match(/^GS\d+\.\d+\.s(\d+)/)?.[1] ||
    value.match(/\$s(\d+)/)?.[1] ||
    value.match(/^GS\d+\.\d+\.(\d+)/)?.[1];
  if (!sessionId) return undefined;
  const parsed = Number(sessionId);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

async function sendMeasurementEvent(request: Request, params: NormalizedParams): Promise<boolean> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) {
    console.error("[analytics] GA4 Measurement Protocol is not configured; whatsapp_click was not sent.");
    return false;
  }

  if (params.paramsNormalized) {
    console.warn(`[analytics] whatsapp_click normalized parameters: ${params.invalidParams}.`);
  }

  try {
    const cookieClientId = gaClientId(request);
    const clientId = cookieClientId || randomUUID();
    const sessionId = gaSessionId(request, measurementId);
    const endpoint = new URL("https://www.google-analytics.com/mp/collect");
    endpoint.searchParams.set("measurement_id", measurementId);
    endpoint.searchParams.set("api_secret", apiSecret);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        events: [
          {
            name: "whatsapp_click",
            params: {
              content_id: params.contentId,
              source: params.source,
              medium: params.medium,
              placement: params.placement,
              campaign: params.campaign,
              params_normalized: params.paramsNormalized ? "true" : "false",
              invalid_params: params.invalidParams,
              ...params.diagnostics,
              engagement_time_msec: 1,
              ...(sessionId ? { session_id: sessionId } : {}),
            },
          },
        ],
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(GA4_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error(`[analytics] GA4 Measurement Protocol returned ${response.status}.`);
    } else {
      console.info(
        `[analytics] whatsapp_click attribution context: client_id_source=${cookieClientId ? "ga_cookie" : "generated"}; session_id_forwarded=${sessionId ? "true" : "false"}.`,
      );
      if (params.paramsNormalized) {
        console.info("[analytics] whatsapp_click with normalized parameters was sent.");
      }
    }
    return response.ok;
  } catch {
    console.error("[analytics] Failed to send server-side whatsapp_click.");
    return false;
  }
}

export async function GET(request: Request) {
  const params = normalizeRequest(new URL(request.url));
  await sendMeasurementEvent(request, params);

  const destination = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  destination.searchParams.set("text", naturalMessage(params.contentId));

  return new Response(null, {
    status: 302,
    headers: { location: destination.toString(), "cache-control": "no-store" },
  });
}
