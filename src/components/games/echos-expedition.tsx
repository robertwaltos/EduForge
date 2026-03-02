"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Compass,
    Map as MapIcon,
    Search,
    History,
    ChevronRight,
    Star,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
    Scroll,
    Globe,
    Camera
} from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSuccess, hapticSelection } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * ECHO'S EXPEDITION - Phase 9 (Explorer Batch)
 * A 4K historical scavenger hunt with sequential map-based quests.
 * Theme: "Dora the Explorer" style interaction with premium aesthetics.
 */

interface QuestStep {
    id: string;
    title: string;
    instruction: string;
    x: number;
    y: number;
    targetId: string;
    hint: string;
}

const QUEST_STEPS: QuestStep[] = [
    {
        id: "start",
        title: "The Ancient Portal",
        instruction: "Welcome, Explorer! We need to locate the Rosetta Stone fragment. Look near the pyramid base.",
        x: 30,
        y: 60,
        targetId: "rosetta",
        hint: "It's a dark stone with mysterious writings."
    },
    {
        id: "temple",
        title: "Temple of Knowledge",
        instruction: "Great find! Now, we must identify the Great Library's symbol. Search the upper columns.",
        x: 70,
        y: 30,
        targetId: "scroll",
        hint: "Look for a symbol shaped like an ancient scroll."
    },
    {
        id: "artifact",
        title: "The Lost Amulet",
        instruction: "The final piece is hidden in the oasis. Find the Golden Ankh beneath the palm trees.",
        x: 50,
        y: 80,
        targetId: "ankh",
        hint: "It's shining bright gold in the sand."
    }
];

export default function EchosExpedition() {
    const [stepIndex, setStepIndex] = useState(0);
    const [foundItems, setFoundItems] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [scannerPos, setScannerPos] = useState({ x: 0, y: 0 });
    const [isScanning, setIsScanning] = useState(false);

    const currentStep = QUEST_STEPS[stepIndex];

    const handleInteract = (e: React.MouseEvent | React.TouchEvent) => {
        if (isComplete) return;

        const bounds = e.currentTarget.getBoundingClientRect();
        const x = (('touches' in e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX) - bounds.left;
        const y = (('touches' in e) ? e.touches[0].clientY : (e as React.MouseEvent).clientY) - bounds.top;

        const pctX = (x / bounds.width) * 100;
        const pctY = (y / bounds.height) * 100;

        setScannerPos({ x, y });
        setIsScanning(true);
        setTimeout(() => setIsScanning(false), 500);

        // Check if close to current target
        const dist = Math.sqrt(Math.pow(pctX - currentStep.x, 2) + Math.pow(pctY - currentStep.y, 2));

        if (dist < 5) {
            handleSuccess();
        } else {
            hapticSelection();
        }
    };

    const handleSuccess = useCallback(() => {
        hapticSuccess();
        setFoundItems(prev => [...prev, currentStep.targetId]);

        if (stepIndex < QUEST_STEPS.length - 1) {
            setStepIndex(prev => prev + 1);
            setShowHint(false);
        } else {
            setIsComplete(true);
        }
    }, [stepIndex, currentStep.targetId]);

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl font-sans group">
            {/* 4K Background Environment (Cinematic Matte) */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-50 opacity-60 mix-blend-overlay" />

            {/* Interactive Map Overlay */}
            <motion.div
                className="absolute inset-0 cursor-crosshair"
                onMouseDown={handleInteract}
                onTouchStart={handleInteract}
            >
                {/* Scanner Effect */}
                <AnimatePresence>
                    {isScanning && (
                        <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute pointer-events-none w-20 h-20 border-2 border-blue-400/50 rounded-full"
                            style={{ left: scannerPos.x - 40, top: scannerPos.y - 40 }}
                        />
                    )}
                </AnimatePresence>

                {/* Hotspots (Hidden for exploration) */}
                {QUEST_STEPS.map((step, idx) => (
                    foundItems.includes(step.targetId) && (
                        <motion.div
                            key={step.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute w-8 h-8 flex items-center justify-center"
                            style={{ left: `${step.x}%`, top: `${step.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping" />
                            <CheckCircle2 className="w-6 h-6 text-yellow-400" />
                        </motion.div>
                    )
                ))}
            </motion.div>

            {/* HUD: Left Column (Progress) */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-3">
                    <MapIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Expedition Map</span>
                </div>

                <div className="flex flex-col gap-2">
                    {QUEST_STEPS.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            animate={{
                                opacity: idx <= stepIndex ? 1 : 0.4,
                                x: idx === stepIndex ? 10 : 0
                            }}
                            className={`px-4 py-2 rounded-xl flex items-center gap-3 border ${idx === stepIndex ? "bg-blue-500/20 border-blue-500/50" : "bg-black/40 border-white/10"
                                }`}
                        >
                            {foundItems.includes(step.targetId) ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : idx === stepIndex ? (
                                <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                            ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                            )}
                            <span className="text-sm text-white/80 font-medium">{step.title}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* HUD: Mascot Interactive Guidance (Dora Style) */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
                <AnimatePresence mode="wait">
                    {!isComplete && (
                        <motion.div
                            key={stepIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex gap-6 items-center"
                        >
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <MascotFriend id="echo" size="lg" mood={showHint ? "thinking" : "happy"} />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-blue-400 font-bold text-lg mb-1 flex items-center gap-2">
                                    <Compass className="w-5 h-5" />
                                    Expedition Guide
                                </h3>
                                <p className="text-white/90 text-xl leading-relaxed">
                                    {showHint ? currentStep.hint : currentStep.instruction}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    hapticSelection();
                                    setShowHint(!showHint);
                                }}
                                className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${showHint ? "bg-white text-slate-900" : "bg-blue-500 text-white"
                                    } shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95`}
                            >
                                <Search className="w-5 h-5" />
                                {showHint ? "Hide Hint" : "Get Hint"}
                            </button>
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
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-3xl flex items-center justify-center p-12 z-50 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full"
                        >
                            <div className="w-32 h-32 mx-auto mb-8">
                                <MascotFriend id="echo" size="xl" mood="happy" />
                            </div>

                            <div className="inline-flex p-3 bg-yellow-500/20 rounded-2xl mb-6">
                                <Globe className="w-8 h-8 text-yellow-400" />
                            </div>

                            <h2 className="text-5xl font-black text-white mb-4 italic tracking-tight uppercase">
                                Expedition <br /> Complete!
                            </h2>

                            <p className="text-white/60 text-lg mb-8">
                                You've archived the fragments of history. Your legacy is secured in the 4K archives.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="text-2xl font-bold text-white tracking-widest uppercase mb-1">3 / 3</div>
                                    <div className="text-xs text-blue-400 font-bold uppercase tracking-tighter">Artifacts Found</div>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <div className="text-2xl font-bold text-white tracking-widest uppercase mb-1">4K</div>
                                    <div className="text-xs text-blue-400 font-bold uppercase tracking-tighter">Resolution</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cinematic Overlay - Grain & Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}
