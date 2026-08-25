"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { applyWhatsAppAttribution, contentIdFromPath, trackEvent } from "@/lib/analytics";

function inferPlacement(anchor: HTMLAnchorElement): string {
  if (anchor.dataset.placement) return anchor.dataset.placement;
  if (anchor.closest("footer")) return "footer";
  if (anchor.classList.contains("fixed")) return "sticky";
  if (anchor.closest("#top")) return "hero";
  return "body";
}

function AnalyticsEffects({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const lastPageView = useRef<string | null>(null);
  const initialPageViewSent = useRef(false);

  useEffect(() => {
    const pageLocation = window.location.href;
    if (lastPageView.current === pageLocation) return;
    lastPageView.current = pageLocation;
    const contentId = contentIdFromPath(pathname);

    if (!initialPageViewSent.current) {
      initialPageViewSent.current = true;
      trackEvent("page_view", {
        page_location: pageLocation,
        page_title: document.title,
        content_id: contentId,
      });
      return;
    }

    // GA4 Enhanced Measurement emits one page_view for App Router history
    // changes. Update this stream's route context before that event instead
    // of emitting a second manual page_view. A config-scoped custom parameter
    // is used because global `set` parameters are not reliably attached to
    // Enhanced Measurement events.
    if (measurementId) {
      window.gtag?.("config", measurementId, {
        send_page_view: false,
        content_id: contentId,
      });
    }
  }, [measurementId, pathname, search]);

  useEffect(() => {
    applyWhatsAppAttribution();
    const observer = new MutationObserver(() => applyWhatsAppAttribution());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname, search]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;

      const destination = target.href;
      const contentId = target.dataset.contentId || contentIdFromPath(pathname);
      const placement = inferPlacement(target);
      const declaredEvent = target.dataset.analyticsEvent;

      if (declaredEvent === "whatsapp_click" || target.pathname === "/go/whatsapp") {
        applyWhatsAppAttribution();
        trackEvent("cta_click", {
          content_id: contentId,
          placement,
          cta_label: target.dataset.ctaLabel || target.textContent?.trim() || target.ariaLabel || "WhatsApp",
          destination: "whatsapp",
        });
        return;
      }

      const isCta =
        declaredEvent === "cta_click" ||
        Boolean(target.dataset.ctaLabel) ||
        target.classList.contains("rounded-full") ||
        target.hash === "#contacto" ||
        target.hash === "#fundadores";

      if (isCta) {
        trackEvent("cta_click", {
          content_id: contentId,
          placement,
          cta_label: target.dataset.ctaLabel || target.textContent?.trim() || "CTA",
          destination,
        });
      }

      if (target.origin !== window.location.origin && !destination.startsWith("mailto:")) {
        trackEvent("outbound_click", {
          destination_host: target.hostname,
          content_id: contentId,
          placement,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}

export function AnalyticsProvider({ measurementId }: { measurementId?: string }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsEffects measurementId={measurementId} />
    </Suspense>
  );
}
