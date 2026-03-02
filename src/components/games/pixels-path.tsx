"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Lock,
    Unlock,
    Terminal,
    Network,
    Cpu,
    CheckCircle2,
    AlertTriangle,
    Eye,
    Zap
} from "lucide-react";
import { hapticSuccess, hapticSelection } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * PIXEL'S PATH - Phase 9 (Explorer Batch)
 * A 4K digital frontier quest focusing on network protocols and safety.
 * Theme: Sequential "Explorer" quests (Dora-style) to secure a digital landscape.
 */

interface ProtocolNode {
    id: string;
    step: string;
    description: string;
    challenge: string;
    answer: string;
    x: number;
    y: number;
}

const PROTOCOL_STEPS: ProtocolNode[] = [
    {
        id: "node_1",
        step: "Gateway Security",
        description: "The digital gates require a firewall. Identify the correct port for secure traffic.",
        challenge: "Secure Web Port? (443 or 80)",
        answer: "443",
        x: 20,
        y: 50
    },
    {
        id: "node_2",
        step: "Packet Inspection",
        description: "A suspicious packet is trying to enter. Verify the encryption key length.",
        challenge: "2^8 bits? (256 or 128)",
        answer: "256",
        x: 50,
        y: 20
    },
    {
        id: "node_3",
        step: "Core Protection",
        description: "The central mainframe needs a final lock. Close the loop.",
        challenge: "Enable MFA? (YES or NO)",
        answer: "YES",
        x: 80,
        y: 60
    }
];

export default function PixelsPath() {
    const [stepIndex, setStepIndex] = useState(0);
    const [securedNodes, setSecuredNodes] = useState<string[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState(false);

    const currentStep = PROTOCOL_STEPS[stepIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const input = userInput.trim().toUpperCase();

        if (input === currentStep.answer) {
            handleSuccess();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            hapticSelection();
        }
    };

    const handleSuccess = useCallback(() => {
        hapticSuccess();
        setSecuredNodes(prev => [...prev, currentStep.id]);
        setUserInput("");

        if (stepIndex < PROTOCOL_STEPS.length - 1) {
            setStepIndex(prev => prev + 1);
        } else {
            setIsComplete(true);
        }
    }, [stepIndex, currentStep.id]);

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-blue-500/20 shadow-2xl font-sans group">
            {/* 4K Cyber-Grid Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.2] opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20" />

            {/* Network Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                    d={`M ${PROTOCOL_STEPS[0].x}% ${PROTOCOL_STEPS[0].y}% L ${PROTOCOL_STEPS[1].x}% ${PROTOCOL_STEPS[1].y}% L ${PROTOCOL_STEPS[2].x}% ${PROTOCOL_STEPS[2].y}%`}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                />
            </svg>

            <div className="absolute inset-0 pointer-events-none">
                {PROTOCOL_STEPS.map((node, idx) => (
                    <motion.div
                        key={node.id}
                        initial={{ scale: 0 }}
                        animate={{
                            scale: 1,
                            opacity: idx <= stepIndex ? 1 : 0.3
                        }}
                        className="absolute"
                        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className={`p-4 rounded-xl border-2 backdrop-blur-3xl transition-all duration-500 ${securedNodes.includes(node.id) ? "bg-blue-500/20 border-blue-400" : idx === stepIndex ? "bg-white/5 border-blue-400/50 animate-pulse" : "bg-white/5 border-white/10"
                            }`}>
                            {securedNodes.includes(node.id) ? (
                                <Lock className="w-6 h-6 text-blue-400" />
                            ) : (
                                <Unlock className="w-6 h-6 text-white/30" />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* HUD: Digital Firewall Status (Top Right) */}
            <div className="absolute top-6 right-6 flex items-center gap-4 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4">
                <div className="flex flex-col items-end">
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Firewall Integrity</span>
                    <div className="text-xl font-mono font-bold text-white tracking-tighter">
                        {((securedNodes.length / PROTOCOL_STEPS.length) * 100).toFixed(0)}%
                    </div>
                </div>
                <Shield className={`w-8 h-8 ${securedNodes.length === PROTOCOL_STEPS.length ? "text-blue-400" : "text-white/20"}`} />
            </div>

            {/* HUD: Pixel Interaction & Challenge (Bottom) */}
            <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                    {!isComplete && (
                        <motion.div
                            key={stepIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="bg-slate-900/90 backdrop-blur-3xl border border-blue-500/30 rounded-3xl p-8 flex gap-8 items-center"
                        >
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <MascotFriend id="pixel" size="lg" mood={error ? "thinking" : "happy"} />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-blue-400 font-black text-xs tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                                    <Terminal className="w-4 h-4" />
                                    Security Protocol: {currentStep.step}
                                </h3>
                                <p className="text-white text-xl font-medium leading-tight mb-2">
                                    {currentStep.description}
                                </p>
                                <div className="text-blue-400/80 font-mono text-sm flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Challenge: {currentStep.challenge}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="flex gap-4">
                                <input
                                    autoFocus
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="ENTRY"
                                    className={`w-32 px-4 py-4 bg-black/50 border-2 rounded-2xl text-center text-blue-400 font-mono text-xl font-bold transition-all outline-none ${error ? "border-red-500" : "border-blue-500/30 focus:border-blue-400"
                                        }`}
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
                                >
                                    Confirm
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
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full relative z-10"
                        >
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="pixel" size="xl" mood="happy" />
                            </div>

                            <div className="inline-flex p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-6">
                                <Zap className="w-8 h-8 text-blue-400" />
                            </div>

                            <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">
                                Firewall <br /> Engaged!
                            </h2>
                            <p className="text-white/60 mb-10 text-lg">
                                The digital landscape is secured. Your understanding of protocols has saved the network.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
                                    <div className="text-2xl font-bold text-white mb-1">SECURE</div>
                                    <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Status</div>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
                                    <div className="text-2xl font-bold text-white mb-1">AES-256</div>
                                    <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Encryption</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Overlays */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
    );
}
