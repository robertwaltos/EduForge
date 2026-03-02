"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import MascotFriend from "./KoydoMascotFriends";
import { hapticSelection, hapticSuccess } from "@/lib/platform/haptics";
import { Brain, Flame, Atom, Palette, Cpu, Rocket, ShieldCheck, Beaker, Zap, Box, Search, ChevronRight, Code, Leaf, TrendingUp, Globe, TreePine, Music, Mountain, Bot, Wind, History as HistoryIcon, Microscope, Navigation, Grid3X3, ShieldAlert, Scale, Compass, Building2, Construction } from "lucide-react";
import Link from "next/link";

interface PlanetNode {
    id: string;
    name: string;
    icon: any;
    color: string;
    accent: string;
    x: number;
    y: number;
    mascot: "pixel" | "spark" | "echo" | "luna" | "terra";
    progress: number;
    games: { id: string; title: string; icon: any }[];
}

const PLANETS: PlanetNode[] = [
    {
        id: "science",
        name: "BIO-SYNTHESIS",
        icon: Atom,
        color: "text-emerald-400",
        accent: "from-emerald-500/40 to-teal-500/0",
        x: 20,
        y: 30,
        mascot: "terra",
        progress: 85,
        games: [
            { id: "neural", title: "Neural Navigator", icon: Brain },
            { id: "synthesis", title: "Synthesis Sphere", icon: Beaker },
            { id: "genetic", title: "Genetic Garden", icon: Leaf },
            { id: "cipher", title: "Cipher City", icon: ShieldCheck },
            { id: "biome", title: "Biome Builder", icon: TreePine },
            { id: "tectonic", title: "Tectonic Trek", icon: Mountain },
            { id: "flora", title: "Flora Fusion", icon: Leaf },
            { id: "eco", title: "Eco Engineer", icon: Leaf },
            { id: "nano", title: "Nano Navigator", icon: Microscope },
            { id: "bio-blast", title: "Bio Blast", icon: ShieldAlert },
            { id: "terra-trek", title: "Terra's Trek", icon: Leaf }
        ]
    },
    {
        id: "math",
        name: "VORTEX NUMERICS",
        icon: Brain,
        color: "text-amber-400",
        accent: "from-amber-500/40 to-orange-500/0",
        x: 70,
        y: 20,
        mascot: "spark",
        progress: 60,
        games: [
            { id: "fraction", title: "Fraction Forge", icon: Flame },
            { id: "velocity", title: "Velocity Vector", icon: Zap },
            { id: "quantum", title: "Quantum Quest", icon: Atom },
            { id: "market", title: "Market Maker", icon: TrendingUp },
            { id: "orbit", title: "Orbit Operator", icon: Globe },
            { id: "star-steer", title: "Star Steer", icon: Navigation }
        ]
    },
    {
        id: "literacy",
        name: "LEXICON PRIME",
        icon: Rocket,
        color: "text-indigo-400",
        accent: "from-indigo-500/40 to-blue-500/0",
        x: 80,
        y: 65,
        mascot: "echo",
        progress: 45,
        games: [
            { id: "vocabulary", title: "Vocabulary Voyager", icon: Rocket },
            { id: "chronicle", title: "Chronicle Case", icon: Search },
            { id: "aero", title: "Aero Architect", icon: Wind },
            { id: "histo", title: "Histo Hunt", icon: HistoryIcon },
            { id: "ethos-engine", title: "Ethos Engine", icon: Scale },
            { id: "echo-expedition", title: "Echo's Expedition", icon: Compass }
        ]
    },
    {
        id: "logic",
        name: "CYBER CORE",
        icon: Cpu,
        color: "text-fuchsia-400",
        accent: "from-fuchsia-500/40 to-purple-500/0",
        x: 35,
        y: 75,
        mascot: "pixel",
        progress: 92,
        games: [
            { id: "ethical", title: "Ethical Engine", icon: ShieldCheck },
            { id: "logic", title: "Logical Link", icon: Cpu },
            { id: "syntax", title: "Syntax Serpent", icon: Code },
            { id: "bot", title: "Bot Builder", icon: Bot },
            { id: "quantum-quirk", title: "Quantum Quirk", icon: Atom },
            { id: "logic-labyrinth", title: "Logic Labyrinth", icon: Grid3X3 }
        ]
    },
    {
        id: "creative",
        name: "LUNAR STUDIO",
        icon: Palette,
        color: "text-purple-400",
        accent: "from-purple-500/40 to-pink-500/0",
        x: 55,
        y: 50,
        mascot: "luna",
        progress: 30,
        games: [
            { id: "artistic", title: "Artistic Algorithms", icon: Palette },
            { id: "canvas", title: "Cosmic Canvas", icon: Box },
            { id: "rhythm", title: "Rhythm Rules", icon: Music }
        ]
    }
];

export default function GalaxyMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[600px] rounded-[3.5rem] overflow-hidden bg-slate-950 border border-white/10 shadow-2xl cursor-crosshair group"
        >
            {/* 4K Nebula Background with Parallax */}
            <motion.div
                className="absolute inset-x-[-10%] inset-y-[-10%] z-0"
                style={{
                    backgroundImage: "url('/assets/experience/galaxy-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    x: mousePos.x * -40,
                    y: mousePos.y * -40,
                }}
            >
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
            </motion.div>

            {/* Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-30">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                </defs>
                {PLANETS.map((planet, i) => {
                    if (i === PLANETS.length - 1) return null;
                    const next = PLANETS[i + 1];
                    return (
                        <motion.line
                            key={`line-${planet.id}-${next.id}`}
                            x1={`${planet.x}%`}
                            y1={`${planet.y}%`}
                            x2={`${next.x}%`}
                            y2={`${next.y}%`}
                            stroke="url(#lineGrad)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                    );
                })}
            </svg>

            {/* Interactive Planets */}
            <div className="absolute inset-0 z-20">
                {PLANETS.map((planet) => (
                    <motion.div
                        key={planet.id}
                        className="absolute"
                        style={{
                            left: `${planet.x}%`,
                            top: `${planet.y}%`,
                            x: "-50%",
                            y: "-50%",
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            x: `calc(-50% + ${mousePos.x * (planet.id === "creative" ? 10 : 30)}px)`,
                            y: `calc(-50% + ${mousePos.y * (planet.id === "creative" ? 10 : 30)}px)`,
                        }}
                        whileHover={{ scale: 1.1 }}
                        onMouseEnter={() => {
                            setHoveredNode(planet.id);
                            hapticSelection();
                        }}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        {/* Orbit Circles */}
                        <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute inset-[-60px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

                        {/* The Planet Visual */}
                        <div className={`relative w-24 h-24 rounded-full shadow-2xl overflow-hidden cursor-pointer group-hover:ring-4 ring-white/20 transition-all`}>
                            {planet.id === "math" ? (
                                <img
                                    src="/assets/experience/math-planet.png"
                                    className="w-full h-full object-cover"
                                    alt={planet.name}
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${planet.accent} flex items-center justify-center backdrop-blur-md border border-white/10`}>
                                    <planet.icon className={`w-10 h-10 ${planet.color}`} />
                                </div>
                            )}

                            {/* Progress Ring */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="44"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="4"
                                />
                                <motion.circle
                                    cx="48"
                                    cy="48"
                                    r="44"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray="276"
                                    initial={{ strokeDashoffset: 276 }}
                                    animate={{ strokeDashoffset: 276 - (276 * planet.progress) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={planet.color}
                                />
                            </svg>
                        </div>

                        {/* Mascot Tagalong */}
                        <motion.div
                            className="absolute -right-8 -top-8 pointer-events-none"
                            animate={{
                                y: [0, -5, 0],
                                rotate: [0, 5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <MascotFriend id={planet.mascot} size="sm" mood="happy" />
                        </motion.div>

                        {/* Planet Label */}
                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                            <h4 className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase">{planet.name}</h4>
                            <p className="text-[8px] font-bold text-white/30 tracking-widest">{planet.progress}% STABILIZED</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Hover Tooltip / Detail Card */}
            <AnimatePresence>
                {hoveredNode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-10 left-10 z-40 w-72 bg-slate-900/90 backdrop-blur-2xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl"
                    >
                        {(() => {
                            const planet = PLANETS.find(p => p.id === hoveredNode);
                            if (!planet) return null;
                            return (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl bg-white/5 border border-white/10`}>
                                            <planet.icon className={`w-5 h-5 ${planet.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black italic text-white tracking-tight">{planet.name}</h3>
                                            <p className="text-[10px] text-emerald-400 font-bold tracking-widest">PLANET DISCOVERED</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Available Missions</p>
                                        {planet.games.map(game => (
                                            <Link
                                                key={game.id}
                                                href={`/experience-hub/games`}
                                                onClick={() => void hapticSuccess()}
                                                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/item"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <game.icon className="w-4 h-4 text-white/60 group-hover/item:text-white" />
                                                    <span className="text-xs font-bold text-white/80">{game.title}</span>
                                                </div>
                                                <ChevronRight className="w-3 h-3 text-white/20 group-hover/item:translate-x-1 transition-transform" />
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between text-[10px] font-bold mb-1">
                                            <span className="text-white/40 uppercase">Constellation Sync</span>
                                            <span className="text-white">{planet.progress}%</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full bg-gradient-to-r ${planet.accent.replace('/40', '')}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${planet.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instruction Overlay */}
            <div className="absolute top-6 right-8 z-30 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] font-black text-white uppercase tracking-[0.3em] font-sans">
                    Navigate the stars to reveal hidden knowledge
                </p>
            </div>
        </div>
    );
}
