"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { hapticSelection, hapticSuccess, hapticCelebration } from "@/lib/platform/haptics";
import { Box, Layers, MousePointer2, Eraser, Share2, Sparkles } from "lucide-react";

/* --- Cosmic Canvas Content --- */
type BlockType = "glass" | "gold" | "chrome" | "neon";
type Block = {
    id: number;
    type: BlockType;
    height: number;
};

const BLOCK_CONFIG: Record<BlockType, { color: string, label: string }> = {
    glass: { color: "bg-white/20 backdrop-blur-md border-white/30", label: "Frosted Glass" },
    gold: { color: "bg-amber-400 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.5)]", label: "Aureum Gold" },
    chrome: { color: "bg-slate-300 border-slate-400 shadow-[inset_0_0_10px_rgba(255,255,255,0.8)]", label: "Mirror Chrome" },
    neon: { color: "bg-indigo-500 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.8)]", label: "Vivid Neon" }
};

export default function CosmicCanvas() {
    const { setMood, setMessage } = useMascot();
    const [grid, setGrid] = useState<(Block | null)[][]>(
        Array(8).fill(null).map(() => Array(8).fill(null))
    );
    const [activeBrush, setActiveBrush] = useState<BlockType>("glass");
    const [isErasing, setIsErasing] = useState(false);

    useEffect(() => {
        setMessage("Welcome to the Cosmic Canvas. Let's harmonize the spatial frequency of this galaxy! 🌙✨");
        setMood("happy");
    }, []);

    const handleGridClick = (r: number, c: number) => {
        if (isErasing) {
            if (grid[r][c]) {
                void hapticSelection();
                setGrid(prev => {
                    const next = prev.map(row => [...row]);
                    next[r][c] = null;
                    return next;
                });
            }
            return;
        }

        void hapticSuccess();
        setGrid(prev => {
            const next = prev.map(row => [...row]);
            const current = next[r][c];
            if (current && current.type === activeBrush) {
                if (current.height < 5) {
                    next[r][c] = { ...current, height: current.height + 1 };
                }
            } else {
                next[r][c] = { id: Math.random(), type: activeBrush, height: 1 };
            }
            return next;
        });

        if (Math.random() > 0.8) {
            setMood("happy");
            setMessage("A beautiful structural resonance! Keep building. 🏛️");
        }
    };

    const clearCanvas = () => {
        void hapticSelection();
        setGrid(Array(8).fill(null).map(() => Array(8).fill(null)));
        setMood("thinking");
        setMessage("A fresh start. The stars are ready for a new vision.");
    };

    return (
        <div className="relative min-h-[750px] w-full flex flex-col items-center justify-center p-8 bg-zinc-950 overflow-hidden rounded-[3rem] border-4 border-slate-900 shadow-2xl">
            {/* 4K Zen Background */}
            <div className="absolute inset-0 opacity-50">
                <img
                    src="/cosmic_canvas_zen_space_bg_1772427760520.png"
                    alt="Zen Space"
                    className="w-full h-full object-cover scale-110 blur-[1px]"
                />
            </div>

            {/* Floating Toolbar */}
            <div className="absolute top-8 left-8 flex flex-col gap-4 z-20">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.4em]">Creative Sandbox</span>
                    <h2 className="text-4xl font-black italic text-white tracking-tighter">COSMIC CANVAS</h2>
                </div>

                <div className="bg-white/5 border border-white/10 p-2 rounded-3xl backdrop-blur-2xl flex flex-col gap-2">
                    {(Object.keys(BLOCK_CONFIG) as BlockType[]).map(type => (
                        <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setActiveBrush(type);
                                setIsErasing(false);
                                void hapticSelection();
                            }}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2 
                                ${activeBrush === type && !isErasing ? "border-white bg-white/20 scale-110 shadow-lg" : "border-transparent bg-white/5 opacity-60"}`}
                        >
                            <div className={`w-6 h-6 rounded-lg ${BLOCK_CONFIG[type].color}`} />
                        </motion.button>
                    ))}
                    <div className="h-[1px] bg-white/10 my-1 mx-2" />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsErasing(true);
                            void hapticSelection();
                        }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2
                            ${isErasing ? "border-rose-500 bg-rose-500/20 scale-110" : "border-transparent bg-white/5 opacity-60"}`}
                    >
                        <Eraser className="w-6 h-6 text-rose-400" />
                    </motion.button>
                </div>
            </div>

            {/* Interactive Grid Container - ISO VIEW */}
            <div className="relative z-10 w-full flex items-center justify-center perspective-[2000px]">
                <div
                    className="relative grid grid-cols-8 grid-rows-8 gap-1 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md rotate-x-[60deg] rotate-z-[45deg] transform-style-3d shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                    style={{ width: "450px", height: "450px" }}
                >
                    {grid.map((row, r) => row.map((block, c) => (
                        <div
                            key={`${r}-${c}`}
                            className="relative w-full h-full bg-white/5 border border-white/5 hover:bg-white/20 transition-colors cursor-pointer"
                            onClick={() => handleGridClick(r, c)}
                        >
                            <AnimatePresence>
                                {block && (
                                    <motion.div
                                        initial={{ scale: 0, y: 100 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={JUICY_SPRINGS.stiff}
                                        className="absolute inset-0 transform-style-3d"
                                    >
                                        {/* 3D Visual Block Logic */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {[...Array(block.height)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ z: 0 }}
                                                    animate={{ z: i * 20 }}
                                                    className={`absolute w-full h-full rounded-sm border-2 ${BLOCK_CONFIG[block.type].color} transform-translate-z-[${i * 20}px]`}
                                                    style={{ transform: `translateZ(${i * 20}px)` }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )))}
                </div>
            </div>

            {/* Canvas Actions */}
            <div className="absolute bottom-12 flex gap-4 z-20">
                <PhysicalButton onClick={clearCanvas} className="bg-rose-500/20 text-rose-300 px-6 h-12 rounded-2xl text-xs font-black uppercase tracking-widest border border-rose-500/30">
                    WIPE GRID 🧹
                </PhysicalButton>
                <PhysicalButton onClick={() => void hapticCelebration()} className="bg-indigo-500 text-white px-8 h-12 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> EXPORT GALAXY
                </PhysicalButton>
            </div>

            {/* Luna's Harmonic Feedback */}
            <div className="absolute top-10 right-10 flex items-center gap-4 opacity-40">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Luna Logic</span>
                    <span className="text-[8px] font-medium text-slate-500">Aesthetic Frequency: 432Hz</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-indigo-500/30 p-1">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"
                    />
                </div>
            </div>
        </div>
    );
}
