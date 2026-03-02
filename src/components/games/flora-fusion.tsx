"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Leaf, Beaker, Zap, Thermometer, Droplets, Sun, Activity, ShieldCheck, Info, ChevronRight, Sparkles } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Biology Types --- */
type Trait = "GLOW" | "THORNS" | "HEALING" | "POISON" | "SPEED" | "DEFENSE";

type Plant = {
    id: string;
    traits: Trait[];
    dna: string;
    vitality: number;
    color: string;
};

const TRAIT_DATA: Record<Trait, { icon: any, color: string, effect: string }> = {
    GLOW: { icon: Sparkles, color: "text-emerald-400", effect: "Bioluminescence +50" },
    THORNS: { icon: Activity, color: "text-rose-400", effect: "Detergent +30" },
    HEALING: { icon: ShieldCheck, color: "text-sky-400", effect: "Regen +20" },
    POISON: { icon: Zap, color: "text-purple-400", effect: "Toxicity +40" },
    SPEED: { icon: Activity, color: "text-amber-400", effect: "Growth +15" },
    DEFENSE: { icon: ShieldCheck, color: "text-zinc-400", effect: "Armor +60" }
};

export default function FloraFusion() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "LAB" | "SYNTHESIZING" | "SUCCESS">("IDLE");
    const [selectedTraits, setSelectedTraits] = useState<Trait[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [environment, setEnvironment] = useState({
        temp: 24,
        humidity: 60,
        light: 80
    });

    const currentDNA = useMemo(() => {
        return selectedTraits.map(t => t.substring(0, 2)).join("-") || "EMPTY";
    }, [selectedTraits]);

    const handleTraitToggle = (trait: Trait) => {
        if (selectedTraits.includes(trait)) {
            setSelectedTraits(prev => prev.filter(t => t !== trait));
        } else if (selectedTraits.length < 3) {
            setSelectedTraits(prev => [...prev, trait]);
            hapticSelection();
        } else {
            hapticError();
        }
    };

    const startSynthesis = () => {
        if (selectedTraits.length < 2) {
            setMessage("We need at least two traits to fuse a new species! 🧪");
            hapticError();
            return;
        }

        setGameState("SYNTHESIZING");
        setMood("thinking");
        setMessage("Initializing genetic fusion... recalibrating base carbon structures. 🧬");
        hapticSelection();

        setTimeout(() => {
            const newPlant: Plant = {
                id: Math.random().toString(36).substr(2, 9),
                traits: [...selectedTraits],
                dna: currentDNA,
                vitality: 100,
                color: selectedTraits.includes("POISON") ? "purple" : selectedTraits.includes("GLOW") ? "emerald" : "sky"
            };
            setPlants(prev => [newPlant, ...prev]);
            setGameState("SUCCESS");
            setMood("happy");
            setMessage("Synthesis successful! A new bioluminescent marvel is born. 🌸");
            hapticSuccess();
        }, 3000);
    };

    const startLab = () => {
        setGameState("LAB");
        setMood("happy");
        setMessage("Welcome to the Flora Lab. Combine traits to create the ultimate bio-organism! 🌿");
        hapticSuccess();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-zinc-950 rounded-[4rem] border border-emerald-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Laboratory Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.1)_0%,transparent_70%)]" />
                {/* Hex Grid */}
                <svg className="absolute inset-0 w-full h-full text-emerald-500/5">
                    <pattern id="hex" x="0" y="0" width="50" height="43.3" patternUnits="userSpaceOnUse">
                        <path d="M25 0 L50 14.43 L50 43.3 L25 57.73 L0 43.3 L0 14.43 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hex)" />
                </svg>
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                        <Beaker className="text-emerald-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Flora Fusion</h2>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Bio-Synth Lab v9.0</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <EnvControl icon={Thermometer} label="TEMP" value={environment.temp} unit="°C" />
                    <EnvControl icon={Droplets} label="HUMIDITY" value={environment.humidity} unit="%" />
                    <EnvControl icon={Sun} label="LUMENS" value={environment.light} unit="lux" />
                </div>
            </div>

            {/* Selection Lab */}
            <div className="relative z-10 flex-1 flex">
                {/* Left: Trait Vault */}
                <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-4 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Genetic Vault</h3>
                    {(Object.keys(TRAIT_DATA) as Trait[]).map(trait => (
                        <TraitCard
                            key={trait}
                            trait={trait}
                            isActive={selectedTraits.includes(trait)}
                            onClick={() => handleTraitToggle(trait)}
                        />
                    ))}
                </div>

                {/* Right: Synthesis Chamber */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center relative">
                    {/* DNA Visualizer */}
                    <div className="absolute top-12 flex items-center gap-2 px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Current Sequence:</span>
                        <code className="text-white font-mono font-bold tracking-widest">{currentDNA}</code>
                    </div>

                    <div className="relative w-72 h-72">
                        {/* Glow Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-4 rounded-full border border-emerald-500/10"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* The Specimen */}
                        <AnimatePresence mode="wait">
                            {gameState === "SYNTHESIZING" ? (
                                <motion.div
                                    key="synth"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.2, opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Activity className="w-24 h-24 text-emerald-400 animate-pulse" />
                                </motion.div>
                            ) : gameState === "SUCCESS" ? (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="absolute inset-0 flex items-center justify-center p-12"
                                >
                                    <div className="relative w-full h-full bg-emerald-500/20 rounded-[3rem] blur-2xl" />
                                    <Leaf className="absolute w-32 h-32 text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    className="absolute inset-0 flex items-center justify-center opacity-30"
                                >
                                    <Beaker className="w-24 h-24 text-zinc-700" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        {gameState === "LAB" && selectedTraits.length >= 2 && (
                            <PhysicalButton
                                onClick={startSynthesis}
                                className="bg-emerald-600 h-20 px-16 rounded-3xl"
                            >
                                FUSE GENES 🧬
                            </PhysicalButton>
                        )}
                        {gameState === "SUCCESS" && (
                            <div className="flex gap-4">
                                <PhysicalButton
                                    onClick={() => { setGameState("LAB"); setSelectedTraits([]); }}
                                    className="bg-zinc-800 h-16 px-10 rounded-2xl text-lg"
                                >
                                    NEW SPECIMEN
                                </PhysicalButton>
                                <PhysicalButton
                                    className="bg-emerald-600 h-16 px-10 rounded-2xl text-lg"
                                >
                                    LOG DISCOVERY
                                </PhysicalButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Start Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center border border-emerald-500/30 mb-8 overflow-hidden group">
                        <Leaf className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Master Bio-Synthesis</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Step into a world of bioluminescence. Combine specific genetic markers to discover new flora species in 4K.
                    </p>
                    <PhysicalButton
                        onClick={startLab}
                        className="bg-emerald-600 h-24 px-20 rounded-[3rem] text-2xl"
                    >
                        ENTER LABORATORY 🧪
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function EnvControl({ icon: Icon, label, value, unit }: { icon: any, label: string, value: number, unit: string }) {
    return (
        <div className="bg-white/5 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
            <Icon className="w-4 h-4 text-emerald-400/60" />
            <div className="flex flex-col">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-black text-white tabular-nums">{value}{unit}</span>
            </div>
        </div>
    );
}

function TraitCard({ trait, isActive, onClick }: { trait: Trait, isActive: boolean, onClick: () => void }) {
    const data = TRAIT_DATA[trait];
    const Icon = data.icon;

    return (
        <button
            onClick={onClick}
            className={`w-full p-6 h-28 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between group
                ${isActive
                    ? 'bg-emerald-500/20 border-emerald-500/40 shadow-[0_0_20px_rgba(52,211,153,0.1)]'
                    : 'bg-zinc-800/40 border-white/5 hover:bg-zinc-800/60'}`}
        >
            <div className="flex justify-between items-center w-full">
                <div className={`p-2 rounded-xl ${isActive ? 'bg-emerald-500/20' : 'bg-zinc-700/40'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                </div>
                {isActive && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </div>
            <div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                    {trait}
                </span>
                <p className="text-[8px] font-medium text-emerald-400/60">{data.effect}</p>
            </div>
        </button>
    );
}
