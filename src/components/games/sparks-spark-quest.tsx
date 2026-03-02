"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Building2,
    Construction,
    Calculator,
    Activity,
    Battery,
    ArrowRight,
    CheckCircle2,
    Lightbulb,
    Cpu
} from "lucide-react";
import { hapticSuccess, hapticSelection } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * SPARK'S SPARK-QUEST - Phase 9 (Explorer Batch)
 * A 4K math-driven city-building quest.
 * Theme: Sequential "Explorer" quests (Dora-style) to power a futuristic city.
 */

interface CitySector {
    id: string;
    name: string;
    description: string;
    problem: string;
    answer: number;
    x: number;
    y: number;
}

const CITY_SECTORS: CitySector[] = [
    {
        id: "sector_1",
        name: "Neon Plaza",
        description: "The main square needs power. Calculate the grid load: (12 x 5) + 4.",
        problem: "60 + 4",
        answer: 64,
        x: 35,
        y: 35
    },
    {
        id: "sector_2",
        name: "Skyway Hub",
        description: "The transport tubes are offline. Solve the flow rate: 144 / 12.",
        problem: "144 ÷ 12",
        answer: 12,
        x: 65,
        y: 25
    },
    {
        id: "sector_3",
        name: "Cyber Tower",
        description: "The core mainframe is cold. Reach peak frequency: 7 squared + 11.",
        problem: "49 + 11",
        answer: 60,
        x: 50,
        y: 70
    }
];

export default function SparksSparkQuest() {
    const [sectorIndex, setSectorIndex] = useState(0);
    const [poweredSectors, setPoweredSectors] = useState<string[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState(false);

    const currentSector = CITY_SECTORS[sectorIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseInt(userInput);

        if (val === currentSector.answer) {
            handleSuccess();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            hapticSelection();
        }
    };

    const handleSuccess = useCallback(() => {
        hapticSuccess();
        setPoweredSectors(prev => [...prev, currentSector.id]);
        setUserInput("");

        if (sectorIndex < CITY_SECTORS.length - 1) {
            setSectorIndex(prev => prev + 1);
        } else {
            setIsComplete(true);
        }
    }, [sectorIndex, currentSector.id]);

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-amber-500/20 shadow-2xl font-sans group">
            {/* 4K Neon City Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519608487953-e999c86e74c6?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.3] mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-slate-950/80 to-blue-500/10" />

            {/* Sector Visuals */}
            <div className="absolute inset-0 pointer-events-none">
                {CITY_SECTORS.map((sector, idx) => (
                    <motion.div
                        key={sector.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: poweredSectors.includes(sector.id) ? 1 : 0.1,
                            scale: idx === sectorIndex ? 1.1 : 1
                        }}
                        className="absolute flex flex-col items-center gap-2"
                        style={{ left: `${sector.x}%`, top: `${sector.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className={`p-4 rounded-full border-2 ${poweredSectors.includes(sector.id) ? "bg-amber-500/20 border-amber-400" : "bg-white/5 border-white/20"} backdrop-blur-3xl`}>
                            <Building2 className={`w-8 h-8 ${poweredSectors.includes(sector.id) ? "text-amber-400" : "text-white/20"}`} />
                        </div>
                        {poweredSectors.includes(sector.id) && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-amber-400 text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                <Zap className="w-3 h-3" /> Online
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* HUD: Power Grid Status (Top Right) */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-3">
                <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex gap-6 items-center">
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-amber-400 text-[10px] font-bold uppercase tracking-tighter">City Power</span>
                        <div className="flex gap-1">
                            {CITY_SECTORS.map((_, i) => (
                                <div key={i} className={`w-10 h-1.5 rounded-full ${i <= sectorIndex ? "bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-white/10"}`} />
                            ))}
                        </div>
                    </div>
                    <Battery className="w-6 h-6 text-amber-400" />
                </div>
            </div>

            {/* HUD: Spark Interaction & Problem Input (Bottom) */}
            <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                    {!isComplete && (
                        <motion.div
                            key={sectorIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="bg-black/80 backdrop-blur-3xl border border-amber-500/30 rounded-3xl p-8 flex gap-10 items-center"
                        >
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <MascotFriend id="spark" size="lg" mood={error ? "thinking" : "happy"} />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-amber-400 font-bold text-lg mb-2 flex items-center gap-2 tracking-tight">
                                    <Calculator className="w-5 h-5" />
                                    {currentSector.name} Grid Link
                                </h3>
                                <p className="text-white/90 text-2xl font-light leading-tight italic">
                                    "{currentSector.description}"
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex gap-3">
                                <div className="relative">
                                    <input
                                        autoFocus
                                        type="number"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="LOAD LEVEL"
                                        className={`w-32 px-6 py-4 bg-white/5 border-2 rounded-2xl text-center text-white text-xl font-bold transition-all outline-none ${error ? "border-red-500 shake" : "border-white/20 focus:border-amber-400"
                                            }`}
                                    />
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-amber-500 rounded-full text-[10px] font-black text-slate-950 uppercase tracking-widest whitespace-nowrap">
                                        Input Answer
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-amber-500 text-slate-950 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-transform"
                                >
                                    Activate
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Win Screen */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center z-50 p-12 overflow-hidden text-center"
                    >
                        {/* City Lights Effect */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,theme(colors.amber.400)_0%,transparent_70%)]" />

                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full relative z-10"
                        >
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="spark" size="xl" mood="happy" />
                            </div>

                            <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-2xl mb-6">
                                <Lightbulb className="w-8 h-8 text-amber-400" />
                            </div>

                            <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">
                                City <br /> Powered!
                            </h2>
                            <p className="text-white/60 mb-10 text-lg">
                                The celestial city is fully functional. Your mathematical precision has restored the future.
                            </p>

                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                                        <Zap className="w-5 h-5 mx-auto text-amber-400" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global HUD elements */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/30">
                    <Construction className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Protocol</span>
                    <span className="text-xs text-white font-medium">Spark-Quest City Eng.</span>
                </div>
            </div>

            <style jsx>{`
                .shake {
                    animation: shake-anim 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake-anim {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </div>
    );
}
