"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { hapticCelebration } from "@/lib/platform/haptics";

interface AchievementToastProps {
    show: boolean;
    title: string;
    description: string;
    type?: "achievement" | "level-up" | "streak";
    onClose: () => void;
}

/**
 * A ultra-premium achievement notification that screams "JUICE".
 * Features: Physics-based entry, glassmorphism, internal particle bursts (simulated),
 * and high-contrast typography.
 */
export default function AchievementToast({
    show,
    title,
    description,
    type = "achievement",
    onClose,
}: AchievementToastProps) {
    const [internalParticles, setInternalParticles] = useState<number[]>([]);

    useEffect(() => {
        if (show) {
            void hapticCelebration();
            // Auto close after 5 seconds
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    const config = {
        achievement: { icon: Trophy, color: "from-amber-400 to-orange-500", label: "Achievement!" },
        "level-up": { icon: Star, color: "from-purple-500 to-indigo-600", label: "Level Up!" },
        streak: { icon: Zap, color: "from-orange-400 to-red-600", label: "On Fire!" },
    };

    const current = config[type];
    const Icon = current.icon;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ y: 100, x: "-50%", opacity: 0, scale: 0.8 }}
                    animate={{ y: -40, x: "-50%", opacity: 1, scale: 1 }}
                    exit={{ y: 20, x: "-50%", opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ left: "50%" }}
                    className="fixed bottom-0 z-[100] w-[90%] max-w-md pointer-events-auto"
                >
                    <div className="relative group overflow-hidden rounded-[2rem] p-[3px] shadow-2xl">
                        {/* Animated Border Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${current.color} animate-pulse`} />

                        {/* Main Content */}
                        <div className="relative bg-white/90 dark:bg-stone-900/95 backdrop-blur-2xl rounded-[1.8rem] p-6 flex items-center gap-5 overflow-hidden">
                            {/* Background Glow */}
                            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${current.color} opacity-20 blur-2xl rounded-full`} />

                            {/* Icon Container */}
                            <motion.div
                                initial={{ rotate: -20, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform`}
                            >
                                <Icon className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}>
                                    {current.label}
                                </span>
                                <h4 className="text-xl font-black text-stone-800 dark:text-white truncate">
                                    {title}
                                </h4>
                                <p className="text-stone-500 dark:text-stone-400 text-sm font-medium leading-tight">
                                    {description}
                                </p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-1 hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close notification"
                            >
                                <motion.div whileHover={{ rotate: 90 }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M15 5L5 15M5 5l10 10" />
                                    </svg>
                                </motion.div>
                            </button>

                            {/* Particle Burst Simulation (CSS Masks) */}
                            <div className="absolute inset-0 pointer-events-none opacity-50">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, x: "50%", y: "50%" }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            x: [`${50 + (Math.random() - 0.5) * 40}%`, `${50 + (Math.random() - 0.5) * 80}%`],
                                            y: [`${50 + (Math.random() - 0.5) * 40}%`, `${50 + (Math.random() - 0.5) * 80}%`],
                                        }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.5 }}
                                        className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${current.color}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
