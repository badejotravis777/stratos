// Single source of truth for how users reach the Stratos team.
export const SUPPORT_EMAIL = 'hello@stratoshqapp.com';
export const WHATSAPP_NUMBER = '2349128430714';

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const COMMUNITY_LINK = whatsappLink("Hi Stratos! I'd like to join the creator community.");
export const STRATEGY_CALL_LINK = whatsappLink("Hi Stratos! I'd like to book a strategy call.");
