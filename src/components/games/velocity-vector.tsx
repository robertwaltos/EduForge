"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_VARIANTS, JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import { hapticSelection, hapticError, hapticSuccess } from "@/lib/platform/haptics";
import { Zap, ArrowUp, ArrowDown, Activity, FastForward } from "lucide-react";

/* --- Velocity Vector Content --- */
type Obstacle = {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    type: "ice" | "metal" | "energy";
};

export default function VelocityVector() {
    const { setMood, setMessage } = useMascot();
    const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready");
    const [score, setScore] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [positionY, setPositionY] = useState(50); // 0-100 percentage
    const [obstacles, setObstacles] = useState<Obstacle[]>([]);

    const requestRef = useRef<number | undefined>(undefined);
    const previousTimeRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        setMessage("Welcome to the Velocity Vector. Pilot the probe using the power of physics! 🚀⚡");
        setMood("happy");
    }, []);

    const spawnObstacle = () => {
        const newObstacle: Obstacle = {
            id: Math.random(),
            x: 110,
            y: Math.random() * 80 + 10,
            width: 10,
            height: 20,
            type: ["ice", "metal", "energy"][Math.floor(Math.random() * 3)] as any
        };
        setObstacles(prev => [...prev, newObstacle]);
    };

    const update = (time: number) => {
        if (gameState !== "playing") return;

        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;

            setObstacles(prev => {
                const moved = prev.map(o => ({ ...o, x: o.x - 0.5 - (velocity * 0.05) }));
                const filtered = moved.filter(o => o.x > -20);

                // Collision Detection
                const collision = filtered.find(o =>
                    o.x < 25 && o.x > 15 &&
                    Math.abs(o.y - positionY) < 15
                );

                if (collision) {
                    setGameState("gameover");
                    void hapticError();
                    setMood("thinking");
                    setMessage("Impact detected! Analyze the vector error and try again. 🛠️");
                    return filtered;
                }

                return filtered;
            });

            setScore(prev => prev + 1);
            if (time % 2000 < 20) spawnObstacle();
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        if (gameState === "playing") {
            requestRef.current = requestAnimationFrame(update);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [gameState, positionY, velocity]);

    const startGame = () => {
        setScore(0);
        setVelocity(5);
        setPositionY(50);
        setObstacles([]);
        setGameState("playing");
        void hapticSelection();
        setMood("happy");
        setMessage("Full throttle! Watch those vectors! 💨");
    };

    const adjustVector = (delta: number) => {
        setPositionY(prev => Math.max(10, Math.min(90, prev + delta)));
        void hapticSelection();
    };

    return (
        <div className="relative min-h-[600px] w-full flex flex-col items-center justify-center p-8 bg-zinc-950 overflow-hidden rounded-[3rem] border-4 border-slate-900 shadow-2xl">
            {/* 4K Background Image */}
            <div className="absolute inset-0 opacity-40">
                <img
                    src="/neon_velocity_track_bg_1772427504324.png"
                    alt="Velocity Track"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Scanline / Velocity Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Stats Overlay */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
                <div className="flex gap-4">
                    <StatBox icon={Activity} label="Distance" value={`${(score / 100).toFixed(1)}km`} color="text-cyan-400" />
                    <StatBox icon={FastForward} label="Velocity" value={`${velocity * 10} mach`} color="text-amber-400" />
                </div>
                <div className="bg-white/5 border border-white/10 px-6 py-2 rounded-2xl backdrop-blur-xl">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Vector Integrity</span>
                    <div className="w-24 h-1 bg-white/10 mt-1 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: gameState === "playing" ? "100%" : "0%" }}
                            className="h-full bg-cyan-400"
                        />
                    </div>
                </div>
            </div>

            {/* The Runner Arena */}
            <div className="relative w-full h-[300px] z-10 overflow-hidden">
                <AnimatePresence>
                    {gameState === "playing" && (
                        <>
                            {/* The Ship/Probe */}
                            <motion.div
                                animate={{ y: `${positionY}%` }}
                                transition={JUICY_SPRINGS.stiff}
                                className="absolute left-[20%] top-0 -translate-y-1/2"
                            >
                                <div className="relative">
                                    <div className="w-12 h-6 bg-cyan-400 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.8)]" />
                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-transparent to-cyan-400/50 blur-sm" />
                                </div>
                            </motion.div>

                            {/* Obstacles */}
                            {obstacles.map(o => (
                                <div
                                    key={o.id}
                                    style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.width}%`, height: `${o.height}%` }}
                                    className={`absolute -translate-y-1/2 rounded-lg border border-white/10 backdrop-blur-md 
                                        ${o.type === "ice" ? "bg-sky-400/20 shadow-[0_0_20px_rgba(56,189,248,0.3)]" :
                                            o.type === "metal" ? "bg-slate-400/20 shadow-[0_0_20px_rgba(148,163,184,0.3)]" :
                                                "bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.3)]"}`}
                                />
                            ))}
                        </>
                    )}
                </AnimatePresence>

                {gameState !== "playing" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl rounded-[2rem] border border-white/5"
                    >
                        <h3 className="text-4xl font-black text-white italic tracking-tighter mb-4">
                            {gameState === "ready" ? "READY FOR PILOTING?" : "MISSION TERMINATED"}
                        </h3>
                        {gameState === "gameover" && <p className="text-slate-400 mb-8">Final Distance: {(score / 100).toFixed(1)} km</p>}
                        <PhysicalButton onClick={startGame} className="bg-cyan-500 text-black px-12 h-14 rounded-2xl font-black italic">
                            {gameState === "ready" ? "IGNITE STOCKS" : "REBOOT SYSTEMS"}
                        </PhysicalButton>
                    </motion.div>
                )}
            </div>

            {/* Controls */}
            <div className="mt-12 flex flex-col items-center gap-4 z-10 w-full max-w-md">
                <div className="flex gap-4 w-full">
                    <PhysicalButton
                        onClick={() => adjustVector(-10)}
                        className="flex-1 bg-white/5 h-20 rounded-2xl border border-white/10 group"
                    >
                        <ArrowUp className="w-8 h-8 text-cyan-400 group-active:scale-125 transition-transform" />
                        <span className="ml-2 text-xs font-black uppercase text-slate-500">Lift Vector</span>
                    </PhysicalButton>
                    <PhysicalButton
                        onClick={() => adjustVector(10)}
                        className="flex-1 bg-white/5 h-20 rounded-2xl border border-white/10 group"
                    >
                        <ArrowDown className="w-8 h-8 text-amber-400 group-active:scale-125 transition-transform" />
                        <span className="ml-2 text-xs font-black uppercase text-slate-500">Drop Vector</span>
                    </PhysicalButton>
                </div>
            </div>

            {/* Velocity Info */}
            <div className="absolute bottom-10 left-10 opacity-30 flex items-center gap-4">
                <div className="w-32 h-[2px] bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/2 bg-cyan-400"
                    />
                </div>
                <span className="text-[8px] font-black text-cyan-400 uppercase tracking-[0.3em]">Spark Pilot System: Engaged</span>
            </div>
        </div>
    );
}

function StatBox({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
    return (
        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md flex items-center gap-4">
            <div className={`p-2 rounded-lg bg-black/40 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider font-mono">{label}</span>
                <span className="text-xl font-black text-white italic">{value}</span>
            </div>
        </div>
    );
}
