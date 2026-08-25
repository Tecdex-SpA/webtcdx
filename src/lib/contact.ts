const DEFAULT_COMMERCIAL_EMAIL = "contacto@tecdex.net";

export const contactConfig = {
  commercialEmail: (process.env.NEXT_PUBLIC_COMMERCIAL_EMAIL || DEFAULT_COMMERCIAL_EMAIL).trim(),
};

export function getWhatsAppRedirectUrl(
  contentId: string,
  source: string,
  placement?: string,
  campaign?: string,
): string {
  const params = new URLSearchParams({ content_id: contentId, source });
  if (placement) params.set("placement", placement);
  if (campaign) params.set("campaign", campaign);
  return `/go/whatsapp?${params.toString()}`;
}

export function getEmailUrl(subject: string, body: string): string {
  return `mailto:${contactConfig.commercialEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
