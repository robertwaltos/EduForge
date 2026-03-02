"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Globe, Mountain, Waves, Flame, Activity, ShieldCheck, Thermometer, Info, ChevronRight, Zap } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Geology Types --- */
type Plate = {
    id: string;
    type: "OCEANIC" | "CONTINENTAL";
    pos: { x: number; y: number };
    vector: { x: number; y: number };
};

export default function TectonicTrek() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "SIMULATING" | "EARTHQUAKE" | "STABLE">("IDLE");
    const [plates, setPlates] = useState<Plate[]>([
        { id: "p1", type: "CONTINENTAL", pos: { x: 30, y: 50 }, vector: { x: 0, y: 0 } },
        { id: "p2", type: "OCEANIC", pos: { x: 70, y: 50 }, vector: { x: 0, y: 0 } }
    ]);
    const [stats, setStats] = useState({
        tension: 0,
        elevation: 10,
        volcanic: 0
    });

    const updateSimulation = useCallback(() => {
        if (gameState !== "SIMULATING") return;

        setPlates(prev => {
            const next = prev.map(p => ({
                ...p,
                pos: {
                    x: Math.max(0, Math.min(100, p.pos.x + p.vector.x)),
                    y: Math.max(0, Math.min(100, p.pos.y + p.vector.y))
                }
            }));

            // Collision / Tension Logic
            const dist = Math.abs(next[0].pos.x - next[1].pos.x);
            if (dist < 10) {
                setStats(s => ({
                    ...s,
                    tension: Math.min(100, s.tension + 1),
                    elevation: s.elevation + 0.1,
                    volcanic: s.volcanic + 0.05
                }));
            } else {
                setStats(s => ({ ...s, tension: Math.max(0, s.tension - 0.5) }));
            }

            return next;
        });

    }, [gameState]);

    useEffect(() => {
        const interval = setInterval(updateSimulation, 100);
        return () => clearInterval(interval);
    }, [updateSimulation]);

    // Tension Release (Earthquake)
    useEffect(() => {
        if (stats.tension > 90) {
            setGameState("EARTHQUAKE");
            hapticError();
            setMood("surprised");
            setMessage("Tectonic tension reached critical limit! seismic event detected! 🌋");

            setTimeout(() => {
                setStats(s => ({ ...s, tension: 0, elevation: s.elevation + 5 }));
                setGameState("SIMULATING");
                setMood("happy");
                setMessage("Tension released. A new mountain range has formed. Nature's power is immense! 🏔️");
                hapticSuccess();
            }, 3000);
        }
    }, [stats.tension, setMood, setMessage]);

    const movePlate = (id: string, vx: number) => {
        setPlates(prev => prev.map(p => p.id === id ? { ...p, vector: { ...p.vector, x: vx } } : p));
        hapticSelection();
    };

    const startSim = () => {
        setGameState("SIMULATING");
        setMood("thinking");
        setMessage("Tectonic plates initialized. Guide the lithospheric movement to shape the planet! 🌍");
        hapticSuccess();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[650px] bg-slate-950 rounded-[4rem] border border-orange-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Topographic Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
                {/* SVG Contours */}
                <svg className="absolute inset-0 w-full h-full text-orange-500/5">
                    <defs>
                        <pattern id="contour" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contour)" />
                </svg>
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                        <Mountain className="text-orange-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Tectonic Trek</h2>
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Lithosphere Sim v4.2</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <StatBox label="Seismic Tension" value={stats.tension} color="text-rose-400" />
                    <StatBox label="Mean Elevation" value={stats.elevation} color="text-sky-400" unit="km" />
                    <StatBox label="Volcanic Activity" value={stats.volcanic} color="text-orange-400" />
                </div>
            </div>

            {/* Main Area: Crust Simulation */}
            <div className={`relative z-10 flex-1 p-10 flex flex-col items-center justify-center transition-all duration-300 ${gameState === "EARTHQUAKE" ? 'shake-animation' : ''}`}>

                {/* Visualizer: The Earth's Crust */}
                <div className="relative w-full max-w-3xl h-64 bg-zinc-900/40 rounded-[3rem] border border-white/5 overflow-hidden flex items-end">
                    {/* Mantle Glow */}
                    <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-orange-600/50 to-transparent" />

                    {/* The Plates */}
                    {plates.map(plate => (
                        <motion.div
                            key={plate.id}
                            className={`absolute bottom-4 h-32 rounded-2xl flex flex-col items-center justify-center border-t-4 shadow-2xl
                                ${plate.type === "CONTINENTAL" ? 'w-48 bg-stone-700 border-stone-500' : 'w-64 bg-slate-800 border-slate-600'}`}
                            animate={{ left: `${plate.pos.x}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                            style={{ x: "-50%" }}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{plate.type}</span>
                            {plate.type === "CONTINENTAL" ? <Mountain className="w-8 h-8 text-white/10" /> : <Waves className="w-8 h-8 text-white/10" />}
                        </motion.div>
                    ))}

                    {/* Collision Glow */}
                    {Math.abs(plates[0].pos.x - plates[1].pos.x) < 15 && (
                        <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 blur-[60px]"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    )}
                </div>

                {/* Controls */}
                {gameState === "SIMULATING" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 flex gap-12"
                    >
                        <PlateControl label="North American Plate" onMove={(v) => movePlate("p1", v)} />
                        <PlateControl label="Pacific Plate" onMove={(v) => movePlate("p2", v)} />
                    </motion.div>
                )}

                {/* Earthquake Alert */}
                <AnimatePresence>
                    {gameState === "EARTHQUAKE" && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-rose-500/20 backdrop-blur-sm"
                        >
                            <div className="bg-rose-600 text-white px-12 py-6 rounded-[2rem] shadow-2xl flex items-center gap-6 animate-pulse">
                                <Flame className="w-10 h-10" />
                                <span className="text-3xl font-black italic uppercase tracking-tighter">Seismic Event!</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Start Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-orange-500/20 rounded-[2.5rem] flex items-center justify-center border border-orange-500/30 mb-8 overflow-hidden group">
                        <Globe className="w-12 h-12 text-orange-400 group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Shape the Earth</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Control the tectonic plates and witness the formation of continents. Balance the tension to avoid catastrophic events in 4K.
                    </p>
                    <PhysicalButton
                        onClick={startSim}
                        className="bg-orange-600 h-24 px-20 rounded-[3rem] text-2xl"
                    >
                        INITIALIZE CRUST 🌐
                    </PhysicalButton>
                </motion.div>
            )}

            <style jsx>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
                .shake-animation {
                    animation: shake 0.5s infinite;
                }
            `}</style>
        </div>
    );
}

function StatBox({ label, value, color, unit = "%" }: { label: string, value: number, color: string, unit?: string }) {
    return (
        <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end min-w-[140px]">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className={`text-xl font-black italic tabular-nums ${color}`}>{value.toFixed(1)}</span>
                <span className="text-[10px] font-bold text-zinc-600">{unit}</span>
            </div>
        </div>
    );
}

function PlateControl({ label, onMove }: { label: string, onMove: (v: number) => void }) {
    return (
        <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="flex gap-2">
                <button
                    onMouseDown={() => onMove(-0.2)}
                    onMouseUp={() => onMove(0)}
                    className="w-16 h-16 bg-zinc-800 border border-white/5 rounded-2xl text-white flex items-center justify-center hover:bg-zinc-700 active:scale-90 transition-all"
                >
                    ←
                </button>
                <button
                    onMouseDown={() => onMove(0.2)}
                    onMouseUp={() => onMove(0)}
                    className="w-16 h-16 bg-zinc-800 border border-white/5 rounded-2xl text-white flex items-center justify-center hover:bg-zinc-700 active:scale-90 transition-all"
                >
                    →
                </button>
            </div>
        </div>
    );
}
