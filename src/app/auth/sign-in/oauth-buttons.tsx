"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { publicEnv } from "@/lib/config/env";
import { Provider } from "@supabase/supabase-js";

export default function OAuthButtons({ intent = "in" }: { intent?: "in" | "up" }) {
  const actionText = intent === "up" ? "Sign Up" : "Sign In";
  const hasSupabaseConfig =
    Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_URL) && Boolean(publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const handleOAuthSignIn = async (provider: Provider) => {
    if (!hasSupabaseConfig) {
      return;
    }

    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="mt-6 space-y-3">
      <button
        onClick={() => handleOAuthSignIn("google")}
        disabled={!hasSupabaseConfig}
        title={!hasSupabaseConfig ? "OAuth unavailable until Supabase is configured." : undefined}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-black/15 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        {/* In a real app, you'd use an SVG icon */}
        <span className="h-5 w-5">[G]</span>
        {actionText} with Google
      </button>
      <button
        onClick={() => handleOAuthSignIn("facebook")}
        disabled={!hasSupabaseConfig}
        title={!hasSupabaseConfig ? "OAuth unavailable until Supabase is configured." : undefined}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-black/15 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        {/* In a real app, you'd use an SVG icon */}
        <span className="h-5 w-5">[F]</span>
        {actionText} with Facebook
      </button>
      <button
        onClick={() => handleOAuthSignIn("apple")}
        disabled={!hasSupabaseConfig}
        title={!hasSupabaseConfig ? "OAuth unavailable until Supabase is configured." : undefined}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-black/15 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        <span className="h-5 w-5">[A]</span>
        {actionText} with Apple
      </button>
      <button
        onClick={() => handleOAuthSignIn("twitter")}
        disabled={!hasSupabaseConfig}
        title={!hasSupabaseConfig ? "OAuth unavailable until Supabase is configured." : undefined}
        className="flex w-full items-center justify-center gap-3 rounded-md border border-black/15 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        {/* Supabase uses the "twitter" provider ID for X */}
        <span className="h-5 w-5">[X]</span>
        {actionText} with X
      </button>
      {!hasSupabaseConfig ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          OAuth providers are unavailable until Supabase public keys are configured.
        </p>
      ) : null}
    </div>
  );
}
