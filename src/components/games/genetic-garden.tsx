"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Sprout, TestTube, Dna, Leaf, RefreshCw, Trophy, Heart, Sparkles } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Types --- */
type Trait = {
    color: string;
    pattern: "solid" | "striped" | "spotted" | "neon";
    size: "small" | "medium" | "large";
    rarity: "common" | "rare" | "epic" | "legendary";
};

type Flower = {
    id: string;
    generation: number;
    traits: Trait;
    parents?: [string, string];
};

const COLORS = [
    { name: "Emerald", hex: "bg-emerald-400", tailwind: "text-emerald-400" },
    { name: "Sky", hex: "bg-sky-400", tailwind: "text-sky-400" },
    { name: "Fuchsia", hex: "bg-fuchsia-400", tailwind: "text-fuchsia-400" },
    { name: "Amber", hex: "bg-amber-400", tailwind: "text-amber-400" },
    { name: "Rose", hex: "bg-rose-400", tailwind: "text-rose-400" },
];

const PATTERNS: Trait["pattern"][] = ["solid", "striped", "spotted", "neon"];

export default function GeneticGarden() {
    const { setMessage, setMood } = useMascot();
    const [garden, setGarden] = useState<Flower[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "COMPLETED">("IDLE");
    const [targetTrait, setTargetTrait] = useState<Partial<Trait>>({});
    const [score, setScore] = useState(0);

    const generateRandomFlower = (gen: number = 1): Flower => {
        const rarityRoll = Math.random();
        let rarity: Trait["rarity"] = "common";
        if (rarityRoll > 0.95) rarity = "legendary";
        else if (rarityRoll > 0.85) rarity = "epic";
        else if (rarityRoll > 0.7) rarity = "rare";

        return {
            id: Math.random().toString(36).substr(2, 9),
            generation: gen,
            traits: {
                color: COLORS[Math.floor(Math.random() * COLORS.length)].hex,
                pattern: PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
                size: "medium",
                rarity
            }
        };
    };

    const startGame = () => {
        const initialPlants = [generateRandomFlower(), generateRandomFlower(), generateRandomFlower()];
        setGarden(initialPlants);
        setGameState("PLAYING");
        setScore(0);
        setSelected([]);

        // Objective: Breed a specific rare combo
        const target = {
            color: COLORS[Math.floor(Math.random() * COLORS.length)].hex,
            pattern: "neon" as const
        };
        setTargetTrait(target);

        setMood("happy");
        setMessage("Welcome to the 4K Genetic Garden! Can you breed a Neon Hybrid? 🌸✨");
        hapticSuccess();
    };

    const handleSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(i => i !== id));
        } else if (selected.length < 2) {
            setSelected(prev => [...prev, id]);
            hapticSelection();
        }
    };

    const crossbreed = () => {
        if (selected.length !== 2) return;

        const parentA = garden.find(f => f.id === selected[0])!;
        const parentB = garden.find(f => f.id === selected[1])!;

        const mutate = Math.random() < 0.2; // 20% mutation chance

        const childTraits: Trait = {
            color: Math.random() > 0.5 ? parentA.traits.color : parentB.traits.color,
            pattern: Math.random() > 0.5 ? parentA.traits.pattern : parentB.traits.pattern,
            size: "medium",
            rarity: (parentA.traits.rarity === "legendary" || parentB.traits.rarity === "legendary") ? "epic" : "common"
        };

        if (mutate) {
            childTraits.pattern = "neon";
            childTraits.rarity = "rare";
        }

        const child: Flower = {
            id: Math.random().toString(36).substr(2, 9),
            generation: Math.max(parentA.generation, parentB.generation) + 1,
            traits: childTraits,
            parents: [parentA.id, parentB.id]
        };

        setGarden(prev => [...prev, child]);
        setSelected([]);
        setScore(s => s + 50);
        hapticSuccess();

        setMessage(`New Hybrid Generated! Gen ${child.generation} stabilized.`);
        setMood("happy");

        // Win Condition Check
        if (child.traits.color === targetTrait.color && child.traits.pattern === targetTrait.pattern) {
            setGameState("COMPLETED");
            setMood("happy");
            setMessage("Master Breeder! You've stabilized the target strain! 🏆");
            hapticSuccess();
        }
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto min-h-[600px] bg-slate-950 rounded-[3.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            {/* 4K Garden Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
            </div>

            {/* Header / HUD */}
            <div className="relative z-10 p-8 flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black italic tracking-tighter text-white">GENETIC GARDEN</h2>
                    <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em]">Advanced Biome Simulation v4.0</p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-xl min-w-[120px]">
                        <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Breeding Score</p>
                        <p className="text-2xl font-black italic tracking-tighter">{score}</p>
                    </div>
                    {gameState === "PLAYING" && (
                        <div className="bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-3xl backdrop-blur-xl">
                            <p className="text-[8px] font-black uppercase text-emerald-400 tracking-widest leading-none mb-2">Target Strain</p>
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full ${targetTrait.color}`} />
                                <span className="text-xs font-bold text-white uppercase">{targetTrait.pattern}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Garden Area */}
            <div className="relative z-10 flex-1 p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <AnimatePresence>
                    {garden.map((flower) => (
                        <motion.div
                            key={flower.id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ y: -5 }}
                            onClick={() => handleSelect(flower.id)}
                            className={`relative p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer group flex flex-col items-center justify-center space-y-4
                                ${selected.includes(flower.id) ? 'bg-white/20 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                        >
                            {/* Generation Badge */}
                            <span className="absolute top-4 right-6 text-[8px] font-black text-white/30 tracking-widest">GEN {flower.generation}</span>

                            {/* Flower Visual */}
                            <div className="relative">
                                <motion.div
                                    animate={flower.traits.pattern === 'neon' ? { filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"], scale: [1, 1.05, 1] } : {}}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Leaf className={`w-16 h-16 ${flower.traits.color} drop-shadow-xl`} />
                                </motion.div>
                                {flower.traits.pattern === 'spotted' && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    </div>
                                )}
                                {flower.traits.pattern === 'striped' && (
                                    <div className="absolute inset-0 border-r-2 border-l-2 border-white/20" />
                                )}
                            </div>

                            <div className="text-center">
                                <h4 className="text-[10px] font-black text-white italic truncate w-full">{flower.traits.rarity.toUpperCase()}</h4>
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{flower.traits.pattern}</p>
                            </div>

                            {/* Rarity Glow */}
                            {flower.traits.rarity === 'legendary' && (
                                <motion.div
                                    className="absolute inset-0 rounded-[2.5rem] ring-4 ring-amber-400/20"
                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {gameState === "IDLE" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-12 text-center"
                    >
                        <div className="max-w-md space-y-8">
                            <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
                                <Dna className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h3 className="text-4xl font-black italic tracking-tighter text-white">READY TO BREED?</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Select two plants to cross-breed their traits. Your goal is to stabilize the **Rare Target Strain** through selective inheritance and mutation.
                            </p>
                            <PhysicalButton onClick={startGame} className="bg-emerald-500 h-20 px-16 rounded-[2.5rem] text-xl">
                                START SIMULATION 🧬
                            </PhysicalButton>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Footer / Controls */}
            <div className="relative z-10 p-8 pt-0 flex justify-center items-center">
                <AnimatePresence>
                    {selected.length === 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="flex flex-col items-center space-y-4"
                        >
                            <div className="flex items-center gap-8 mb-4">
                                <div className="p-4 rounded-3xl bg-white/10 border border-white/20">
                                    <Leaf className={`w-8 h-8 ${garden.find(f => f.id === selected[0])?.traits.color}`} />
                                </div>
                                <RefreshCw className="w-6 h-6 text-white/20 animate-spin-slow" />
                                <div className="p-4 rounded-3xl bg-white/10 border border-white/20">
                                    <Leaf className={`w-8 h-8 ${garden.find(f => f.id === selected[1])?.traits.color}`} />
                                </div>
                            </div>
                            <PhysicalButton
                                onClick={crossbreed}
                                className="bg-white text-slate-950 h-20 px-24 rounded-[2.5rem] text-xl font-black italic"
                            >
                                SYNTHESIZE HYBRID 🧪
                            </PhysicalButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Win Overlay */}
            <AnimatePresence>
                {gameState === "COMPLETED" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 bg-emerald-950/90 backdrop-blur-3xl flex items-center justify-center p-12 text-center"
                    >
                        <div className="space-y-8">
                            <motion.div
                                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-32 h-32 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto"
                            >
                                <Trophy className="w-16 h-16 text-emerald-400" />
                            </motion.div>
                            <h2 className="text-5xl font-black italic tracking-tighter text-white">EVOLUTION STABILIZED</h2>
                            <p className="text-emerald-400 font-black uppercase tracking-[0.4em] text-xs">Target Strain Secured</p>

                            <div className="flex gap-4 justify-center">
                                <PhysicalButton onClick={startGame} className="bg-white text-emerald-950 h-16 px-12 rounded-[2rem]">
                                    NEW STRAIN 🌸
                                </PhysicalButton>
                                <PhysicalButton onClick={() => setGameState("IDLE")} className="bg-white/10 text-white h-16 px-12 rounded-[2rem]">
                                    GARDEN HUB 🌿
                                </PhysicalButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
