"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Map, ShieldCheck, Info, ChevronRight, Zap, Target, History, Hammer, Brush, Box, Globe } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Archeology Types --- */
type Artifact = {
    id: string;
    name: string;
    era: string;
    description: string;
    rarity: "COMMON" | "RARE" | "LEGENDARY";
    image: string;
};

const ARTIFACTS: Artifact[] = [
    { id: "vessel", name: "Ancient Amphora", era: "Bronze Age", description: "A ceremonial vessel used for olives and oils.", rarity: "COMMON", image: "🏺" },
    { id: "coin", name: "Imperial Denarius", era: "Roman Empire", description: "Pure silver currency from the reign of Augustus.", rarity: "RARE", image: "🪙" },
    { id: "statuette", name: "Venus Figurine", era: "Paleolithic", description: "A high-fidelity fertility symbol carved from ivory.", rarity: "LEGENDARY", image: "🗿" },
    { id: "scroll", name: "Lost Papyrus", era: "Ancient Egypt", description: "Contains architectural blueprints of Giza.", rarity: "LEGENDARY", image: "📜" }
];

export default function HistoHunt() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "DIGGING" | "ANALYSIS" | "MUSEUM">("IDLE");
    const [grid, setGrid] = useState<number[]>(Array(25).fill(0)); // 0: untouched, 1: brushed, 2: dug
    const [foundArtifacts, setFoundArtifacts] = useState<Artifact[]>([]);
    const [currentDiscovery, setCurrentDiscovery] = useState<Artifact | null>(null);

    const dig = (index: number) => {
        if (grid[index] === 2) return;

        const newGrid = [...grid];
        newGrid[index] = 2;
        setGrid(newGrid);
        hapticSelection();

        // Random chance to find artifact
        if (Math.random() > 0.8 && !currentDiscovery) {
            const artifact = ARTIFACTS[Math.floor(Math.random() * ARTIFACTS.length)];
            setCurrentDiscovery(artifact);
            setGameState("ANALYSIS");
            setMessage(`Discovery confirmed! We've unearthed something significant from the ${artifact.era}. 🏺`);
            setMood("happy");
            hapticSuccess();
        }
    };

    const addToMuseum = () => {
        if (currentDiscovery) {
            setFoundArtifacts(prev => [...prev, currentDiscovery]);
            setCurrentDiscovery(null);
            setGameState("DIGGING");
            hapticSuccess();
        }
    };

    const startDig = () => {
        setGameState("DIGGING");
        setMood("thinking");
        setMessage("Archeological survey active. Use the precision tools to unearth artifacts from the layers of history. 🗺️");
        hapticSelection();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-amber-950/20 rounded-[4rem] border border-amber-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Earth Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.1)_0%,transparent_70%)]" />
                <svg className="absolute inset-0 w-full h-full text-amber-500/5">
                    <pattern id="histo-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#histo-grid)" />
                </svg>
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <History className="text-amber-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Histo Hunt</h2>
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Chronicle Excavator v2.1</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <StatBox label="Collections" value={foundArtifacts.length} icon={Box} color="text-amber-400" />
                    <StatBox label="Eras Explored" value={new Set(foundArtifacts.map(a => a.era)).size} icon={Globe} color="text-sky-400" />
                    <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end min-w-[140px]">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">PRECISION</span>
                        <span className="text-xl font-black italic text-amber-400 tabular-nums">98.2%</span>
                    </div>
                </div>
            </div>

            {/* Excavation Yard */}
            <div className="relative z-10 flex-1 flex">
                {/* Left: Tools Panel */}
                <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-6 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Hammer className="w-3 h-3" /> Excavation Tools
                    </h3>

                    <ToolButton active icon={Brush} label="Precision Brush" desc="Sweep away surface dust" />
                    <ToolButton icon={Hammer} label="Geological Pick" desc="Break through stone" />
                    <ToolButton icon={Search} label="Scanning Probe" desc="Detect buried resonance" />

                    <div className="mt-auto pt-8 border-t border-white/5">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Discovery History</h4>
                        <div className="flex flex-wrap gap-2">
                            {foundArtifacts.slice(-6).map((a, i) => (
                                <div key={i} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl" title={a.name}>
                                    {a.image}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Dig Site */}
                <div className="flex-1 p-12 flex items-center justify-center relative">
                    <div className="grid grid-cols-5 gap-4 w-[500px] h-[500px]">
                        {grid.map((state, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 0.95 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => dig(i)}
                                className={`rounded-2xl border-2 transition-all duration-500 relative overflow-hidden
                                    ${state === 0 ? 'bg-amber-900 border-amber-800' :
                                        state === 1 ? 'bg-amber-800 border-amber-700' :
                                            'bg-amber-700/20 border-white/5'}`}
                            >
                                {state === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 flex items-center justify-center text-amber-300/20 font-black italic text-xs"
                                    >
                                        EMPTY
                                    </motion.div>
                                )}
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                            </motion.button>
                        ))}
                    </div>

                    {/* Discovery Modal */}
                    <AnimatePresence>
                        {gameState === "ANALYSIS" && currentDiscovery && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-9xl mb-8 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                                >
                                    {currentDiscovery.image}
                                </motion.div>
                                <div className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-4">
                                    {currentDiscovery.rarity} DISCOVERY
                                </div>
                                <h3 className="text-5xl font-black italic tracking-tighter text-white mb-2 uppercase leading-none">{currentDiscovery.name}</h3>
                                <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                                    {currentDiscovery.description} Dating back to the {currentDiscovery.era}.
                                </p>
                                <PhysicalButton
                                    onClick={addToMuseum}
                                    className="bg-amber-600 h-20 px-16 rounded-[2.5rem] text-xl"
                                >
                                    ADD TO ARCHIVES 🏛️
                                </PhysicalButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Start Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-amber-500/20 rounded-[2.5rem] flex items-center justify-center border border-amber-500/30 mb-8 overflow-hidden group">
                        <History className="w-12 h-12 text-amber-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Unearth History</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Become a master archeologist. Dig through time, discover ancient artifacts, and reconstruct the lost stories of humanity in 4K.
                    </p>
                    <PhysicalButton
                        onClick={startDig}
                        className="bg-amber-600 h-24 px-20 rounded-[3rem] text-2xl"
                    >
                        START SURVEY 🗺️
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function StatBox({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) {
    return (
        <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end min-w-[140px]">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</span>
            <div className={`flex items-center gap-2 ${color}`}>
                <Icon className="w-3 h-3" />
                <span className="text-xl font-black italic tabular-nums">{value}</span>
            </div>
        </div>
    );
}

function ToolButton({ icon: Icon, label, desc, active = false }: any) {
    return (
        <button className={`w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-4 group
            ${active ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
            <div className={`p-3 rounded-xl ${active ? 'bg-amber-500 text-amber-950' : 'bg-zinc-800 text-zinc-500'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${active ? 'text-white' : 'text-zinc-400'}`}>{label}</span>
                <span className="text-[9px] font-bold text-zinc-600 italic">{desc}</span>
            </div>
        </button>
    );
}
