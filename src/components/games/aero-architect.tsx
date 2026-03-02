"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Wind, Rocket, Activity, ShieldCheck, Thermometer, Info, ChevronRight, Zap, Target, Sliders, Gauge, Play } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Aerodynamics Types --- */
type WingShape = "DELTA" | "ELLIPTICAL" | "SWEPT" | "RECTANGULAR";

type AirframeStats = {
    lift: number;
    drag: number;
    stability: number;
    speed: number;
};

export default function AeroArchitect() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "DESIGN" | "TESTING" | "CRASH">("IDLE");
    const [wingShape, setWingShape] = useState<WingShape>("SWEPT");
    const [wingSpan, setWingSpan] = useState(50);
    const [enginePower, setEnginePower] = useState(50);
    const [velocity, setVelocity] = useState(0);

    const stats = useMemo((): AirframeStats => {
        let lift = (wingSpan * 0.8) + (wingShape === "DELTA" ? 20 : wingShape === "ELLIPTICAL" ? 30 : 10);
        let drag = (wingSpan * 0.4) + (wingShape === "RECTANGULAR" ? 40 : 10);
        let stability = wingShape === "SWEPT" ? 80 : 50;
        let speed = (enginePower * 1.5) - (drag * 0.5);

        return { lift, drag, stability, speed: Math.max(0, speed) };
    }, [wingShape, wingSpan, enginePower]);

    const startTest = () => {
        setGameState("TESTING");
        setMood("thinking");
        setMessage("Airflow stabilized. Increasing velocity in the 4K wind tunnel. 🌪️");
        hapticSelection();

        let v = 0;
        const interval = setInterval(() => {
            v += 2;
            setVelocity(v);
            if (v >= stats.speed) {
                clearInterval(interval);
                if (stats.lift > 70 && stats.stability > 60) {
                    setMessage("Takeoff speed reached! Aerodynamic stability confirmed. ✈️");
                    setMood("happy");
                    hapticSuccess();
                } else {
                    setGameState("CRASH");
                    setMessage("Stall detected! The current design lacks sufficient lift coefficient. 💥");
                    setMood("sad");
                    hapticError();
                }
            }
        }, 50);
    };

    const resetDesign = () => {
        setGameState("DESIGN");
        setVelocity(0);
        setMood("happy");
        setMessage("Design updated. Let's optimize the lift-to-drag ratio! 📐");
        hapticSelection();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-zinc-950 rounded-[4rem] border border-sky-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Wind Tunnel Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />
                <svg className="absolute inset-0 w-full h-full text-sky-500/5">
                    <pattern id="aero-grid" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#aero-grid)" />
                </svg>
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
                        <Wind className="text-sky-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Aero Architect</h2>
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">Aeronautics Lab v5.4</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <StatBox label="Lift Coefficient" value={stats.lift} color="text-emerald-400" />
                    <StatBox label="Drag Force" value={stats.drag} color="text-rose-400" />
                    <StatBox label="Stability" value={stats.stability} color="text-sky-400" />
                </div>
            </div>

            {/* Workspace */}
            <div className="relative z-10 flex-1 flex">
                {/* Left: Design Controls */}
                <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-8 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Sliders className="w-3 h-3" /> Configuration
                    </h3>

                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Wing Geometry</span>
                        <div className="grid grid-cols-2 gap-2">
                            {(["DELTA", "ELLIPTICAL", "SWEPT", "RECTANGULAR"] as WingShape[]).map(shape => (
                                <button
                                    key={shape}
                                    onClick={() => setWingShape(shape)}
                                    className={`p-3 rounded-xl border text-[10px] font-black transition-all
                                        ${wingShape === shape ? 'bg-sky-500/20 border-sky-500 text-white' : 'bg-white/5 border-white/5 text-zinc-500 hover:bg-white/10'}`}
                                >
                                    {shape}
                                </button>
                            ))}
                        </div>
                    </div>

                    <ControlSlider label="Wing Span" value={wingSpan} onChange={setWingSpan} unit="m" />
                    <ControlSlider label="Engine Thrust" value={enginePower} onChange={setEnginePower} unit="kN" />

                    <div className="mt-auto">
                        <PhysicalButton
                            onClick={gameState !== "TESTING" ? startTest : undefined}
                            className={`w-full h-20 rounded-3xl ${gameState === "TESTING" ? 'bg-zinc-800' : 'bg-sky-600'}`}
                        >
                            {gameState === "TESTING" ? <Activity className="animate-pulse" /> : "START TUNNEL TEST 🚀"}
                        </PhysicalButton>
                    </div>
                </div>

                {/* Right: Wind Tunnel Visualizer */}
                <div className="flex-1 p-12 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Tunnel Walls */}
                    <div className="absolute inset-x-12 top-12 bottom-12 border-y border-white/10 rounded-[3rem] pointer-events-none" />

                    {/* Streamlines */}
                    <div className="absolute inset-0 flex flex-col justify-around py-24 opacity-30 pointer-events-none">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -100 }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                                className="h-0.5 w-full bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                            />
                        ))}
                    </div>

                    {/* The Aircraft */}
                    <div className="relative">
                        <motion.div
                            className={`relative z-10 w-96 h-48 flex items-center justify-center transition-all duration-300
                                ${gameState === "CRASH" ? 'rotate-12 translate-y-32 blur-sm scale-90' : ''}`}
                            animate={{
                                y: gameState === "TESTING" ? [0, -10, 0] : 0,
                                x: gameState === "TESTING" ? [0, 5, 0] : 0
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {/* Fuselage */}
                            <div className="w-64 h-8 bg-zinc-800 rounded-full border border-white/10 shadow-2xl relative">
                                <Rocket className="absolute -right-8 -top-4 w-12 h-12 text-zinc-700/50 -rotate-90" />
                            </div>
                            {/* Wing View */}
                            <motion.div
                                className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-40 border-l border-sky-400/50 backdrop-blur-sm
                                    ${wingShape === "DELTA" ? 'w-48 bg-sky-500/10' :
                                        wingShape === "SWEPT" ? 'w-32 -skew-x-12 bg-sky-400/10' :
                                            wingShape === "ELLIPTICAL" ? 'w-40 rounded-full bg-sky-300/10' :
                                                'w-56 bg-zinc-700/20'}`}
                                style={{ width: `${wingSpan * 2}px` }}
                            />
                        </motion.div>

                        {/* Speed Gauge Overlay */}
                        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tunnel Velocity</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black italic text-white tabular-nums">{velocity.toFixed(0)}</span>
                                <span className="text-sm font-bold text-sky-500">km/h</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Overlay */}
                    <AnimatePresence>
                        {(gameState === "TESTING" && velocity >= stats.speed) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-40 bg-zinc-950/60 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center border border-emerald-500/30 mb-6">
                                    <ShieldCheck className="text-emerald-400 w-10 h-10" />
                                </div>
                                <h3 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">Flight Verified</h3>
                                <p className="text-zinc-500 text-sm max-w-sm mb-12 italic">Your aerodynamic profile is optimized for horizontal flight. Data logged.</p>
                                <PhysicalButton
                                    onClick={resetDesign}
                                    className="bg-sky-600 h-16 px-12 rounded-2xl"
                                >
                                    RETURN TO HANGAR
                                </PhysicalButton>
                            </motion.div>
                        )}
                        {gameState === "CRASH" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-40 bg-zinc-950/60 backdrop-blur-xl flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-rose-500/20 rounded-[2rem] flex items-center justify-center border border-rose-500/30 mb-6">
                                    <Zap className="text-rose-400 w-10 h-10" />
                                </div>
                                <h3 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">Test Failure</h3>
                                <p className="text-zinc-500 text-sm max-w-sm mb-12 italic">Insufficient lift. The airframe stalled at V-crit.</p>
                                <PhysicalButton
                                    onClick={resetDesign}
                                    className="bg-rose-600 h-16 px-12 rounded-2xl"
                                >
                                    RE-ENGINEER
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
                    <div className="w-24 h-24 bg-sky-500/20 rounded-[2.5rem] flex items-center justify-center border border-sky-500/30 mb-8 overflow-hidden group">
                        <Rocket className="w-12 h-12 text-sky-400 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Aerodyamic Mastery</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Design aircraft, optimize lift coefficients, and test them in a high-fidelity 4K wind tunnel simulation.
                    </p>
                    <PhysicalButton
                        onClick={() => setGameState("DESIGN")}
                        className="bg-sky-600 h-24 px-20 rounded-[3rem] text-2xl"
                    >
                        ENTER HANGAR ✈️
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function StatBox({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="bg-white/5 border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end min-w-[140px]">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
            <span className={`text-xl font-black italic tabular-nums ${color}`}>{value.toFixed(1)}</span>
        </div>
    );
}

function ControlSlider({ label, value, onChange, unit }: { label: string, value: number, onChange: (v: number) => void, unit: string }) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-black text-white">{value}{unit}</span>
            </div>
            <input
                type="range"
                min="10"
                max="100"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 appearance-none rounded-full accent-sky-500 cursor-pointer"
            />
        </div>
    );
}
