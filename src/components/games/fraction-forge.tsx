"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_VARIANTS, JUICY_SPRINGS, EXPERIENCE_COLORS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import { hapticSuccess, hapticCelebration, hapticSelection } from "@/lib/platform/haptics";
import { Flame, Beaker, Hammer, Star } from "lucide-react";

/* --- Fraction Forge Logic --- */
type Ingot = {
    target: number; // e.g. 0.75 for 3/4
    current: number;
    fractions: number[]; // e.g. [0.25, 0.5, 0.125]
};

export default function FractionForge() {
    const { setMood, setMessage } = useMascot();
    const [target, setTarget] = useState(0.75);
    const [current, setCurrent] = useState(0);
    const [options, setOptions] = useState([0.25, 0.5, 0.125]);
    const [streak, setStreak] = useState(0);
    const [phase, setPhase] = useState<"forging" | "success" | "exploding">("forging");

    useEffect(() => {
        setMessage("Welcome to the Fraction Forge! Let's mix some magical alloys! 🔥");
        setMood("happy");
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const possibleFractions = [0.25, 0.5, 0.125, 0.33, 0.66];
        const t = 0.5 + Math.random() * 0.4;
        setTarget(parseFloat(t.toFixed(2)));
        setCurrent(0);
        setOptions(possibleFractions.sort(() => Math.random() - 0.5).slice(0, 3));
        setPhase("forging");
    };

    const addAlloy = (val: number) => {
        if (phase !== "forging") return;

        const next = parseFloat((current + val).toFixed(2));
        void hapticSelection();

        if (next > target + 0.05) {
            handleExplosion();
        } else if (Math.abs(next - target) < 0.05) {
            setCurrent(next);
            handleSuccess();
        } else {
            setCurrent(next);
        }
    };

    const handleSuccess = () => {
        setPhase("success");
        setStreak(prev => prev + 1);
        setMood("happy");
        setMessage("A perfect Ingot! You're a Master Smith! 🔨✨");
        void hapticCelebration();

        setTimeout(() => {
            generateChallenge();
        }, 2500);
    };

    const handleExplosion = () => {
        setPhase("exploding");
        setStreak(0);
        setMood("thinking");
        setMessage("Too much heat! The alloy is unstable! 🌋");

        setTimeout(() => {
            generateChallenge();
        }, 2000);
    };

    const fillPercent = Math.min((current / target) * 100, 100);

    return (
        <div className="relative min-h-[600px] w-full flex flex-col items-center justify-center p-8 bg-stone-950 overflow-hidden rounded-[3rem] border-4 border-orange-950 shadow-2xl">
            {/* Forge Heat Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-50" />

            {/* Header */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-orange-500 tracking-[0.2em]">Magical Smithy</span>
                    <h2 className="text-4xl font-black italic text-white leading-none">FRACTION FORGE</h2>
                </div>
                <JuicyStreak count={streak} />
            </div>

            {/* The Crucible (Ingot Mold) */}
            <div className="relative w-48 h-64 mb-12 flex items-end justify-center">
                {/* Mold Frame */}
                <div className="absolute inset-0 border-x-4 border-b-4 border-stone-800 rounded-b-3xl" />

                {/* Molten Metal */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${fillPercent}%` }}
                    transition={JUICY_SPRINGS.heavy}
                    className={`w-full rounded-b-2xl bg-gradient-to-t ${phase === "exploding" ? "from-red-600 to-yellow-400" : "from-orange-600 to-amber-300"
                        } relative`}
                >
                    {/* Liquid Sparkles */}
                    <div className="absolute inset-0 bg-white/10 opacity-30 mix-blend-overlay animate-pulse" />

                    {/* Heat Distortion */}
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute -top-1 left-0 right-0 h-2 bg-white/40 blur-sm"
                    />
                </motion.div>

                {/* Target Line */}
                <div className="absolute bottom-[100%] left-0 right-0 border-t-2 border-dashed border-white/50 flex justify-end">
                    <span className="text-[10px] bg-white/20 px-2 rounded-full absolute -top-3 text-white font-bold">TARGET: {target}</span>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-1000 ${phase === "success" ? "bg-amber-400/30 opacity-100" : "bg-orange-500/10 opacity-30"
                    }`} />
            </div>

            {/* Alloy Selection */}
            <div className="grid grid-cols-3 gap-6 z-10">
                {options.map((val, idx) => (
                    <motion.button
                        key={idx}
                        variants={JUICY_VARIANTS.pressable}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => addAlloy(val)}
                        disabled={phase !== "forging"}
                    >
                        <div className="flex flex-col items-center gap-2 p-4 bg-stone-900 border border-white/10 rounded-2xl shadow-xl hover:border-orange-500/50 transition-colors">
                            <Beaker className="text-orange-400 w-8 h-8" />
                            <span className="text-2xl font-black text-white">{val}</span>
                            <span className="text-[10px] text-stone-500 uppercase font-black">Add Alloy</span>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Bottom UI */}
            <div className="mt-8 flex gap-4 items-center mb-4">
                <PhysicalButton
                    onClick={() => setCurrent(0)}
                    disabled={phase !== "forging"}
                    className="bg-stone-800 text-stone-400 text-xs px-4"
                >
                    PURGE CRUCIBLE 💀
                </PhysicalButton>

                <div className="flex items-center gap-2 bg-orange-950/30 border border-orange-500/20 px-4 py-2 rounded-xl">
                    <Hammer className="text-orange-500 w-4 h-4" />
                    <span className="text-xs font-bold text-orange-200">Forging at {Math.round(current * 100)}% density</span>
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {phase === "success" && (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-50"
                    >
                        <div className="bg-amber-400 text-black px-8 py-4 rounded-full text-4xl font-black italic shadow-[0_0_50px_rgba(251,191,36,0.6)]">
                            GOLDEN INGOT! 🏆
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
