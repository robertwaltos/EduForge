"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MascotHost from "@/components/experience/MascotHost";
import MascotFriend from "@/components/experience/KoydoMascotFriends";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import AchievementToast from "@/components/experience/AchievementToast";
import {
    Trophy,
    Sparkles,
    Users,
    Flame,
    Globe,
    Rocket,
    Compass,
    Star,
    Brain,
    Palette,
    Atom,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { hapticSelection, hapticSuccess } from "@/lib/platform/haptics";
import ProgressOrb from "@/components/experience/ProgressOrb";
import GalaxyMap from "@/components/experience/GalaxyMap";
import TrophyRoom from "@/components/experience/TrophyRoom";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Types --- */
type DomainProgress = {
    id: string;
    name: string;
    icon: any;
    color: string;
    percent: number;
    mascot: any;
    link: string;
};

/* --- Simulated Community Activity --- */
const COMMUNITY_ACTIVITY = [
    { id: 1, user: "Leo", action: "crunched 50 numbers!", time: "2m ago", icon: "🔢" },
    { id: 2, user: "Sora", action: "unlocked 'Space Pioneer'!", time: "5m ago", icon: "🚀" },
    { id: 3, user: "Maya", action: "started a 7-day streak!", time: "12m ago", icon: "🔥" },
    { id: 4, user: "Felix", action: "finished 'Caterpillar Lab'", time: "20m ago", icon: "🐛" },
];

export default function ExperienceHubPage() {
    const [selectedMascot, setSelectedMascot] = useState<any>("pixel");
    const [showToast, setShowToast] = useState(false);
    const [view, setView] = useState<"galaxy" | "trophies">("galaxy");

    return (
        <MascotHost friendId={selectedMascot} initialMood="happy">
            <ExperienceHubContent
                selectedMascot={selectedMascot}
                setSelectedMascot={setSelectedMascot}
                showToast={showToast}
                setShowToast={setShowToast}
                view={view}
                setView={setView}
            />
        </MascotHost>
    );
}

function ExperienceHubContent({ selectedMascot, setSelectedMascot, showToast, setShowToast, view, setView }: any) {
    const { friendshipLevel, interactionCount } = useMascot();

    // Domains
    const domains: DomainProgress[] = [
        { id: "math", name: "Math", icon: Brain, color: "text-indigo-400", percent: 75, mascot: "spark", link: "/modules?subject=Mathematics" },
        { id: "reading", "name": "Reading", icon: Flame, color: "text-rose-400", percent: 42, mascot: "echo", link: "/modules?subject=Language" },
        { id: "science", name: "Science", icon: Atom, color: "text-emerald-400", percent: 90, mascot: "terra", link: "/science-lab" },
        { id: "art", name: "Art & Fun", icon: Palette, color: "text-amber-400", percent: 55, mascot: "luna", link: "/modules?subject=Creative" },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* --- Top Navigation / Overview --- */}
            <header className="relative z-20 px-6 pt-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
                            <Trophy className="text-indigo-400 w-6 h-6" />
                        </div>
                        <span className="text-sm font-black tracking-widest uppercase text-indigo-400">Level {friendshipLevel + 11} Pioneer</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 leading-none">
                        EXPERIENCE <br /> HUB
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-12 bg-white/5 backdrop-blur-2xl border border-border/40 p-8 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <ProgressOrb percent={68} size={160} />

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-zinc-500">Global Score</span>
                                <span className="text-4xl font-black italic tracking-tighter">14,250</span>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-zinc-500">Day Streak</span>
                                <JuicyStreak count={7} />
                            </div>
                        </div>

                        <PhysicalButton
                            onClick={() => {
                                void hapticSuccess();
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 3000);
                            }}
                            className="bg-indigo-600 h-16 px-10 rounded-[1.5rem]"
                        >
                            CLAIM DAILY BONUS 🎁
                        </PhysicalButton>
                    </div>
                </motion.div>
            </header>

            <section className="relative z-20 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* --- left Column: Progress Galaxy --- */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black italic tracking-tight flex items-center gap-3">
                            <Compass className="text-emerald-400" /> YOUR PROGRESS GALAXY
                        </h2>
                        <div className="flex gap-4">
                            <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest animate-pulse">
                                Reality Sync: 100%
                            </span>
                        </div>
                    </div>

                    {/* HIGH-FIDELITY GALAXY MAP */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GalaxyMap />
                    </motion.div>

                    {/* Global Quest System (New Feature) */}
                    <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-border/40 rounded-[2.5rem] p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <Sparkles className="text-amber-400 w-6 h-6 animate-spin-slow" />
                                    <h3 className="text-2xl font-black italic tracking-tight">GLOBAL QUEST: THE NEBULA ARCHIVE</h3>
                                </div>
                                <p className="text-zinc-400 text-sm font-medium">
                                    Coordinate with <span className="text-indigo-400">Echo</span> to retrieve lost 4K data nodes from the History Constellation.
                                </p>
                            </div>
                            <PhysicalButton
                                className="bg-white text-slate-950 px-8 rounded-2xl h-14"
                                onClick={() => void hapticSuccess()}
                            >
                                START QUEST ⚡
                            </PhysicalButton>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-2 rounded-full ${i === 1 ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]' : 'bg-white/5'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Right Column: Social & Mascots --- */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-gradient-to-b from-indigo-500/20 to-transparent border border-border/40 rounded-[3rem] p-8 relative flex flex-col items-center text-center">
                        <div className="absolute top-4 right-6 flex flex-col items-center">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Affinity</span>
                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-400" style={{ width: `${(interactionCount % 10) * 10}%` }} />
                            </div>
                        </div>

                        <div className="bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 text-[9px] font-black uppercase mb-6">
                            Level {friendshipLevel} Companion
                        </div>
                        <MascotFriend id={selectedMascot} mood="happy" size="xl" />
                        <h3 className="mt-6 text-2xl font-black uppercase italic tracking-tighter">
                            {selectedMascot} <span className="text-indigo-400">The Guide</span>
                        </h3>
                        <p className="mt-2 text-sm text-zinc-400 font-medium px-4">
                            "You're doing amazing! Our bond is growing stronger with every mission we complete together."
                        </p>

                        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 w-full justify-center">
                            {["pixel", "echo", "spark", "luna", "terra"].map(mid => (
                                <button
                                    key={mid}
                                    onClick={() => {
                                        void hapticSelection();
                                        setSelectedMascot(mid);
                                    }}
                                    className={`w-12 h-12 rounded-2xl border transition-all ${selectedMascot === mid
                                        ? "bg-white border-white scale-110 shadow-xl"
                                        : "bg-white/5 border-border/40 hover:bg-white/10"
                                        }`}
                                >
                                    <MascotFriend id={mid as any} mood="happy" size="sm" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles className="text-amber-400 w-5 h-5" />
                            <h3 className="text-xl font-black italic">ACTIVE STREAK</h3>
                        </div>
                        <div className="bg-white/5 p-6 rounded-[2.5rem] border border-border/40 text-center">
                            <p className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">7 DAYS</p>
                            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mt-2">Personal Record Smashed!</p>
                        </div>
                    </div>

                    <PhysicalButton
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 h-20 text-xl font-black italic rounded-[2rem]"
                        onClick={() => void hapticSuccess()}
                    >
                        LAUNCH NEW MISSION 🚀
                    </PhysicalButton>
                </div>
            </section>

            {/* Global Floating Elements */}
            <AnimatePresence>
                {showToast && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
                        <AchievementToast
                            show={showToast}
                            title="Daily Bonus Unlocked!"
                            description="You've earned 500 Experience Points for checking in."
                            onClose={() => setShowToast(false)}
                            type="achievement"
                        />
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
