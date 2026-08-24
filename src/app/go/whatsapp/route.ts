import { randomUUID } from "node:crypto";

const MEASUREMENT_ID = "G-FCBC6HZ3M5";
const WHATSAPP_NUMBER = "56989995290";
const VALID_SOURCES = new Set(["organic", "instagram", "facebook", "linkedin", "direct", "referral"]);
const VALID_PLACEMENTS = new Set(["hero", "body", "footer", "sticky", "related"]);

function safeParameter(value: string | null, maxLength: number): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength || /[\r\n]/.test(trimmed)) return undefined;
  return trimmed;
}

function naturalMessage(contentId: string): string {
  const isReadableSlug = /^[a-z0-9áéíóúñ]+(?:-[a-z0-9áéíóúñ]+)+$/i.test(contentId);
  if (isReadableSlug) {
    const topic = contentId.replace(/-/g, " ");
    return `Hola, vengo del artículo sobre ${topic} y me gustaría saber más sobre TECDEX Compliance.`;
  }
  return "Hola, visité TECDEX Compliance y me gustaría recibir más información.";
}

async function sendMeasurementEvent(params: {
  contentId: string;
  source: string;
  placement?: string;
  campaign?: string;
}) {
  const apiSecret = process.env.GA4_API_SECRET;
  if (!apiSecret) {
    console.warn("[analytics] GA4_API_SECRET is not configured; server-side whatsapp_click was not sent.");
    return false;
  }

  try {
    const endpoint = new URL("https://www.google-analytics.com/mp/collect");
    endpoint.searchParams.set("measurement_id", MEASUREMENT_ID);
    endpoint.searchParams.set("api_secret", apiSecret);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: randomUUID(),
        events: [
          {
            name: "whatsapp_click",
            params: {
              content_id: params.contentId,
              source: params.source,
              placement: params.placement,
              campaign: params.campaign,
              engagement_time_msec: 1,
            },
          },
        ],
      }),
      cache: "no-store",
    });
    return response.ok;
  } catch {
    console.error("[analytics] Failed to send server-side whatsapp_click.");
    return false;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const contentId = safeParameter(url.searchParams.get("content_id"), 160);
  const source = safeParameter(url.searchParams.get("source"), 32);
  const placement = safeParameter(url.searchParams.get("placement"), 32);
  const campaign = safeParameter(url.searchParams.get("campaign"), 160);

  if (!contentId || !source || !VALID_SOURCES.has(source)) {
    return Response.json(
      { error: "content_id and a valid source are required" },
      { status: 400, headers: { "cache-control": "no-store" } },
    );
  }
  if (placement && !VALID_PLACEMENTS.has(placement)) {
    return Response.json({ error: "invalid placement" }, { status: 400, headers: { "cache-control": "no-store" } });
  }

  await sendMeasurementEvent({ contentId, source, placement, campaign });

  const destination = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  destination.searchParams.set("text", naturalMessage(contentId));

  return new Response(null, {
    status: 302,
    headers: { location: destination.toString(), "cache-control": "no-store" },
  });
}
