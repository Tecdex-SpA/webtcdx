"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { contentIdFromPath, trackEvent } from "@/lib/analytics";

function inferPlacement(anchor: HTMLAnchorElement): string {
  if (anchor.dataset.placement) return anchor.dataset.placement;
  if (anchor.closest("footer")) return "footer";
  if (anchor.classList.contains("fixed")) return "sticky";
  if (anchor.closest("#top")) return "hero";
  return "body";
}

function AnalyticsEffects() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackEvent("page_view", {
      page_location: window.location.href,
      page_title: document.title,
      content_id: contentIdFromPath(pathname),
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;

      const destination = target.href;
      const contentId = target.dataset.contentId || contentIdFromPath(pathname);
      const placement = inferPlacement(target);
      const declaredEvent = target.dataset.analyticsEvent;

      if (declaredEvent === "whatsapp_click" || target.pathname === "/go/whatsapp") {
        const destinationUrl = new URL(destination);
        trackEvent("whatsapp_click", {
          content_id: destinationUrl.searchParams.get("content_id") || contentId,
          source: destinationUrl.searchParams.get("source") || "direct",
          placement: destinationUrl.searchParams.get("placement") || placement,
          campaign: destinationUrl.searchParams.get("campaign") || undefined,
        });
        return;
      }

      if (declaredEvent === "cta_click" || target.dataset.ctaLabel) {
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

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsEffects />
    </Suspense>
  );
}
