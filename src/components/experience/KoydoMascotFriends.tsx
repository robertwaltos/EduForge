"use client";

import { motion } from "framer-motion";
import { MascotMood } from "./KoydoMascot";

type FriendId = "pixel" | "spark" | "echo" | "luna" | "terra";

interface MascotFriendProps {
    id: FriendId;
    mood?: MascotMood;
    size?: number | "sm" | "md" | "lg" | "xl";
    className?: string;
    message?: string;
}

/**
 * Koydo Mascot Friends: Pixel (General), Spark (Math), Echo (Phonics), Luna (Art), and Terra (Science)
 * This component handles the rendering of original Koydo characters.
 */
export default function MascotFriend({
    id,
    mood = "idle",
    size: sizeProp = 120,
    className = "",
    message,
}: MascotFriendProps) {

    const size = typeof sizeProp === "number" ? sizeProp : {
        sm: 48,
        md: 80,
        lg: 120,
        xl: 240,
    }[sizeProp];

    const colors = {
        pixel: { primary: "#0ea5e9", secondary: "#e0f2fe", accent: "#38bdf8" }, // Sky
        spark: { primary: "#f59e0b", secondary: "#fef3c7", accent: "#fbbf24" }, // Amber/Yellow
        echo: { primary: "#8b5cf6", secondary: "#ede9fe", accent: "#a78bfa" }, // Violet/Purple
        luna: { primary: "#a855f7", secondary: "#f3e8ff", accent: "#c084fc" }, // Purple/Art
        terra: { primary: "#22c55e", secondary: "#dcfce7", accent: "#4ade80" }, // Green/Nature
    };

    const getFriendPaths = () => {
        switch (id) {
            case "spark":
                return (
                    <>
                        {/* Spark's Body (Lightning Bolt inspired) */}
                        <path d="M50 5 L85 45 L55 45 L75 95 L15 55 L45 55 L25 5 Z" fill={colors.spark.secondary} stroke={colors.spark.primary} strokeWidth="2" />
                        <path d="M50 15 L75 45 L45 45 L60 80 L25 50 L50 50 L35 15 Z" fill={colors.spark.accent} opacity="0.4" />
                    </>
                );
            case "echo":
                return (
                    <>
                        {/* Echo's Body (Sound Wave / Speaker inspired) */}
                        <circle cx="50" cy="50" r="40" fill={colors.echo.secondary} stroke={colors.echo.primary} strokeWidth="2" />
                        <circle cx="50" cy="50" r="30" fill={colors.echo.accent} opacity="0.3" />
                        <path d="M30 50 Q 40 30 50 50 Q 60 70 70 50" stroke={colors.echo.primary} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6">
                            <animate attributeName="d" values="M30 50 Q 40 30 50 50 Q 60 70 70 50; M30 50 Q 40 70 50 50 Q 60 30 70 50; M30 50 Q 40 30 50 50 Q 60 70 70 50" dur="2s" repeatCount="indefinite" />
                        </path>
                    </>
                );
            case "luna":
                return (
                    <>
                        {/* Luna's Body (Crescent / Night inspired) */}
                        <path d="M50 10 A 40 40 0 1 0 50 90 A 30 35 0 1 1 50 10" fill={colors.luna.secondary} stroke={colors.luna.primary} strokeWidth="2" />
                        <circle cx="70" cy="30" r="5" fill={colors.luna.accent} opacity="0.5" />
                        <circle cx="75" cy="65" r="3" fill={colors.luna.accent} opacity="0.3" />
                    </>
                );
            case "terra":
                return (
                    <>
                        {/* Terra's Body (Leaf / Seed inspired) */}
                        <path d="M50 10 Q 90 10 90 50 Q 90 90 50 90 Q 10 90 10 50 Q 10 10 50 10" fill={colors.terra.secondary} stroke={colors.terra.primary} strokeWidth="2" />
                        <path d="M50 10 L50 90 M50 30 L80 15 M50 50 L20 35 M50 70 L80 55" stroke={colors.terra.primary} strokeWidth="1.5" strokeOpacity="0.4" />
                    </>
                );
            default: // Pixel (Re-implemented for consistency)
                return (
                    <>
                        <circle cx="50" cy="50" r="45" fill={colors.pixel.secondary} stroke={colors.pixel.primary} strokeWidth="2" />
                        <circle cx="50" cy="50" r="38" fill="white" opacity="0.5" />
                    </>
                );
        }
    };

    const getEyePath = () => {
        switch (mood) {
            case "happy": return "M 35 45 Q 40 40 45 45 M 55 45 Q 60 40 65 45";
            case "thinking": return "M 35 45 L 45 45 M 55 42 L 65 42";
            case "sad": return "M 35 48 Q 40 52 45 48 M 55 48 Q 60 52 65 48";
            case "surprised": return "M 40 45 A 3 3 0 1 1 34 45 A 3 3 0 1 1 40 45 M 60 45 A 3 3 0 1 1 54 45 A 3 3 0 1 1 60 45";
            case "cheering": return "M 35 42 L 45 48 L 35 54 M 65 42 L 55 48 L 65 54";
            default: return "M 38 45 L 42 45 M 58 45 L 62 45";
        }
    };

    return (
        <div className={`relative flex flex-col items-center gap-3 ${className}`} style={{ width: size }}>
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
                    {getFriendPaths()}

                    {/* Eyes Layer */}
                    <rect x="30" y="32" width="40" height="30" rx="15" fill="black" fillOpacity="0.05" />
                    <path
                        d={getEyePath()}
                        stroke={colors[id].primary}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-300"
                    />
                </svg>
            </motion.div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute -top-16 left-1/2 min-w-[140px] -translate-x-1/2 rounded-2xl border-2 bg-white p-3 text-center shadow-xl border-stone-100 dark:bg-stone-900 dark:border-stone-800"
                >
                    <p className="text-sm font-bold text-stone-800 dark:text-stone-100">{message}</p>
                    <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white border-r-2 border-b-2 border-stone-100 dark:bg-stone-900 dark:border-stone-800" />
                </motion.div>
            )}
        </div>
    );
}
