"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Zap, Sun, Wind, Battery, Activity, ShieldCheck, Thermometer, Info, ChevronRight, Leaf, Trash2, CloudRain } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Sustainability Types --- */
type EnergySource = "SOLAR" | "WIND" | "COAL" | "NUCLEAR";

type GameStats = {
    power: number;
    carbon: number;
    budget: number;
    happiness: number;
};

export default function EcoEngineer() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "GRID" | "CRISIS" | "STABLE">("IDLE");
    const [sources, setSources] = useState<Record<EnergySource, number>>({
        SOLAR: 0,
        WIND: 0,
        COAL: 2,
        NUCLEAR: 0
    });
    const [stats, setStats] = useState<GameStats>({
        power: 40,
        carbon: 80,
        budget: 5000,
        happiness: 50
    });

    const updateSimulation = useCallback(() => {
        if (gameState !== "GRID") return;

        setStats(prev => {
            const powerGen = (sources.SOLAR * 10) + (sources.WIND * 15) + (sources.COAL * 25) + (sources.NUCLEAR * 50);
            const carbonGen = (sources.COAL * 5) - (sources.SOLAR * 1) - (sources.WIND * 2);

            return {
                ...prev,
                power: Math.min(100, powerGen),
                carbon: Math.max(0, Math.min(100, prev.carbon + carbonGen * 0.1)),
                happiness: Math.min(100, Math.max(0, prev.happiness + (powerGen > 60 ? 0.5 : -0.5) - (prev.carbon > 70 ? 0.5 : 0)))
            };
        });

    }, [gameState, sources]);

    useEffect(() => {
        const interval = setInterval(updateSimulation, 1000);
        return () => clearInterval(interval);
    }, [updateSimulation]);

    const buildSource = (type: EnergySource) => {
        const costs: Record<EnergySource, number> = { SOLAR: 500, WIND: 800, COAL: 300, NUCLEAR: 2500 };
        if (stats.budget >= costs[type]) {
            setSources(prev => ({ ...prev, [type]: prev[type] + 1 }));
            setStats(s => ({ ...s, budget: s.budget - costs[type] }));
            hapticSelection();

            if (type === "SOLAR" || type === "WIND") {
                setMessage(`Investing in ${type.toLowerCase()} energy. The sky is our battery! ☀️`);
                setMood("happy");
            }
        } else {
            hapticError();
            setMessage("Insufficient funds for this infrastructure. 💸");
        }
    };

    const decommissionSource = (type: EnergySource) => {
        if (sources[type] > 0) {
            setSources(prev => ({ ...prev, [type]: prev[type] - 1 }));
            hapticSelection();
        }
    };

    const startGrid = () => {
        setGameState("GRID");
        setMood("thinking");
        setMessage("Energy grid online. Transition the city to 100% renewables while keeping the lights on! ⚡");
        hapticSuccess();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-slate-950 rounded-[4rem] border border-emerald-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Eco Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.1)_0%,transparent_70%)]" />
                <svg className="absolute inset-0 w-full h-full text-emerald-500/5">
                    <pattern id="eco-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="2" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#eco-grid)" />
                </svg>
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                        <Leaf className="text-emerald-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Eco Engineer</h2>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Sustain-Grid v3.0</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <StatBox label="Carbon Footprint" value={stats.carbon} color={stats.carbon > 60 ? "text-rose-400" : "text-emerald-400"} />
                    <StatBox label="Grid Power" value={stats.power} color="text-sky-400" unit="MW" />
                    <StatBox label="Citizen Mood" value={stats.happiness} color="text-amber-400" />
                    <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end min-w-[140px]">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">BUDGET</span>
                        <span className="text-xl font-black italic text-emerald-400 tabular-nums">${stats.budget}</span>
                    </div>
                </div>
            </div>

            {/* Grid Workspace */}
            <div className="relative z-10 flex-1 flex">
                {/* Left: Infrastructure Panel */}
                <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-4 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Construction Menu</h3>
                    <InfraCard
                        type="SOLAR"
                        count={sources.SOLAR}
                        cost={500}
                        icon={Sun}
                        color="text-amber-400"
                        onBuild={() => buildSource("SOLAR")}
                        onDec={() => decommissionSource("SOLAR")}
                    />
                    <InfraCard
                        type="WIND"
                        count={sources.WIND}
                        cost={800}
                        icon={Wind}
                        color="text-sky-400"
                        onBuild={() => buildSource("WIND")}
                        onDec={() => decommissionSource("WIND")}
                    />
                    <InfraCard
                        type="NUCLEAR"
                        count={sources.NUCLEAR}
                        cost={2500}
                        icon={Activity}
                        color="text-purple-400"
                        onBuild={() => buildSource("NUCLEAR")}
                        onDec={() => decommissionSource("NUCLEAR")}
                    />
                    <div className="mt-auto pt-8 border-t border-white/5">
                        <InfraCard
                            type="COAL"
                            count={sources.COAL}
                            cost={300}
                            icon={Trash2}
                            color="text-zinc-500"
                            onBuild={() => buildSource("COAL")}
                            onDec={() => decommissionSource("COAL")}
                        />
                    </div>
                </div>

                {/* Right: Simulation View */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center relative bg-zinc-950/20">
                    {/* Skyline Visualizer */}
                    <div className="relative w-full max-w-2xl h-80 bg-zinc-900/40 rounded-[3rem] border border-white/5 overflow-hidden shadow-inner flex items-end justify-center px-12 gap-4">
                        {/* Atmosphere Color */}
                        <div className={`absolute inset-0 transition-colors duration-1000 ${stats.carbon > 70 ? 'bg-zinc-800/40' : stats.carbon > 40 ? 'bg-emerald-950/20' : 'bg-sky-900/10'}`} />

                        <AnimatePresence>
                            {/* Wind Turbines */}
                            {Array.from({ length: sources.WIND }).map((_, i) => (
                                <motion.div
                                    key={`wind-${i}`}
                                    {...JUICY_VARIANTS.slideUp}
                                    className="relative h-40 w-8 flex flex-col items-center"
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="h-12 w-12 border-2 border-white/20 rounded-full flex items-center justify-center"
                                    >
                                        <div className="w-1 h-12 bg-white/20 absolute rotate-0" />
                                        <div className="w-1 h-12 bg-white/20 absolute rotate-60" />
                                        <div className="w-1 h-12 bg-white/20 absolute rotate-120" />
                                    </motion.div>
                                    <div className="w-1 h-full bg-white/10" />
                                </motion.div>
                            ))}

                            {/* Solar Panels */}
                            {Array.from({ length: sources.SOLAR }).map((_, i) => (
                                <motion.div
                                    key={`solar-${i}`}
                                    {...JUICY_VARIANTS.slideUp}
                                    className="h-16 w-16 bg-blue-500/20 border-2 border-blue-400/40 rounded-xl mb-4"
                                />
                            ))}

                            {/* Coal Plants */}
                            {Array.from({ length: sources.COAL }).map((_, i) => (
                                <motion.div
                                    key={`coal-${i}`}
                                    {...JUICY_VARIANTS.slideUp}
                                    className="relative h-48 w-24 bg-zinc-800 border-2 border-zinc-700 rounded-t-2xl flex flex-col items-center"
                                >
                                    <motion.div
                                        animate={{ y: [-10, -50], opacity: [0.5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-12 w-8 h-8 bg-zinc-500/40 blur-xl rounded-full"
                                    />
                                    <div className="mt-4 text-[8px] font-black text-zinc-600 uppercase tracking-widest">COAL-X</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Progress Gauge */}
                    <div className="mt-12 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Renewable Mastery</span>
                            <span className="text-xs font-black text-emerald-400">{((sources.SOLAR + sources.WIND) / Math.max(1, sources.SOLAR + sources.WIND + sources.COAL) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-600 to-sky-400 rounded-full"
                                animate={{ width: `${(sources.SOLAR + sources.WIND) / Math.max(1, sources.SOLAR + sources.WIND + sources.COAL) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Start Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center border border-emerald-500/30 mb-8 overflow-hidden group">
                        <Zap className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Power the Future</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        The city relies on you. Transition to green energy, manage your budget, and reduce carbon emissions in 4K resolution.
                    </p>
                    <PhysicalButton
                        onClick={startGrid}
                        className="bg-emerald-600 h-24 px-20 rounded-[3rem] text-2xl"
                    >
                        BOOT SYSTEM ⚡
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function StatBox({ label, value, color, unit = "%" }: { label: string, value: number, color: string, unit?: string }) {
    return (
        <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end min-w-[140px]">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className={`text-xl font-black italic tabular-nums ${color}`}>{value.toFixed(0)}</span>
                <span className="text-[10px] font-bold text-zinc-600">{unit}</span>
            </div>
        </div>
    );
}

function InfraCard({ type, count, cost, icon: Icon, color, onBuild, onDec }: any) {
    return (
        <div className="bg-white/5 border border-white/5 p-5 rounded-3xl flex flex-col gap-4 group hover:bg-zinc-800/60 transition-all">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl bg-zinc-800 border border-white/5 ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Active Units</span>
                    <span className="text-lg font-black text-white tabular-nums">{count}</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase tracking-tighter">{type}</span>
                    <span className="text-[9px] font-bold text-emerald-500/60">${cost}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={onDec} className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center hover:bg-zinc-600 text-white">-</button>
                    <button onClick={onBuild} className="w-12 h-8 rounded-lg bg-emerald-600 flex items-center justify-center hover:bg-emerald-500 text-white text-xs font-black">+</button>
                </div>
            </div>
        </div>
    );
}
