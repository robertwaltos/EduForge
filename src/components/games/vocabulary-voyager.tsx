"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_VARIANTS, JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import { hapticSuccess, hapticCelebration, hapticSelection } from "@/lib/platform/haptics";
import { Rocket, Satellite, BookOpen, Search } from "lucide-react";

/* --- Vocabulary Voyager Content --- */
type WordMission = {
    word: string;
    options: string[];
    answer: string;
    context: string;
};

const MISSIONS: WordMission[] = [
    {
        word: "LOQUACIOUS",
        options: ["Very talkative", "Extremely quiet", "Highly skilled"],
        answer: "Very talkative",
        context: "The alien diplomat was incredibly loquacious, speaking for three hours straight!"
    },
    {
        word: "STELLAR",
        options: ["Related to the sun", "Related to stars", "Related to planets"],
        answer: "Related to stars",
        context: "The nebula was filled with stellar dust, the remains of an ancient supernova."
    },
    {
        word: "EPHEMERAL",
        options: ["Everlasting", "Short-lived", "Heavy"],
        answer: "Short-lived",
        context: "The comet's tail was ephemeral, appearing only briefly as it swept past the sun."
    }
];

export default function VocabularyVoyager() {
    const { setMood, setMessage } = useMascot();
    const [missionIdx, setMissionIdx] = useState(0);
    const [gameState, setGameState] = useState<"briefing" | "warping" | "warped">("briefing");
    const [streak, setStreak] = useState(0);

    const currentMission = MISSIONS[missionIdx];

    useEffect(() => {
        setMessage("Greetings, Captain! Our engines need semantic fuel. Let's decode these nebulae! 🚀");
        setMood("happy");
    }, []);

    const handleAnswer = (choice: string) => {
        if (gameState !== "briefing") return;

        void hapticSelection();

        if (choice === currentMission.answer) {
            handleSuccess();
        } else {
            handleFail();
        }
    };

    const handleSuccess = () => {
        setGameState("warping");
        setStreak(prev => prev + 1);
        setMood("happy");
        setMessage("Incredible! That's high-grade fuel! Engaging Warp Drive... 🌌");
        void hapticCelebration();

        setTimeout(() => {
            setGameState("warped");
            setTimeout(() => {
                setMissionIdx((prev) => (prev + 1) % MISSIONS.length);
                setGameState("briefing");
            }, 1000);
        }, 1500);
    };

    const handleFail = () => {
        setStreak(0);
        setMood("thinking");
        setMessage("Engine stutter... The definition doesn't match the signature. 📡");
        void hapticSelection();
    };

    return (
        <div className="relative min-h-[600px] w-full flex flex-col items-center justify-center p-8 bg-zinc-950 overflow-hidden rounded-[3rem] border-4 border-indigo-950 shadow-2xl">
            {/* Space Starfield Backdrop */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={gameState === "warping" ? { y: [0, 1000] } : {}}
                    transition={{ duration: 0.5, repeat: gameState === "warping" ? Infinity : 0 }}
                    className="absolute inset-x-0 top-0 bottom-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
                />
            </div>

            {/* Cockpit HUD UI */}
            <div className="absolute inset-x-8 top-8 flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-indigo-400 tracking-[0.3em]">Starship Voyager</span>
                    <h2 className="text-4xl font-black italic text-white leading-none">LEXICON DRIVE</h2>
                </div>
                <JuicyStreak count={streak} />
            </div>

            {/* Mission Content */}
            <div className="relative z-10 w-full max-w-2xl px-8 py-12 bg-indigo-950/20 border border-indigo-500/20 rounded-[2.5rem] backdrop-blur-xl">
                <AnimatePresence mode="wait">
                    {gameState === "briefing" ? (
                        <motion.div
                            key="mission"
                            variants={JUICY_VARIANTS.reveal}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <span className="text-[10px] font-black uppercase text-indigo-400 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">Target Signature Found</span>
                                <h1 className="text-6xl font-black text-white tracking-widest">{currentMission.word}</h1>
                                <p className="text-indigo-200/60 font-medium italic text-sm">"{currentMission.context}"</p>
                            </div>

                            <div className="grid gap-4">
                                {currentMission.options.map((opt, idx) => (
                                    <motion.button
                                        key={idx}
                                        variants={JUICY_VARIANTS.pressable}
                                        initial="initial"
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() => handleAnswer(opt)}
                                        className="w-full h-16 bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 rounded-2xl flex items-center px-8 text-white font-bold transition-all text-left"
                                    >
                                        <BookOpen className="w-5 h-5 mr-4 text-indigo-400" />
                                        {opt}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="warping"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            className="flex flex-col items-center justify-center space-y-8"
                        >
                            <div className="relative">
                                <Rocket className="w-32 h-32 text-indigo-400 animate-bounce" />
                                <motion.div
                                    animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                    className="absolute inset-0 bg-indigo-400 blur-3xl -z-10"
                                />
                            </div>
                            <h2 className="text-4xl font-black italic text-white">WARP ENGAGED!</h2>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Ship Controls / Radar */}
            <div className="absolute bottom-10 left-10 flex items-center gap-6 opacity-40">
                <Satellite className="text-indigo-400 w-8 h-8 animate-pulse" />
                <div className="h-10 w-[2px] bg-indigo-500/20" />
                <div className="space-y-1">
                    <div className="h-1 w-24 bg-indigo-500/20 rounded-full"><motion.div animate={{ width: [0, 100, 0] }} transition={{ duration: 5, repeat: Infinity }} className="h-full bg-indigo-400 rounded-full" /></div>
                    <div className="h-1 w-16 bg-indigo-500/20 rounded-full"><motion.div animate={{ width: [0, 80, 0] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-cyan-400 rounded-full" /></div>
                </div>
            </div>

            {/* Echo's HUD Hint */}
            <div className="absolute bottom-10 right-10 flex items-center gap-4 bg-indigo-950/60 border border-indigo-500/30 px-6 py-3 rounded-2xl backdrop-blur-md">
                <Search className="text-indigo-400 w-5 h-5" />
                <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Echo scanning nebula for synonyms...</span>
            </div>
        </div>
    );
}
