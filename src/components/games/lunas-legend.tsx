"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    PenTool,
    Sparkles,
    ChevronRight,
    Star,
    Music,
    Palette,
    Lightbulb,
    Mic,
    Heart
} from "lucide-react";
import { hapticSuccess, hapticSelection } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * LUNA'S LEGEND - Phase 9 (Explorer Batch)
 * A 4K advanced storytelling quest with multi-branching narratives.
 * Theme: Sequential "Explorer" quests (Dora-style) to craft a legendary tale.
 */

interface StoryStep {
    id: string;
    stage: string;
    narrative: string;
    options: {
        text: string;
        impact: string;
        isCorrect: boolean;
    }[];
    x: number;
    y: number;
}

const STORY_STEPS: StoryStep[] = [
    {
        id: "step_1",
        stage: "The Beginning",
        narrative: "Our story starts in the Whispering Woods. Luna finds a glowing feather. What should she do?",
        options: [
            { text: "Follow the light", impact: "Luna follows the trail to a hidden cave.", isCorrect: true },
            { text: "Return to camp", impact: "The story ends too early!", isCorrect: false }
        ],
        x: 20,
        y: 40
    },
    {
        id: "step_2",
        stage: "The Encounter",
        narrative: "Beneath the roots of a giant oak, a silver fox appears. It asks for a rhyme.",
        options: [
            { text: "Sing a song", impact: "The fox dances and reveals a secret path.", isCorrect: true },
            { text: "Climb the tree", impact: "The birds fly away, startled.", isCorrect: false }
        ],
        x: 50,
        y: 60
    },
    {
        id: "step_3",
        stage: "The Legend",
        narrative: "The Great Spirit of the Moon awaits at the summit. Present your gift.",
        options: [
            { text: "Gift of Wisdom", impact: "The moon glows bright with your knowledge.", isCorrect: true },
            { text: "Gift of Gold", impact: "Material things hold no power here.", isCorrect: false }
        ],
        x: 80,
        y: 30
    }
];

export default function LunasLegend() {
    const [stepIndex, setStepIndex] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [impactText, setImpactText] = useState("");
    const [showImpact, setShowImpact] = useState(false);

    const currentStep = STORY_STEPS[stepIndex];

    const handleOptionSelect = (option: typeof currentStep.options[0]) => {
        setImpactText(option.impact);
        setShowImpact(true);

        if (option.isCorrect) {
            hapticSuccess();
            setTimeout(() => {
                setShowImpact(false);
                setCompletedSteps(prev => [...prev, currentStep.id]);
                if (stepIndex < STORY_STEPS.length - 1) {
                    setStepIndex(prev => prev + 1);
                } else {
                    setIsComplete(true);
                }
            }, 2000);
        } else {
            hapticSelection();
            setTimeout(() => {
                setShowImpact(false);
            }, 2000);
        }
    };

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-purple-500/20 shadow-2xl font-sans group">
            {/* 4K Mystical Night Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.4] contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-slate-900/80" />

            {/* Story Nodes */}
            <div className="absolute inset-0 pointer-events-none">
                {STORY_STEPS.map((step, idx) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: idx <= stepIndex ? 1 : 0.2,
                            scale: idx === stepIndex ? 1.1 : 1
                        }}
                        className="absolute"
                        style={{ left: `${step.x}%`, top: `${step.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className={`p-4 rounded-full border-2 backdrop-blur-3xl shadow-2xl ${completedSteps.includes(step.id) ? "bg-purple-500/30 border-purple-400" : "bg-white/5 border-white/20"
                            }`}>
                            <BookOpen className={`w-6 h-6 ${completedSteps.includes(step.id) ? "text-purple-400" : "text-white/40"}`} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* HUD: Story Progress (Top) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl">
                {STORY_STEPS.map((_, i) => (
                    <div key={i} className={`w-12 h-1.5 rounded-full ${i <= stepIndex ? "bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-white/10"}`} />
                ))}
            </div>

            {/* HUD: Luna Interaction & Narrative (Bottom) */}
            <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                    {!isComplete && (
                        <motion.div
                            key={stepIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="bg-black/70 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-8 flex gap-10 items-center overflow-hidden h-64"
                        >
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <MascotFriend id="luna" size="lg" mood={showImpact ? "happy" : "thinking"} />
                            </div>

                            <div className="flex-grow">
                                <AnimatePresence mode="wait">
                                    {showImpact ? (
                                        <motion.div
                                            key="impact"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="text-purple-300 text-2xl font-light italic leading-relaxed"
                                        >
                                            {impactText}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="narrative"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-4"
                                        >
                                            <h3 className="text-purple-400 font-black text-xs tracking-widest uppercase flex items-center gap-2">
                                                <Music className="w-4 h-4" />
                                                Chapter {stepIndex + 1}: {currentStep.stage}
                                            </h3>
                                            <p className="text-white text-3xl font-medium tracking-tight leading-tight">
                                                {currentStep.narrative}
                                            </p>

                                            <div className="flex gap-4 pt-4">
                                                {currentStep.options.map((option, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleOptionSelect(option)}
                                                        className="px-6 py-3 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/40 rounded-xl text-white font-bold transition-all flex items-center gap-2 group/btn"
                                                    >
                                                        <ChevronRight className="w-4 h-4 text-purple-400 group-hover/btn:translate-x-1 transition-transform" />
                                                        {option.text}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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
                        className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center z-50 p-12 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full"
                        >
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="luna" size="xl" mood="happy" />
                            </div>

                            <div className="inline-flex p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl mb-6">
                                <Star className="w-8 h-8 text-purple-400" />
                            </div>

                            <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase mb-4 leading-none">
                                Legend <br /> Written!
                            </h2>
                            <p className="text-white/60 mb-10 text-lg">
                                Your choices have crafted a timeless tale. The moon spirit is pleased with your narrative skill.
                            </p>

                            <button
                                className="w-full py-4 bg-purple-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-500/30 active:scale-95 transition-all"
                            >
                                Share My Legend
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Stars */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
    );
}
