"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Navigation, Compass, Star, Map as MapIcon, Info, ChevronRight, Target, Move, Rocket, Sparkles, Crosshair, ZoomIn } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Star Steer Types --- */
type Constellation = "ORION" | "LYRA" | "CYGNUS" | "CASSIOPEIA";

interface StarData {
    id: string;
    name: string;
    constellation: Constellation;
    x: number;
    y: number;
    magnitude: number;
}

export default function StarSteer() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "NAVIGATING" | "IDENTIFIED" | "SUCCESS">("IDLE");
    const [viewAngle, setViewAngle] = useState({ yaw: 0, pitch: 0 });
    const [targets, setTargets] = useState<string[]>([]);
    const [zoom, setZoom] = useState(1);

    const STARS: StarData[] = useMemo(() => [
        { id: "S1", name: "Rigel", constellation: "ORION", x: 25, y: 75, magnitude: 1.2 },
        { id: "S2", name: "Betelgeuse", constellation: "ORION", x: 30, y: 40, magnitude: 1.5 },
        { id: "S3", name: "Vega", constellation: "LYRA", x: 70, y: 30, magnitude: 1.1 },
        { id: "S4", name: "Deneb", constellation: "CYGNUS", x: 80, y: 50, magnitude: 1.3 },
        { id: "S5", name: "Cassiopeia A", constellation: "CASSIOPEIA", x: 15, y: 20, magnitude: 1.4 }
    ], []);

    const updateView = useCallback((dyaw: number, dpitch: number) => {
        if (gameState !== "NAVIGATING") return;
        setViewAngle(prev => ({
            yaw: (prev.yaw + dyaw + 360) % 360,
            pitch: Math.min(45, Math.max(-45, prev.pitch + dpitch))
        }));
        hapticSelection();
    }, [gameState]);

    const captureStar = (star: StarData) => {
        if (targets.includes(star.id)) return;
        setTargets(prev => [...prev, star.id]);
        hapticSuccess();
        setMessage(`Celestial body identified: ${star.name}. Coordinates logged to star-chart. 🌌`);
        setMood("happy");

        if (targets.length + 1 === STARS.length) {
            setGameState("SUCCESS");
            setMessage("Galaxy map complete! Galactic navigation established. 🚀");
        }
    };

    const startNav = () => {
        setGameState("NAVIGATING");
        setMood("thinking");
        setMessage("Engaging celestial sensors. Point the starship bridge toward identified constellations. 🚢");
        hapticSelection();
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-slate-950/20 rounded-[4rem] border border-blue-500/20 overflow-hidden shadow-2xl flex flex-col font-sans text-white">
            {/* Deep Space Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.2)_0%,transparent_80%)]">
                {/* 4K Starfield */}
                {Array.from({ length: 150 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 2 + Math.random() * 4, repeat: Infinity }}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${Math.random()})`
                        }}
                    />
                ))}
            </div>

            {/* Bridge HUD Overlay */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <Rocket className="text-blue-400 w-8 h-8 group-hover:translate-y-[-4px] transition-transform" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none text-blue-100">Star Steer</h2>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Astro-Nav v9.4</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    <HudValue label="YAW" value={`${viewAngle.yaw.toFixed(1)}°`} icon={Move} />
                    <HudValue label="PITCH" value={`${viewAngle.pitch.toFixed(1)}°`} icon={Navigation} />
                    <div className="bg-white/5 border border-white/5 px-6 py-2 rounded-2xl flex flex-col items-end">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">MAGNIFICATION</span>
                        <span className="text-lg font-black italic text-blue-400 tabular-nums">{zoom.toFixed(1)}X</span>
                    </div>
                </div>
            </div>

            {/* Viewport & Controls */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Navigation Tools */}
                <div className="w-80 border-r border-white/5 p-8 flex flex-col gap-6 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Compass className="w-3 h-3 text-blue-400" /> Sensor Controls
                    </h3>

                    <ControlPad
                        onMoveUp={() => updateView(0, 5)}
                        onMoveDown={() => updateView(0, -5)}
                        onMoveLeft={() => updateView(-5, 0)}
                        onMoveRight={() => updateView(5, 0)}
                    />

                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            onClick={() => setZoom(prev => Math.min(4, prev + 0.5))}
                            className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-white/5 transition-colors"
                        >
                            <ZoomIn className="w-5 h-5 text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Magnify View</span>
                        </button>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5">
                        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 italic">Star-Chart Catalog</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {STARS.map(s => (
                                <div key={s.id} className={`p-2 rounded-xl border text-[8px] font-black text-center transition-all
                                    ${targets.includes(s.id) ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-black/20 border-white/5 text-zinc-600'}`}>
                                    {s.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* The Celestial Sphere */}
                <div className="flex-1 relative bg-black/40 overflow-hidden">
                    {/* Crosshair Overlay */}
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-40">
                        <Crosshair className="w-24 h-24 text-blue-400/50" />
                        <div className="absolute w-64 h-64 border border-blue-400/20 rounded-full" />
                    </div>

                    {/* Viewport Content */}
                    <motion.div
                        animate={{
                            x: -viewAngle.yaw * 2,
                            y: viewAngle.pitch * 2,
                            scale: zoom
                        }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="absolute inset-0 w-[4000px] h-[2000px] -left-[1500px] -top-[650px]"
                    >
                        {STARS.map(star => (
                            <StarNode
                                key={star.id}
                                star={star}
                                isIdentified={targets.includes(star.id)}
                                onClick={() => captureStar(star)}
                            />
                        ))}
                    </motion.div>

                    {/* Scanning Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:100px_100px]" />
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {gameState === "SUCCESS" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="w-24 h-24 bg-blue-500/20 rounded-[2.5rem] flex items-center justify-center border border-blue-500/30 mb-8 overflow-hidden group shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                            <Navigation className="w-12 h-12 text-blue-400 group-hover:rotate-45 transition-transform" />
                        </div>
                        <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none italic">Galaxy Mapped</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            Navigation stabilized. Celestial nodes synchronized. Starship trajectory optimized at 99.9% accuracy.
                        </p>
                        <PhysicalButton
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-blue-400/30"
                        >
                            RETURN TO HUB 🚀
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
                    <div className="w-24 h-24 bg-blue-500/20 rounded-[2.5rem] flex items-center justify-center border border-blue-500/30 mb-8 overflow-hidden group">
                        <MapIcon className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none italic">Star Steer</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Journey through the final frontier. Navigate by the stars, identify constellations, and master spherical geometry in beautiful 4K.
                    </p>
                    <PhysicalButton
                        onClick={startNav}
                        className="bg-blue-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-blue-400/30"
                    >
                        ENGAGE SYSTEMS 🚢
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function HudValue({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="flex flex-col items-end gap-1">
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                <Icon className="w-2.5 h-2.5" /> {label}
            </span>
            <span className="text-xl font-black italic text-white tabular-nums">{value}</span>
        </div>
    );
}

function ControlPad({ onMoveUp, onMoveDown, onMoveLeft, onMoveRight }: any) {
    return (
        <div className="grid grid-cols-3 gap-2 w-full max-w-[200px] mx-auto mb-4">
            <div />
            <ControlButton icon={ChevronRight} className="-rotate-90" onClick={onMoveUp} />
            <div />
            <ControlButton icon={ChevronRight} className="rotate-180" onClick={onMoveLeft} />
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20" />
            <ControlButton icon={ChevronRight} onClick={onMoveRight} />
            <div />
            <ControlButton icon={ChevronRight} className="rotate-90" onClick={onMoveDown} />
            <div />
        </div>
    );
}

function ControlButton({ icon: Icon, className, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-12 h-12 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center hover:bg-zinc-700 transition-colors flex-shrink-0 ${className}`}
        >
            <Icon className="w-5 h-5 text-blue-400" />
        </button>
    );
}

function StarNode({ star, isIdentified, onClick }: { star: StarData, isIdentified: boolean, onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.2 }}
            className="absolute flex flex-col items-center gap-3 group"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
        >
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                    className={`rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]
                        ${star.magnitude < 1.3 ? 'w-4 h-4 bg-white' : 'w-3 h-3 bg-blue-100'}
                    `}
                />
                {!isIdentified && (
                    <div className="absolute inset-0 -m-4 border border-blue-400/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </div>

            <AnimatePresence>
                {(isIdentified || true) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isIdentified ? 1 : 0.4, scale: 1 }}
                        className="bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10"
                    >
                        <span className="text-[10px] font-black uppercase text-white tracking-widest whitespace-nowrap">
                            {star.name}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
