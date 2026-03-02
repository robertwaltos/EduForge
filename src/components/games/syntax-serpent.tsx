"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Cpu, Zap, Code, ShieldCheck, RefreshCw, Trophy } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Types --- */
type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type LogicNode = { id: string; x: number; y: number; type: "variable" | "loop" | "condition"; value: string };

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

export default function SyntaxSerpent() {
    const { setMessage, setMood } = useMascot();
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState<Direction>("RIGHT");
    const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
    const [nodes, setNodes] = useState<LogicNode[]>([]);
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "GAMEOVER">("IDLE");
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [highScore, setHighScore] = useState(0);

    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    // Logic Node Generation
    const spawnNode = useCallback((currentSnake: Point[]) => {
        const types: LogicNode["type"][] = ["variable", "loop", "condition"];
        const values = {
            variable: ["let x = 5", "const PI = 3.14", "var count = 0"],
            loop: ["for(i=0; i<n; i++)", "while(active)", "nodes.map()"],
            condition: ["if(x > 0)", "switch(state)", "isReady ? true : false"]
        };

        let newX: number = 0, newY: number = 0;
        let isOccupied = true;
        while (isOccupied) {
            newX = Math.floor(Math.random() * GRID_SIZE);
            newY = Math.floor(Math.random() * GRID_SIZE);
            isOccupied = currentSnake.some(s => s.x === newX && s.y === newY);
        }

        const type = types[Math.floor(Math.random() * types.length)];
        const newNode: LogicNode = {
            id: Math.random().toString(36).substr(2, 9),
            x: newX!,
            y: newY!,
            type,
            value: values[type][Math.floor(Math.random() * values[type].length)]
        };
        setNodes(prev => [...prev.slice(-2), newNode]); // Keep max 3 nodes on screen
    }, []);

    const startGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setDirection("RIGHT");
        setNextDirection("RIGHT");
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setGameState("PLAYING");
        setNodes([]);
        spawnNode([{ x: 10, y: 10 }]);
        setMood("happy");
        setMessage("Let's build some high-speed logic! 🐍✨");
        hapticSuccess();
    };

    const endGame = () => {
        setGameState("GAMEOVER");
        setMood("sad");
        setMessage("Logic loop terminated. Let's try again!");
        hapticError();
        if (score > highScore) setHighScore(score);
    };

    const moveSnake = useCallback(() => {
        setSnake(prevSnake => {
            const head = prevSnake[0];
            const newHead = { ...head };

            setDirection(nextDirection);
            switch (nextDirection) {
                case "UP": newHead.y -= 1; break;
                case "DOWN": newHead.y += 1; break;
                case "LEFT": newHead.x -= 1; break;
                case "RIGHT": newHead.x += 1; break;
            }

            // Boundary Check
            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                endGame();
                return prevSnake;
            }

            // Self Collision
            if (prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
                endGame();
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Node Collision
            const nodeIndex = nodes.findIndex(n => n.x === newHead.x && n.y === newHead.y);
            if (nodeIndex !== -1) {
                const node = nodes[nodeIndex];
                setScore(s => s + 100);
                setSpeed(v => Math.max(80, v - SPEED_INCREMENT));
                setNodes(prev => prev.filter((_, i) => i !== nodeIndex));
                spawnNode(newSnake);
                hapticSelection();
                setMood("happy");
                setMessage(`Great code! Collected: ${node.type}`);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [nextDirection, nodes, spawnNode]);

    useEffect(() => {
        if (gameState === "PLAYING") {
            gameLoopRef.current = setInterval(moveSnake, speed);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }
        return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
    }, [gameState, speed, moveSnake]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp": if (direction !== "DOWN") setNextDirection("UP"); break;
                case "ArrowDown": if (direction !== "UP") setNextDirection("DOWN"); break;
                case "ArrowLeft": if (direction !== "RIGHT") setNextDirection("LEFT"); break;
                case "ArrowRight": if (direction !== "LEFT") setNextDirection("RIGHT"); break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-video bg-black rounded-[3rem] border border-white/10 overflow-hidden group shadow-2xl">
            {/* 4K Neon Grid Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
                        backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
                    }}
                />
                {/* Flowing Data Streams */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-sky-500/20 blur-[1px]"
                            style={{
                                left: `${i * 25}%`,
                                width: '2px',
                                top: '-20%',
                                bottom: '-20%'
                            }}
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear" }}
                        />
                    ))}
                </div>
            </div>

            {/* Game Render Layer */}
            <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col md:flex-row gap-8">
                {/* Left: Scoreboard */}
                <div className="flex flex-col justify-between md:w-48 space-y-6">
                    <div className="space-y-4">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-xl">
                            <p className="text-[10px] font-black uppercase text-sky-400 tracking-widest">Logic Score</p>
                            <p className="text-4xl font-black italic tracking-tighter tabular-nums">{score.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-xl">
                            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">High Score</p>
                            <p className="text-2xl font-black italic tracking-tighter text-zinc-400">{highScore.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-sky-500/10 border border-sky-500/20 p-6 rounded-[2rem] backdrop-blur-md hidden md:block">
                        <div className="flex items-center gap-2 mb-4">
                            <Cpu className="text-sky-400 w-4 h-4" />
                            <h3 className="text-sm font-black italic">COMPILER STATUS</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-sky-500 shadow-[0_0_10px_#0ea5e9]"
                                    animate={{ width: `${Math.min(100, (score / 5000) * 100)}%` }}
                                />
                            </div>
                            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Optimization: {Math.floor(speed / 2)}%</p>
                        </div>
                    </div>
                </div>

                {/* Center: The Grid */}
                <div className="flex-1 relative aspect-square bg-slate-900/50 rounded-[2.5rem] border border-white/10 backdrop-blur-sm overflow-hidden border-sky-500/20 shadow-[inset_0_0_50px_rgba(14,165,233,0.1)]">
                    {/* Snake Rendering */}
                    {snake.map((segment, i) => (
                        <motion.div
                            key={i}
                            layoutId={`snake-${i}`}
                            className={`absolute rounded-full z-20 ${i === 0 ? 'bg-sky-400 shadow-[0_0_15px_#38bdf8] z-30' : 'bg-sky-600/60'}`}
                            style={{
                                left: `${(segment.x / GRID_SIZE) * 100}%`,
                                top: `${(segment.y / GRID_SIZE) * 100}%`,
                                width: `${100 / GRID_SIZE}%`,
                                height: `${100 / GRID_SIZE}%`,
                            }}
                        />
                    ))}

                    {/* Nodes Rendering */}
                    <AnimatePresence>
                        {nodes.map(node => (
                            <motion.div
                                key={node.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute z-20 p-1"
                                style={{
                                    left: `${(node.x / GRID_SIZE) * 100}%`,
                                    top: `${(node.y / GRID_SIZE) * 100}%`,
                                    width: `${100 / GRID_SIZE}%`,
                                    height: `${100 / GRID_SIZE}%`,
                                }}
                            >
                                <div className={`w-full h-full rounded-lg border flex items-center justify-center shadow-lg
                                    ${node.type === 'variable' ? 'bg-emerald-500/20 border-emerald-500 animate-pulse' :
                                        node.type === 'loop' ? 'bg-amber-500/20 border-amber-500 animate-spin-slow' :
                                            'bg-indigo-500/20 border-indigo-500'}`}>
                                    {node.type === 'variable' ? <Code className="w-1/2 h-1/2 text-emerald-400" /> :
                                        node.type === 'loop' ? <RefreshCw className="w-1/2 h-1/2 text-amber-400" /> :
                                            <Zap className="w-1/2 h-1/2 text-indigo-400" />}
                                </div>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                                    <span className="text-[7px] font-black text-white/40 uppercase bg-black/50 px-1 rounded">{node.value}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Overlays */}
                    <AnimatePresence>
                        {gameState === "IDLE" && (
                            <motion.div
                                {...JUICY_VARIANTS.slideUp}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl p-12 text-center"
                            >
                                <div className="bg-sky-500/20 p-6 rounded-[2.5rem] border border-sky-500/30 mb-8">
                                    <Code className="w-16 h-16 text-sky-400" />
                                </div>
                                <h2 className="text-4xl font-black italic tracking-tighter mb-4 text-white">SYNTAX SERPENT</h2>
                                <p className="text-zinc-400 text-sm font-medium mb-12 max-w-sm">
                                    Compile a logic chain by collecting high-value syntax nodes. Avoid boundary crashes and infinite loops!
                                </p>
                                <PhysicalButton
                                    onClick={startGame}
                                    className="bg-sky-500 h-20 px-16 rounded-[2rem] text-xl"
                                >
                                    INITIALIZE COMPILER ⚡
                                </PhysicalButton>
                            </motion.div>
                        )}

                        {gameState === "GAMEOVER" && (
                            <motion.div
                                {...JUICY_VARIANTS.slideUp}
                                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-rose-950/90 backdrop-blur-2xl p-12 text-center"
                            >
                                <div className="bg-rose-500/20 p-6 rounded-[2.5rem] border border-rose-500/30 mb-8">
                                    <ShieldCheck className="w-16 h-16 text-rose-400" />
                                </div>
                                <h2 className="text-4xl font-black italic tracking-tighter mb-2 text-white">SYSTEM CRASH</h2>
                                <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Memory Allocation Failure</p>

                                <div className="flex gap-4 mb-12">
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10 min-w-[120px]">
                                        <p className="text-[8px] font-black uppercase text-zinc-500">Nodes Scanned</p>
                                        <p className="text-3xl font-black italic tracking-tighter">{score / 100}</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/10 min-w-[120px]">
                                        <p className="text-[8px] font-black uppercase text-zinc-500">Refined Skill</p>
                                        <p className="text-3xl font-black italic tracking-tighter text-sky-400">Logic++</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <PhysicalButton onClick={startGame} className="bg-white text-slate-950 h-16 px-10 rounded-2xl">
                                        REBOOT SESSION 🔄
                                    </PhysicalButton>
                                    <PhysicalButton onClick={() => setGameState("IDLE")} className="bg-white/10 h-16 px-10 rounded-2xl">
                                        QUIT ⏻
                                    </PhysicalButton>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Controls Hint */}
                <div className="hidden lg:flex flex-col items-center justify-center w-24 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-zinc-500">W</div>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-zinc-500">A</div>
                            <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-zinc-500">S</div>
                            <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-zinc-500">D</div>
                        </div>
                    </div>
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-tight text-center">Use WASD or Arrows to steer</span>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
