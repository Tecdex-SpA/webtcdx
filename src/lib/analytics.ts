export type AnalyticsEvent = "page_view" | "cta_click" | "whatsapp_click" | "outbound_click" | string;
export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

const ATTRIBUTION_SESSION_KEY = "tcdx-whatsapp-attribution";

type SessionAttribution = {
  source: string;
  medium?: string;
  campaign?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;
  // whatsapp_click is authoritative server-side in /go/whatsapp. Blocking it
  // here prevents accidental client-side double counting.
  if (event === "whatsapp_click") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    window.gtag?.("event", event, payload);
  } catch {
    // Analytics must never interrupt navigation or contact flows.
  }
}

export function contentIdFromPath(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname === "/blog") return "hub";
  if (pathname === "/tecdex-compliance") return "entity";
  if (pathname.startsWith("/blog/")) return pathname.slice("/blog/".length) || "hub";
  return pathname.replace(/^\//, "") || "home";
}

function storedAttribution(): SessionAttribution | undefined {
  const value = window.sessionStorage.getItem(ATTRIBUTION_SESSION_KEY);
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value) as Partial<SessionAttribution>;
    return typeof parsed.source === "string" && parsed.source ? parsed as SessionAttribution : undefined;
  } catch {
    return undefined;
  }
}

function externalReferrerSource(): string | undefined {
  if (!document.referrer) return undefined;
  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin === window.location.origin) return undefined;
    return referrer.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

export function getSessionAttribution(): SessionAttribution {
  if (typeof window === "undefined") return { source: "unknown" };

  try {
    const stored = storedAttribution();
    if (stored) return stored;

    const entryUrl = new URL(window.location.href);
    const utmSource = entryUrl.searchParams.get("utm_source")?.trim();
    const referrerSource = externalReferrerSource();
    const attribution: SessionAttribution = utmSource
      ? {
          source: utmSource,
          medium: entryUrl.searchParams.get("utm_medium")?.trim() || undefined,
          campaign: entryUrl.searchParams.get("utm_campaign")?.trim() || undefined,
        }
      : {
          source: referrerSource || "direct",
          medium: referrerSource ? "referral" : undefined,
        };

    window.sessionStorage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return { source: "unknown" };
  }
}

export function applyWhatsAppAttribution(root: ParentNode = document): void {
  if (typeof window === "undefined") return;
  const attribution = getSessionAttribution();

  root.querySelectorAll<HTMLAnchorElement>('a[href*="/go/whatsapp"]').forEach((anchor) => {
    try {
      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin || url.pathname !== "/go/whatsapp") return;
      url.searchParams.set("source", attribution.source);
      if (attribution.medium) url.searchParams.set("medium", attribution.medium);
      else url.searchParams.delete("medium");
      if (attribution.campaign) url.searchParams.set("campaign", attribution.campaign);
      else url.searchParams.delete("campaign");
      anchor.href = `${url.pathname}${url.search}${url.hash}`;
    } catch {
      // Attribution must never interrupt the contact path.
    }
  });
}
