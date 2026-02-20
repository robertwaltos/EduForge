"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import LanguageSwitcher from "./language-switcher";
import ThemeControls from "./theme-controls";

const publicNavItems = [
  { href: "/", labelKey: "nav_home" },
  { href: "/modules", labelKey: "nav_modules" },
  { href: "/exam-prep", labelKey: "nav_exam_prep" },
  { href: "/science-lab", labelKey: "nav_science_lab" },
] as const;

const authenticatedNavItems = [
  { href: "/dashboard", labelKey: "nav_dashboard" },
  { href: "/support", labelKey: "nav_support" },
  { href: "/account/privacy", labelKey: "nav_privacy_center" },
  { href: "/account/settings", labelKey: "nav_account" },
] as const;

const parentNavItems = [
  { href: "/parent/dashboard", labelKey: "nav_parent_dashboard" },
  { href: "/parent/reports", labelKey: "nav_parent_reports" },
  { href: "/parent/compliance", labelKey: "nav_parent_compliance" },
] as const;

const adminNavItems = [
  { href: "/admin/overview", labelKey: "nav_admin_overview" },
  { href: "/admin/operations", labelKey: "nav_owner_ops" },
  { href: "/admin/curriculum", labelKey: "nav_curriculum" },
  { href: "/admin/media", labelKey: "nav_media_ops" },
  { href: "/admin/reports", labelKey: "nav_reports" },
  { href: "/admin/alerts", labelKey: "nav_alerts" },
  { href: "/admin/audit", labelKey: "nav_audit" },
  { href: "/admin/compliance", labelKey: "nav_compliance" },
] as const;

const unauthenticatedNavItems = [
  { href: "/auth/sign-in", labelKey: "nav_sign_in" },
  { href: "/auth/sign-up", labelKey: "nav_sign_up" },
] as const;

type AuthContext = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isParent: boolean;
};

export default function TopNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [authContext, setAuthContext] = useState<AuthContext>({
    isAuthenticated: false,
    isAdmin: false,
    isParent: false,
  });

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const response = await fetch("/api/auth/context");
        const data = (await response.json()) as {
          isAuthenticated?: boolean;
          isAdmin?: boolean;
          isParent?: boolean;
        };
        if (!response.ok) {
          return;
        }
        setAuthContext({
          isAuthenticated: Boolean(data.isAuthenticated),
          isAdmin: Boolean(data.isAdmin),
          isParent: Boolean(data.isParent),
        });
      } catch {
        // Keep conservative defaults (public-only nav) on error.
      }
    };

    void fetchContext();
  }, []);

  const navItems = [
    ...publicNavItems,
    ...(authContext.isAuthenticated ? authenticatedNavItems : []),
    ...(authContext.isParent ? parentNavItems : []),
    ...(authContext.isAdmin ? adminNavItems : []),
    ...(!authContext.isAuthenticated ? unauthenticatedNavItems : []),
  ];
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  return (
    <header
      className={`w-full border-b px-4 py-3 backdrop-blur ${isAdminRoute
        ? "border-violet-200 bg-white/95"
        : "border-violet-200 bg-gradient-to-r from-rose-50 via-amber-50 to-sky-50"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3">
        <p className="mr-2 text-sm font-semibold tracking-wide">EduForge</p>
        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-sm text-zinc-700 hover:bg-white/80 hover:text-zinc-900"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <ThemeControls compact={isAdminRoute} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
