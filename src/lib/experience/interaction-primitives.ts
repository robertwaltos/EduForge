import { Variants } from "framer-motion";

/**
 * 2026 Interaction Engine - Primitives for "Juicy" UI
 * Focus: Physicality, Spring Mass, and Impact.
 */

export const JUICY_SPRINGS = {
    gentle: { type: "spring", stiffness: 100, damping: 20 } as const,
    bouncy: { type: "spring", stiffness: 300, damping: 10, mass: 0.5 } as const,
    stiff: { type: "spring", stiffness: 500, damping: 30 } as const,
    heavy: { type: "spring", stiffness: 200, damping: 15, mass: 2 } as const,
};

export const JUICY_VARIANTS: Record<string, Variants> = {
    // Buttons and touch targets
    pressable: {
        initial: { scale: 1 },
        tap: { scale: 0.92, transition: JUICY_SPRINGS.bouncy },
        hover: { scale: 1.05, rotate: 2, transition: JUICY_SPRINGS.gentle },
    },

    // Success/Impact typography
    impact: {
        initial: { scale: 0.8, opacity: 0, y: 20 },
        animate: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: JUICY_SPRINGS.heavy
        },
        exit: {
            scale: 1.2,
            opacity: 0,
            transition: { duration: 0.2 }
        }
    },

    // Floating/Hovering life
    float: {
        animate: {
            y: [0, -10, 0],
            rotate: [-1, 1, -1],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    },

    // Card discovery/reveal
    reveal: {
        initial: { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        animate: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: JUICY_SPRINGS.gentle
        }
    },

    // Directed movement
    slideUp: {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0, transition: JUICY_SPRINGS.bouncy },
        exit: { opacity: 0, y: -40, transition: { duration: 0.2 } }
    },

    slideDown: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0, transition: JUICY_SPRINGS.bouncy },
        exit: { opacity: 0, y: 40, transition: { duration: 0.2 } }
    }
};

/**
 * Common color palettes for 2026 aesthetics
 */
export const EXPERIENCE_COLORS = {
    indigo: "from-indigo-500 to-purple-600",
    emerald: "from-emerald-400 to-teal-500",
    rose: "from-rose-400 to-orange-500",
    amber: "from-amber-400 to-yellow-500",
    sky: "from-sky-400 to-blue-500",
    dark: "bg-slate-950/80 backdrop-blur-xl border-white/10",
};
