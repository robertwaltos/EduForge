"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Activity, ShieldCheck, Info, ChevronRight, Zap, Target, Microscope, Atom, Dna, Waves, Thermometer, Wind } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Microbiology Types --- */
type CellStructure = "NUCLEUS" | "MITOCHONDRIA" | "RIBOSOME" | "MEMBRANE";

type NanoStats = {
    integrity: number;
    energy: number;
    depth: number;
    resolution: number;
};

export default function NanoNavigator() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "NAVIGATING" | "SAMPLING" | "DANGER">("IDLE");
    const [stats, setStats] = useState<NanoStats>({
        integrity: 100,
        energy: 100,
        depth: 0,
        resolution: 4
    });
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [samples, setSamples] = useState<CellStructure[]>([]);

    const updateMovement = useCallback((dx: number, dy: number) => {
        if (gameState !== "NAVIGATING") return;

        setPosition(prev => ({
            x: Math.min(90, Math.max(10, prev.x + dx)),
            y: Math.min(90, Math.max(10, prev.y + dy))
        }));

        setStats(prev => ({
            ...prev,
            energy: Math.max(0, prev.energy - 0.2),
            depth: prev.depth + 1
        }));

        if (stats.energy < 10) {
            setMessage("Energy reserves critical. Atomic propulsion failing. 🔋");
            setMood("thinking");
        }
    }, [gameState, stats.energy]);

    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") updateMovement(0, -2);
            if (e.key === "ArrowDown") updateMovement(0, 2);
            if (e.key === "ArrowLeft") updateMovement(-2, 0);
            if (e.key === "ArrowRight") updateMovement(2, 0);
        };
        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    }, [updateMovement]);

    const collectSample = (type: CellStructure) => {
        if (samples.includes(type)) return;
        setSamples(prev => [...prev, type]);
        hapticSuccess();
        setMessage(`Biological sample acquired: ${type}. Atomic sequencing complete. 🧬`);
        setMood("happy");

        if (samples.length + 1 === 4) {
            setGameState("SAMPLING");
            setMessage("Metastructure mapping complete. You've successfully navigated the atomic realm. 🏆");
        }
    };

    const startMission = () => {
        setGameState("NAVIGATING");
        setMood("thinking");
        setMessage("Miniaturization complete. Atomic drive engaged. Explore the cellular landscape. 🔬");
        hapticSelection();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-indigo-950/20 rounded-[4rem] border border-indigo-500/20 overflow-hidden shadow-2xl flex flex-col font-sans text-white">
            {/* Molecular Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                {/* Floating Atoms */}
                {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [Math.random() * 1000, Math.random() * 1000],
                            y: [Math.random() * 700, Math.random() * 700],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 10 + Math.random() * 20, repeat: Infinity }}
                        className="absolute w-2 h-2 rounded-full bg-indigo-400/20 blur-sm"
                    />
                ))}
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                        <Microscope className="text-indigo-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Nano Navigator</h2>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Atomic Probe v4.2</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <HudMeter label="Structure Integrity" value={stats.integrity} color="bg-emerald-500" />
                    <HudMeter label="Power Core" value={stats.energy} color="bg-sky-500" />
                    <div className="bg-white/5 border border-white/5 px-6 py-2 rounded-2xl flex flex-col items-end">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">RESOLUTION</span>
                        <span className="text-lg font-black italic text-indigo-400 tabular-nums">{stats.resolution}K HDR</span>
                    </div>
                </div>
            </div>

            {/* Atomic Viewport */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Left: Sensor Array */}
                <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-6 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Activity className="w-3 h-3 text-indigo-400" /> Spectrum Sensor
                    </h3>

                    <SensorCard label="Thermal Variance" value="+2.4°C" icon={Thermometer} />
                    <SensorCard label="Molecular Flow" value="0.5 nm/s" icon={Waves} />
                    <SensorCard label="Photon Density" value="High" icon={Zap} />

                    <div className="mt-auto pt-8 border-t border-white/5">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Sample Collection</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {(["NUCLEUS", "MITOCHONDRIA", "RIBOSOME", "MEMBRANE"] as CellStructure[]).map(s => (
                                <div key={s} className={`p-2 rounded-xl border text-[8px] font-black text-center transition-all
                                    ${samples.includes(s) ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'bg-black/20 border-white/5 text-zinc-600'}`}>
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: The Microcosm */}
                <div className="flex-1 relative p-12 bg-black/20 overflow-hidden cursor-none">
                    {/* Organic Landscape */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 blur-2xl pointer-events-none">
                        <circle cx="20%" cy="30%" r="100" fill="rgba(99,102,241,0.2)" />
                        <circle cx="80%" cy="70%" r="150" fill="rgba(168,85,247,0.2)" />
                        <rect x="40%" y="40%" width="200" height="200" rx="100" fill="rgba(16,185,129,0.1)" />
                    </svg>

                    {/* Interactive Structures */}
                    <StructureNode name="NUCLEUS" x={30} y={30} icon={Atom} color="text-indigo-400" onCollect={() => collectSample("NUCLEUS")} />
                    <StructureNode name="POWER" x={70} y={20} icon={Zap} color="text-amber-400" onCollect={() => collectSample("MITOCHONDRIA")} />
                    <StructureNode name="CODING" x={20} y={70} icon={Dna} color="text-rose-400" onCollect={() => collectSample("RIBOSOME")} />
                    <StructureNode name="BARRIER" x={80} y={80} icon={ShieldCheck} color="text-emerald-400" onCollect={() => collectSample("MEMBRANE")} />

                    {/* The Nano Probe */}
                    <motion.div
                        animate={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            rotate: 360
                        }}
                        transition={{ duration: 0.1, rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
                        className="absolute w-12 h-12 -ml-6 -mt-6 z-50 pointer-events-none"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-indigo-500/40 animate-ping opacity-20" />
                            <div className="w-8 h-8 rounded-full bg-indigo-500 border-4 border-white shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center justify-center">
                                <Target className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Victory Overlay */}
            <AnimatePresence>
                {gameState === "SAMPLING" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/30 mb-8 overflow-hidden group shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                            <Microscope className="w-12 h-12 text-indigo-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Atomic Mastery</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            Mission success. All cellular structures mapped and biological data synthesized at the atomic scale.
                        </p>
                        <PhysicalButton
                            onClick={() => window.location.reload()}
                            className="bg-indigo-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-indigo-400/30"
                        >
                            RETURN TO HUB 🚀
                        </PhysicalButton>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Start Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center border border-indigo-500/30 mb-8 overflow-hidden group">
                        <Atom className="w-12 h-12 text-indigo-400 group-hover:rotate-180 transition-transform duration-1000" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Nano Navigation</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Journey into the microscopic world. Navigate cellular landscapes, collect biological samples, and master the scale of atoms in 4K.
                    </p>
                    <PhysicalButton
                        onClick={startMission}
                        className="bg-indigo-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-indigo-400/30"
                    >
                        ENGAGE PROBE 🔬
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function HudMeter({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                    animate={{ width: `${value}%` }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}

function SensorCard({ label, value, icon: Icon }: any) {
    return (
        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-[10px] font-black uppercase text-zinc-400">{label}</span>
            </div>
            <span className="text-xs font-black text-white tabular-nums">{value}</span>
        </div>
    );
}

function StructureNode({ name, x, y, icon: Icon, color, onCollect }: any) {
    return (
        <motion.button
            onClick={onCollect}
            whileHover={{ scale: 1.1 }}
            className="absolute p-4 rounded-3xl bg-zinc-900/40 border-2 border-white/5 backdrop-blur-xl flex flex-col items-center gap-2 group transition-all hover:bg-zinc-800/60"
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            <div className={`p-4 rounded-2xl bg-zinc-800 border border-white/5 ${color} shadow-lg`}>
                <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{name}</span>
        </motion.button>
    );
}
