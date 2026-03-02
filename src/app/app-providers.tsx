"use client";

import { ReactNode } from "react";
import MixpanelProvider from "./mixpanel-provider";
import { I18nProvider } from "@/lib/i18n/provider";
import { ThemeProvider } from "@/lib/theme/provider";
import { PreReaderModeProvider } from "./explore/_components/pre-reader-mode";
import { VoicePreferenceProvider } from "./explore/_components/voice-preference";
import { ActiveProfileProvider } from "@/lib/profiles/active-profile-context";
import SessionExpiryFetchGuard from "./components/session-expiry-fetch-guard";
import PlatformLifecycleProvider from "./platform-lifecycle-provider";
import PlatformClassProvider from "./components/platform-class-provider";
import { ExperienceProvider } from "@/lib/gamification/experience-context";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PlatformLifecycleProvider>
      <PlatformClassProvider>
        <ActiveProfileProvider>
          <PreReaderModeProvider>
          <VoicePreferenceProvider>
          <ThemeProvider>
            <I18nProvider>
              <SessionExpiryFetchGuard />
              {/* ExperienceProvider renders global celebration overlays
                  (JuicyConfetti, AchievementToast) and exposes useExperience()
                  to the entire tree. Owns: src/lib/gamification/ */}
              <ExperienceProvider>
                <MixpanelProvider>{children}</MixpanelProvider>
              </ExperienceProvider>
            </I18nProvider>
          </ThemeProvider>
          </VoicePreferenceProvider>
          </PreReaderModeProvider>
        </ActiveProfileProvider>
      </PlatformClassProvider>
    </PlatformLifecycleProvider>
  );
}
