"use client";

import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Atom, Zap, Maximize, Target, RefreshCcw, ShieldAlert, Cpu, Layers } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Types --- */
type QuantumParticle = {
    id: string;
    type: "electron" | "photon" | "quark";
    x: number;
    y: number;
    charge: number;
    mass: number;
};

type GravityWell = {
    id: string;
    x: number;
    y: number;
    strength: number;
    targetCharge: number;
};

export default function QuantumQuest() {
    const { setMessage, setMood } = useMascot();
    const [particles, setParticles] = useState<QuantumParticle[]>([]);
    const [wells, setWells] = useState<GravityWell[]>([]);
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "STABILIZED" | "CRITICAL">("IDLE");
    const [energyLevel, setEnergyLevel] = useState(100);
    const [score, setScore] = useState(0);

    const initializeLevel = useCallback(() => {
        const newWells: GravityWell[] = [
            { id: "well-1", x: 30, y: 50, strength: 0.5, targetCharge: 10 },
            { id: "well-2", x: 70, y: 50, strength: 0.5, targetCharge: -10 }
        ];
        setWells(newWells);
        setParticles([]);
        setEnergyLevel(100);
        setGameState("PLAYING");
        setScore(0);
        setMood("thinking");
        setMessage("Quantum stability critical. Deploy particles to balance the gravity wells! ⚛️");
    }, [setMessage, setMood]);

    const deployParticle = (type: QuantumParticle["type"], x: number, y: number) => {
        if (energyLevel <= 0 || gameState !== "PLAYING") return;

        const charges = { electron: -1, photon: 0, quark: 1 };
        const masses = { electron: 1, photon: 0.1, quark: 2 };

        const newParticle: QuantumParticle = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            x: 50, // Origin
            y: 80,
            charge: charges[type],
            mass: masses[type]
        };

        setParticles(prev => [...prev, newParticle]);
        setEnergyLevel(e => Math.max(0, e - 10));
        hapticSelection();
    };

    // Physics Simulation Loop
    useEffect(() => {
        if (gameState !== "PLAYING") return;

        const interval = setInterval(() => {
            setParticles(prev => {
                let updated = prev.map(p => {
                    let nextX = p.x;
                    let nextY = p.y;

                    // Apply forces from wells
                    wells.forEach(well => {
                        const dx = well.x - p.x;
                        const dy = well.y - p.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const force = (well.strength * p.mass) / (dist * dist + 10);

                        nextX += (dx / dist) * force;
                        nextY += (dy / dist) * force;
                    });

                    // Momentum (simulated)
                    nextY -= 0.5;

                    return { ...p, x: nextX, y: nextY };
                });

                // Check for captures
                updated = updated.filter(p => {
                    const captured = wells.find(w => {
                        const dist = Math.sqrt(Math.pow(w.x - p.x, 2) + Math.pow(w.y - p.y, 2));
                        return dist < 5;
                    });

                    if (captured) {
                        setScore(s => s + 500);
                        hapticSelection();
                        return false;
                    }

                    // Remove if out of bounds
                    return p.x > 0 && p.x < 100 && p.y > 0 && p.y < 100;
                });

                return updated;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [gameState, wells]);

    const startGame = () => {
        initializeLevel();
        hapticSuccess();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[650px] bg-slate-950 rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col font-mono">
            {/* 3D Grid & Space Layers */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_80%)]" />
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                        perspective: "1000px",
                        rotateX: 60,
                        transformOrigin: "bottom"
                    }}
                    animate={{ backgroundPositionY: ["0px", "100px"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* UI: HUD Overlay */}
            <div className="relative z-20 p-10 flex justify-between items-start pointer-events-none">
                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] backdrop-blur-2xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Layers className="text-sky-400 w-5 h-5" />
                            <h2 className="text-xl font-black italic tracking-tighter text-white">QUANTUM QUEST</h2>
                        </div>
                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">Singularity Stabilizer v9.1</p>
                    </div>

                    <div className="bg-sky-500/10 border border-sky-500/20 p-5 rounded-[2rem] backdrop-blur-xl">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Quantum Energy</span>
                            <span className="text-xl font-black italic">{energyLevel}%</span>
                        </div>
                        <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-sky-500 shadow-[0_0_15px_#0ea5e9]"
                                animate={{ width: `${energyLevel}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] backdrop-blur-2xl min-w-[140px]">
                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Relativity Sync</p>
                        <p className="text-3xl font-black italic tracking-tighter tabular-nums">{score.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Simulation Space */}
            <div className="relative z-10 flex-1 px-10 pb-10 flex flex-col items-center">
                <div className="relative w-full h-[350px] bg-slate-900/40 rounded-[3rem] border border-white/5 backdrop-blur-sm overflow-hidden border-sky-500/10">
                    {/* Gravity Wells */}
                    {wells.map(well => (
                        <div
                            key={well.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${well.x}%`, top: `${well.y}%` }}
                        >
                            <motion.div
                                className="w-16 h-16 rounded-full border-2 border-dashed border-sky-500/40 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-8 h-8 rounded-full bg-sky-400/20 flex items-center justify-center">
                                    <Target className="w-4 h-4 text-sky-400 opacity-60" />
                                </div>
                            </motion.div>
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center">
                                <span className="text-[8px] font-bold text-sky-500/60 uppercase tracking-widest leading-none">Singularity {well.id.split('-')[1]}</span>
                            </div>
                        </div>
                    ))}

                    {/* Particles */}
                    <AnimatePresence>
                        {particles.map(p => (
                            <motion.div
                                key={p.id}
                                className={`absolute w-3 h-3 rounded-full shadow-lg pointer-events-none
                                    ${p.type === 'electron' ? 'bg-rose-400 shadow-[0_0_10px_#fb7185]' :
                                        p.type === 'photon' ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' :
                                            'bg-sky-400 shadow-[0_0_10px_#38bdf8]'}`}
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    x: "-50%",
                                    y: "-50%"
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Intro Overlay */}
                    {gameState === "IDLE" && (
                        <motion.div
                            {...JUICY_VARIANTS.slideUp}
                            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="bg-sky-500/20 p-6 rounded-[2.5rem] border border-sky-500/30 mb-8">
                                <Atom className="w-16 h-16 text-sky-400 animate-spin-slow" />
                            </div>
                            <h3 className="text-4xl font-black italic tracking-tighter text-white mb-4 uppercase">Quantum Linkage</h3>
                            <p className="text-zinc-400 text-sm max-w-sm mb-12">
                                Launch specialized particles into the gravity wells to stabilize the local quantum field. Don't let the energy core deplete!
                            </p>
                            <PhysicalButton onClick={startGame} className="bg-sky-500 h-20 px-16 rounded-[2.5rem] text-xl">
                                INITIALIZE REACTOR ⚛️
                            </PhysicalButton>
                        </motion.div>
                    )}
                </div>

                {/* Particle Launcher Controls */}
                <div className="mt-8 flex gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <PhysicalButton
                            onClick={() => deployParticle('quark', 50, 80)}
                            className="w-24 h-24 rounded-3xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20"
                        >
                            <Cpu className="w-8 h-8" />
                        </PhysicalButton>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">QUARK</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <PhysicalButton
                            onClick={() => deployParticle('photon', 50, 80)}
                            className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                        >
                            <Zap className="w-8 h-8" />
                        </PhysicalButton>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">PHOTON</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <PhysicalButton
                            onClick={() => deployParticle('electron', 50, 80)}
                            className="w-24 h-24 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                        >
                            <Maximize className="w-8 h-8" />
                        </PhysicalButton>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ELECTRON</span>
                    </div>
                </div>
            </div>

            {/* Scanline / CRT Polish */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,118,0.02))] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
