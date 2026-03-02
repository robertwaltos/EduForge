"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { publicEnv } from "@/lib/config/env";
import { sanitizeNextPath } from "@/lib/routing/next-path";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ASSETS } from "@/lib/config/assets";
import OAuthButtons from "@/app/auth/sign-in/oauth-buttons";
import SoftCard from "@/app/components/ui/soft-card";
import { useI18n } from "@/lib/i18n/provider";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" /></div>}>
      <SignUpPageInner />
    </Suspense>
  );
}

function SignUpPageInner() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = sanitizeNextPath(searchParams.get("next"));
  const hasSupabaseConfig =
    Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL) && Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    if (!hasSupabaseConfig) {
      setStatus(t("auth_sign_up_status_unavailable"));
      return;
    }
    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setStatus(error.message);
        return;
      }

      setStatus(t("auth_sign_up_status_created"));
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (!signInError) {
        const postAgeGateNextPath =
          nextPath && (nextPath.startsWith("/billing") || nextPath.startsWith("/account"))
            ? nextPath
            : "/student/onboarding";
        router.push(`/auth/age-gate?next=${encodeURIComponent(postAgeGateNextPath)}`);
      } else {
        const signInPath = nextPath
          ? `/auth/sign-in?next=${encodeURIComponent(nextPath)}`
          : "/auth/sign-in";
        router.push(signInPath);
      }
    } catch {
      setStatus(t("auth_sign_up_status_unable"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-14">
      {/* Page background — same as sign-in */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src={ASSETS.bgAuth}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-white/55 dark:bg-background/72" />
      </div>

      <section className="relative isolate overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="relative mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1.35fr_0.9fr] lg:gap-10">

          {/* Left column: hero image */}
          <div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={ASSETS.heroSignUp}
                alt="Learners of all ages walking a bridge of books toward knowledge"
                width={800}
                height={533}
                className="w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-14">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                  {t("auth_sign_up_hero_eyebrow")}
                </p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {t("auth_sign_up_hero_title")}
                </h1>
              </div>
            </div>
          </div>

          {/* Right column: sign-up form */}
          <SoftCard
            as="section"
            organicCorners
            className="self-start border-white/75 bg-white/80 p-6 backdrop-blur-sm dark:border-border dark:bg-surface/80"
          >
            <h2 className="ui-type-heading-xl text-zinc-900 dark:text-foreground">
              {t("auth_sign_up_title")}
            </h2>
            <p className="mt-2 ui-type-body-sm text-zinc-600 dark:text-foreground/70">
              {t("auth_sign_up_subtitle")}
            </p>

            <OAuthButtons intent="up" nextPath={nextPath} className="mt-5" />

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 px-2 text-zinc-500 dark:bg-surface/80 dark:text-foreground/60">
                  {t("auth_sign_up_divider_or")}
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  {t("auth_sign_up_label_email")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="ui-focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                  {t("auth_sign_up_label_password")}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="ui-focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm"
                  minLength={8}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !hasSupabaseConfig}
                className="ui-soft-button ui-focus-ring min-h-11 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
              >
                {isSubmitting ? t("auth_sign_up_button_creating") : t("auth_sign_up_button_create")}
              </button>

              {status ? (
                <p role="status" className="text-sm text-zinc-600 dark:text-foreground/70">{status}</p>
              ) : null}
              {!hasSupabaseConfig ? (
                <p role="status" className="text-xs text-amber-700">
                  {t("auth_sign_up_missing_supabase")}
                </p>
              ) : null}
            </form>

            <p className="mt-5 text-sm text-zinc-600 dark:text-foreground/70">
              {t("auth_sign_up_footer_have_account")}{" "}
              <Link
                href={nextPath ? `/auth/sign-in?next=${encodeURIComponent(nextPath)}` : "/auth/sign-in"}
                className="font-semibold underline decoration-2 underline-offset-2"
              >
                {t("auth_sign_up_footer_sign_in")}
              </Link>
            </p>
          </SoftCard>

        </div>
      </section>
    </main>
  );
}
