"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { getWhatsAppRedirectUrl } from "@/lib/contact";
import { contentIdFromPath, trackEvent } from "@/lib/analytics";

const SESSION_KEY = "tcdx-whatsapp-popup-dismissed";
const SHOW_AFTER_MS = 10000;
const SCROLL_THRESHOLD_RATIO = 0.4;

export function WhatsAppPopup() {
  const pathname = usePathname();
  const page_path = pathname ?? "/";
  const contentId = contentIdFromPath(page_path);
  const [visible, setVisible] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setVisible(true);
      trackEvent("whatsapp_popup_shown", { content_id: contentId, placement: "popup_cta" });
    };

    const timer = window.setTimeout(trigger, SHOW_AFTER_MS);

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      if (window.scrollY / docHeight >= SCROLL_THRESHOLD_RATIO) {
        trigger();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [contentId]);

  const handleClose = useCallback(() => {
    setVisible(false);
    window.sessionStorage.setItem(SESSION_KEY, "1");
    trackEvent("whatsapp_popup_close", { content_id: contentId, placement: "popup_cta" });
  }, [contentId]);

  const handleCtaClick = useCallback(() => {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, handleClose]);

  if (!visible) return null;

  const whatsappUrl = getWhatsAppRedirectUrl(contentId, "popup_cta");

  return (
    <div
      role="dialog"
      aria-label="Contacto por WhatsApp"
      aria-describedby="tcdx-whatsapp-popup-description"
      className="fixed bottom-24 right-4 z-40 w-[calc(100vw-2rem)] max-w-xs animate-[tcdx-popup-in_220ms_ease-out] rounded-3xl border border-brand-line bg-white p-5 text-brand-slate shadow-soft motion-reduce:animate-none sm:right-6 sm:max-w-sm"
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar mensaje de WhatsApp"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-brand-muted transition hover:bg-brand-soft hover:text-brand-slate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <p className="pr-8 text-base font-bold text-brand-slate">Hola 👋 ¿Necesitas ayuda?</p>
      <p id="tcdx-whatsapp-popup-description" className="mt-2 text-sm leading-6 text-brand-muted">
        Nuestro asistente de IA puede orientarte sobre TECDEX Compliance y las alternativas para tu empresa.
      </p>

      <a
        href={whatsappUrl}
        onClick={handleCtaClick}
        data-analytics-event="cta_click"
        data-content-id={contentId}
        data-placement="popup_cta"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        Escribir por WhatsApp
      </a>

      <p className="mt-3 text-xs leading-5 text-brand-muted">
        La atención inicial es realizada por inteligencia artificial. Cuando sea necesario, la conversación podrá ser continuada por un especialista de TECDEX.
      </p>
    </div>
  );
}
