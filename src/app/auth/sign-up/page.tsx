"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { publicEnv } from "@/lib/config/env";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import OAuthButtons from "@/app/auth/sign-in/oauth-buttons";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const hasSupabaseConfig =
    Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL) && Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");
    if (!hasSupabaseConfig) {
      setStatus("Sign-up is unavailable until Supabase public environment variables are configured.");
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

      setStatus("Account created. If email confirmation is enabled, verify your inbox.");
      router.push("/auth/sign-in");
    } catch {
      setStatus("Unable to sign up. Check environment configuration and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="text-2xl font-semibold">Create Account</h1>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">Register a learner account for EduForge.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-black/15 px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-black/15 px-3 py-2 text-sm"
            minLength={8}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !hasSupabaseConfig}
          className="rounded-md bg-foreground px-4 py-2 text-sm text-background disabled:opacity-70"
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>

        {status ? <p className="text-sm text-zinc-600 dark:text-zinc-300">{status}</p> : null}
        {!hasSupabaseConfig ? (
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Missing `NEXT_PUBLIC_SUPABASE_URL` and/or `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
          </p>
        ) : null}
      </form>

      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-300 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-950">OR</span>
        </div>
      </div>

      <OAuthButtons intent="up" />

      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-300">
        Already have an account? <Link href="/auth/sign-in" className="underline">Sign in</Link>
      </p>
    </main>
  );
}
