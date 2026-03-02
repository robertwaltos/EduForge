"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Clock,
    BookOpen,
    Shield,
    CheckCircle2,
    AlertCircle,
    RotateCcw,
    Zap,
    Map
} from "lucide-react";
import {
    JUICY_SPRINGS,
    JUICY_VARIANTS
} from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import JuicyConfetti from "@/components/experience/JuicyConfetti";
import { hapticSuccess, hapticError, hapticSelection } from "@/lib/platform/haptics";
import { useMascot } from "@/components/experience/MascotHost";

// 4K Noir Color Palette
const NOIR_COLORS = {
    bg: "bg-[#0a0a0c]",
    glass: "bg-white/5 backdrop-blur-2xl border-white/10",
    accent: "text-amber-400",
    accentBg: "bg-amber-400/20",
    accentBorder: "border-amber-400/30",
    dim: "text-slate-500",
    bright: "text-white"
};

interface Clue {
    id: string;
    name: string;
    description: string;
    year: number;
    found: boolean;
    x: number; // Percent
    y: number; // Percent
    category: "artifact" | "document" | "tool";
}

const HISTORICAL_CASES = [
    {
        id: "case-1",
        title: "The Lost Library of Alexandria",
        era: "Ancient World",
        clues: [
            { id: "c1", name: "Papyrus Fragment", description: "A fragment of a scroll detailing celestial movements.", year: -300, found: false, x: 20, y: 30, category: "document" },
            { id: "c2", name: "Bronze Astrolabe", description: "An ancient tool for navigating by the stars.", year: -150, found: false, x: 70, y: 20, category: "tool" },
            { id: "c3", name: "Limestone Relief", description: "Depicts a scholar teaching students in a great hall.", year: -250, found: false, x: 45, y: 75, category: "artifact" },
        ]
    },
    {
        id: "case-2",
        title: "The Renaissance Workshop",
        era: "15th Century",
        clues: [
            { id: "c1", name: "Drafting Compass", description: "Used for precise anatomical sketches.", year: 1480, found: false, x: 15, y: 40, category: "tool" },
            { id: "c2", name: "Silver Denarius", description: "Currency from a forgotten trade route.", year: 1492, found: false, x: 80, y: 60, category: "artifact" },
            { id: "c3", name: "Codex Page", description: "Mirror-written notes on flying machines.", year: 1505, found: false, x: 55, y: 15, category: "document" },
        ]
    }
];

export default function ChronicleCase() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"briefing" | "investigation" | "deduction" | "solved">("briefing");
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
    const [clues, setClues] = useState<Clue[]>([]);
    const [foundCount, setFoundCount] = useState(0);
    const [timeline, setTimeline] = useState<Clue[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [searchPos, setSearchPos] = useState({ x: 50, y: 50 });
    const containerRef = useRef<HTMLDivElement>(null);

    const currentCase = HISTORICAL_CASES[currentCaseIndex];

    useEffect(() => {
        setClues(currentCase.clues.map(c => ({ ...c })) as Clue[]);
    }, [currentCaseIndex, currentCase.clues]);

    const startInvestigation = () => {
        setGameState("investigation");
        setMessage(`Attention, Investigator. We need to recover ${currentCase.clues.length} temporal fragments from ${currentCase.era}. Search the area carefully.`);
        setMood("thinking");
        hapticSelection();
    };

    const handleSearch = (e: React.MouseEvent | React.TouchEvent) => {
        if (gameState !== "investigation") return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = (e as any).touches ? (e as any).touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = (e as any).touches ? (e as any).touches[0].clientY : (e as React.MouseEvent).clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        setSearchPos({ x, y });

        // Check for clue hits
        clues.forEach((clue, idx) => {
            if (!clue.found) {
                const dist = Math.sqrt(Math.pow(x - clue.x, 2) + Math.pow(y - clue.y, 2));
                if (dist < 8) { // Hit threshold
                    const updatedClues = [...clues];
                    updatedClues[idx].found = true;
                    setClues(updatedClues);
                    setFoundCount(prev => prev + 1);
                    hapticSuccess();
                    setMessage(`Excellent. Found the ${clue.name}. It dates back to ${Math.abs(clue.year)} ${clue.year < 0 ? 'BCE' : 'CE'}.`);

                    if (foundCount + 1 === clues.length) {
                        setTimeout(() => {
                            setGameState("deduction");
                            setMessage("All clues recovered. Now, reconstruct the timeline to stabilize the narrative.");
                        }, 1500);
                    }
                }
            }
        });
    };

    const addToTimeline = (clue: Clue) => {
        if (timeline.find(c => c.id === clue.id)) return;
        setTimeline([...timeline, clue]);
        hapticSelection();
    };

    const checkTimeline = () => {
        const isCorrect = timeline.every((clue, idx) => {
            if (idx === 0) return true;
            return clue.year >= timeline[idx - 1].year;
        }) && timeline.length === clues.length;

        if (isCorrect) {
            setGameState("solved");
            setShowConfetti(true);
            hapticSuccess();
            setMessage("Timeline stabilized. History is preserved thanks to your keen eye.");
            setMood("cheering");
        } else {
            hapticError();
            setMessage("The timeline is fragmented. Reorder the artifacts chronologically.");
            setTimeline([]);
            setMood("sad");
        }
    };

    return (
        <div className={`relative h-[650px] w-full rounded-[3rem] overflow-hidden border-4 border-white/10 ${NOIR_COLORS.bg} font-sans`}>
            {/* 4K Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#ffffff10_0%,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            </div>

            <AnimatePresence mode="wait">
                {gameState === "briefing" && (
                    <motion.div
                        key="briefing"
                        initial="initial"
                        animate="animate"
                        variants={JUICY_VARIANTS.impact}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center p-12 text-center space-y-8"
                    >
                        <div className="p-6 rounded-full bg-amber-400/20 border border-amber-400/30">
                            <Map className="w-16 h-16 text-amber-400" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">
                                Case #0{currentCaseIndex + 1}: <span className="text-amber-400">{currentCase.title}</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                                A temporal anomaly has scattered key historical data across the {currentCase.era}.
                                Recover the fragments and reconstruct the sequence of events.
                            </p>
                        </div>
                        <PhysicalButton onClick={startInvestigation} className="bg-amber-400 text-black h-16 px-12 text-xl">
                            BEGIN INVESTIGATION 🔎
                        </PhysicalButton>
                    </motion.div>
                )}

                {gameState === "investigation" && (
                    <motion.div
                        key="investigation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10"
                        ref={containerRef}
                        onMouseMove={handleSearch}
                        onTouchMove={handleSearch}
                    >
                        {/* Investigation HUD */}
                        <div className="absolute top-8 left-8 z-30 flex items-center gap-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-3xl">
                            <div className="flex items-center gap-2">
                                <Search className="w-5 h-5 text-amber-400" />
                                <span className="text-white font-black text-sm uppercase tracking-widest">Scanning {currentCase.era}...</span>
                            </div>
                            <div className="w-[1px] h-8 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-400" />
                                <span className="text-white font-black text-sm uppercase tracking-widest">Clues: {foundCount}/{clues.length}</span>
                            </div>
                        </div>

                        {/* Search Magnifier */}
                        <motion.div
                            className="absolute pointer-events-none z-20"
                            animate={{ x: `${searchPos.x}%`, y: `${searchPos.y}%` }}
                            transition={JUICY_SPRINGS.stiff}
                            style={{ left: -100, top: -100 }}
                        >
                            <div className="w-[200px] h-[200px] rounded-full border-2 border-amber-400/50 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full bg-amber-400/5 blur-xl animate-pulse" />
                                <div className="w-[2px] h-[20px] bg-amber-400/80 absolute top-0" />
                                <div className="w-[2px] h-[20px] bg-amber-400/80 absolute bottom-0" />
                                <div className="h-[2px] w-[20px] bg-amber-400/80 absolute left-0" />
                                <div className="h-[2px] w-[20px] bg-amber-400/80 absolute right-0" />
                            </div>
                        </motion.div>

                        {/* Hidden Clues (Only visible when searching nearby) */}
                        {clues.map((clue) => {
                            const dist = Math.sqrt(Math.pow(searchPos.x - clue.x, 2) + Math.pow(searchPos.y - clue.y, 2));
                            const isNearby = dist < 15;
                            const isFound = clue.found;

                            return (
                                <motion.div
                                    key={clue.id}
                                    className="absolute"
                                    style={{ left: `${clue.x}%`, top: `${clue.y}%` }}
                                >
                                    <AnimatePresence>
                                        {(isNearby || isFound) && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: isFound ? 1 : 0.6 }}
                                                className={`p-4 rounded-2xl ${isFound ? 'bg-amber-400 text-black' : 'bg-white/10 text-white border border-white/20'}`}
                                            >
                                                {isFound ? <CheckCircle2 className="w-8 h-8" /> : <Search className="w-8 h-8 opacity-50" />}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {gameState === "deduction" && (
                    <motion.div
                        key="deduction"
                        {...JUICY_VARIANTS.slideUp}
                        className="absolute inset-0 z-20 p-12 flex flex-col items-center space-y-12"
                    >
                        <header className="text-center">
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Reconstruct Timeline</h2>
                            <p className="text-slate-400 mt-2">Drag artifacts into the sequence chronologically.</p>
                        </header>

                        <div className="flex flex-wrap justify-center gap-6">
                            {clues.map(clue => {
                                const inTimeline = timeline.find(c => c.id === clue.id);
                                return (
                                    <motion.div
                                        key={clue.id}
                                        whileHover={{ y: -5 }}
                                        onClick={() => addToTimeline(clue)}
                                        className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${inTimeline
                                            ? 'bg-amber-400/10 border-amber-400/30 opacity-30 grayscale'
                                            : 'bg-white/5 border-white/10 hover:border-amber-400/50'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center space-y-3">
                                            {clue.category === 'document' && <BookOpen className="w-10 h-10 text-amber-400" />}
                                            {clue.category === 'tool' && <Clock className="w-10 h-10 text-amber-400" />}
                                            {clue.category === 'artifact' && <Shield className="w-10 h-10 text-amber-400" />}
                                            <span className="text-white font-bold text-sm text-center max-w-[100px]">{clue.name}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Drop Zone / Timeline */}
                        <div className="w-full max-w-4xl bg-white/5 border border-white/10 p-8 rounded-[3rem] min-h-[160px] flex items-center justify-center gap-6">
                            {timeline.length === 0 && (
                                <span className="text-slate-600 font-bold uppercase tracking-widest flex items-center gap-3">
                                    <Clock className="w-6 h-6" /> Assemble Event Sequence
                                </span>
                            )}
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="relative flex items-center gap-6"
                                >
                                    <div className="bg-amber-400 text-black p-4 rounded-2xl font-black italic shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                                        {item.name}
                                    </div>
                                    {idx < clues.length - 1 && (
                                        <div className="w-8 h-[2px] bg-white/20" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <PhysicalButton
                                onClick={() => setTimeline([])}
                                className="bg-white/10 text-white h-14 px-8 border border-white/10"
                            >
                                <RotateCcw className="w-5 h-5 mr-2" /> RESET
                            </PhysicalButton>
                            <PhysicalButton
                                onClick={checkTimeline}
                                className="bg-amber-400 text-black h-14 px-12 text-lg disabled:opacity-50"
                                disabled={timeline.length < clues.length}
                            >
                                STABILIZE NARRATIVE
                            </PhysicalButton>
                        </div>
                    </motion.div>
                )}

                {gameState === "solved" && (
                    <motion.div
                        key="solved"
                        {...JUICY_VARIANTS.slideUp}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center p-12 bg-black/80 backdrop-blur-3xl"
                    >
                        <JuicyConfetti active={showConfetti} />
                        <div className="text-center space-y-6">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="inline-block p-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-4"
                            >
                                <CheckCircle2 className="w-20 h-20 text-emerald-400" />
                            </motion.div>
                            <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase">Temporal Lock Engaged</h2>
                            <p className="text-slate-400 text-xl max-w-lg mx-auto">
                                The {currentCase.era} has been restored to its proper sequence. High-fidelity historical data sync successful.
                            </p>
                            <div className="pt-8">
                                <PhysicalButton
                                    onClick={() => {
                                        setGameState("briefing");
                                        setCurrentCaseIndex((currentCaseIndex + 1) % HISTORICAL_CASES.length);
                                        setTimeline([]);
                                        setFoundCount(0);
                                        setShowConfetti(false);
                                    }}
                                    className="bg-emerald-500 text-black h-16 px-12 text-xl"
                                >
                                    NEXT CHRONICLE 📖
                                </PhysicalButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Juice: Streak Overlay */}
            <div className="absolute top-8 right-8 z-30">
                <JuicyStreak count={foundCount} />
            </div>
        </div>
    );
}
