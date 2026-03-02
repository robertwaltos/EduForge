"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Cpu, Play, Square, RotateCcw, Code, Zap, Settings, Activity, ShieldCheck, ChevronRight, Terminal, Bot } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Programming Types --- */
type Command = "MOVE_FORWARD" | "TURN_LEFT" | "TURN_RIGHT" | "REPEAT_2" | "COLLECT";

type BotState = {
    x: number;
    y: number;
    dir: 0 | 90 | 180 | 270; // Degrees
    inventory: number;
};

const COMMAND_DATA: Record<Command, { label: string, icon: any, color: string }> = {
    MOVE_FORWARD: { label: "Move Forward", icon: ChevronRight, color: "bg-blue-500" },
    TURN_LEFT: { label: "Turn Left", icon: RotateCcw, color: "bg-purple-500" },
    TURN_RIGHT: { label: "Turn Right", icon: RotateCcw, color: "bg-indigo-500" },
    REPEAT_2: { label: "Repeat 2x", icon: Zap, color: "bg-amber-500" },
    COLLECT: { label: "Collect Data", icon: ShieldCheck, color: "bg-emerald-500" }
};

export default function BotBuilder() {
    const { setMessage, setMood } = useMascot();
    const [program, setProgram] = useState<Command[]>([]);
    const [bot, setBot] = useState<BotState>({ x: 0, y: 0, dir: 0, inventory: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [execIndex, setExecIndex] = useState(-1);
    const [gridSize] = useState(5);
    const [target] = useState({ x: 3, y: 3 });

    // Reset simulation
    const resetBot = useCallback(() => {
        setBot({ x: 0, y: 0, dir: 0, inventory: 0 });
        setIsRunning(false);
        setExecIndex(-1);
    }, []);

    const runProgram = async () => {
        if (program.length === 0) {
            setMessage("We need some code to run the bot! 🤖");
            hapticError();
            return;
        }

        setIsRunning(true);
        setMessage("Executing sequence... watching logic loops in real-time. ⚡");
        setMood("thinking");
        hapticSelection();

        let currentBot = { ...bot };

        for (let i = 0; i < program.length; i++) {
            setExecIndex(i);
            const cmd = program[i];

            // Logic implementation
            if (cmd === "MOVE_FORWARD") {
                if (currentBot.dir === 0) currentBot.x = Math.min(gridSize - 1, currentBot.x + 1);
                if (currentBot.dir === 90) currentBot.y = Math.min(gridSize - 1, currentBot.y + 1);
                if (currentBot.dir === 180) currentBot.x = Math.max(0, currentBot.x - 1);
                if (currentBot.dir === 270) currentBot.y = Math.max(0, currentBot.y - 1);
            } else if (cmd === "TURN_LEFT") {
                currentBot.dir = (currentBot.dir + 270) % 360 as any;
            } else if (cmd === "TURN_RIGHT") {
                currentBot.dir = (currentBot.dir + 90) % 360 as any;
            } else if (cmd === "COLLECT") {
                if (currentBot.x === target.x && currentBot.y === target.y) {
                    currentBot.inventory += 1;
                }
            }

            setBot({ ...currentBot });
            await new Promise(r => setTimeout(r, 600));
        }

        setIsRunning(false);
        setExecIndex(-1);

        if (currentBot.inventory > 0) {
            setMessage("Sequence complete! Data package secured. Great coding! 🌟");
            setMood("happy");
            hapticSuccess();
        } else {
            setMessage("Sequence finished, but we missed the target. Debug and try again! 🔧");
            setMood("sad");
            hapticError();
        }
    };

    const addCommand = (cmd: Command) => {
        if (program.length < 8) {
            setProgram(prev => [...prev, cmd]);
            hapticSelection();
        } else {
            hapticError();
        }
    };

    const clearProgram = () => {
        setProgram([]);
        resetBot();
        hapticSelection();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-zinc-950 rounded-[4rem] border border-blue-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Terminal Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
                <svg className="absolute inset-0 w-full h-full text-blue-500/5">
                    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <Bot className="text-blue-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Bot Builder</h2>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Automation Engine v1.0</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <PhysicalButton
                        onClick={program.length > 0 && !isRunning ? runProgram : undefined}
                        className={`h-14 px-8 rounded-2xl text-sm ${isRunning ? 'bg-zinc-800 opacity-50' : 'bg-blue-600'}`}
                    >
                        {isRunning ? <Settings className="animate-spin w-4 h-4" /> : <Play className="w-4 h-4 fill-current mr-2" />}
                        {isRunning ? "RUNNING..." : "EXECUTE CODE"}
                    </PhysicalButton>
                    <PhysicalButton
                        onClick={clearProgram}
                        className="bg-zinc-800 h-14 w-14 rounded-2xl flex items-center justify-center"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </PhysicalButton>
                </div>
            </div>

            {/* IDE Workspace */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Left: Command Palette */}
                <div className="w-72 border-r border-white/5 p-6 flex flex-col gap-3 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Code className="w-3 h-3" /> Instruction Set
                    </h3>
                    {(Object.keys(COMMAND_DATA) as Command[]).map(cmd => (
                        <CommandButton
                            key={cmd}
                            cmd={cmd}
                            onClick={() => addCommand(cmd)}
                            disabled={isRunning}
                        />
                    ))}
                </div>

                {/* Center: Logic Stream */}
                <div className="flex-1 p-8 flex flex-col bg-zinc-950/20">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Terminal className="w-3 h-3" /> Main Execution Loop
                    </h3>
                    <div className="flex flex-col gap-2">
                        <AnimatePresence>
                            {program.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-40 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center italic text-zinc-700 text-sm"
                                >
                                    Drag commands here to start building...
                                </motion.div>
                            ) : (
                                program.map((cmd, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300
                                            ${execIndex === idx ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-mono text-zinc-600 w-4">{idx + 1}</span>
                                            <div className={`w-8 h-8 rounded-lg ${COMMAND_DATA[cmd].color} flex items-center justify-center`}>
                                                <CommandIcon cmd={cmd} />
                                            </div>
                                            <span className={`text-sm font-bold ${execIndex === idx ? 'text-white' : 'text-zinc-400'}`}>
                                                {COMMAND_DATA[cmd].label}
                                            </span>
                                        </div>
                                        {execIndex === idx && <Activity className="w-4 h-4 text-blue-400 animate-pulse" />}
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Simulation Grid */}
                <div className="w-80 border-l border-white/5 p-8 flex flex-col items-center justify-center bg-zinc-900/60">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-8">Visualizer</h3>
                    <div className="relative w-64 h-64 grid grid-cols-5 grid-rows-5 gap-1 bg-black/40 rounded-2xl p-2 border border-white/5 shadow-inner">
                        {Array.from({ length: 25 }).map((_, i) => {
                            const x = i % 5;
                            const y = Math.floor(i / 5);
                            const isTarget = x === target.x && y === target.y;
                            return (
                                <div key={i} className="relative bg-white/5 rounded-sm border border-white/5">
                                    {isTarget && (
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-1 bg-emerald-500/20 rounded-sm flex items-center justify-center"
                                        >
                                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}

                        {/* The Bot */}
                        <motion.div
                            className="absolute bg-blue-500 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center"
                            animate={{
                                left: `${bot.x * (64 / 5) * 4}px`,
                                top: `${bot.y * (64 / 5) * 4}px`,
                                rotate: bot.dir
                            }}
                            style={{ width: '48px', height: '48px', margin: '4px' }}
                        >
                            <Bot className="w-8 h-8 text-white" />
                        </motion.div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 w-full">
                        <StatRow label="Inventory" value={bot.inventory} icon={ShieldCheck} color="text-emerald-400" />
                        <StatRow label="CPU Cycles" value={execIndex + 1} icon={Cpu} color="text-blue-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CommandButton({ cmd, onClick, disabled }: { cmd: Command, onClick: () => void, disabled?: boolean }) {
    const data = COMMAND_DATA[cmd];
    const Icon = data.icon;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="group flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-zinc-800 hover:border-blue-500/30 transition-all text-left disabled:opacity-30 disabled:pointer-events-none"
        >
            <div className={`w-10 h-10 rounded-xl ${data.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <CommandIcon cmd={cmd} />
            </div>
            <span className="text-sm font-bold text-zinc-300 group-hover:text-white">{data.label}</span>
        </button>
    );
}

function CommandIcon({ cmd }: { cmd: Command }) {
    const data = COMMAND_DATA[cmd];
    const Icon = data.icon;
    return <Icon className="w-5 h-5 text-white" />;
}

function StatRow({ label, value, icon: Icon, color }: { label: string, value: any, icon: any, color: string }) {
    return (
        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2">
                <Icon className={`w-3 h-3 ${color}`} />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-sm font-black text-white">{value}</span>
        </div>
    );
}
