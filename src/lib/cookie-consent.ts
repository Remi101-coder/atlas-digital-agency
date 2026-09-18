export const COOKIE_CONSENT_STORAGE_KEY = "atlas-cookie-consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "atlas:open-cookie-settings";

export type CookieConsent = {
  analytics: boolean;
  decidedAt: string;
};

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // Ignore storage failures (private browsing, blocked storage, etc.)
  }
}
