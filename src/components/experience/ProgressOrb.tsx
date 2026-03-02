"use client";

import { motion } from "framer-motion";
import { Atom } from "lucide-react";

interface ProgressOrbProps {
    percent: number;
    size?: number;
}

export default function ProgressOrb({ percent, size = 200 }: ProgressOrbProps) {
    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Outer Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size / 2) - 10}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-white/5"
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size / 2) - 10}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * ((size / 2) - 10)}
                    initial={{ strokeDashoffset: 2 * Math.PI * ((size / 2) - 10) }}
                    animate={{ strokeDashoffset: (2 * Math.PI * ((size / 2) - 10)) * (1 - percent / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                />
            </svg>

            {/* Inner Glow */}
            <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-4 bg-indigo-500/10 rounded-full blur-2xl"
            />

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Atom className="w-10 h-10 text-indigo-400 opacity-50 mb-2" />
                </motion.div>
                <div className="flex flex-col items-center">
                    <span className="text-4xl font-black italic tracking-tighter">{percent}%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Mastery</span>
                </div>
            </div>

            {/* Orbiting particles */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 blur-sm" />
                </motion.div>
            ))}
        </div>
    );
}
