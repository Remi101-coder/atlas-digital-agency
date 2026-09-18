"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const existing = readCookieConsent();
    if (!existing) {
      setIsVisible(true);
    } else {
      setAnalyticsEnabled(existing.analytics);
    }

    const openSettings = () => {
      setAnalyticsEnabled(readCookieConsent()?.analytics ?? false);
      setIsManaging(true);
      setIsVisible(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const save = (analytics: boolean) => {
    writeCookieConsent({ analytics, decidedAt: new Date().toISOString() });
    setIsVisible(false);
    setIsManaging(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
        {!isManaging ? (
          <>
            <p className="font-barlow text-sm leading-relaxed text-slate-300">
              We use essential cookies to make this website work. With your permission, we also use optional
              analytics cookies to understand how the site is used. You can accept all optional cookies, reject
              them or choose your settings. You can change your choice at any time through Cookie Settings.{" "}
              <Link href="/privacy-policy" className="text-atlas-gold underline hover:text-atlas-gold-light">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => save(true)}
                className="rounded-xl bg-atlas-gold px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-atlas-gold-light"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => save(false)}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => setIsManaging(true)}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Manage settings
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-unbounded text-sm font-bold uppercase tracking-[0.2em] text-atlas-gold">
              Cookie settings
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div>
                  <p className="font-barlow text-sm font-semibold text-atlas-cream">Necessary cookies</p>
                  <p className="mt-1 font-barlow text-xs text-slate-400">
                    Required for the website to function. Always active.
                  </p>
                </div>
                <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-atlas-gold" />
              </div>
              <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div>
                  <p className="font-barlow text-sm font-semibold text-atlas-cream">Analytics cookies</p>
                  <p className="mt-1 font-barlow text-xs text-slate-400">
                    Help us understand how visitors use the site so we can improve it.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-atlas-gold"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => save(analyticsEnabled)}
                className="rounded-xl bg-atlas-gold px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-atlas-gold-light"
              >
                Save settings
              </button>
              <button
                type="button"
                onClick={() => setIsManaging(false)}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
