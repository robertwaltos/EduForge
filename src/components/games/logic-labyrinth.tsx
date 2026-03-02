"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Zap, Cpu, Activity, ShieldCheck, Info, ChevronRight, Target, Move, Grid3X3, Play, RotateCcw, Boxes, Split, Repeat } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Logic Labyrinth Types --- */
type CommandType = "MOVE" | "TURN_L" | "TURN_R" | "LOOP" | "IF_CLEAR";
type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

interface Command {
    id: string;
    type: CommandType;
    iterations?: number;
}

export default function LogicLabyrinth() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "CODING" | "EXECUTING" | "SUCCESS">("IDLE");
    const [program, setProgram] = useState<Command[]>([]);
    const [botPos, setBotPos] = useState({ x: 0, y: 0 });
    const [botDir, setBotDir] = useState<Direction>("RIGHT");
    const [activeCmdIdx, setActiveCmdIdx] = useState<number | null>(null);

    const MAZE = useMemo(() => [
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 'T'] // T = Target
    ], []);

    const addCommand = (type: CommandType) => {
        if (gameState !== "CODING") return;
        setProgram(prev => [...prev, { id: Math.random().toString(), type }]);
        hapticSelection();
    };

    const runProgram = async () => {
        setGameState("EXECUTING");
        setMood("thinking");
        setMessage("Algorithm processing. Executing pathfinding sequence... 🤖");

        let currentPos = { ...botPos };
        let currentDir = botDir;

        for (let i = 0; i < program.length; i++) {
            setActiveCmdIdx(i);
            const cmd = program[i];

            await new Promise(resolve => setTimeout(resolve, 600));

            if (cmd.type === "MOVE") {
                const nextPos = { ...currentPos };
                if (currentDir === "UP") nextPos.y--;
                if (currentDir === "DOWN") nextPos.y++;
                if (currentDir === "LEFT") nextPos.x--;
                if (currentDir === "RIGHT") nextPos.x++;

                if (nextPos.x >= 0 && nextPos.x < 5 && nextPos.y >= 0 && nextPos.y < 5 && MAZE[nextPos.y][nextPos.x] !== 1) {
                    currentPos = nextPos;
                    setBotPos(currentPos);
                    hapticSelection();
                } else {
                    hapticError();
                    setMessage("Collision detected! Algorithm reset required. ⚠️");
                    setGameState("CODING");
                    return;
                }
            } else if (cmd.type === "TURN_L") {
                const dirs: Direction[] = ["UP", "RIGHT", "DOWN", "LEFT"];
                currentDir = dirs[(dirs.indexOf(currentDir) + 3) % 4];
                setBotDir(currentDir);
            } else if (cmd.type === "TURN_R") {
                const dirs: Direction[] = ["UP", "RIGHT", "DOWN", "LEFT"];
                currentDir = dirs[(dirs.indexOf(currentDir) + 1) % 4];
                setBotDir(currentDir);
            }

            if (MAZE[currentPos.y][currentPos.x] === 'T') {
                setGameState("SUCCESS");
                hapticSuccess();
                setMessage("Target reached! Path optimized and verified. 🏆");
                setMood("happy");
                return;
            }
        }

        setGameState("CODING");
        setActiveCmdIdx(null);
        if (MAZE[currentPos.y][currentPos.x] !== 'T') {
            setMessage("Program ended before target. Refine the logic array. 💻");
        }
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-zinc-950/20 rounded-[4rem] border border-fuchsia-500/20 overflow-hidden shadow-2xl flex flex-col font-sans text-white">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#d946ef20_1px,transparent_1px),linear-gradient(to_bottom,#d946ef20_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.1)_0%,transparent:70%)]" />
            </div>

            {/* Header HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center">
                        <Grid3X3 className="text-fuchsia-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Logic Labyrinth</h2>
                        <span className="text-[10px] font-bold text-fuchsia-600 uppercase tracking-widest">Algorithmic Solver v8.2</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <StatusBox label="EFFICIENCY" value="Optimal" color="text-emerald-400" />
                    <StatusBox label="LATENCY" value="12ms" color="text-fuchsia-400" />
                    <div className="bg-white/5 border border-white/5 px-6 py-2 rounded-2xl flex flex-col items-end">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">CORE LOAD</span>
                        <span className="text-lg font-black italic text-fuchsia-400 tabular-nums">42.2%</span>
                    </div>
                </div>
            </div>

            {/* Main Lab Content */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Logic Palette */}
                <div className="w-72 border-r border-white/5 p-8 flex flex-col gap-6 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Boxes className="w-3 h-3 text-fuchsia-400" /> Logic Blocks
                    </h3>

                    <BlockButton type="MOVE" label="Step Forward" icon={Move} color="bg-fuchsia-500" onClick={() => addCommand("MOVE")} />
                    <BlockButton type="TURN_L" label="Rotate Left" icon={RotateCcw} color="bg-indigo-500" onClick={() => addCommand("TURN_L")} />
                    <BlockButton type="TURN_R" label="Rotate Right" icon={RotateCcw} color="bg-indigo-500" className="rotate-180" onClick={() => addCommand("TURN_R")} />
                    <BlockButton type="LOOP" label="Loop Logic" icon={Repeat} color="bg-emerald-500" onClick={() => addCommand("LOOP")} />
                    <BlockButton type="IF_CLEAR" label="Condition" icon={Split} color="bg-amber-500" onClick={() => addCommand("IF_CLEAR")} />

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <button
                            onClick={() => { setProgram([]); setBotPos({ x: 0, y: 0 }); setBotDir("RIGHT"); hapticSelection(); }}
                            className="w-full h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/10 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" /> Clear Stack
                        </button>
                    </div>
                </div>

                {/* The Maze Viewport */}
                <div className="flex-1 relative p-12 flex flex-col">
                    <div className="flex-1 grid grid-cols-5 gap-3 max-w-md mx-auto aspect-square bg-zinc-900/40 p-3 rounded-[3rem] border border-white/5">
                        {MAZE.map((row, y) => row.map((cell, x) => (
                            <div
                                key={`${x}-${y}`}
                                className={`relative rounded-2xl flex items-center justify-center transition-all duration-500
                                ${cell === 1 ? 'bg-zinc-800 shadow-inner' : cell === 'T' ? 'bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-black/20 border border-white/5'}
                                `}
                            >
                                {botPos.x === x && botPos.y === y && (
                                    <motion.div
                                        layoutId="bot"
                                        animate={{ rotate: botDir === "RIGHT" ? 90 : botDir === "DOWN" ? 180 : botDir === "LEFT" ? 270 : 0 }}
                                        className="w-10 h-10 rounded-xl bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.6)] flex items-center justify-center z-10"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </motion.div>
                                )}
                                {cell === 'T' && (
                                    <Target className="w-8 h-8 text-emerald-400 opacity-50 absolute" />
                                )}
                            </div>
                        )))}
                    </div>

                    {/* Execution Stack */}
                    <div className="h-24 mt-8 flex gap-2 overflow-x-auto p-4 scrollbar-hide bg-black/20 rounded-2xl border border-white/5 items-center">
                        <AnimatePresence>
                            {program.length === 0 && (
                                <span className="text-[10px] font-black uppercase text-zinc-700 mx-auto tracking-widest">Stack Empty. Add logic blocks.</span>
                            )}
                            {program.map((cmd, i) => (
                                <motion.div
                                    key={cmd.id}
                                    initial={{ scale: 0, x: -20 }}
                                    animate={{
                                        scale: activeCmdIdx === i ? 1.1 : 1,
                                        opacity: 1,
                                        x: 0,
                                        borderColor: activeCmdIdx === i ? 'rgba(217, 70, 239, 1)' : 'rgba(255, 255, 255, 0.05)'
                                    }}
                                    className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all
                                    ${cmd.type === 'MOVE' ? 'bg-fuchsia-500/10' : cmd.type.startsWith('TURN') ? 'bg-indigo-500/10' : 'bg-zinc-800'}`}
                                >
                                    {cmd.type === 'MOVE' && <Move className="w-6 h-6 text-fuchsia-400" />}
                                    {(cmd.type === 'TURN_L' || cmd.type === 'TURN_R') && <RotateCcw className={`w-6 h-6 text-indigo-400 ${cmd.type === 'TURN_R' ? 'rotate-180' : ''}`} />}
                                    {cmd.type === 'LOOP' && <Repeat className="w-6 h-6 text-emerald-400" />}
                                    {cmd.type === 'IF_CLEAR' && <Split className="w-6 h-6 text-amber-400" />}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* CTA Footer */}
            <div className="relative z-20 p-8 bg-zinc-900/40 border-t border-white/5 flex justify-end gap-4">
                <PhysicalButton
                    onClick={runProgram}
                    disabled={gameState === "EXECUTING" || program.length === 0}
                    className="bg-fuchsia-600 h-16 px-16 rounded-2xl text-xl shadow-lg border border-fuchsia-400/20 disabled:opacity-50"
                >
                    COMPILED EXECUTION <Play className="w-5 h-5 ml-2 fill-current" />
                </PhysicalButton>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {gameState === "SUCCESS" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="w-24 h-24 bg-fuchsia-500/20 rounded-[2.5rem] flex items-center justify-center border border-fuchsia-500/30 mb-8 overflow-hidden group shadow-[0_0_50px_rgba(217,70,239,0.3)]">
                            <Target className="w-12 h-12 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Logic Verified</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            Algorithm stabilized. Shortest path verified. Computational complexity reduced by 42%. Elite performance.
                        </p>
                        <PhysicalButton
                            onClick={() => window.location.reload()}
                            className="bg-fuchsia-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-fuchsia-400/30"
                        >
                            RETURN TO HUB 🎮
                        </PhysicalButton>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Idle Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-fuchsia-500/20 rounded-[2.5rem] flex items-center justify-center border border-fuchsia-500/30 mb-8 overflow-hidden group shadow-[0_0_40px_rgba(217,70,239,0.2)]">
                        <Cpu className="w-12 h-12 text-fuchsia-400 group-hover:rotate-180 transition-transform duration-1000" />
                    </div>
                    <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Logic Labyrinth</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Design the ultimate algorithm. Program your way through complex mazes, master conditionals, and optimize recursive loops in immersive 4K.
                    </p>
                    <PhysicalButton
                        onClick={() => { setGameState("CODING"); hapticSelection(); setMessage("Stack initialized. Define pathfinding logic blocks. 🤖"); }}
                        className="bg-fuchsia-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-fuchsia-400/30"
                    >
                        INITIATE STACK 💻
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function StatusBox({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="text-right">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">{label}</span>
            <span className={`text-xl font-black italic ${color} leading-none tabular-nums`}>{value}</span>
        </div>
    );
}

function BlockButton({ label, icon: Icon, color, className, onClick }: any) {
    return (
        <motion.button
            whileHover={{ x: 8 }}
            onClick={onClick}
            className="group flex items-center gap-4 w-full p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left"
        >
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${className}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <span className="block text-sm font-black text-white italic uppercase leading-none">{label}</span>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">ADD TO STACK</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-700 ml-auto group-hover:text-fuchsia-400" />
        </motion.button>
    );
}
