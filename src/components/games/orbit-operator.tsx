"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { Globe, Satellite, Zap, Target, RefreshCcw, Gauge, Layers, ShieldAlert } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Orbital Types --- */
type Body = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    mass: number;
    radius: number;
    type: "earth" | "satellite" | "debris";
};

export default function OrbitOperator() {
    const { setMessage, setMood } = useMascot();
    const [satellite, setSatellite] = useState<Body | null>(null);
    const [gameState, setGameState] = useState<"IDLE" | "LAUNCHING" | "ORBITING" | "CRASHED" | "LOST">("IDLE");
    const [launchVector, setLaunchVector] = useState<{ x: number; y: number } | null>(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);

    const earth: Body = { x: 50, y: 50, vx: 0, vy: 0, mass: 5000, radius: 10, type: "earth" };

    // Physics constants
    const G = 0.5;
    const DT = 0.1;

    const resetGame = useCallback(() => {
        setSatellite(null);
        setLaunchVector(null);
        setGameState("IDLE");
        setScore(0);
        setAttempts(3);
        setMood("thinking");
        setMessage("Mission Control: Launch the satellite into the stable green orbit. Watch your trajectory! 🌍");
    }, [setMessage, setMood]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        if (gameState !== "IDLE" || attempts <= 0) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setLaunchVector({ x, y });
        hapticSelection();
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!launchVector || gameState !== "IDLE") return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setLaunchVector({ x: launchVector.x, y: launchVector.y }); // Just to trigger re-render if needed, but we track the 'current' position
    };

    const launch = (e: React.MouseEvent | React.TouchEvent) => {
        if (!launchVector || gameState !== "IDLE") return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
        const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;

        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;

        const dx = launchVector.x - x;
        const dy = launchVector.y - y;

        setSatellite({
            x: launchVector.x,
            y: launchVector.y,
            vx: dx * 0.1,
            vy: dy * 0.1,
            mass: 1,
            radius: 2,
            type: "satellite"
        });

        setGameState("LAUNCHING");
        setLaunchVector(null);
        setAttempts(a => a - 1);
        hapticSuccess();
    };

    // Orbital Simulation Loop
    useEffect(() => {
        if (!satellite || (gameState !== "LAUNCHING" && gameState !== "ORBITING")) return;

        const interval = setInterval(() => {
            setSatellite(prev => {
                if (!prev) return null;

                const dx = earth.x - prev.x;
                const dy = earth.y - prev.y;
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                // Collision Check
                if (dist < earth.radius + prev.radius) {
                    setGameState("CRASHED");
                    hapticError();
                    setMessage("Atmospheric reentry failed. The satellite burned up! Try a higher trajectory. 🔥");
                    return prev;
                }

                // Out of Bounds
                if (prev.x < -50 || prev.x > 150 || prev.y < -50 || prev.y > 150) {
                    setGameState("LOST");
                    setMessage("Escape velocity reached. The satellite is lost in deep space. 🛰️");
                    return prev;
                }

                // Gravity
                const force = (G * earth.mass * prev.mass) / distSq;
                const ax = (dx / dist) * force;
                const ay = (dy / dist) * force;

                const nvx = prev.vx + ax * DT;
                const nvy = prev.vy + ay * DT;
                const nx = prev.x + nvx * DT;
                const ny = prev.y + nvy * DT;

                // Orbit Stability Check (Simplified)
                const speed = Math.sqrt(nvx * nvx + nvy * nvy);
                const targetDist = 35; // Target orbit radius
                if (Math.abs(dist - targetDist) < 5 && Math.abs(speed - 3.8) < 0.5) {
                    if (gameState !== "ORBITING") {
                        setGameState("ORBITING");
                        setScore(s => s + 5000);
                        hapticSuccess();
                        setMessage("Stable orbit achieved! Excellent calculation, Operator. 🚀");
                    }
                }

                return { ...prev, x: nx, y: ny, vx: nvx, vy: nvy };
            });
        }, 16);

        return () => clearInterval(interval);
    }, [satellite, gameState, setMessage]);

    return (
        <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={launch}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={launch}
            className="relative w-full max-w-5xl mx-auto h-[700px] bg-slate-950 rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col font-mono cursor-crosshair select-none"
        >
            {/* Deep Space Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />
                {/* Star Field Simulation */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>

            {/* HUD: Top Metrics */}
            <div className="relative z-20 p-10 flex justify-between items-start pointer-events-none">
                <div className="space-y-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] backdrop-blur-2xl">
                        <div className="flex items-center gap-3 mb-1">
                            <Satellite className="text-sky-400 w-5 h-5" />
                            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Orbit Operator</h2>
                        </div>
                        <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">Trajectory Analysis System v4.0</p>
                    </div>

                    <div className="flex gap-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors
                                    ${i < attempts ? 'bg-sky-500/20 border-sky-500/30 text-sky-400' : 'bg-white/5 border-white/10 text-white/10'}`}
                            >
                                <Satellite className="w-5 h-5" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] backdrop-blur-2xl min-w-[150px]">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Orbital Sync</span>
                        <Gauge className="text-sky-400 w-3 h-3" />
                    </div>
                    <p className="text-3xl font-black italic tracking-tighter tabular-nums text-white">{score.toLocaleString()}</p>
                </div>
            </div>

            {/* Simulation Space */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                {/* Target Orbit Ring */}
                <div className="absolute w-[70%] aspect-square rounded-full border-2 border-emerald-500/20 border-dashed animate-spin-slow" />

                {/* Earth Body */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative w-32 h-32 rounded-full bg-sky-500 shadow-[0_0_50px_rgba(14,165,233,0.3)] z-10 flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent)]" />
                    <Globe className="text-white/80 w-16 h-16 animate-pulse" />
                </motion.div>

                {/* The Satellite */}
                {satellite && (
                    <motion.div
                        className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff] z-20 flex items-center justify-center"
                        style={{
                            left: `${satellite.x}%`,
                            top: `${satellite.y}%`,
                            x: "-50%",
                            y: "-50%"
                        }}
                    >
                        <Satellite className="w-2.5 h-2.5 text-sky-950" />
                    </motion.div>
                )}

                {/* Launch Vector Preview */}
                {launchVector && (
                    <div className="absolute z-20 pointer-events-none">
                        <div className="absolute w-2 h-2 rounded-full bg-sky-400" style={{ left: `${launchVector.x}%`, top: `${launchVector.y}%` }} />
                    </div>
                )}
            </div>

            {/* Game Over / Reset UI */}
            {(gameState === "CRASHED" || gameState === "LOST" || attempts === 0 && !satellite) && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="bg-rose-500/20 p-8 rounded-[3rem] border border-rose-500/30 mb-8">
                        <ShieldAlert className="w-16 h-16 text-rose-400" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase">Mission Terminated</h3>
                    <p className="text-zinc-400 text-sm max-w-sm mb-12">
                        Calculations failed to achieve orbital stability. Recalibrate and attempt another insertion.
                    </p>
                    <PhysicalButton onClick={resetGame} className="bg-sky-500 h-24 px-20 rounded-[3rem] text-2xl">
                        REBOOT SYSTEM 🔄
                    </PhysicalButton>
                </motion.div>
            )}

            {/* Bottom Bar: Instructions */}
            <div className="relative z-20 mt-auto p-10 flex justify-center">
                <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl backdrop-blur-xl">
                    <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Launch Protocol: Drag back to aim, release to fire satellite</p>
                </div>
            </div>

            {/* Scanline Detail */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[length:100%_4px]" />
        </div>
    );
}
