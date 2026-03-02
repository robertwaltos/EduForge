"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type MutableRefObject, type RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getActiveProfileIdFromBrowser } from "@/lib/profiles/active-profile";
import { useTheme } from "@/lib/theme/provider";
import { usePreReaderMode } from "@/app/explore/_components/pre-reader-mode";
import { VOICES, useVoicePreference } from "@/app/explore/_components/voice-preference";
import LanguageSwitcher from "./language-switcher";
import ThemeControls from "./theme-controls";
import { ASSETS } from "@/lib/config/assets";

type NavItem = {
  href: string;
  labelKey?: string;
  label?: string;
  icon: string;
};

const authenticatedNavItems = [
  { href: "/dashboard", labelKey: "nav_dashboard", icon: "📈" },
  { href: "/experience-hub", label: "Experience", icon: "🏆" },
  { href: "/support", labelKey: "nav_support", icon: "🛟" },
  { href: "/account/privacy", labelKey: "nav_privacy_center", icon: "🛡️" },
  { href: "/account/settings", labelKey: "nav_account", icon: "👤" },
] as const satisfies readonly NavItem[];

const parentNavItems = [
  { href: "/parent/dashboard", labelKey: "nav_parent_dashboard", icon: "👨‍👩‍👧" },
  { href: "/parent/reports", labelKey: "nav_parent_reports", icon: "📝" },
  { href: "/parent/compliance", labelKey: "nav_parent_compliance", icon: "✅" },
] as const satisfies readonly NavItem[];

const adminNavItems = [
  { href: "/admin/overview", labelKey: "nav_admin_overview", icon: "🧭" },
  { href: "/admin/operations", labelKey: "nav_owner_ops", icon: "⚙️" },
  { href: "/admin/curriculum", labelKey: "nav_curriculum", icon: "🗂️" },
  { href: "/admin/media", labelKey: "nav_media_ops", icon: "🎬" },
  { href: "/admin/reports", labelKey: "nav_reports", icon: "📊" },
  { href: "/admin/alerts", labelKey: "nav_alerts", icon: "🚨" },
  { href: "/admin/audit", labelKey: "nav_audit", icon: "🧾" },
  { href: "/admin/compliance", labelKey: "nav_compliance", icon: "🔐" },
] as const satisfies readonly NavItem[];

const DROPDOWN_POINTER_TOLERANCE_PX = 50;
const DROPDOWN_CLOSE_DELAY_MS = 120;
type DropdownCloseTimerRef = MutableRefObject<ReturnType<typeof setTimeout> | null>;

type AuthContext = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isParent: boolean;
};

type ActiveLearner = {
  display_name: string;
  grade_level: string | null;
};

function uniqueByHref(items: readonly NavItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}

function isPointerWithinTolerance(
  ref: RefObject<HTMLElement | null>,
  x: number,
  y: number,
  tolerance = DROPDOWN_POINTER_TOLERANCE_PX,
) {
  const element = ref.current;
  if (!element) return false;

  const bounds = element.getBoundingClientRect();
  return (
    x >= bounds.left - tolerance &&
    x <= bounds.right + tolerance &&
    y >= bounds.top - tolerance &&
    y <= bounds.bottom + tolerance
  );
}

function clearCloseTimer(timerRef: DropdownCloseTimerRef) {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
}

function scheduleClose(timerRef: DropdownCloseTimerRef, closeFn: () => void) {
  if (timerRef.current) return;
  timerRef.current = setTimeout(() => {
    timerRef.current = null;
    closeFn();
  }, DROPDOWN_CLOSE_DELAY_MS);
}

function openCommandPalette() {
  window.dispatchEvent(new Event("koydo:command-palette-open"));
}

export default function TopNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const { typographyDensity, setTypographyDensity } = useTheme();
  const { isPreReaderMode, togglePreReaderMode } = usePreReaderMode();
  const { voice, setVoice } = useVoicePreference();
  const [authContext, setAuthContext] = useState<AuthContext>({
    isAuthenticated: false,
    isAdmin: false,
    isParent: false,
  });
  const [activeLearner, setActiveLearner] = useState<ActiveLearner | null>(null);
  const [isMainMenuOpen, setMainMenuOpen] = useState(false);
  const [isExploreToolsOpen, setExploreToolsOpen] = useState(false);
  const mainMenuRef = useRef<HTMLDivElement | null>(null);
  const exploreToolsRef = useRef<HTMLDivElement | null>(null);
  const mainMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const exploreToolsPanelRef = useRef<HTMLDivElement | null>(null);
  const mainMenuCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exploreToolsCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextTypographyDensity =
    typographyDensity === "comfortable"
      ? "compact"
      : typographyDensity === "compact"
        ? "spacious"
        : "comfortable";
  const typographyLabel =
    typographyDensity === "comfortable"
      ? t("top_nav_type_comfortable")
      : typographyDensity === "compact"
        ? t("top_nav_type_compact")
        : t("top_nav_type_spacious");
  const typographyIcon =
    typographyDensity === "comfortable"
      ? "🔤"
      : typographyDensity === "compact"
        ? "📏"
        : "🪶";

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const response = await fetch("/api/auth/context");
        const data = (await response.json()) as {
          isAuthenticated?: boolean;
          isAdmin?: boolean;
          isParent?: boolean;
        };
        if (!response.ok) return;

        setAuthContext({
          isAuthenticated: Boolean(data.isAuthenticated),
          isAdmin: Boolean(data.isAdmin),
          isParent: Boolean(data.isParent),
        });
      } catch {
        // Keep public-safe defaults on request failure.
      }
    };

    void fetchContext();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadActiveLearner = async () => {
      if (!authContext.isAuthenticated) {
        setActiveLearner(null);
        return;
      }

      const activeProfileId = getActiveProfileIdFromBrowser();
      if (!activeProfileId) {
        setActiveLearner(null);
        return;
      }

      try {
        const supabase = createSupabaseBrowserClient();
        const { data, error } = await supabase
          .from("student_profiles")
          .select("display_name, grade_level")
          .eq("id", activeProfileId)
          .maybeSingle();

        if (cancelled) return;
        if (error || !data) {
          setActiveLearner(null);
          return;
        }

        setActiveLearner({
          display_name: data.display_name,
          grade_level: data.grade_level,
        });
      } catch {
        if (!cancelled) {
          setActiveLearner(null);
        }
      }
    };

    void loadActiveLearner();
    return () => {
      cancelled = true;
    };
  }, [authContext.isAuthenticated, pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (mainMenuRef.current && !mainMenuRef.current.contains(target)) {
        clearCloseTimer(mainMenuCloseTimerRef);
        setMainMenuOpen(false);
      }
      if (exploreToolsRef.current && !exploreToolsRef.current.contains(target)) {
        clearCloseTimer(exploreToolsCloseTimerRef);
        setExploreToolsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearCloseTimer(mainMenuCloseTimerRef);
        clearCloseTimer(exploreToolsCloseTimerRef);
        setMainMenuOpen(false);
        setExploreToolsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    if (!isMainMenuOpen && !isExploreToolsOpen) return;

    const onPointerMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      if (isMainMenuOpen) {
        const pointerNearMainMenu =
          isPointerWithinTolerance(mainMenuRef, x, y) ||
          isPointerWithinTolerance(mainMenuPanelRef, x, y);
        if (pointerNearMainMenu) {
          clearCloseTimer(mainMenuCloseTimerRef);
        } else {
          scheduleClose(mainMenuCloseTimerRef, () => setMainMenuOpen(false));
        }
      }

      if (isExploreToolsOpen) {
        const pointerNearExploreTools =
          isPointerWithinTolerance(exploreToolsRef, x, y) ||
          isPointerWithinTolerance(exploreToolsPanelRef, x, y);
        if (pointerNearExploreTools) {
          clearCloseTimer(exploreToolsCloseTimerRef);
        } else {
          scheduleClose(exploreToolsCloseTimerRef, () => setExploreToolsOpen(false));
        }
      }
    };

    document.addEventListener("mousemove", onPointerMove);
    return () => {
      clearCloseTimer(mainMenuCloseTimerRef);
      clearCloseTimer(exploreToolsCloseTimerRef);
      document.removeEventListener("mousemove", onPointerMove);
    };
  }, [isMainMenuOpen, isExploreToolsOpen]);

  const closeMenus = () => {
    if (mainMenuCloseTimerRef.current) {
      clearTimeout(mainMenuCloseTimerRef.current);
      mainMenuCloseTimerRef.current = null;
    }
    if (exploreToolsCloseTimerRef.current) {
      clearTimeout(exploreToolsCloseTimerRef.current);
      exploreToolsCloseTimerRef.current = null;
    }
    setMainMenuOpen(false);
    setExploreToolsOpen(false);
  };

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setAuthContext({ isAuthenticated: false, isAdmin: false, isParent: false });
    setActiveLearner(null);
    closeMenus();
    router.push("/");
    router.refresh();
  };

  const primaryNavItems = useMemo(() => {
    const learnerLabel = activeLearner
      ? activeLearner.grade_level
        ? t("top_nav_active_learner_grade", {
          name: activeLearner.display_name,
          grade: activeLearner.grade_level,
        })
        : activeLearner.display_name
      : t("top_nav_switch_learner");

    const items: NavItem[] = authContext.isAuthenticated
      ? [
        { href: "/explore", labelKey: "nav_explore", icon: "🌍" },
        { href: "/who-is-learning", label: learnerLabel, icon: activeLearner ? "👤" : "🧠" },
      ]
      : [
        { href: "/explore", labelKey: "nav_explore", icon: "🌍" },
        { href: "/auth/sign-in", labelKey: "nav_sign_in", icon: "🔐" },
      ];

    return uniqueByHref(items);
  }, [activeLearner, authContext.isAuthenticated, t]);

  const secondaryNavItems = useMemo(() => {
    const secondary: NavItem[] = [
      { href: "/modules", labelKey: "nav_modules", icon: "📚" },
      { href: "/language/speaking-lab", labelKey: "top_nav_speaking_lab", icon: "🎙️" },
      { href: "/testing", labelKey: "top_nav_testing", icon: "🧪" },
      { href: "/exam-prep", labelKey: "nav_exam_prep", icon: "🎯" },
      { href: "/science-lab", labelKey: "nav_science_lab", icon: "🧪" },
      ...(authContext.isAuthenticated ? authenticatedNavItems : []),
      ...(authContext.isParent ? parentNavItems : []),
      ...(authContext.isAdmin ? adminNavItems : []),
      ...(!authContext.isAuthenticated
        ? [{ href: "/auth/sign-up", labelKey: "nav_sign_up", icon: "✨" } satisfies NavItem]
        : []),
    ];

    const primaryHrefs = new Set(primaryNavItems.map((item) => item.href));
    return uniqueByHref(secondary.filter((item) => !primaryHrefs.has(item.href)));
  }, [authContext.isAdmin, authContext.isAuthenticated, authContext.isParent, primaryNavItems]);

  const mobileQuickNavItems = useMemo(() => {
    if (!authContext.isAuthenticated) {
      return [] as NavItem[];
    }

    return uniqueByHref([
      { href: "/explore", labelKey: "nav_explore", icon: "🌍" },
      { href: "/modules", labelKey: "nav_modules", icon: "📚" },
      { href: "/dashboard", labelKey: "nav_dashboard", icon: "📈" },
      { href: "/language/speaking-lab", labelKey: "top_nav_speaking_lab", icon: "🎙️" },
      { href: "/testing", labelKey: "top_nav_testing", icon: "🧪" },
      { href: "/account/settings", labelKey: "nav_account", icon: "👤" },
    ]);
  }, [authContext.isAuthenticated]);

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const isHomePage = pathname === "/";
  const brandHref = authContext.isAuthenticated ? "/dashboard" : "/";
  const parentPortalHref = authContext.isAuthenticated
    ? "/parent/dashboard"
    : "/auth/sign-in?next=%2Fparent%2Fdashboard";
  const parentPortalLabel = authContext.isAuthenticated
    ? t("top_nav_parent_portal")
    : t("top_nav_parent_sign_in");
  const isItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const resolveLabel = (item: NavItem) => (item.label ? item.label : item.labelKey ? t(item.labelKey) : item.href);

  // Admin and parent routes use DashShell for navigation — hide the student TopNav.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/parent")) {
    return null;
  }

  return (
    <header
      className={`safe-area-top sticky top-0 z-50 w-full border-b backdrop-blur-xl ${isHomePage
          ? "border-white/8 bg-slate-950/50"
          : isAdminRoute
            ? "border-zinc-200/80 bg-white/90 border-border/40 dark:bg-slate-950/85"
            : "border-zinc-200/70 bg-[linear-gradient(92deg,rgba(255,251,242,0.93),rgba(236,253,245,0.9),rgba(239,246,255,0.92))] border-border/40 dark:bg-[linear-gradient(92deg,rgba(15,23,38,0.92),rgba(21,35,54,0.9),rgba(22,30,47,0.9))]"
        }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={brandHref}
            title={authContext.isAuthenticated ? t("top_nav_go_to_dashboard") : t("top_nav_go_to_home")}
            className={`ui-focus-ring inline-flex min-h-12 items-center gap-2.5 rounded-2xl border px-3.5 py-2 shadow-sm backdrop-blur-sm transition-colors ${isHomePage
                ? "border-white/12 bg-white/8 hover:bg-white/15"
                : "border-white/80 bg-white/80 hover:bg-white border-border/55 dark:bg-slate-900/70 dark:hover:bg-slate-900/90"
              }`}
            onClick={closeMenus}
          >
            <div
              aria-hidden="true"
              className="inline-flex size-10 flex-shrink-0 overflow-hidden rounded-full"
            >
              <Image
                src={ASSETS.logo}
                alt="Koydo logo"
                width={40}
                height={40}
                className="size-full object-cover"
              />
            </div>
            <span className={`ui-type-display text-lg font-extrabold tracking-tight ${isHomePage ? "text-white" : "text-zinc-900 dark:text-foreground"}`}>
              Koydo
            </span>
          </Link>

          {/* Authenticated: show primary nav inline on md+ */}
          {authContext.isAuthenticated ? (
            <nav className="ml-1 hidden flex-1 items-center gap-2 md:flex">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={
                    item.href === "/explore"
                      ? t("top_nav_explore_tooltip")
                      : undefined
                  }
                  className={`ui-soft-button ui-focus-ring ui-type-body-sm inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-semibold tracking-[0.01em] transition-all ${isItemActive(item.href)
                      ? isHomePage
                        ? "border-amber-200 bg-amber-300 text-amber-950 shadow-sm"
                        : "border-zinc-900 bg-zinc-900 text-white shadow-sm border-border/60 dark:bg-white/14 dark:text-foreground"
                      : isHomePage
                        ? "border-white/12 bg-white/8 text-slate-200 hover:border-white/22 hover:bg-white/15"
                        : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:border-zinc-300 hover:bg-white border-border/50 dark:bg-slate-900/58 dark:text-foreground/90 dark:hover:border-white/22 dark:hover:bg-slate-900/82"
                    }`}
                  aria-current={isItemActive(item.href) ? "page" : undefined}
                  onClick={closeMenus}
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {item.icon}
                  </span>
                  {resolveLabel(item)}
                </Link>
              ))}
            </nav>
          ) : (
            <div className="flex-1" />
          )}

          {/* Unauthenticated: Sign In + Sign Up on the right */}
          {!authContext.isAuthenticated ? (
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={openCommandPalette}
                className={`ui-soft-button ui-focus-ring hidden min-h-10 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm transition hover:brightness-110 sm:inline-flex ${isHomePage
                    ? "border-white/14 bg-white/10 text-slate-200 hover:bg-white/16"
                    : "border-zinc-300 bg-white text-zinc-700 hover:bg-surface-muted border-border/65 dark:bg-slate-900/60 dark:text-foreground dark:hover:bg-slate-900/80"
                  }`}
                title="Search navigation (Ctrl/Cmd+K)"
              >
                <span aria-hidden="true">🔎</span>
                <span>{t("top_nav_search")}</span>
                <kbd className="rounded border border-zinc-300 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-600 dark:text-zinc-300">
                  ⌘K
                </kbd>
              </button>
              <Link
                href="/auth/sign-in"
                className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm transition hover:brightness-110 sm:px-4 ${isHomePage
                    ? "border-amber-200 bg-amber-300 text-amber-950 hover:bg-amber-200"
                    : "border-zinc-300 bg-white text-zinc-800 hover:bg-surface-muted border-border/65 dark:bg-slate-900/60 dark:text-foreground dark:hover:bg-slate-900/80"
                  }`}
              >
                {t("nav_sign_in")}
              </Link>
              <Link
                href="/auth/sign-up"
                className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm transition hover:brightness-110 max-[360px]:hidden sm:px-4 ${isHomePage
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-stone-950"
                    : "bg-zinc-900 text-white dark:bg-white dark:text-slate-900"
                  }`}
              >
                {t("nav_sign_up")}
              </Link>
            </div>
          ) : null}

          {/* Authenticated: Menu + Explore Tools */}
          {authContext.isAuthenticated && (
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-sm transition ${isHomePage
                    ? "border-white/12 bg-white/8 text-slate-200 hover:bg-white/15"
                    : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-white border-border/50 dark:bg-slate-900/68 dark:text-foreground dark:hover:bg-slate-900/88"
                  }`}
                title="Search navigation (Ctrl/Cmd+K)"
                onClick={openCommandPalette}
              >
                <span aria-hidden="true">🔎</span>
                <span className="hidden sm:inline">{t("top_nav_search")}</span>
                <kbd className="hidden rounded border border-zinc-300 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:border-zinc-600 dark:text-zinc-300 md:inline-block">
                  ⌘K
                </kbd>
              </button>
              <div
                ref={mainMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-sm transition ${isHomePage
                      ? "border-white/12 bg-white/8 text-slate-200 hover:bg-white/15"
                      : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-white border-border/50 dark:bg-slate-900/68 dark:text-foreground dark:hover:bg-slate-900/88"
                    }`}
                  aria-haspopup="true"
                  aria-expanded={isMainMenuOpen}
                  onClick={() => {
                    if (mainMenuCloseTimerRef.current) {
                      clearTimeout(mainMenuCloseTimerRef.current);
                      mainMenuCloseTimerRef.current = null;
                    }
                    if (exploreToolsCloseTimerRef.current) {
                      clearTimeout(exploreToolsCloseTimerRef.current);
                      exploreToolsCloseTimerRef.current = null;
                    }
                    setMainMenuOpen((prev) => !prev);
                    setExploreToolsOpen(false);
                  }}
                >
                  <span aria-hidden="true">☰</span>
                  {t("top_nav_menu")}
                </button>
                {isMainMenuOpen && (
                  <div
                    ref={mainMenuPanelRef}
                    className="absolute right-0 mt-2 w-[min(92vw,24rem)] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-sm border-border/50 dark:bg-slate-950/92"
                  >
                    <div className="grid gap-2">
                      {primaryNavItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-surface-muted px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-border/50 dark:bg-slate-900/72 dark:text-foreground dark:hover:bg-slate-800/72"
                          onClick={closeMenus}
                        >
                          <span aria-hidden="true">{item.icon}</span>
                          {resolveLabel(item)}
                        </Link>
                      ))}
                    </div>

                    {secondaryNavItems.length > 0 ? (
                      <>
                        <div className="my-3 border-t border-zinc-200/80 border-border/45" />
                        <div className="grid gap-2">
                          {secondaryNavItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-surface-muted border-border/45 dark:bg-slate-900/52 dark:text-foreground/90 dark:hover:bg-slate-800/68"
                              onClick={closeMenus}
                            >
                              <span aria-hidden="true">{item.icon}</span>
                              {resolveLabel(item)}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : null}

                    {authContext.isAuthenticated ? (
                      <div className="mt-3 border-t border-zinc-200/80 pt-3 border-border/45">
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="ui-focus-ring inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 border-danger/55 dark:bg-rose-900/25 dark:text-rose-200 dark:hover:bg-rose-900/35"
                        >
                          <span aria-hidden="true">↩️</span>
                          {t("top_nav_log_out")}
                        </button>
                      </div>
                    ) : null}

                    <div className="mt-3 border-t border-zinc-200/80 pt-3 border-border/45">
                      <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-surface-muted/90 p-3 border-border/45 dark:bg-slate-900/72">
                        <ThemeControls compact />
                        <LanguageSwitcher compact />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                ref={exploreToolsRef}
                className="relative"
              >
                <button
                  type="button"
                  className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-sm transition ${isHomePage
                      ? "border-white/12 bg-white/8 text-slate-200 hover:bg-white/15"
                      : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-white border-border/50 dark:bg-slate-900/68 dark:text-foreground dark:hover:bg-slate-900/88"
                    }`}
                  aria-haspopup="true"
                  aria-expanded={isExploreToolsOpen}
                  onClick={() => {
                    if (mainMenuCloseTimerRef.current) {
                      clearTimeout(mainMenuCloseTimerRef.current);
                      mainMenuCloseTimerRef.current = null;
                    }
                    if (exploreToolsCloseTimerRef.current) {
                      clearTimeout(exploreToolsCloseTimerRef.current);
                      exploreToolsCloseTimerRef.current = null;
                    }
                    setExploreToolsOpen((prev) => !prev);
                    setMainMenuOpen(false);
                  }}
                >
                  <span aria-hidden="true">🧭</span>
                  {t("top_nav_explore_tools")}
                </button>
                {isExploreToolsOpen && (
                  <div
                    ref={exploreToolsPanelRef}
                    className="absolute right-0 mt-2 w-[min(92vw,20rem)] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-sm border-border/50 dark:bg-slate-950/92"
                  >
                    <div className="grid gap-2">
                      <Link
                        href="/explore"
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-surface-muted px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-border/50 dark:bg-slate-900/72 dark:text-foreground dark:hover:bg-slate-800/72"
                        onClick={closeMenus}
                      >
                        <span aria-hidden="true">🌍</span>
                        {t("top_nav_worlds")}
                      </Link>
                      <Link
                        href="/modules"
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-surface-muted px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-border/50 dark:bg-slate-900/72 dark:text-foreground dark:hover:bg-slate-800/72"
                        onClick={closeMenus}
                      >
                        <span aria-hidden="true">📚</span>
                        {t("top_nav_all_modules")}
                      </Link>
                      <Link
                        href="/language/speaking-lab"
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-surface-muted px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-border/50 dark:bg-slate-900/72 dark:text-foreground dark:hover:bg-slate-800/72"
                        onClick={closeMenus}
                      >
                        <span aria-hidden="true">🎙️</span>
                        {t("top_nav_speaking_lab")}
                      </Link>
                      <Link
                        href={parentPortalHref}
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-surface-muted px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-border/50 dark:bg-slate-900/72 dark:text-foreground dark:hover:bg-slate-800/72"
                        onClick={closeMenus}
                      >
                        <span aria-hidden="true">👨‍👩‍👧</span>
                        {parentPortalLabel}
                      </Link>
                      <button
                        type="button"
                        onClick={togglePreReaderMode}
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-surface-muted border-border/45 dark:bg-slate-900/52 dark:text-foreground/90 dark:hover:bg-slate-800/68"
                      >
                        <span aria-hidden="true">{isPreReaderMode ? "👶" : "🔤"}</span>
                        {isPreReaderMode ? t("top_nav_reader_mode_off") : t("top_nav_reader_mode_on")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTypographyDensity(nextTypographyDensity)}
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-surface-muted border-border/45 dark:bg-slate-900/52 dark:text-foreground/90 dark:hover:bg-slate-800/68"
                      >
                        <span aria-hidden="true">{typographyIcon}</span>
                        {typographyLabel}
                      </button>

                      {/* ── Narrator voice selector ── */}
                      <div className="mt-2 border-t border-zinc-200/80 pt-2 border-border/45">
                        <p className="mb-1.5 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          🎙️ Narrator Voice
                        </p>
                        <div className="grid grid-cols-2 gap-1">
                          {VOICES.map((v) => (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setVoice(v.id)}
                              className={`ui-focus-ring flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition ${v.id === voice
                                  ? "border border-indigo-300 bg-indigo-100 text-indigo-900 border-accent/60 dark:bg-indigo-900/40 dark:text-indigo-100"
                                  : "border border-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                                }`}
                            >
                              <span className="text-sm">{v.emoji}</span>
                              <span className="truncate">{v.label}</span>
                              {v.id === voice && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-auto h-3.5 w-3.5 flex-shrink-0 text-indigo-600 dark:text-indigo-300">
                                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {mobileQuickNavItems.length > 0 ? (
          <nav
            aria-label="Quick navigation"
            className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1 md:hidden"
          >
            {mobileQuickNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`ui-soft-button ui-focus-ring inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition ${isItemActive(item.href)
                    ? isHomePage
                      ? "border-amber-200 bg-amber-300 text-amber-950"
                      : "border-zinc-900 bg-zinc-900 text-white border-border/60 dark:bg-white/14 dark:text-foreground"
                    : isHomePage
                      ? "border-white/14 bg-white/10 text-slate-200 hover:border-white/24 hover:bg-white/16"
                      : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:border-zinc-300 hover:bg-white border-border/50 dark:bg-slate-900/58 dark:text-foreground/90 dark:hover:border-white/22 dark:hover:bg-slate-900/82"
                  }`}
                aria-current={isItemActive(item.href) ? "page" : undefined}
                onClick={closeMenus}
              >
                <span aria-hidden="true" className="text-sm leading-none">
                  {item.icon}
                </span>
                {resolveLabel(item)}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
