const DEFAULT_WHATSAPP_NUMBER = "56989995290";
const DEFAULT_COMMERCIAL_EMAIL = "contacto@tecdex.net";

function normalizeWhatsAppNumber(rawNumber: string): string {
  return rawNumber.replace(/[^\d]/g, "");
}

export const contactConfig = {
  whatsappNumber: normalizeWhatsAppNumber(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER
  ),
  commercialEmail: (process.env.NEXT_PUBLIC_COMMERCIAL_EMAIL || DEFAULT_COMMERCIAL_EMAIL).trim(),
  whatsappMessage: "Hola, visité TCDX Compliance y me gustaría recibir información.",
};

export function getWhatsAppUrl(message: string = contactConfig.whatsappMessage): string {
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getEmailUrl(subject: string, body: string): string {
  return `mailto:${contactConfig.commercialEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
