"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { publicEnv } from "@/lib/config/env";
import { useI18n } from "@/lib/i18n/provider";
import { normalizeNextPath } from "@/lib/routing/next-path";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ASSETS } from "@/lib/config/assets";
import OAuthButtons from "./oauth-buttons";
import SoftCard from "@/app/components/ui/soft-card";

function getCallbackErrorMessage(
  errorCode: string | null,
  t: (key: string, vars?: Record<string, string | number>) => string,
) {
  if (!errorCode) {
    return null;
  }

  switch (errorCode) {
    case "oauth_access_denied":
      return t("auth_sign_in_error_oauth_access_denied");
    case "oauth_missing_code":
    case "oauth_callback_failed":
    case "oauth_exchange_failed":
      return t("auth_sign_in_error_oauth_failed");
    default:
      return errorCode;
  }
}

function SignInPageContent() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneToken, setPhoneToken] = useState("");
  const [status, setStatus] = useState<string>("");
  const [otpStatus, setOtpStatus] = useState<string>("");
  const [phoneStatus, setPhoneStatus] = useState<string>("");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [isSubmittingEmailOtp, setIsSubmittingEmailOtp] = useState(false);
  const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
  const [isVerifyingPhoneOtp, setIsVerifyingPhoneOtp] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackErrorMessage = getCallbackErrorMessage(searchParams.get("error"), t);
  const isSessionExpired = searchParams.get("expired") === "true" || searchParams.get("message") === "session-expired";
  const nextPath = normalizeNextPath(searchParams.get("next"));
  const hasSupabaseConfig =
    Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL) && Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const onPasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    if (!hasSupabaseConfig) {
      setStatus(t("auth_sign_in_status_unavailable"));
      return;
    }
    setIsSubmittingPassword(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setStatus(error.message);
        return;
      }

      setStatus(t("auth_sign_in_status_success"));
      router.push(nextPath);
      router.refresh();
    } catch {
      setStatus(t("auth_sign_in_status_unable"));
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const onEmailOtpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOtpStatus("");
    if (!hasSupabaseConfig) {
      setOtpStatus(t("auth_sign_in_magic_unavailable"));
      return;
    }
    setIsSubmittingEmailOtp(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const callbackUrl = new URL("/auth/callback", location.origin);
      callbackUrl.searchParams.set("next", nextPath);
      const { error } = await supabase.auth.signInWithOtp({
        email: emailOtp,
        options: {
          emailRedirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        setOtpStatus(error.message);
        return;
      }

      setOtpStatus(t("auth_sign_in_magic_sent"));
    } catch {
      setOtpStatus(t("auth_sign_in_magic_unable"));
    } finally {
      setIsSubmittingEmailOtp(false);
    }
  };

  const onSendPhoneOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPhoneStatus("");
    if (!hasSupabaseConfig) {
      setPhoneStatus(t("auth_sign_in_phone_unavailable"));
      return;
    }
    setIsSendingPhoneOtp(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({ phone });

      if (error) {
        setPhoneStatus(error.message);
        return;
      }

      setPhoneOtpSent(true);
      setPhoneStatus(t("auth_sign_in_phone_sent"));
    } catch {
      setPhoneStatus(t("auth_sign_in_phone_unable_send"));
    } finally {
      setIsSendingPhoneOtp(false);
    }
  };

  const onVerifyPhoneOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPhoneStatus("");
    if (!hasSupabaseConfig) {
      setPhoneStatus(t("auth_sign_in_phone_verify_unavailable"));
      return;
    }
    setIsVerifyingPhoneOtp(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: phoneToken,
        type: "sms",
      });

      if (error) {
        setPhoneStatus(error.message);
        return;
      }

      setPhoneStatus(t("auth_sign_in_phone_verified_redirect"));
      router.push(nextPath);
      router.refresh();
    } catch {
      setPhoneStatus(t("auth_sign_in_phone_unable_verify"));
    } finally {
      setIsVerifyingPhoneOtp(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-14">
      {/* Page background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={ASSETS.bgAuth}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-white/55" />
      </div>

      <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16">

        <div className="relative mx-auto w-full max-w-6xl">
          {/* Hero image with overlaid title */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={ASSETS.heroSignIn}
              alt="Students exploring the world of learning on Koydo"
              width={800}
              height={480}
              className="w-full object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-14">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                {t("auth_sign_in_hero_eyebrow")}
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {t("auth_sign_in_hero_title")}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-12 w-full max-w-6xl space-y-6 px-4 sm:px-6">
        <SoftCard as="section" className="border-zinc-200/60 p-6 backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.92)' }}>
          <h2 className="ui-type-heading-xl text-zinc-900">{t("auth_sign_in_title")}</h2>
          <OAuthButtons layout="grid-2" className="mt-5" nextPath={nextPath} />
          {!hasSupabaseConfig ? (
            <p role="status" className="mt-4 text-xs text-amber-700">
              {t("auth_sign_in_missing_supabase")}
            </p>
          ) : null}
        </SoftCard>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <SoftCard as="section" className="border-zinc-200/60 p-5" style={{ background: 'rgba(255,255,255,0.92)' }}>
            <h3 className="ui-type-heading-md text-zinc-900">{t("auth_sign_in_email_password_title")}</h3>
            <form onSubmit={onPasswordSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  {t("auth_sign_in_label_email")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="ui-focus-ring w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                  {t("auth_sign_in_label_password")}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="ui-focus-ring w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingPassword || !hasSupabaseConfig}
                className="ui-soft-button ui-focus-ring min-h-11 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
              >
                {isSubmittingPassword ? t("auth_sign_in_button_signing_in") : t("auth_sign_in_button_continue_email")}
              </button>

              {status ? <p role="status" className="text-sm text-red-600">{status}</p> : null}
            </form>
          </SoftCard>

          <SoftCard as="section" className="border-zinc-200/60 p-5" style={{ background: 'rgba(255,255,255,0.92)' }}>
            <h3 className="ui-type-heading-md text-zinc-900">{t("auth_sign_in_magic_link_title")}</h3>
            <form onSubmit={onEmailOtpSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="email-otp" className="mb-1 block text-sm font-medium">
                  {t("auth_sign_in_label_email")}
                </label>
                <input
                  id="email-otp"
                  type="email"
                  value={emailOtp}
                  onChange={(event) => setEmailOtp(event.target.value)}
                  className="ui-focus-ring w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingEmailOtp || !hasSupabaseConfig}
                className="ui-soft-button ui-focus-ring min-h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold disabled:opacity-70"
              >
                {isSubmittingEmailOtp ? t("auth_sign_in_magic_link_sending") : t("auth_sign_in_magic_link_send")}
              </button>
              {otpStatus ? <p role="status" className="text-sm text-zinc-700">{otpStatus}</p> : null}
            </form>
          </SoftCard>

          <SoftCard as="section" className="border-zinc-200/60 p-5" style={{ background: 'rgba(255,255,255,0.92)' }}>
            <h3 className="ui-type-heading-md text-zinc-900">{t("auth_sign_in_phone_title")}</h3>
            <form onSubmit={onSendPhoneOtp} className="mt-4 space-y-4">
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  {t("auth_sign_in_label_phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                className="ui-focus-ring w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                  placeholder="+15551234567"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSendingPhoneOtp || !hasSupabaseConfig}
                className="ui-soft-button ui-focus-ring min-h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-semibold disabled:opacity-70"
              >
                {isSendingPhoneOtp ? t("auth_sign_in_phone_sending_code") : t("auth_sign_in_phone_send_code")}
              </button>
            </form>

            {phoneOtpSent ? (
              <form onSubmit={onVerifyPhoneOtp} className="mt-4 space-y-4 border-t border-zinc-200 pt-4">
                <div>
                  <label htmlFor="phone-token" className="mb-1 block text-sm font-medium">
                    {t("auth_sign_in_label_verification_code")}
                  </label>
                  <input
                    id="phone-token"
                    type="text"
                    value={phoneToken}
                    onChange={(event) => setPhoneToken(event.target.value)}
                    className="ui-focus-ring w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isVerifyingPhoneOtp || !hasSupabaseConfig}
                  className="ui-soft-button ui-focus-ring min-h-11 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
                >
                  {isVerifyingPhoneOtp ? t("auth_sign_in_phone_verifying") : t("auth_sign_in_phone_verify")}
                </button>
              </form>
            ) : null}

            {phoneStatus ? <p role="status" className="mt-4 text-sm text-zinc-700">{phoneStatus}</p> : null}
          </SoftCard>
        </div>

        {callbackErrorMessage ? (
          <SoftCard as="section" className="border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {callbackErrorMessage}
          </SoftCard>
        ) : null}
        {isSessionExpired ? (
          <SoftCard as="section" className="border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {t("auth_sign_in_session_expired")}
          </SoftCard>
        ) : null}

        <p className="pb-2 text-center text-sm text-zinc-600">
          {t("auth_sign_in_footer_no_account")}{" "}
          <Link
            href={`/auth/sign-up?next=${encodeURIComponent(nextPath)}`}
            className="font-semibold underline decoration-2 underline-offset-2"
          >
            {t("auth_sign_in_footer_create_one")}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function SignInPage() {
  const { t } = useI18n();
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-md px-6 py-12">
          <h1 className="text-2xl font-semibold">{t("auth_sign_in_title")}</h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-foreground/70">{t("auth_sign_in_loading_subtitle")}</p>
        </main>
      }
    >
      <SignInPageContent />
    </Suspense>
  );
}

