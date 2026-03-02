"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Award, Crown, ShieldAlert } from "lucide-react";
import { JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import { hapticSelection } from "@/lib/platform/haptics";

interface TrophyItem {
    id: string;
    title: string;
    description: string;
    rarity: "common" | "rare" | "epic" | "legendary";
    icon: any;
    date: string;
}

const TROPHIES: TrophyItem[] = [
    {
        id: "1",
        title: "NEURAL PIONEER",
        description: "Mapped 1,000 synapses in Neural Navigator.",
        rarity: "rare",
        icon: Star,
        date: "2026-03-01"
    },
    {
        id: "2",
        title: "ETERNAL STREAK",
        description: "Maintained a 7-day learning streak.",
        rarity: "epic",
        icon: Trophy,
        date: "2026-02-28"
    },
    {
        id: "3",
        title: "VOYAGER UNLOCKED",
        description: "Decoded the semantic engine of Echo.",
        rarity: "common",
        icon: Award,
        date: "2026-02-25"
    }
];

const RARITY_COLORS = {
    common: "from-slate-400 to-slate-600 border-slate-400/30",
    rare: "from-indigo-400 to-blue-600 border-indigo-400/30",
    epic: "from-purple-400 to-fuchsia-600 border-purple-400/30",
    legendary: "from-amber-400 to-orange-600 border-amber-400/30"
};

export default function TrophyRoom() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TROPHIES.map((trophy, idx) => (
                <motion.div
                    key={trophy.id}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: idx * 0.1, ...JUICY_SPRINGS.bouncy }}
                    whileHover={{ scale: 1.05, rotateY: -10, rotateX: 5 }}
                    onMouseEnter={() => hapticSelection()}
                    className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br ${RARITY_COLORS[trophy.rarity]} border-2 backdrop-blur-3xl overflow-hidden group cursor-pointer shadow-2xl`}
                    style={{ perspective: "1000px" }}
                >
                    {/* Interior Glow */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Trophy Icon */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        <div className="p-5 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner">
                            <trophy.icon className="w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </div>

                        <div>
                            <span className="text-[10px] font-black uppercase text-white/60 tracking-[0.2em]">
                                {trophy.rarity} Achievement
                            </span>
                            <h3 className="text-xl font-black text-white italic tracking-tight uppercase">
                                {trophy.title}
                            </h3>
                            <p className="text-xs text-white/70 mt-2 font-medium leading-relaxed">
                                {trophy.description}
                            </p>
                        </div>

                        <div className="pt-4 flex items-center gap-2">
                            <div className="h-[1px] w-8 bg-white/20" />
                            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                                Secured: {trophy.date}
                            </span>
                            <div className="h-[1px] w-8 bg-white/20" />
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <motion.div
                        className="absolute inset-x-[-100%] top-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                        animate={{ left: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                    />
                </motion.div>
            ))}

            {/* Locked Slot Preview */}
            <motion.div
                className="p-8 rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-center space-y-4"
                initial={{ filter: "grayscale(100%)" }}
                whileHover={{ filter: "grayscale(0%)", border: "2px solid rgba(255,255,255,0.2)" }}
            >
                <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
                    <ShieldAlert className="w-12 h-12 text-zinc-600" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-zinc-600 italic tracking-tight">LOCKED ARCHIVE</h3>
                    <p className="text-xs text-zinc-700 mt-2">Complete more missions to unlock this slot.</p>
                </div>
            </motion.div>
        </div>
    );
}
