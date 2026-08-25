export type AnalyticsEvent = "page_view" | "cta_click" | "whatsapp_click" | "outbound_click" | string;
export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

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
