"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MutableRefObject, type RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getActiveProfileIdFromBrowser } from "@/lib/profiles/active-profile";
import { useTheme } from "@/lib/theme/provider";
import { usePreReaderMode } from "@/app/explore/_components/pre-reader-mode";
import LanguageSwitcher from "./language-switcher";
import ThemeControls from "./theme-controls";

type NavItem = {
  href: string;
  labelKey?: string;
  label?: string;
  icon: string;
};

const authenticatedNavItems = [
  { href: "/dashboard", labelKey: "nav_dashboard", icon: "📈" },
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

export default function TopNav() {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const { typographyDensity, setTypographyDensity } = useTheme();
  const { isPreReaderMode, togglePreReaderMode } = usePreReaderMode();
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
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl ${
        isHomePage
          ? "border-white/8 bg-slate-950/50"
          : isAdminRoute
          ? "border-zinc-200/80 bg-white/90 dark:border-white/10 dark:bg-slate-950/85"
          : "border-zinc-200/70 bg-[linear-gradient(92deg,rgba(255,251,242,0.93),rgba(236,253,245,0.9),rgba(239,246,255,0.92))] dark:border-white/10 dark:bg-[linear-gradient(92deg,rgba(15,23,38,0.92),rgba(21,35,54,0.9),rgba(22,30,47,0.9))]"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={brandHref}
            title={authContext.isAuthenticated ? t("top_nav_go_to_dashboard") : t("top_nav_go_to_home")}
            className={`ui-focus-ring inline-flex min-h-12 items-center gap-2.5 rounded-2xl border px-3.5 py-2 shadow-sm backdrop-blur-sm transition-colors ${
              isHomePage
                ? "border-white/12 bg-white/8 hover:bg-white/15"
                : "border-white/80 bg-white/80 hover:bg-white dark:border-white/15 dark:bg-slate-900/70 dark:hover:bg-slate-900/90"
            }`}
            onClick={closeMenus}
          >
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 text-base"
            >
              ✨
            </span>
            <span className="leading-tight">
              <span className={`ui-type-display block text-base font-extrabold tracking-tight ${isHomePage ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
                Koydo
              </span>
              <span className={`block text-[11px] font-semibold uppercase tracking-wide ${isHomePage ? "text-slate-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                {t("top_nav_brand_tagline")}
              </span>
            </span>
          </Link>

          <nav className="ml-1 hidden flex-1 items-center gap-2 lg:flex">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={
                  item.href === "/explore"
                    ? t("top_nav_explore_tooltip")
                    : undefined
                }
                className={`ui-soft-button ui-focus-ring ui-type-body-sm inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-semibold tracking-[0.01em] transition-all ${
                  isItemActive(item.href)
                    ? isHomePage
                      ? "border-amber-400/50 bg-amber-400/15 text-amber-300 shadow-sm"
                      : "border-zinc-900 bg-zinc-900 text-white shadow-sm dark:border-white/18 dark:bg-white/14 dark:text-zinc-100"
                    : isHomePage
                      ? "border-white/12 bg-white/8 text-slate-200 hover:border-white/22 hover:bg-white/15"
                      : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:border-zinc-300 hover:bg-white dark:border-white/14 dark:bg-slate-900/58 dark:text-zinc-200 dark:hover:border-white/22 dark:hover:bg-slate-900/82"
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

          {!authContext.isAuthenticated ? (
            <Link
              href="/auth/sign-up"
              className={`ui-soft-button ui-focus-ring hidden min-h-10 items-center rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm transition hover:brightness-110 sm:inline-flex ${
              isHomePage
                ? "bg-gradient-to-r from-amber-400 to-amber-500 font-bold text-stone-950"
                : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            }`}
            >
              {t("nav_sign_up")}
            </Link>
          ) : null}

          <div className="ml-auto flex items-center gap-2">
            <div
              ref={mainMenuRef}
              className="relative"
            >
              <button
                type="button"
                className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-sm transition ${
                  isHomePage
                    ? "border-white/12 bg-white/8 text-slate-200 hover:bg-white/15"
                    : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-white dark:border-white/14 dark:bg-slate-900/68 dark:text-zinc-100 dark:hover:bg-slate-900/88"
                }`}
                aria-haspopup="menu"
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
              {isMainMenuOpen ? (
                <div
                  ref={mainMenuPanelRef}
                  className="absolute right-0 mt-2 w-[min(92vw,24rem)] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-sm dark:border-white/14 dark:bg-slate-950/92"
                >
                  <div className="grid gap-2">
                    {primaryNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/14 dark:bg-slate-900/72 dark:text-zinc-100 dark:hover:bg-slate-800/72"
                        onClick={closeMenus}
                      >
                        <span aria-hidden="true">{item.icon}</span>
                        {resolveLabel(item)}
                      </Link>
                    ))}
                  </div>

                  {secondaryNavItems.length > 0 ? (
                    <>
                      <div className="my-3 border-t border-zinc-200/80 dark:border-white/12" />
                      <div className="grid gap-2">
                        {secondaryNavItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/12 dark:bg-slate-900/52 dark:text-zinc-200 dark:hover:bg-slate-800/68"
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
                    <div className="mt-3 border-t border-zinc-200/80 pt-3 dark:border-white/12">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="ui-focus-ring inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-400/30 dark:bg-rose-900/25 dark:text-rose-200 dark:hover:bg-rose-900/35"
                      >
                        <span aria-hidden="true">↩️</span>
                        {t("top_nav_log_out")}
                      </button>
                    </div>
                  ) : null}

                  <div className="mt-3 border-t border-zinc-200/80 pt-3 dark:border-white/12">
                    <div className="space-y-3 rounded-xl border border-zinc-200/80 bg-zinc-50/90 p-3 dark:border-white/12 dark:bg-slate-900/72">
                      <ThemeControls compact />
                      <LanguageSwitcher compact />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              ref={exploreToolsRef}
              className="relative"
            >
              <button
                type="button"
                className={`ui-soft-button ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold shadow-sm transition ${
                  isHomePage
                    ? "border-white/12 bg-white/8 text-slate-200 hover:bg-white/15"
                    : "border-zinc-200/80 bg-white/80 text-zinc-700 hover:bg-white dark:border-white/14 dark:bg-slate-900/68 dark:text-zinc-100 dark:hover:bg-slate-900/88"
                }`}
                aria-haspopup="menu"
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
              {isExploreToolsOpen ? (
                <div
                  ref={exploreToolsPanelRef}
                  className="absolute right-0 mt-2 w-[min(92vw,20rem)] rounded-2xl border border-zinc-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-sm dark:border-white/14 dark:bg-slate-950/92"
                >
                  <div className="grid gap-2">
                    <Link
                      href="/explore"
                      className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/14 dark:bg-slate-900/72 dark:text-zinc-100 dark:hover:bg-slate-800/72"
                      onClick={closeMenus}
                    >
                      <span aria-hidden="true">🌍</span>
                      {t("top_nav_worlds")}
                    </Link>
                    <Link
                      href="/modules"
                      className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/14 dark:bg-slate-900/72 dark:text-zinc-100 dark:hover:bg-slate-800/72"
                      onClick={closeMenus}
                    >
                      <span aria-hidden="true">📚</span>
                      {t("top_nav_all_modules")}
                    </Link>
                    <Link
                      href="/language/speaking-lab"
                      className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/14 dark:bg-slate-900/72 dark:text-zinc-100 dark:hover:bg-slate-800/72"
                      onClick={closeMenus}
                    >
                      <span aria-hidden="true">🎙️</span>
                      {t("top_nav_speaking_lab")}
                    </Link>
                    <Link
                      href={parentPortalHref}
                      className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/14 dark:bg-slate-900/72 dark:text-zinc-100 dark:hover:bg-slate-800/72"
                      onClick={closeMenus}
                    >
                      <span aria-hidden="true">👨‍👩‍👧</span>
                      {parentPortalLabel}
                    </Link>
                    <button
                      type="button"
                      onClick={togglePreReaderMode}
                      className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/12 dark:bg-slate-900/52 dark:text-zinc-200 dark:hover:bg-slate-800/68"
                    >
                      <span aria-hidden="true">{isPreReaderMode ? "👶" : "🔤"}</span>
                      {isPreReaderMode ? t("top_nav_reader_mode_off") : t("top_nav_reader_mode_on")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTypographyDensity(nextTypographyDensity)}
                      className="ui-focus-ring inline-flex min-h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-white/12 dark:bg-slate-900/52 dark:text-zinc-200 dark:hover:bg-slate-800/68"
                    >
                      <span aria-hidden="true">{typographyIcon}</span>
                      {typographyLabel}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
