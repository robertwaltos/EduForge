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
    SyntaxSerpent,
    GeneticGarden,
    QuantumQuest,
    MarketMaker,
    OrbitOperator,
    CipherCity,
    BiomeBuilder,
    RhythmRules,
    TectonicTrek,
    FloraFusion,
    BotBuilder,
    EcoEngineer,
    AeroArchitect,
    HistoHunt,
    NanoNavigator,
    QuantumQuirk,
    StarSteer,
    LogicLabyrinth,
    BioBlast,
    EthosEngine,
    EchosExpedition,
    TerrasTrek
} from "@/components/games";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { Sparkles, Brain, Flame, Rocket, ArrowLeft, Palette, ShieldCheck, Beaker, Zap, Cpu, Box, Search, Leaf, Atom, TrendingUp, Globe, TreePine, Music, Mountain, Bot, Wind, History as HistoryIcon, Microscope, Navigation, Grid3X3, Scale, Compass } from "lucide-react";
import Link from "next/link";

type GameId = "neural" | "fraction" | "vocabulary" | "artistic" | "ethical" | "synthesis" | "velocity" | "logic" | "canvas" | "chronicle" | "syntax" | "genetic" | "quantum" | "market" | "orbit" | "cipher" | "biome" | "rhythm" | "tectonic" | "flora" | "bot" | "eco" | "aero" | "histo" | "nano" | "quantum-quirk" | "star-steer" | "logic-labyrinth" | "bio-blast" | "ethos-engine" | "echo-expedition" | "terra-trek";

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
        },
        {
            id: "genetic",
            title: "Genetic Garden",
            mascot: "terra",
            description: "Master the art of selection and breed rare floral hybrids in 4K.",
            icon: Leaf,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "quantum",
            title: "Quantum Quest",
            mascot: "terra",
            description: "Stabilize gravity wells and master subatomic particles in a 4K physics sim.",
            icon: Atom,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20"
        },
        {
            id: "market",
            title: "Market Maker",
            mascot: "echo",
            description: "Master the art of high-frequency trading and economic theory in 4K.",
            icon: TrendingUp,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "orbit",
            title: "Orbit Operator",
            mascot: "terra",
            description: "Launch satellites and master the physics of orbital mechanics in 4K.",
            icon: Globe,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "cipher",
            title: "Cipher City",
            mascot: "pixel",
            description: "Break complex ciphers and secure neon signals in 4K.",
            icon: ShieldCheck,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            id: "biome",
            title: "Biome Builder",
            mascot: "terra",
            description: "Balance a 4K living ecosystem and master environmental equilibrium.",
            icon: TreePine,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "rhythm",
            title: "Rhythm Rules",
            mascot: "terra",
            description: "Master the beat of linguistics and syllabic flow in 4K.",
            icon: Music,
            color: "text-fuchsia-400",
            bg: "bg-fuchsia-500/10",
            border: "border-fuchsia-500/20"
        },
        {
            id: "tectonic",
            title: "Tectonic Trek",
            mascot: "terra",
            description: "Shape the planet by moving tectonic plates and mastering geology in 4K.",
            icon: Mountain,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: "flora",
            title: "Flora Fusion",
            mascot: "terra",
            description: "Step into the bio-synth lab to create new bioluminescent plant species in 4K.",
            icon: Leaf,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "bot",
            title: "Bot Builder",
            mascot: "pixel",
            description: "Master the logic of automation and visual programming in a 4K IDE.",
            icon: Bot,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "eco",
            title: "Eco Engineer",
            mascot: "terra",
            description: "Manage a futuristic energy grid and balance sustainability in 4K.",
            icon: Leaf,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "aero",
            title: "Aero Architect",
            mascot: "pixel",
            description: "Design aircraft and test aerodynamics in a 4K wind tunnel.",
            icon: Wind,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20"
        },
        {
            id: "histo",
            title: "Histo Hunt",
            mascot: "echo",
            description: "Unearth ancient artifacts and reconstruct history in 4K.",
            icon: HistoryIcon,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            id: "nano",
            title: "Nano Navigator",
            mascot: "terra",
            description: "Journey into the atomic realm and navigate cellular landscapes in 4K.",
            icon: Microscope,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            id: "quantum-quirk",
            title: "Quantum Quirk",
            mascot: "pixel",
            description: "Master the logic of the subatomic and exploit entanglement in 4K.",
            icon: Atom,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        },
        {
            id: "star-steer",
            title: "Star Steer",
            mascot: "luna",
            description: "Navigate the final frontier using celestial charts and spherical geometry in 4K.",
            icon: Navigation,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "logic-labyrinth",
            title: "Logic Labyrinth",
            mascot: "pixel",
            description: "Program your way through complex mazes and refine pathfinding algorithms in 4K.",
            icon: Grid3X3,
            color: "text-fuchsia-400",
            bg: "bg-fuchsia-500/10",
            border: "border-fuchsia-500/20"
        },
        {
            id: "bio-blast",
            title: "Bio Blast",
            mascot: "terra",
            description: "Lead the immune system vanguard against elite pathogens in high-fidelity 4K micro-combat.",
            icon: ShieldCheck,
            color: "text-red-400",
            bg: "bg-red-500/10",
            border: "border-red-500/20"
        },
        {
            id: "ethos-engine",
            title: "Ethos Engine",
            mascot: "echo",
            description: "Navigate civilization-defining moral dilemmas and archive your legacy in 4K.",
            icon: Scale,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "echo-expedition",
            title: "Echo's Expedition",
            mascot: "echo",
            description: "A 4K journey through ancient civilizations. Find the fragments of history!",
            icon: Compass,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            id: "terra-trek",
            title: "Terra's Trek",
            mascot: "terra",
            description: "A 4K biological survey mission. Catalog the hidden flora and fauna!",
            icon: Leaf,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
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
                                                    activeGame === "syntax" ? "pixel" :
                                                        activeGame === "genetic" ? "terra" :
                                                            activeGame === "quantum" ? "terra" :
                                                                activeGame === "market" ? "echo" :
                                                                    activeGame === "orbit" ? "terra" :
                                                                        activeGame === "cipher" ? "pixel" :
                                                                            activeGame === "biome" ? "terra" :
                                                                                activeGame === "rhythm" ? "terra" :
                                                                                    activeGame === "tectonic" ? "terra" :
                                                                                        activeGame === "flora" ? "terra" :
                                                                                            activeGame === "bot" ? "pixel" :
                                                                                                activeGame === "eco" ? "terra" :
                                                                                                    activeGame === "aero" ? "pixel" :
                                                                                                        activeGame === "histo" ? "echo" :
                                                                                                            activeGame === "nano" ? "terra" :
                                                                                                                activeGame === "quantum-quirk" ? "pixel" :
                                                                                                                    activeGame === "star-steer" ? "luna" :
                                                                                                                        activeGame === "logic-labyrinth" ? "pixel" :
                                                                                                                            activeGame === "bio-blast" ? "terra" :
                                                                                                                                activeGame === "ethos-engine" ? "echo" :
                                                                                                                                    activeGame === "echo-expedition" ? "echo" :
                                                                                                                                        activeGame === "terra-trek" ? "terra" : "pixel"
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
                                {activeGame === "genetic" && <GeneticGarden />}
                                {activeGame === "quantum" && <QuantumQuest />}
                                {activeGame === "market" && <MarketMaker />}
                                {activeGame === "orbit" && <OrbitOperator />}
                                {activeGame === "cipher" && <CipherCity />}
                                {activeGame === "biome" && <BiomeBuilder />}
                                {activeGame === "rhythm" && <RhythmRules />}
                                {activeGame === "tectonic" && <TectonicTrek />}
                                {activeGame === "flora" && <FloraFusion />}
                                {activeGame === "bot" && <BotBuilder />}
                                {activeGame === "eco" && <EcoEngineer />}
                                {activeGame === "aero" && <AeroArchitect />}
                                {activeGame === "histo" && <HistoHunt />}
                                {activeGame === "nano" && <NanoNavigator />}
                                {activeGame === "quantum-quirk" && <QuantumQuirk />}
                                {activeGame === "star-steer" && <StarSteer />}
                                {activeGame === "logic-labyrinth" && <LogicLabyrinth />}
                                {activeGame === "bio-blast" && <BioBlast />}
                                {activeGame === "ethos-engine" && <EthosEngine />}
                                {activeGame === "echo-expedition" && <EchosExpedition />}
                                {activeGame === "terra-trek" && <TerrasTrek />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MascotHost>
    );
}
