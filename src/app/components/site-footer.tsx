"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ASSETS } from "@/lib/config/assets";

const PRODUCT_LINKS = [
  { href: "/explore",                label: "Explore Learning" },
  { href: "/modules",                label: "All Modules" },
  { href: "/language/speaking-lab",  label: "Speaking Lab" },
  { href: "/exam-prep",              label: "Exam Prep" },
  { href: "/science-lab",            label: "Science Lab" },
  { href: "/games",                  label: "Learning Games" },
];

const LEARN_FOR_LINKS = [
  { href: "/explore?stage=pre-k",      label: "Ages 3–5 (Pre-K)" },
  { href: "/explore?stage=elementary", label: "Ages 6–11 (Elementary)" },
  { href: "/explore?stage=middle",     label: "Ages 12–14 (Middle School)" },
  { href: "/explore?stage=high",       label: "Ages 15–18 (High School)" },
  { href: "/explore?stage=college",    label: "College & SAT/ACT" },
  { href: "/explore?stage=adult",      label: "Adults & Career Skills" },
];

const COMPANY_LINKS = [
  { href: "/support",                label: "Help & Support" },
  { href: "/legal/privacy",          label: "Privacy Policy" },
  { href: "/legal/terms",            label: "Terms of Use" },
  { href: "/legal/refunds",          label: "Refund Policy" },
  { href: "/legal/accessibility",    label: "Accessibility" },
  { href: "/legal/dsa",              label: "DSA Transparency" },
  { href: "/auth/sign-up",           label: "Create Free Account" },
];

const SOCIAL_LINKS = [
  {
    label: "X / Twitter",
    href: "https://twitter.com/koydolearn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/koydolearn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@koydolearn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/parent")) return null;

  const isHomePage = pathname === "/";

  return (
    <footer
      className={`safe-area-bottom border-t text-sm ${
        isHomePage
          ? "border-white/10 bg-slate-950 text-slate-400"
          : "border-border bg-surface-muted text-zinc-600 dark:bg-surface/60 dark:text-foreground/70"
      }`}
    >
      {/* ── Main grid ── */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:grid-cols-2 md:grid-cols-4">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="size-9 overflow-hidden rounded-full">
              <Image
                src={ASSETS.logo}
                alt="Koydo"
                width={36}
                height={36}
                className="size-full object-cover"
              />
            </div>
            <span className={`text-base font-extrabold tracking-tight ${isHomePage ? "text-white" : "text-zinc-900 dark:text-foreground"}`}>
              Koydo
            </span>
          </Link>
          <p className="mt-3 max-w-[22ch] leading-relaxed">
            Free interactive learning for every age, every language, every dream.
          </p>
          {/* Social icons */}
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors ${
                  isHomePage
                    ? "border-white/15 text-slate-400 hover:border-white/30 hover:text-white"
                    : "border-border text-zinc-500 hover:border-zinc-400 hover:text-zinc-800 dark:hover:text-foreground"
                }`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Product links */}
        <div>
          <p className={`mb-4 text-[11px] font-bold uppercase tracking-widest ${isHomePage ? "text-slate-400" : "text-zinc-600 dark:text-foreground/60"}`}>
            Platform
          </p>
          <ul className="space-y-0.5">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`inline-flex min-h-11 items-center transition-colors hover:underline ${isHomePage ? "hover:text-white" : "hover:text-zinc-900 dark:hover:text-foreground"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Learn for every age */}
        <div>
          <p className={`mb-4 text-[11px] font-bold uppercase tracking-widest ${isHomePage ? "text-slate-400" : "text-zinc-600 dark:text-foreground/60"}`}>
            Learn For
          </p>
          <ul className="space-y-0.5">
            {LEARN_FOR_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`inline-flex min-h-11 items-center transition-colors hover:underline ${isHomePage ? "hover:text-white" : "hover:text-zinc-900 dark:hover:text-foreground"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className={`mb-4 text-[11px] font-bold uppercase tracking-widest ${isHomePage ? "text-slate-400" : "text-zinc-600 dark:text-foreground/60"}`}>
            Company
          </p>
          <ul className="space-y-0.5">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`inline-flex min-h-11 items-center transition-colors hover:underline ${isHomePage ? "hover:text-white" : "hover:text-zinc-900 dark:hover:text-foreground"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={`border-t px-4 py-5 ${isHomePage ? "border-white/8" : "border-border"}`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <p className="text-xs">
            © {new Date().getFullYear()} Koydo. Free education for every mind.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
            <Link href="/legal/privacy" className="inline-flex min-h-11 items-center hover:underline">Privacy</Link>
            <Link href="/legal/terms"   className="inline-flex min-h-11 items-center hover:underline">Terms</Link>
            <Link href="/legal/refunds" className="inline-flex min-h-11 items-center hover:underline">Refunds</Link>
            <Link href="/support"       className="inline-flex min-h-11 items-center hover:underline">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
