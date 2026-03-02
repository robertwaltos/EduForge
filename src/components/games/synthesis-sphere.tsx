"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_VARIANTS, JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import JuicyConfetti from "@/components/experience/JuicyConfetti";
import { hapticSuccess, hapticCelebration, hapticSelection } from "@/lib/platform/haptics";
import { Beaker, Atom, Zap, Thermometer } from "lucide-react";

/* --- Synthesis Sphere Content --- */
type Element = {
    id: number;
    level: number; // 1: Hydrogen, 2: Helium, etc.
    name: string;
    symbol: string;
    color: string;
    glow: string;
};

const ELEMENTS: Record<number, Omit<Element, "id">> = {
    1: { level: 1, name: "Hydrogen", symbol: "H", color: "bg-sky-400", glow: "shadow-[0_0_20px_rgba(56,189,248,0.6)]" },
    2: { level: 2, name: "Helium", symbol: "He", color: "bg-amber-400", glow: "shadow-[0_0_25px_rgba(251,191,36,0.7)]" },
    3: { level: 3, name: "Lithium", symbol: "Li", color: "bg-rose-400", glow: "shadow-[0_0_30px_rgba(251,113,133,0.8)]" },
    4: { level: 4, name: "Beryllium", symbol: "Be", color: "bg-emerald-400", glow: "shadow-[0_0_35px_rgba(52,211,153,0.9)]" },
    5: { level: 5, name: "Boron", symbol: "B", color: "bg-indigo-400", glow: "shadow-[0_0_40px_rgba(129,140,248,1.0)]" },
};

export default function SynthesisSphere() {
    const { setMood, setMessage } = useMascot();
    const [grid, setGrid] = useState<(Element | null)[]>(Array(16).fill(null));
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setMessage("Welcome to the Synthesis Sphere. Merge elements to discover the secrets of the universe! 🔬✨");
        setMood("happy");
        spawnElement();
        spawnElement();
    }, []);

    const spawnElement = useCallback(() => {
        setGrid(prev => {
            const emptyIndices = prev.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
            if (emptyIndices.length === 0) return prev;

            const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            const newElement: Element = {
                id: Math.random(),
                ...ELEMENTS[1] // Always start with Hydrogen
            };

            const newGrid = [...prev];
            newGrid[randomIndex] = newElement;
            return newGrid;
        });
    }, []);

    const move = (direction: "up" | "down" | "left" | "right") => {
        let moved = false;
        let newScore = score;
        let mergedThisTurn = false;

        setGrid(prev => {
            const newGrid = [...prev];

            const getIndex = (row: number, col: number) => row * 4 + col;

            // Simplified 2048-style logic for a 4x4 grid
            const processLine = (line: (Element | null)[]) => {
                const filled = line.filter(x => x !== null) as Element[];
                const result: (Element | null)[] = [];

                for (let i = 0; i < filled.length; i++) {
                    if (filled[i] && filled[i + 1] && filled[i].level === filled[i + 1].level) {
                        const upgradedLevel = filled[i].level + 1;
                        if (ELEMENTS[upgradedLevel]) {
                            result.push({
                                id: Math.random(),
                                ...ELEMENTS[upgradedLevel]
                            });
                            newScore += upgradedLevel * 10;
                            mergedThisTurn = true;
                            i++; // Skip next
                            moved = true;
                        } else {
                            result.push(filled[i]);
                        }
                    } else {
                        result.push(filled[i]);
                    }
                }
                while (result.length < 4) result.push(null);
                return result;
            };

            // Horizontal Movement
            if (direction === "left" || direction === "right") {
                for (let r = 0; r < 4; r++) {
                    let row = [newGrid[getIndex(r, 0)], newGrid[getIndex(r, 1)], newGrid[getIndex(r, 2)], newGrid[getIndex(r, 3)]];
                    if (direction === "right") row.reverse();
                    const processed = processLine(row);
                    if (direction === "right") processed.reverse();

                    for (let c = 0; c < 4; c++) {
                        if (newGrid[getIndex(r, c)]?.id !== processed[c]?.id) moved = true;
                        newGrid[getIndex(r, c)] = processed[c];
                    }
                }
            }
            // Vertical Movement
            else {
                for (let c = 0; c < 4; c++) {
                    let col = [newGrid[getIndex(0, c)], newGrid[getIndex(1, c)], newGrid[getIndex(2, c)], newGrid[getIndex(3, c)]];
                    if (direction === "down") col.reverse();
                    const processed = processLine(col);
                    if (direction === "down") processed.reverse();

                    for (let r = 0; r < 4; r++) {
                        if (newGrid[getIndex(r, c)]?.id !== processed[r]?.id) moved = true;
                        newGrid[getIndex(r, c)] = processed[r];
                    }
                }
            }

            return newGrid;
        });

        if (moved) {
            spawnElement();
            setScore(newScore);
            void hapticSelection();
            if (mergedThisTurn) {
                setStreak(prev => prev + 1);
                void hapticSuccess();
                if (newScore % 100 === 0) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 2000);
                    void hapticCelebration();
                    setMood("happy");
                    setMessage("Synthesis complete! New heavy element discovered! 💎");
                }
            } else {
                setStreak(0);
            }
        }
    };

    // Keyboard listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") move("left");
            if (e.key === "ArrowRight") move("right");
            if (e.key === "ArrowUp") move("up");
            if (e.key === "ArrowDown") move("down");
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [grid]);

    return (
        <div className="relative min-h-[700px] w-full flex flex-col items-center justify-center p-8 bg-black overflow-hidden rounded-[3rem] border-4 border-slate-800 shadow-2xl">
            {/* 4K Background Image */}
            <div className="absolute inset-0 opacity-40">
                <img
                    src="/neural_synthesis_lab_bg_1772427420316.png"
                    alt="Synthesis Lab"
                    className="w-full h-full object-cover blur-sm"
                />
            </div>

            {/* Glass Overlays */}
            <div className="absolute inset-x-8 top-8 flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-sky-400 tracking-[0.4em]">Subatomic Research</span>
                    <h2 className="text-5xl font-black italic text-white leading-none tracking-tighter">SYNTHESIS SPHERE</h2>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <JuicyStreak count={streak} />
                    <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl backdrop-blur-xl">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Molecular Weight</span>
                        <span className="text-2xl font-black text-white">{score}u</span>
                    </div>
                </div>
            </div>

            <JuicyConfetti active={showConfetti} />

            {/* The Forge Grid */}
            <div className="relative z-10 grid grid-cols-4 gap-4 p-4 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl shadow-[0_0_100px_rgba(56,189,248,0.1)]">
                {grid.map((el, i) => (
                    <div key={i} className="w-20 h-20 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            {el && (
                                <motion.div
                                    key={el.id}
                                    layoutId={`el-${el.id}`}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.2, opacity: 0 }}
                                    transition={JUICY_SPRINGS.bouncy}
                                    className={`w-16 h-16 rounded-full ${el.color} ${el.glow} flex flex-col items-center justify-center border-2 border-white/20`}
                                >
                                    <span className="text-2xl font-black text-white leading-none">{el.symbol}</span>
                                    <span className="text-[8px] font-black text-white/60 uppercase">{el.level}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Controls Display */}
            <div className="mt-12 flex gap-8 z-10">
                <ControlIcon icon={Thermometer} label="Heat Sync" value="Optimal" color="text-rose-400" />
                <ControlIcon icon={Atom} label="Density" value="Stable" color="text-amber-400" />
                <ControlIcon icon={Zap} label="Pulse" value="Active" color="text-sky-400" />
            </div>

            {/* Mobile/Touch Controls */}
            <div className="mt-8 grid grid-cols-3 gap-2 md:hidden z-10">
                <div />
                <PhysicalButton onClick={() => move("up")} className="bg-white/5 h-12 w-12 rounded-xl">↑</PhysicalButton>
                <div />
                <PhysicalButton onClick={() => move("left")} className="bg-white/5 h-12 w-12 rounded-xl">←</PhysicalButton>
                <PhysicalButton onClick={() => move("down")} className="bg-white/5 h-12 w-12 rounded-xl">↓</PhysicalButton>
                <PhysicalButton onClick={() => move("right")} className="bg-white/5 h-12 w-12 rounded-xl">→</PhysicalButton>
            </div>

            {/* Terra's Log */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4 bg-sky-950/40 border border-sky-500/20 px-6 py-3 rounded-2xl backdrop-blur-md z-10">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
                <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest px-2">Terra: Monitoring synthesis efficiency...</span>
            </div>
        </div>
    );
}

function ControlIcon({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    return (
        <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-2 rounded-2xl backdrop-blur-md">
            <Icon className={`${color} w-5 h-5`} />
            <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-slate-500 tracking-wider">{label}</span>
                <span className="text-[10px] font-black text-white uppercase">{value}</span>
            </div>
        </div>
    );
}
