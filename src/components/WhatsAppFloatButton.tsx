"use client";

import { usePathname } from "next/navigation";
import { getWhatsAppRedirectUrl } from "@/lib/contact";
import { contentIdFromPath } from "@/lib/analytics";

export function WhatsAppFloatButton() {
  const pathname = usePathname();
  const contentId = contentIdFromPath(pathname ?? "/");
  const href = getWhatsAppRedirectUrl(contentId, "direct", "sticky");

  return (
    <a
      href={href}
      data-analytics-event="whatsapp_click"
      data-content-id={contentId}
      data-placement="sticky"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#20bd5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.485.71 4.807 1.94 6.77L3 29l6.9-2.4a12.44 12.44 0 0 0 6.101 1.6h.004c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7h-.003a10.16 10.16 0 0 1-5.176-1.418l-.371-.22-4.096 1.424 1.44-3.99-.242-.41A10.18 10.18 0 0 1 5.8 15.5c0-5.63 4.573-10.2 10.204-10.2 2.726 0 5.288 1.062 7.216 2.992a10.13 10.13 0 0 1 2.984 7.211c0 5.63-4.573 10.197-10.203 10.197zm5.593-7.643c-.306-.153-1.813-.895-2.094-.997-.281-.102-.486-.153-.69.154-.204.306-.792.996-.971 1.2-.179.204-.357.23-.663.077-.306-.153-1.293-.477-2.463-1.52-.91-.812-1.525-1.815-1.704-2.121-.179-.306-.019-.472.134-.624.137-.137.306-.357.46-.536.153-.179.204-.306.306-.51.102-.204.05-.383-.026-.536-.077-.153-.69-1.663-.945-2.278-.249-.599-.502-.518-.69-.527-.179-.008-.383-.01-.588-.01-.204 0-.536.077-.817.383-.281.306-1.073 1.049-1.073 2.559s1.098 2.968 1.25 3.173c.153.204 2.16 3.298 5.234 4.624.731.316 1.301.505 1.745.646.733.233 1.4.2 1.927.121.588-.088 1.813-.741 2.069-1.457.255-.715.255-1.328.179-1.457-.077-.128-.281-.204-.588-.357z" />
      </svg>
    </a>
  );
}
