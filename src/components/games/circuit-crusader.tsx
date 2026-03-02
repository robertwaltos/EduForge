"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cpu,
    Zap,
    Activity,
    Settings,
    Power,
    RotateCcw,
    CheckCircle2,
    AlertCircle,
    CircuitBoard,
    Waypoints
} from "lucide-react";
import { hapticSuccess, hapticSelection } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * CIRCUIT CRUSADER - Phase 10 (Advanced Engineering)
 * A 4K high-fidelity electronics simulator.
 * Mechanic: Connect logic gates to power the system core.
 */

type GateType = "AND" | "OR" | "NOT" | "BUFFER";

interface CircuitGate {
    id: string;
    type: GateType;
    inputs: number[]; // Indices of values in current state
    outputValue: boolean;
}

export default function CircuitCrusader() {
    const [gameState, setGameState] = useState<"intro" | "playing" | "success">("playing");
    const [inputs, setInputs] = useState<boolean[]>([true, false, true]);
    const [gateSelection, setGateSelection] = useState<GateType | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Goal: Get the output to be TRUE using gates
    // Logic: (In1 AND In2) OR In3 -> No, let's make it a puzzle
    // Current Setup: In1(T), In2(F), In3(T)
    // Target: T

    const calculateLogic = (type: GateType, a: boolean, b: boolean = false): boolean => {
        switch (type) {
            case "AND": return a && b;
            case "OR": return a || b;
            case "NOT": return !a;
            case "BUFFER": return a;
            default: return false;
        }
    };

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs];
        newInputs[idx] = !newInputs[idx];
        setInputs(newInputs);
        hapticSelection();
    };

    const checkSolution = (type: GateType) => {
        // Simple 2-input logic puzzle for MVP
        const result = calculateLogic(type, inputs[0], inputs[1]);
        if (result === true && inputs[2] === true) {
            handleComplete();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            hapticSelection();
        }
    };

    const handleComplete = () => {
        hapticSuccess();
        setIsSuccess(true);
    };

    return (
        <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden bg-[#020617] border border-indigo-500/20 shadow-2xl font-sans group">
            {/* 4K Circuit Blueprint Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')] bg-cover grayscale mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-transparent to-blue-950/80 pointer-events-none" />

            {/* Animated Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

            {/* Circuit Grid */}
            <div className="absolute inset-x-20 inset-y-12 flex flex-col justify-between">
                {/* Inputs */}
                <div className="flex justify-start gap-8">
                    {inputs.map((val, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleInput(i)}
                            className={`px-8 py-5 rounded-3xl border-2 backdrop-blur-3xl flex items-center gap-4 transition-all ${val ? "bg-indigo-500/20 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.3)]" : "bg-slate-900 border-slate-700 opacity-60"
                                }`}
                        >
                            <div className={`w-3 h-3 rounded-full ${val ? "bg-indigo-400 animate-pulse" : "bg-slate-600"}`} />
                            <span className="text-white font-black tracking-widest text-xs uppercase">Node {i + 1}</span>
                            <span className="text-xl font-mono text-white/50">{val ? "1" : "0"}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Main Interaction Area */}
                <div className="flex-grow flex items-center justify-center relative">
                    {/* Connection Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        {/* Fake wiring for that 4K look */}
                        <path d="M 0 50 Q 100 50 200 150" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="2" filter="url(#glow)" />
                        <path d="M 0 150 Q 100 150 200 150" fill="none" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="2" />
                    </svg>

                    {!isSuccess && (
                        <div className="grid grid-cols-2 gap-4">
                            {(["AND", "OR", "NOT", "BUFFER"] as GateType[]).map((gate) => (
                                <motion.button
                                    key={gate}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => checkSolution(gate)}
                                    className="p-8 bg-black/40 border-2 border-indigo-500/30 rounded-[2rem] flex flex-col items-center gap-4 hover:border-indigo-400 hover:bg-indigo-500/10 transition-colors group/gate"
                                >
                                    <div className="p-4 bg-indigo-500/20 rounded-2xl group-hover/gate:scale-110 transition-transform">
                                        <Waypoints className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <span className="text-white font-black italic tracking-tighter text-2xl uppercase">{gate}</span>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>

                {/* System Core (Output) */}
                <div className="flex justify-end">
                    <motion.div
                        animate={{
                            scale: isSuccess ? 1.1 : 1,
                            borderColor: isSuccess ? "#818cf8" : "rgba(255,255,255,0.1)"
                        }}
                        className={`p-10 rounded-[4rem] border-4 backdrop-blur-3xl flex items-center gap-8 ${isSuccess ? "bg-indigo-500/10" : "bg-black/40"
                            }`}
                    >
                        <div className="w-16 h-16 relative">
                            <MascotFriend id="pixel" size="md" mood={isSuccess ? "happy" : error ? "thinking" : "happy"} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-1">System Core</span>
                            <div className="flex items-center gap-4">
                                <h3 className={`text-4xl font-black italic tracking-tighter uppercase transition-colors ${isSuccess ? "text-white" : "text-slate-600"}`}>
                                    {isSuccess ? "Online" : "Static"}
                                </h3>
                                {isSuccess ? (
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                ) : (
                                    <Activity className="w-8 h-8 text-slate-700 animate-pulse" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Info HUD */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white/40 font-mono text-xs">
                <Settings className="w-4 h-4 animate-spin-slow" />
                <span>Protocol: ELECTRA-9</span>
                <span className="opacity-50">|</span>
                <span>Sub-Logic: Gates Level 1</span>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-indigo-950/95 backdrop-blur-2xl z-50 flex items-center justify-center p-12 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md"
                        >
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="pixel" size="xl" mood="happy" />
                            </div>
                            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
                                Circuit <br /> Optimized!
                            </h2>
                            <p className="text-indigo-300/60 mb-10 text-lg">
                                You have successfully stabilized the electronics logic. The system core is now operating at peak efficiency.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="w-full py-5 bg-indigo-500 text-white rounded-3xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/40 active:scale-95 transition-all"
                            >
                                Advance to Layer 2
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
