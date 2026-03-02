"use client";

import { useEffect, useState, useCallback } from "react";
import {
  setConsentState,
  shouldShowConsentBanner,
} from "@/lib/consent/tracking-consent";

/**
 * GDPR / ePrivacy cookie-consent banner.
 *
 * Positioned fixed at the bottom of the viewport.
 * Two actions: "Accept All" (analytics + necessary) and "Necessary Only".
 *
 * On native iOS builds the banner is hidden — ATT handles consent there.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // On native Capacitor builds, skip the web consent banner
    const isNative =
      typeof window !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Capacitor?.isNativePlatform?.();
    if (isNative) return;

    if (shouldShowConsentBanner()) {
      // Small delay so it doesn't pop in on first paint
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = useCallback((analytics: boolean) => {
    const state = setConsentState(analytics);
    setVisible(false);

    // Dispatch a custom event so MixpanelProvider can react
    window.dispatchEvent(new CustomEvent("koydo:consent-updated", { detail: state }));
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9999] flex flex-col items-center p-4 sm:p-6"
    >
      <div className="max-w-xl w-full rounded-2xl border border-border bg-surface shadow-xl p-5 dark:bg-[var(--surface)]">
        <p className="text-sm text-foreground leading-relaxed">
          We use cookies and similar technologies for analytics to improve your
          learning experience. You can accept all or use only necessary cookies.{" "}
          <a
            href="/legal/privacy"
            className="underline text-accent hover:text-accent/80"
          >
            Privacy Policy
          </a>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => accept(true)}
            className="ui-focus-ring rounded-full bg-accent px-5 py-2 min-h-11 text-sm font-semibold text-white hover:brightness-110"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => accept(false)}
            className="ui-focus-ring rounded-full border border-border bg-surface-muted px-5 py-2 min-h-11 text-sm font-semibold text-foreground hover:bg-surface dark:bg-surface/60 dark:hover:bg-surface/80"
          >
            Necessary Only
          </button>
        </div>
      </div>
    </div>
  );
}
