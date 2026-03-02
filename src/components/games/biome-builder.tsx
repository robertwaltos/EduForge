"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Sun, CloudRain, Wind, TreePine, Bird, Waves, Thermometer, ShieldCheck, Activity, Info } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Ecosystem Types --- */
type Entity = "PLANNER" | "CONSUMER" | "DECOMPOSER";

export default function BiomeBuilder() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "SIMULATING" | "COLLAPSE" | "STABLE">("IDLE");
    const [stats, setStats] = useState({
        flora: 50,
        fauna: 20,
        water: 60,
        temperature: 25
    });
    const [equilibrium, setEquilibrium] = useState(70);
    const [days, setDays] = useState(0);

    const runSimulation = useCallback(() => {
        if (gameState !== "SIMULATING") return;

        const interval = setInterval(() => {
            setStats(prev => {
                // Ecological logic
                const newFlora = prev.flora + (prev.water * 0.1) - (prev.fauna * 0.2) - (Math.abs(prev.temperature - 25) * 0.1);
                const newFauna = prev.fauna + (prev.flora * 0.05) - (prev.fauna * 0.05);
                const newWater = prev.water - (prev.flora * 0.02) - (prev.temperature * 0.01);

                return {
                    flora: Math.max(0, Math.min(100, newFlora)),
                    fauna: Math.max(0, Math.min(100, newFauna)),
                    water: Math.max(0, Math.min(100, newWater)),
                    temperature: prev.temperature // Controlled by user
                };
            });

            setDays(d => d + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, [gameState]);

    useEffect(() => {
        runSimulation();
    }, [runSimulation]);

    // Stability Calculation
    useEffect(() => {
        const diff = Math.abs(stats.flora - 60) + Math.abs(stats.fauna - 40) + Math.abs(stats.water - 50);
        const stability = Math.max(0, 100 - diff);
        setEquilibrium(stability);

        if (stability < 20 && gameState === "SIMULATING") {
            setGameState("COLLAPSE");
            setMood("sad");
            setMessage("The ecosystem has collapsed. Biodiversity loss is critical. We must restart the cycle. 🥀");
            hapticError();
        } else if (days > 100 && stability > 80) {
            setGameState("STABLE");
            setMood("happy");
            setMessage("Incredible! You've achieved a self-sustaining Biome Equilibrium. 🌿");
            hapticSuccess();
        }
    }, [stats, days, gameState, setMood, setMessage]);

    const adjustStat = (key: keyof typeof stats, amount: number) => {
        setStats(prev => ({ ...prev, [key]: Math.max(0, Math.min(100, prev[key] + amount)) }));
        hapticSelection();
    };

    const startSim = () => {
        setGameState("SIMULATING");
        setDays(0);
        setMood("thinking");
        setMessage("Ecosystem initialization complete. Balance the flora, fauna, and resources to reach Equilibrium! 🌲");
        hapticSuccess();
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto min-h-[700px] bg-emerald-950 rounded-[4rem] border border-emerald-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* 4K Environmental Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.2)_0%,transparent_70%)]" />
                {/* Dynamic Weather Layer */}
                <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    style={{ background: "radial-gradient(circle at 70% 20%, #fbbf24 0%, transparent 40%)" }}
                />
            </div>

            {/* Top Bar: Ecosystem HUD */}
            <div className="relative z-20 p-10 flex justify-between items-center bg-zinc-900/40 backdrop-blur-3xl border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <TreePine className="text-emerald-400 w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">Biome Builder</h2>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-[0.3em]">Biosphere Simulation Active</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="bg-zinc-800/50 border border-white/5 px-8 py-4 rounded-[2rem] flex flex-col items-end">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Ecosystem Stability</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black italic tabular-nums text-white">{equilibrium.toFixed(0)}%</span>
                            <Activity className={`w-4 h-4 ${equilibrium > 50 ? 'text-emerald-400' : 'text-rose-400'}`} />
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] flex flex-col items-end min-w-[120px]">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Day Cycle</span>
                        <span className="text-3xl font-black italic tabular-nums text-white">{days}</span>
                    </div>
                </div>
            </div>

            {/* Main Simulation View */}
            <div className="relative z-10 flex-1 p-10 grid grid-cols-12 gap-10">
                {/* Left: Interactive Controls */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-md">
                        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                            <Wind className="w-4 h-4" /> Resource Control
                        </h3>

                        <div className="space-y-8">
                            <ControlGroup
                                label="Precipitation"
                                icon={<CloudRain className="w-5 h-5 text-sky-400" />}
                                value={stats.water}
                                onAdjust={(v) => adjustStat("water", v)}
                            />
                            <ControlGroup
                                label="Thermodynamics"
                                icon={<Thermometer className="w-5 h-5 text-orange-400" />}
                                value={stats.temperature}
                                onAdjust={(v) => adjustStat("temperature", v)}
                            />
                        </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[3rem] backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-4 text-emerald-400">
                            <Info className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Growth Forecast</span>
                        </div>
                        <p className="text-emerald-500/80 text-xs italic leading-relaxed">
                            {stats.water > 70 ? "High rainfall promotes flora expansion." :
                                stats.temperature > 30 ? "Heatwave causing water evaporation." :
                                    "Conditions stable for balanced growth."}
                        </p>
                    </div>
                </div>

                {/* Right: Visualization & Species */}
                <div className="col-span-8 space-y-8 flex flex-col">
                    <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-[4rem] relative overflow-hidden group">
                        {/* 4K Visualization Space (Illustrative Grid) */}
                        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-30 pointer-events-none">
                            {Array.from({ length: 48 }).map((_, i) => (
                                <div key={i} className="border-[0.5px] border-emerald-500/10" />
                            ))}
                        </div>

                        {/* Animated Species Clusters */}
                        <div className="absolute inset-10 flex items-center justify-center gap-20">
                            <SpeciesRadar label="Flora" value={stats.flora} color="#10b981" icon={<TreePine />} />
                            <SpeciesRadar label="Fauna" value={stats.fauna} color="#f59e0b" icon={<Bird />} />
                        </div>

                        {/* Status Overlay */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-10 py-4 rounded-full border border-white/10 flex items-center gap-4">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Biome Status:</span>
                            <span className={`text-sm font-black italic ${equilibrium > 70 ? 'text-emerald-400' : 'text-orange-400'}`}>
                                {equilibrium > 80 ? "Sustaining" : equilibrium > 50 ? "Adapting" : "Stressed"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlays */}
            {(gameState === "IDLE" || gameState === "COLLAPSE" || gameState === "STABLE") && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center border border-white/10 mb-8 overflow-hidden
                        ${gameState === "STABLE" ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-white/5'}`}>
                        <TreePine className={`w-12 h-12 ${gameState === "STABLE" ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase">
                        {gameState === "STABLE" ? "Equilibrium Reached" :
                            gameState === "COLLAPSE" ? "Ecosystem Failure" : "Initialize Biosphere"}
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Master the delicate balance between climate and life forms. Your choices determine the survival of this digital ecosystem.
                    </p>
                    <PhysicalButton
                        onClick={startSim}
                        className="bg-emerald-500 h-24 px-20 rounded-[3rem] text-2xl font-black italic"
                    >
                        {gameState === "COLLAPSE" ? "RESTART CYCLE 🔄" : "BEGIN SIMULATION 🌿"}
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

/* --- Sub-Components --- */

function ControlGroup({ label, icon, value, onAdjust }: { label: string, icon: any, value: number, onAdjust: (v: number) => void }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-xs font-black text-white uppercase tracking-widest font-mono">{label}</span>
                </div>
                <span className="text-xl font-black italic text-zinc-400 tabular-nums">{value.toFixed(0)}%</span>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onAdjust(-5)}
                    className="flex-1 h-12 bg-zinc-800 border border-white/5 rounded-xl text-white font-black hover:bg-zinc-700 active:scale-95 transition-all"
                >
                    -
                </button>
                <button
                    onClick={() => onAdjust(5)}
                    className="flex-1 h-12 bg-zinc-800 border border-white/5 rounded-xl text-white font-black hover:bg-zinc-700 active:scale-95 transition-all"
                >
                    +
                </button>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div className="h-full bg-emerald-500" animate={{ width: `${value}%` }} />
            </div>
        </div>
    );
}

function SpeciesRadar({ label, value, color, icon }: { label: string, value: number, color: string, icon: any }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative w-40 h-40 flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed opacity-20"
                    style={{ borderColor: color }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="rounded-full shadow-2xl flex items-center justify-center"
                    style={{
                        width: `${Math.max(40, value * 1.4)}px`,
                        height: `${Math.max(40, value * 1.4)}px`,
                        backgroundColor: `${color}20`,
                        border: `2px solid ${color}40`
                    }}
                >
                    <div style={{ color }}>{icon}</div>
                </motion.div>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">{label}</span>
        </div>
    );
}
