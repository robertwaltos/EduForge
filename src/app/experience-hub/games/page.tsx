"use client";

import React, { useState, useEffect } from "react";
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
    TerrasTrek,
    SparksSparkQuest,
    PixelsPath,
    LunasLegend,
    CircuitCrusader,
    GravityGoliath,
    ProteinPainter,
    LinguistLookout,
    FusionFounder,
    StellarState,
    NeuralNet,
    ClimateCommander,
    HistoryHacker,
    NanoNexus,
    MarsColony,
    QuantumSupremacy,
    SyntheticArchitect,
    GlobalHarmony,
    EvolutionPrime,
    WordWoods,
    StorySmith,
    AlphabetAirship,
    SentenceSafari,
    RhymeRiver,
    CountConstellations,
    FractionFactory
} from "@/components/games";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { Sparkles, Brain, Flame, Rocket, ArrowLeft, Palette, ShieldCheck, Beaker, Zap, Cpu, Box, Search, Leaf, Atom, TrendingUp, Globe, TreePine, Music, Mountain, Bot, Wind, History as HistoryIcon, Microscope, Navigation, Grid3X3, Scale, Compass, Construction, Lock, BookOpen, CircuitBoard, Orbit, Dna, Languages, Clock, Binary, Heart, FlaskConical, Camera, Waves } from "lucide-react";
import Link from "next/link";

type GameId = "neural" | "fraction" | "vocabulary" | "artistic" | "ethical" | "synthesis" | "velocity" | "logic" | "canvas" | "chronicle" | "syntax" | "genetic" | "quantum" | "market" | "orbit" | "cipher" | "biome" | "rhythm" | "tectonic" | "flora" | "bot" | "eco" | "aero" | "histo" | "nano" | "quantum-quirk" | "star-steer" | "logic-labyrinth" | "bio-blast" | "ethos-engine" | "echo-expedition" | "terra-trek" | "spark-quest" | "pixel-path" | "luna-legend" | "circuit-crusader" | "gravity-goliath" | "protein-painter" | "linguist-lookout" | "fusion-founder" | "stellar-state" | "neural-net" | "climate-commander" | "history-hacker" | "nano-nexus" | "mars-colony" | "quantum-supremacy" | "synthetic-architect" | "global-harmony" | "evolution-prime" | "word-woods" | "story-smith" | "alphabet-airship" | "sentence-safari" | "rhyme-river" | "count-constellations" | "fraction-factory";

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
        },
        {
            id: "spark-quest",
            title: "Spark's Spark-Quest",
            mascot: "spark",
            description: "A 4K city-building math quest. Power the future with numerical precision!",
            icon: Construction,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            id: "pixel-path",
            title: "Pixel's Path",
            mascot: "pixel",
            description: "A 4K digital frontier quest. Secure the network and master protocols!",
            icon: Lock,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "luna-legend",
            title: "Luna's Legend",
            mascot: "luna",
            description: "A 4K advanced storytelling quest. Craft a legendary tale with deep narrative choices!",
            icon: BookOpen,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            id: "circuit-crusader",
            title: "Circuit Crusader",
            mascot: "pixel",
            description: "A 4K electronics simulator. Design logic gates to power the future!",
            icon: CircuitBoard,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            id: "gravity-goliath",
            title: "Gravity Goliath",
            mascot: "terra",
            description: "A 4K orbital mechanics simulator. Master the pull of celestial giants!",
            icon: Orbit,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "protein-painter",
            title: "Protein Painter",
            mascot: "terra",
            description: "A 4K biochemistry simulator. Fold molecular chains into stable proteins!",
            icon: Dna,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20"
        },
        {
            id: "linguist-lookout",
            title: "Linguist Lookout",
            mascot: "echo",
            description: "Trace the evolution of language and etymology in 4K.",
            icon: Languages,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "fusion-founder",
            title: "Fusion Founder",
            mascot: "spark",
            description: "Stabilize the nuclear fusion reactor core in this high-fidelity sim.",
            icon: Atom,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        },
        {
            id: "stellar-state",
            title: "Stellar State",
            mascot: "echo",
            description: "Interstellar diplomacy and resource management simulator.",
            icon: Globe,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "neural-net",
            title: "Neural Net",
            mascot: "pixel",
            description: "Visually train AI models and optimize synaptic weights.",
            icon: Binary,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "climate-commander",
            title: "Climate Commander",
            mascot: "terra",
            description: "Global-scale ecology and climate systems simulation.",
            icon: Wind,
            color: "text-teal-400",
            bg: "bg-teal-500/10",
            border: "border-teal-500/20"
        },
        {
            id: "history-hacker",
            title: "History Hacker",
            mascot: "echo",
            description: "Resolve temporal paradoxes and manage chronological nexus points.",
            icon: Clock,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            id: "nano-nexus",
            title: "Nano Nexus",
            mascot: "pixel",
            description: "Assemble atomic lattices in this high-fidelity nanotechnology sim.",
            icon: Microscope,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        },
        {
            id: "mars-colony",
            title: "Mars Colony",
            mascot: "echo",
            description: "A 4K survival engineering sim. Help Echo build a home on the Red Planet!",
            icon: Rocket,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: "quantum-supremacy",
            title: "Quantum Supremacy",
            mascot: "pixel",
            description: "Master subatomic logic gates in a cinematic neon circuit lab.",
            icon: Cpu,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20"
        },
        {
            id: "synthetic-architect",
            title: "Synthetic Architect",
            mascot: "terra",
            description: "Design your own 4K companion using biological building blocks.",
            icon: FlaskConical,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "global-harmony",
            title: "Global Harmony",
            mascot: "echo",
            description: "A 4K social-emotional quest. Help city citizens work in unity.",
            icon: Heart,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20"
        },
        {
            id: "evolution-prime",
            title: "Evolution Prime",
            mascot: "spark",
            description: "The grand finale! A cinematic 4K journey through the timeline of existence.",
            icon: Sparkles,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-400/20"
        },
        {
            id: "word-woods",
            title: "Word Woods",
            mascot: "terra",
            description: "A 4K phonic adventure. Help Terra plant words in the magic forest!",
            icon: TreePine,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "story-smith",
            title: "Story Smith",
            mascot: "luna",
            description: "Forge your own 4K legends with branching paths and magical outcomes.",
            icon: BookOpen,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            id: "alphabet-airship",
            title: "Alphabet Airship",
            mascot: "spark",
            description: "Pilot a 4K steam-powered airship to collect letters across the sky.",
            icon: Rocket,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: "sentence-safari",
            title: "Sentence Safari",
            mascot: "echo",
            description: "Track wild sentences in a 4K jungle and capture them in 4K.",
            icon: Camera,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            id: "rhyme-river",
            title: "Rhyme River",
            mascot: "echo",
            description: "Paddle down a 4K magic river and catch the rhyming bubbles.",
            icon: Waves,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: "count-constellations",
            title: "Count Constellations",
            mascot: "spark",
            description: "Connect the stars in sequence to stabilize the galaxy in 4K.",
            icon: Sparkles,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            id: "fraction-factory",
            title: "Fraction Factory",
            mascot: "spark",
            description: "Slice 3D Power Gems into equal parts to power the factory in 4K.",
            icon: Box,
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
                                                                                                                                        activeGame === "terra-trek" ? "terra" :
                                                                                                                                            activeGame === "spark-quest" ? "spark" :
                                                                                                                                                activeGame === "pixel-path" ? "pixel" :
                                                                                                                                                    activeGame === "luna-legend" ? "luna" :
                                                                                                                                                        activeGame === "circuit-crusader" ? "pixel" :
                                                                                                                                                            activeGame === "gravity-goliath" ? "terra" :
                                                                                                                                                                activeGame === "protein-painter" ? "terra" :
                                                                                                                                                                    activeGame === "linguist-lookout" ? "echo" :
                                                                                                                                                                        activeGame === "fusion-founder" ? "spark" :
                                                                                                                                                                            activeGame === "stellar-state" ? "echo" :
                                                                                                                                                                                activeGame === "neural-net" ? "pixel" :
                                                                                                                                                                                    activeGame === "climate-commander" ? "terra" :
                                                                                                                                                                                        activeGame === "history-hacker" ? "echo" :
                                                                                                                                                                                            activeGame === "nano-nexus" ? "pixel" :
                                                                                                                                                                                                activeGame === "mars-colony" ? "echo" :
                                                                                                                                                                                                    activeGame === "quantum-supremacy" ? "pixel" :
                                                                                                                                                                                                        activeGame === "synthetic-architect" ? "terra" :
                                                                                                                                                                                                            activeGame === "global-harmony" ? "echo" :
                                                                                                                                                                                                                activeGame === "evolution-prime" ? "spark" :
                                                                                                                                                                                                                    activeGame === "word-woods" ? "terra" :
                                                                                                                                                                                                                        activeGame === "story-smith" ? "luna" :
                                                                                                                                                                                                                            activeGame === "alphabet-airship" ? "spark" :
                                                                                                                                                                                                                                activeGame === "sentence-safari" ? "echo" :
                                                                                                                                                                                                                                    activeGame === "rhyme-river" ? "echo" :
                                                                                                                                                                                                                                        activeGame === "count-constellations" ? "spark" :
                                                                                                                                                                                                                                            activeGame === "fraction-factory" ? "spark" : "pixel"
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
                                    50 GAME <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">MILESTONE</span>
                                </h1>
                                <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
                                    Celebrating the completion of Phase 12. These 50 high-fidelity interactions represent the pinnacle of
                                    <strong> 2026 Game Engineering</strong> and <strong>Educational Cinematic Design</strong>.
                                </p>
                            </header>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {games.map((game, idx) => (
                                    <motion.div
                                        key={game.id + idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={`relative group h-full p-8 rounded-[3rem] border-2 ${game.bg} ${game.border} backdrop-blur-xl overflow-hidden cursor-pointer hover:border-white/30 transition-all`}
                                        onClick={() => setActiveGame(game.id as any)}
                                    >
                                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                            <div className={`p-6 rounded-3xl ${game.bg} border-2 ${game.border}`}>
                                                {React.createElement(game.icon as any, { className: `${game.color} w-16 h-16` })}
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
                                {activeGame === "spark-quest" && <SparksSparkQuest />}
                                {activeGame === "pixel-path" && <PixelsPath />}
                                {activeGame === "luna-legend" && <LunasLegend />}
                                {activeGame === "circuit-crusader" && <CircuitCrusader />}
                                {activeGame === "gravity-goliath" && <GravityGoliath />}
                                {activeGame === "protein-painter" && <ProteinPainter />}
                                {activeGame === "linguist-lookout" && <LinguistLookout />}
                                {activeGame === "fusion-founder" && <FusionFounder />}
                                {activeGame === "stellar-state" && <StellarState />}
                                {activeGame === "neural-net" && <NeuralNet />}
                                {activeGame === "climate-commander" && <ClimateCommander />}
                                {activeGame === "history-hacker" && <HistoryHacker />}
                                {activeGame === "nano-nexus" && <NanoNexus />}
                                {activeGame === "mars-colony" && <MarsColony />}
                                {activeGame === "quantum-supremacy" && <QuantumSupremacy />}
                                {activeGame === "synthetic-architect" && <SyntheticArchitect />}
                                {activeGame === "global-harmony" && <GlobalHarmony />}
                                {activeGame === "evolution-prime" && <EvolutionPrime />}
                                {activeGame === "word-woods" && <WordWoods />}
                                {activeGame === "story-smith" && <StorySmith />}
                                {activeGame === "alphabet-airship" && <AlphabetAirship />}
                                {activeGame === "sentence-safari" && <SentenceSafari />}
                                {activeGame === "rhyme-river" && <RhymeRiver />}
                                {activeGame === "count-constellations" && <CountConstellations />}
                                {activeGame === "fraction-factory" && <FractionFactory />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MascotHost>
    );
}
