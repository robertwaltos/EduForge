"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MascotHost from "@/components/experience/MascotHost";
import {
    NeuralNavigator,
    FractionForge,
    VocabularyVoyager,
    ArtisticAlgorithms,
    EthicalEngine,
    SynthesisSphere,
    VelocityVector,
    LogicalLink,
    CosmicCanvas,
    ChronicleCase,
    SyntaxSerpent
} from "@/components/games";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { Sparkles, Brain, Flame, Rocket, ArrowLeft, Palette, ShieldCheck, Beaker, Zap, Cpu, Box, Search } from "lucide-react";
import Link from "next/link";

type GameId = "neural" | "fraction" | "vocabulary" | "artistic" | "ethical" | "synthesis" | "velocity" | "logic" | "canvas" | "chronicle" | "syntax";

export default function NextGenGameGallery() {
    const [activeGame, setActiveGame] = useState<GameId | null>(null);

    const games = [
        {
            id: "neural",
            title: "Neural Navigator",
            mascot: "terra",
            description: "Map human synapses and unlock cognitive power.",
            icon: Brain,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "fraction",
            title: "Fraction Forge",
            mascot: "spark",
            description: "Smelt magical alloys using the power of math.",
            icon: Flame,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: "vocabulary",
            title: "Vocabulary Voyager",
            mascot: "echo",
            description: "Fuel your starship with semantic energy and decode the galaxy.",
            icon: Rocket,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            id: "artistic",
            title: "Artistic Algorithms",
            mascot: "luna",
            description: "Paint with the mathematics of the moon and stars.",
            icon: Palette,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            id: "ethical",
            title: "Ethical Engine",
            mascot: "pixel",
            description: "Navigate complex social dilemmas and guide humanity's future.",
            icon: ShieldCheck,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-400/20"
        },
        {
            id: "synthesis",
            title: "Synthesis Sphere",
            mascot: "terra",
            description: "Merge subatomic particles to forge complex elements in a 4K laboratory.",
            icon: Beaker,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20"
        },
        {
            id: "velocity",
            title: "Velocity Vector",
            mascot: "spark",
            description: "Pilot a physics-driven probe through a high-speed 4K neon starfield.",
            icon: Zap,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-400/20"
        },
        {
            id: "logic",
            title: "Logical Link",
            mascot: "pixel",
            description: "Synchronize logic gates in a 4K cyber-grid to stabilize the core.",
            icon: Cpu,
            color: "text-fuchsia-400",
            bg: "bg-fuchsia-500/10",
            border: "border-fuchsia-500/20"
        },
        {
            id: "canvas",
            title: "Cosmic Canvas",
            mascot: "luna",
            description: "Build architectural masterpieces in a 4K isometric 3D sandbox.",
            icon: Box,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            id: "chronicle",
            title: "Chronicle Case",
            mascot: "echo",
            description: "Solve historical mysteries using forensic 4K investigation tools.",
            icon: Search,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-400/20"
        },
        {
            id: "syntax",
            title: "Syntax Serpent",
            mascot: "pixel",
            description: "Compile code at high speeds in a neon-noir logic grid.",
            icon: Cpu,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20"
        }
    ];

    return (
        <MascotHost friendId={
            activeGame === "neural" ? "terra" :
                activeGame === "fraction" ? "spark" :
                    activeGame === "vocabulary" ? "echo" :
                        activeGame === "artistic" ? "luna" :
                            activeGame === "ethical" ? "pixel" :
                                activeGame === "synthesis" ? "terra" :
                                    activeGame === "velocity" ? "spark" :
                                        activeGame === "logic" ? "pixel" :
                                            activeGame === "canvas" ? "luna" :
                                                activeGame === "chronicle" ? "echo" :
                                                    activeGame === "syntax" ? "pixel" : "pixel"
        }>
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Back Link */}
                <Link href="/experience-hub">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 cursor-pointer group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-xs">Return to Galaxy</span>
                    </motion.div>
                </Link>

                <AnimatePresence mode="wait">
                    {activeGame === null ? (
                        <motion.div
                            key="gallery"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            <header className="text-center space-y-4">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-block p-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-4"
                                >
                                    <Sparkles className="text-indigo-400 w-8 h-8" />
                                </motion.div>
                                <h1 className="text-6xl font-black text-white italic tracking-tighter">
                                    2026 GAME <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">ENGINEERING</span>
                                </h1>
                                <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
                                    Experiencing the future of education. These high-fidelity interactions are powered by our new
                                    <strong> Interaction Engine</strong> and <strong>Mascot Shared Memory</strong>.
                                </p>
                            </header>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {games.map((game, idx) => (
                                    <motion.div
                                        key={game.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`relative group h-full p-8 rounded-[3rem] border-2 ${game.bg} ${game.border} backdrop-blur-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all`}
                                        onClick={() => setActiveGame(game.id as any)}
                                    >
                                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                            <div className={`p-6 rounded-3xl ${game.bg} border-2 ${game.border}`}>
                                                <game.icon className={`${game.color} w-16 h-16`} />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-black text-white italic">{game.title}</h3>
                                                <p className="text-slate-400 mt-2 text-sm leading-relaxed">{game.description}</p>
                                            </div>
                                            <PhysicalButton className="bg-white/10 text-white w-full h-14">
                                                LAUNCH MISSION 🚀
                                            </PhysicalButton>
                                        </div>

                                        {/* Background Glow */}
                                        <div className={`absolute -bottom-20 -right-20 w-64 h-64 blur-[100px] opacity-20 ${game.bg}`} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="game-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-md">
                                <div className="flex items-center gap-4">
                                    <PhysicalButton onClick={() => setActiveGame(null)} className="h-10 px-4 bg-slate-800 text-xs text-white">EXIT MISSION ⏹️</PhysicalButton>
                                </div>
                                <div className="flex items-center gap-4 pr-4">
                                    <Rocket className="text-indigo-400 w-5 h-5 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Sim: {activeGame?.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="relative">
                                {activeGame === "neural" && <NeuralNavigator />}
                                {activeGame === "fraction" && <FractionForge />}
                                {activeGame === "vocabulary" && <VocabularyVoyager />}
                                {activeGame === "artistic" && <ArtisticAlgorithms />}
                                {activeGame === "ethical" && <EthicalEngine />}
                                {activeGame === "synthesis" && <SynthesisSphere />}
                                {activeGame === "velocity" && <VelocityVector />}
                                {activeGame === "logic" && <LogicalLink />}
                                {activeGame === "canvas" && <CosmicCanvas />}
                                {activeGame === "chronicle" && <ChronicleCase />}
                                {activeGame === "syntax" && <SyntaxSerpent />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MascotHost>
    );
}
