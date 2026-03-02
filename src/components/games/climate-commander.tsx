"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Thermometer,
    CloudRain,
    Sun,
    Wind,
    Globe,
    Leaf,
    ArrowUp,
    ArrowDown,
    Activity,
    Factory,
    Waves
} from "lucide-react";
import { hapticSuccess, hapticSelection, hapticWarning } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * CLIMATE COMMANDER - Phase 11 (Expansion Frontier)
 * A 4K high-fidelity global ecology and climate simulator.
 * Mechanic: Balance industrial output with carbon sequestration to stabilize the global temperature.
 */

export default function ClimateCommander() {
    const [emission, setEmission] = useState(60);
    const [sequestration, setSequestration] = useState(20);
    const [temperature, setTemperature] = useState(1.5);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEmissionChange = (val: number) => {
        setEmission(val);
        updateClimate(val, sequestration);
        hapticSelection();
    };

    const handleSequestrationChange = (val: number) => {
        setSequestration(val);
        updateClimate(emission, val);
        hapticSelection();
    };

    const updateClimate = (e: number, s: number) => {
        const net = e - s;
        // Temperature target: 1.0 (Goldilocks zone)
        const newTemp = 0.5 + (net / 20);
        setTemperature(newTemp);

        if (newTemp >= 0.9 && newTemp <= 1.1) {
            hapticSuccess();
            setIsSuccess(true);
        } else if (newTemp > 2.0) {
            hapticWarning();
        }
    };

    return (
        <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-[#020617] border border-emerald-500/20 shadow-2xl font-sans group text-white">
            {/* 4K Earth Background */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-transparent to-blue-950/80 pointer-events-none" />

            {/* HUD */}
            <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 text-emerald-400">
                            <Globe className="w-6 h-6 animate-spin-slow" />
                            <span className="font-black uppercase tracking-[0.4em] text-xs">Planetary Authority</span>
                        </div>
                        <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                            Climate <br /> Commander
                        </h1>
                    </motion.div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="px-6 py-4 bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 flex flex-col items-end">
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Global Variance</span>
                            <span className={`text-4xl font-black italic tracking-tighter ${temperature > 2.0 ? "text-rose-400" : temperature > 1.2 ? "text-amber-400" : "text-emerald-400"}`}>
                                +{temperature.toFixed(2)}°C
                            </span>
                        </div>
                    </div>
                </div>

                {/* Simulation Map / Controls */}
                <div className="flex-grow flex items-center justify-center gap-16">
                    <div className="flex flex-col gap-12 w-1/3">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-rose-400/60">
                                <span>Industrial Output</span>
                                <span>{emission}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={emission}
                                onChange={(e) => handleEmissionChange(Number(e.target.value))}
                                className="w-full h-2 bg-rose-900/30 rounded-full appearance-none accent-rose-400"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-emerald-400/60">
                                <span>Reforestation Index</span>
                                <span>{sequestration}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={sequestration}
                                onChange={(e) => handleSequestrationChange(Number(e.target.value))}
                                className="w-full h-2 bg-emerald-900/30 rounded-full appearance-none accent-emerald-400"
                            />
                        </div>
                    </div>

                    <div className="relative w-64 h-64">
                        {/* Dynamic Earth Glow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: temperature > 2 ? [0.4, 0.8, 0.4] : [0.2, 0.3, 0.2]
                            }}
                            className={`absolute inset-0 rounded-full blur-[60px] ${temperature > 2 ? "bg-rose-500" : "bg-emerald-500"}`}
                        />
                        <div className="relative z-10 w-full h-full rounded-full border-4 border-white/10 p-2 overflow-hidden shadow-2xl">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-80"
                            />
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col gap-4">
                        <div className="p-6 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Activity className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Metrics</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] opacity-40 uppercase">Sea Level</span>
                                    <span className="font-mono text-sm">+{(temperature * 2.4).toFixed(1)}m</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] opacity-40 uppercase">Ice Mass</span>
                                    <span className="font-mono text-sm">{(100 - temperature * 20).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Interaction */}
                <div className="flex items-end justify-between">
                    <div className="w-1/3">
                        <p className="text-white/30 text-[10px] font-mono italic leading-relaxed">
                            Global ecological synchronization active. Calibrate the emission-sequestration ratio to maintain the Holocene equilibrium. Target variance: 1.00°C.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <MascotFriend id="terra" size="md" mood={temperature > 2.5 ? "surprised" : isSuccess ? "happy" : "thinking"} />
                        <div className="flex flex-col items-end">
                            <span className="text-white/20 text-[10px] font-black uppercase tracking-widest mb-2">Simulation State</span>
                            <div className={`px-8 py-4 bg-emerald-500/10 border-2 border-emerald-400/40 rounded-2xl text-emerald-400 font-black italic tracking-widest backdrop-blur-3xl transition-all ${temperature > 2.5 ? "border-rose-500 text-rose-400 bg-rose-500/10 animate-pulse" : ""
                                }`}>
                                {temperature > 2.5 ? "CLIMATE CASCADE" : temperature < 1.1 ? "EQUILIBRIUM" : "STABILIZING..."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-emerald-950/95 backdrop-blur-2xl z-50 flex items-center justify-center p-12 text-center"
                    >
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="max-w-md">
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="terra" size="xl" mood="happy" />
                            </div>
                            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
                                Planet <br /> Stabilized!
                            </h2>
                            <p className="text-emerald-300/60 mb-10 text-lg">
                                You've maintained the delicate balance of the planetary systems. The ecosystem is thriving under your command.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="w-full py-5 bg-emerald-400 text-slate-950 rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/40 active:scale-95 transition-all outline-none"
                            >
                                stabilize next era
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
