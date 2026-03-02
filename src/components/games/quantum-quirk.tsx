"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Zap, Cpu, Activity, ShieldCheck, Info, ChevronRight, Target, Atom, Sparkles, Binary, Layers, RotateCcw } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Quantum Logic Types --- */
type QubitState = "0" | "1" | "SUPERPOSITION" | "ENTANGLED";
type QuantumGate = "HADAMARD" | "CNOT" | "NOT" | "MEASURE";

interface Qubit {
    id: string;
    state: QubitState;
    entangledWith?: string;
}

export default function QuantumQuirk() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "SOLVING" | "MEASURED" | "SUCCESS">("IDLE");
    const [qubits, setQubits] = useState<Qubit[]>([
        { id: "Q0", state: "0" },
        { id: "Q1", state: "0" }
    ]);
    const [history, setHistory] = useState<string[]>([]);

    const applyGate = (gate: QuantumGate, targetId: string) => {
        if (gameState !== "SOLVING") return;

        hapticSelection();
        setQubits(prev => prev.map(q => {
            if (q.id === targetId) {
                if (gate === "HADAMARD") {
                    return { ...q, state: "SUPERPOSITION" };
                }
                if (gate === "NOT") {
                    return { ...q, state: q.state === "0" ? "1" : "0" };
                }
                if (gate === "MEASURE") {
                    const collapsed = Math.random() > 0.5 ? "1" : "0";
                    return { ...q, state: collapsed as QubitState };
                }
            }
            return q;
        }));

        setHistory(prev => [...prev.slice(-4), gate]);
    };

    const handleCnot = (controlId: string, targetId: string) => {
        if (gameState !== "SOLVING") return;
        hapticSelection();

        const control = qubits.find(q => q.id === controlId);
        if (control?.state === "1") {
            applyGate("NOT", targetId);
        } else if (control?.state === "SUPERPOSITION") {
            setQubits(prev => prev.map(q => {
                if (q.id === targetId || q.id === controlId) {
                    return { ...q, state: "ENTANGLED", entangledWith: q.id === targetId ? controlId : targetId };
                }
                return q;
            }));
            setMessage("Quantum entanglement achieved! Spooky action at a distance detected. ⚛️");
        }
    };

    const checkSolution = () => {
        const measured = qubits.every(q => q.state === "0" || q.state === "1");
        if (measured) {
            setGameState("SUCCESS");
            hapticSuccess();
            setMessage("Algorithm stabilized. Quantum decoherence avoided! 🏆");
            setMood("happy");
        } else {
            hapticError();
            setMessage("State is still in flux. Collapse the wave function to confirm. 🌊");
        }
    };

    const startQuantumLab = () => {
        setGameState("SOLVING");
        setMood("thinking");
        setMessage("Welcome to the Subatomic Lab. Initialize the qubits and prepare for entanglement. ⚛️");
        hapticSelection();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-slate-950/20 rounded-[4rem] border border-cyan-500/20 overflow-hidden shadow-2xl flex flex-col font-sans text-white">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b210_1px,transparent_1px),linear-gradient(to_bottom,#0891b210_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />
            </div>

            {/* HUD Header */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <Atom className="text-cyan-400 w-8 h-8 animate-spin-slow" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Quantum Quirk</h2>
                        <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">State Processor v2.0</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <StatusIndicator label="COHERENCE" value="98.2%" color="text-cyan-400" />
                    <StatusIndicator label="ENTROPY" value="Low" color="text-emerald-400" />
                    <div className="bg-white/5 border border-white/5 px-6 py-2 rounded-2xl">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">STABILITY</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-sm ${i < 4 ? 'bg-cyan-500' : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Lab Area */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Gate Library */}
                <div className="w-72 border-r border-white/5 p-8 flex flex-col gap-6 bg-black/20">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Gate Library</h3>

                    <GateButton
                        label="Hadamard"
                        icon={Sparkles}
                        color="from-purple-500 to-indigo-600"
                        desc="Create Superposition"
                        onClick={() => applyGate("HADAMARD", "Q0")}
                    />
                    <GateButton
                        label="Pauli-X"
                        icon={Binary}
                        color="from-rose-500 to-orange-600"
                        desc="Flip Qubit State"
                        onClick={() => applyGate("NOT", "Q0")}
                    />
                    <GateButton
                        label="CNOT"
                        icon={Layers}
                        color="from-cyan-500 to-blue-600"
                        desc="Entangle Qubits"
                        onClick={() => handleCnot("Q0", "Q1")}
                    />
                    <GateButton
                        label="Measure"
                        icon={Activity}
                        color="from-emerald-500 to-teal-600"
                        desc="Collapse State"
                        onClick={() => applyGate("MEASURE", "Q0")}
                    />

                    <div className="mt-auto pt-6 border-t border-white/5 text-center">
                        <button
                            onClick={() => {
                                setQubits([{ id: "Q0", state: "0" }, { id: "Q1", state: "0" }]);
                                setHistory([]);
                                hapticSelection();
                            }}
                            className="text-[9px] font-black text-zinc-500 hover:text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-colors mx-auto"
                        >
                            <RotateCcw className="w-3 h-3" /> Reset Circuit
                        </button>
                    </div>
                </div>

                {/* Quantum Circuit Visualizer */}
                <div className="flex-1 relative p-12 flex flex-col justify-center gap-16 overflow-hidden">
                    {/* Circuit Lines */}
                    <div className="absolute inset-0 flex flex-col justify-center gap-16 px-12 opacity-10 pointer-events-none">
                        <div className="h-0.5 w-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                        <div className="h-0.5 w-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    </div>

                    {qubits.map((q, idx) => (
                        <div key={q.id} className="relative flex items-center gap-12 group">
                            <span className="text-sm font-black text-cyan-500/40 w-8">{q.id}</span>

                            <motion.div
                                layout
                                className={`relative w-40 h-40 rounded-[2.5rem] border-2 bg-black/60 backdrop-blur-3xl flex items-center justify-center overflow-hidden transition-all duration-500
                                ${q.state === "SUPERPOSITION" ? 'border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)]' :
                                        q.state === "ENTANGLED" ? 'border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.2)]' :
                                            'border-white/5'}`}
                            >
                                <AnimatePresence mode="wait">
                                    <QubitVisual state={q.state} key={q.state} />
                                </AnimatePresence>

                                {/* Interference Patterns */}
                                {q.state === "SUPERPOSITION" && (
                                    <motion.div
                                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-purple-500/10 blur-xl pointer-events-none"
                                    />
                                )}
                            </motion.div>

                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">STATE</span>
                                <span className={`text-xl font-black italic italic uppercase ${q.state === "SUPERPOSITION" ? "text-purple-400" : q.state === "ENTANGLED" ? "text-cyan-400" : "text-white"}`}>
                                    {q.state}
                                </span>
                            </div>

                            {/* Entanglement Link */}
                            {q.entangledWith && idx === 0 && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 128 }}
                                    className="absolute left-28 top-20 w-1 bg-gradient-to-bottom from-cyan-500 to-cyan-500/0 shadow-[0_0_20px_rgba(6,182,212,0.4)] z-0"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Action */}
            <div className="relative z-20 p-8 bg-zinc-900/40 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-2">
                    {history.map((step, i) => (
                        <div key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                            {step}
                        </div>
                    ))}
                </div>

                <PhysicalButton
                    onClick={checkSolution}
                    className="bg-emerald-600 h-16 px-12 rounded-2xl text-xl shadow-lg border border-emerald-400/20"
                >
                    INITIALIZE MEASUREMENT 🎯
                </PhysicalButton>
            </div>

            {/* Overlays */}
            <AnimatePresence>
                {gameState === "SUCCESS" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="w-24 h-24 bg-cyan-500/20 rounded-[2.5rem] flex items-center justify-center border border-cyan-500/30 mb-8 overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                            <Target className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none italic">Quantum Success</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            Wave function stabilized. Qubits reconciled. Computational integrity at 100%. Masterful work, physicist.
                        </p>
                        <PhysicalButton
                            onClick={() => window.location.reload()}
                            className="bg-cyan-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-cyan-400/30"
                        >
                            RETURN TO HUB ⚛️
                        </PhysicalButton>
                    </motion.div>
                )}

                {gameState === "IDLE" && (
                    <motion.div
                        {...JUICY_VARIANTS.slideUp}
                        className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="w-28 h-28 bg-cyan-500/20 rounded-[3rem] flex items-center justify-center border border-cyan-500/30 mb-8 overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.2)]">
                            <Atom className="w-16 h-16 text-cyan-400 group-hover:rotate-180 transition-transform duration-1000" />
                        </div>
                        <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none italic">Quantum Quirk</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            Master the logic of the subatomic. Apply gates, exploit entanglement, and solve the quirks of quantum computing in immersive 4K.
                        </p>
                        <PhysicalButton
                            onClick={startQuantumLab}
                            className="bg-cyan-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-cyan-400/30"
                        >
                            ACCESS LAB 🔬
                        </PhysicalButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function GateButton({ label, icon: Icon, color, desc, onClick }: any) {
    return (
        <motion.button
            whileHover={{ x: 8 }}
            onClick={onClick}
            className="group flex items-center gap-4 w-full p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all"
        >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
                <span className="block text-sm font-black text-white italic uppercase leading-none">{label}</span>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{desc}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-700 ml-auto group-hover:text-cyan-400" />
        </motion.button>
    );
}

function StatusIndicator({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="text-right">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">{label}</span>
            <span className={`text-xl font-black italic ${color} leading-none tabular-nums`}>{value}</span>
        </div>
    );
}

function QubitVisual({ state }: { state: QubitState }) {
    if (state === "0" || state === "1") {
        return (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-black italic text-white/20 select-none"
            >
                {state}
            </motion.div>
        );
    }

    if (state === "SUPERPOSITION") {
        return (
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-dashed border-purple-400 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-purple-400/40">?</div>
            </div>
        );
    }

    if (state === "ENTANGLED") {
        return (
            <div className="flex gap-2">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-12 h-12 rounded-full bg-cyan-500/40 flex items-center justify-center"
                >
                    <Atom className="w-6 h-6 text-white" />
                </motion.div>
            </div>
        );
    }

    return null;
}
