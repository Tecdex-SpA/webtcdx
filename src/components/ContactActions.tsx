"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, Mail } from "lucide-react";
import { contactConfig, getEmailUrl, getWhatsAppRedirectUrl } from "@/lib/contact";
import { contentIdFromPath, trackEvent } from "@/lib/analytics";

type ContactAnalyticsSource = "floating_popup" | "floating_button" | "contact_section";

interface ContactActionsProps {
  title?: string;
  description?: string;
  whatsappLabel?: string;
  emailLabel?: string;
  source?: ContactAnalyticsSource;
  className?: string;
}

export function ContactActions({
  title = "¿Necesitas más información?",
  description = "Conversa con nuestro asistente de IA por WhatsApp o escríbenos por correo. Te ayudaremos a evaluar TECDEX Compliance para tu empresa.",
  whatsappLabel = "Hablar por WhatsApp",
  emailLabel = "Enviar un correo",
  source = "contact_section",
  className = "",
}: ContactActionsProps) {
  const pathname = usePathname();
  const contentId = contentIdFromPath(pathname ?? "/");
  const whatsappUrl = getWhatsAppRedirectUrl(contentId, "direct", "body");
  const emailUrl = getEmailUrl(
    "Información sobre TECDEX Compliance",
    "Hola, me gustaría recibir más información sobre TECDEX Compliance."
  );

  const handleEmailClick = () => {
    trackEvent("cta_click", { content_id: contentId, placement: "body", cta_label: emailLabel, destination: emailUrl, component: source });
  };

  return (
    <div className={`grid gap-5 rounded-[2rem] bg-white p-6 text-brand-slate shadow-soft sm:p-8 ${className}`}>
      <div>
        <h3 className="text-xl font-bold text-brand-slate">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-brand-muted">{description}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappUrl}
          data-analytics-event="whatsapp_click"
          data-content-id={contentId}
          data-placement="body"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-4 w-4" /> {whatsappLabel}
        </a>
        <a
          href={emailUrl}
          onClick={handleEmailClick}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
        >
          <Mail className="h-4 w-4" /> {emailLabel}
        </a>
      </div>
      <p className="text-xs leading-6 text-brand-muted">
        La atención inicial es realizada por inteligencia artificial. Cuando sea necesario, la conversación podrá ser continuada por un especialista de TECDEX.
      </p>
      <p className="sr-only">Correo: {contactConfig.commercialEmail}</p>
    </div>
  );
}
