export type ContactAnalyticsEvent =
  | "whatsapp_popup_open"
  | "whatsapp_popup_close"
  | "whatsapp_popup_click"
  | "whatsapp_floating_button_click"
  | "contact_email_click"
  | "contact_whatsapp_click";

export type ContactAnalyticsSource = "floating_popup" | "floating_button" | "contact_section";

export interface ContactAnalyticsPayload {
  page_path: string;
  source: ContactAnalyticsSource;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * El proyecto no tiene una herramienta de analítica configurada todavía.
 * Esta función envía el evento a gtag/dataLayer si existen en window y,
 * si no, no hace nada: nunca debe romper la experiencia del usuario.
 */
export function trackContactEvent(event: ContactAnalyticsEvent, payload: ContactAnalyticsPayload): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
      return;
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...payload });
    }
  } catch {
    // La analítica nunca debe interrumpir la experiencia del usuario.
  }
}
