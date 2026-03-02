"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Atom,
    Activity,
    Shield,
    Thermometer,
    Settings,
    Gauge,
    Flame
} from "lucide-react";
import { hapticSuccess, hapticSelection, hapticWarning } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * FUSION FOUNDER - Phase 10 (Advanced Engineering)
 * A 4K high-fidelity nuclear physics simulator.
 * Mechanic: Stabilize the fusion core by balancing magnetic containment.
 */

export default function FusionFounder() {
    const [gameState, setGameState] = useState<"playing" | "success">("playing");
    const [containment, setContainment] = useState(50);
    const [temperature, setTemperature] = useState(100);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleContainmentChange = (val: number) => {
        setContainment(val);
        // Temperature is a function of containment (sweet spot at 85-95)
        const newTemp = 50 + (val * 1.5);
        setTemperature(newTemp);
        hapticSelection();

        if (val > 88 && val < 94) {
            handleComplete();
        } else if (val > 95) {
            hapticWarning();
        }
    };

    const handleComplete = () => {
        hapticSuccess();
        setIsSuccess(true);
    };

    return (
        <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-[#020617] border border-cyan-500/20 shadow-2xl font-sans group">
            {/* 4K Reactor Core Background */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/80 via-transparent to-blue-950/80 pointer-events-none" />

            {/* HUD */}
            <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 text-cyan-400">
                            <Atom className="w-6 h-6 animate-spin-slow" />
                            <span className="font-black uppercase tracking-[0.4em] text-xs">Reactor Management</span>
                        </div>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                            Fusion <br /> Founder
                        </h1>
                    </motion.div>

                    <div className="flex gap-4">
                        <div className="px-6 py-4 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 flex flex-col items-end">
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Temperature</span>
                            <span className={`text-2xl font-mono font-black ${temperature > 180 ? "text-rose-400" : temperature > 150 ? "text-amber-400" : "text-cyan-400"}`}>
                                {temperature.toFixed(1)} MK
                            </span>
                        </div>
                    </div>
                </div>

                {/* Core Visualization */}
                <div className="flex-grow flex items-center justify-center relative">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Magnetic Fields */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: 360,
                                opacity: containment / 100
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-dashed border-cyan-400/30 rounded-full"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                rotate: -360,
                                opacity: containment / 150
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-blue-400/20 rounded-full p-8"
                        />

                        {/* Plasma Core */}
                        <motion.div
                            animate={{
                                scale: 0.5 + (temperature / 400),
                                backgroundColor: temperature > 180 ? "#fb7185" : temperature > 150 ? "#fbbf24" : "#22d3ee"
                            }}
                            className="w-32 h-32 rounded-full blur-2xl relative z-10 shadow-[0_0_100px_rgba(34,211,238,0.5)]"
                        />
                        <motion.div
                            animate={{
                                scale: 0.2 + (temperature / 800),
                                opacity: [0.8, 1, 0.8]
                            }}
                            className="absolute w-16 h-16 bg-white rounded-full blur-xl z-20"
                        />

                        {/* Particle Ring */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                                className="absolute inset-0"
                            >
                                <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[1px]" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Scanning Text */}
                    <div className="absolute bottom-0 inset-x-0 flex justify-center pb-8">
                        <div className="flex items-center gap-12 font-mono text-[10px] text-white/40">
                            <span className="flex items-center gap-2">
                                <Shield className="w-3 h-3 text-cyan-400" />
                                CONTAINMENT: {containment}%
                            </span>
                            <span className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-amber-400" />
                                OUTPUT: {(temperature * 1.2).toFixed(0)} GW
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interaction Footer */}
                <div className="flex items-end justify-between">
                    <div className="w-1/2 flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center pr-4">
                                <span className="text-cyan-400/60 font-black uppercase tracking-widest text-[10px]">Magnetic Pressure</span>
                                <span className="text-white/40 font-mono text-[10px] italic">Target: 90.0% - 93.0%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={containment}
                                onChange={(e) => handleContainmentChange(Number(e.target.value))}
                                className="w-full h-3 bg-cyan-950/50 rounded-full appearance-none cursor-pointer accent-cyan-400"
                            />
                        </div>
                        <p className="text-white/30 text-xs font-mono italic">
                            Stabilize the deuterium-tritium plasma core using magnetohydrodynamic pressure.
                            Warning: Critical thermal excursion beyond 200 MK.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16">
                            <MascotFriend id="spark" size="md" mood={isSuccess ? "happy" : temperature > 180 ? "surprised" : "thinking"} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-2">Simulation State</span>
                            <div className={`px-8 py-4 rounded-2xl border-2 backdrop-blur-3xl font-black italic uppercase tracking-widest transition-all ${isSuccess ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]" :
                                    temperature > 180 ? "bg-rose-500/10 border-rose-400 text-rose-400 shadow-[0_0_30px_rgba(251,113,133,0.3)] animate-pulse" :
                                        "bg-cyan-500/10 border-cyan-400 text-cyan-400"
                                }`}>
                                {isSuccess ? "Ignition" : temperature > 180 ? "Danger" : "Reacting"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl z-50 flex items-center justify-center p-12 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md"
                        >
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="spark" size="xl" mood="happy" />
                            </div>
                            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
                                Fusion <br /> Ignited!
                            </h2>
                            <p className="text-cyan-300/60 mb-10 text-lg">
                                You've maintained a stable magnetic bottle. Net energy gain achieved.
                                Infinite power for the experience hub unlocked!
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="w-full py-5 bg-cyan-400 text-slate-950 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-cyan-500/40 active:scale-95 transition-all outline-none"
                            >
                                stabilize next core
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
