"use client";

import { motion } from "framer-motion";
import MascotFriend from "./KoydoMascotFriends";
import { useEffect, useState } from "react";

interface JuicyLevelCardProps {
    level: number;
    xp: number;
    maxXp: number;
    userName?: string;
    friendId?: "pixel" | "spark" | "echo" | "luna" | "terra";
}

/**
 * A ultra-premium, "Juicy" level card that uses morphing gradients,
 * glassmorphism, and mascot reactions.
 */
export default function JuicyLevelCard({
    level,
    xp,
    maxXp,
    userName = "Explorer",
    friendId = "pixel"
}: JuicyLevelCardProps) {
    const [progress, setProgress] = useState(0);
    const targetProgress = (xp / maxXp) * 100;

    useEffect(() => {
        const timer = setTimeout(() => setProgress(targetProgress), 500);
        return () => clearTimeout(timer);
    }, [targetProgress]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative group overflow-hidden rounded-[2.5rem] p-[2px]"
        >
            {/* Animated Border/Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity" />

            {/* Main Card Body (Glass) */}
            <div className="relative h-full w-full rounded-[2.4rem] bg-white/80 dark:bg-stone-900/90 backdrop-blur-xl p-8 shadow-2xl overflow-hidden">

                {/* Decorative background shapes */}
                <div className="absolute -right-10 -top-10 h-40 w-40 bg-purple-500/10 blur-3xl rounded-full" />
                <div className="absolute -left-10 -bottom-10 h-40 w-40 bg-sky-500/10 blur-3xl rounded-full" />

                <div className="relative flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar / Mascot Section */}
                    <div className="relative h-32 w-32 shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-800 dark:to-indigo-800 rounded-full animate-pulse" />
                        <div className="absolute inset-2 bg-white dark:bg-stone-800 rounded-full shadow-inner" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MascotFriend id={friendId} mood={progress > 90 ? "cheering" : "happy"} size={80} />
                        </div>

                        {/* Level Badge Hook */}
                        <motion.div
                            whileHover={{ scale: 1.2, rotate: 15 }}
                            className="absolute -bottom-2 -right-2 h-12 w-12 flex items-center justify-center bg-gradient-to-br from-amber-300 to-orange-500 rounded-2xl rotate-3 shadow-lg border-4 border-white dark:border-stone-900"
                        >
                            <span className="text-xl font-black text-white">{level}</span>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <div className="flex-1 w-full text-center md:text-left">
                        <div className="mb-2">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                                Current Progress
                            </h3>
                            <h2 className="text-3xl font-black text-stone-800 dark:text-white">
                                Hi, {userName}! 👋
                            </h2>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="relative mt-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-lg font-bold text-sky-600 dark:text-sky-400">
                                    Level {level}
                                </span>
                                <span className="text-sm font-medium text-stone-400">
                                    {xp} / {maxXp} XP
                                </span>
                            </div>

                            {/* The "Juicy" Progress Bar */}
                            <div className="h-6 w-full rounded-2xl bg-stone-100 dark:bg-stone-800 shadow-inner overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                    className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 relative"
                                >
                                    {/* Sheen animation */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />

                                    {/* Bubbles / Sparkles inside the bar */}
                                    <div className="absolute inset-0 opacity-30">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className={`absolute rounded-full bg-white animate-bounce`}
                                                style={{
                                                    left: `${i * 25}%`,
                                                    top: '20%',
                                                    width: '4px',
                                                    height: '4px',
                                                    animationDelay: `${i * 0.2}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Motivational Footer */}
                        <p className="mt-4 text-stone-500 dark:text-stone-400 italic font-medium">
                            &quot;Only {maxXp - xp} XP until Level {level + 1}! You&apos;ve got this!&quot;
                        </p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </motion.div>
    );
}
