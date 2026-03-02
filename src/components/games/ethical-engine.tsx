"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_VARIANTS, JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import { hapticSelection, hapticSuccess } from "@/lib/platform/haptics";
import { ShieldCheck, Users, Globe, Cpu } from "lucide-react";

/* --- Ethical Engine Content --- */
type Scenario = {
    id: number;
    title: string;
    description: string;
    choices: {
        text: string;
        impact: { morale: number; resources: number; logic: number };
        feedback: string;
    }[];
};

const SCENARIOS: Scenario[] = [
    {
        id: 1,
        title: "Energy Allocation",
        description: "The Moon Base's solar arrays are at 60% capacity. Should we prioritize the Scientific Research Lab or the Community Greenhouse?",
        choices: [
            {
                text: "Lab (Efficiency First)",
                impact: { morale: -10, resources: +20, logic: +15 },
                feedback: "Scientific progress accelerated, but the residents missed their fresh greens."
            },
            {
                text: "Greenhouse (People First)",
                impact: { morale: +20, resources: -10, logic: -5 },
                feedback: "Morale soared, but a critical breakthrough in fusion was delayed."
            }
        ]
    },
    {
        id: 2,
        title: "Data Privacy Protocol",
        description: "An AI error discovered a security flaw. Do we patch it silently to avoid panic, or issue a transparent public report?",
        choices: [
            {
                text: "Silent Patch",
                impact: { morale: 0, resources: +10, logic: +20 },
                feedback: "The system is secure, but a seed of distrust was planted."
            },
            {
                text: "Transparent Report",
                impact: { morale: +15, resources: -15, logic: +5 },
                feedback: "The community appreciates the honesty, but debugging costs rose."
            }
        ]
    }
];

export default function EthicalEngine() {
    const { setMood, setMessage } = useMascot();
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [stats, setStats] = useState({ morale: 50, resources: 50, logic: 50 });
    const [history, setHistory] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const currentScenario = SCENARIOS[scenarioIdx];

    useEffect(() => {
        setMessage("Welcome to the Ethical Engine. Let's calculate the optimal path for humanity. 🤖💻");
        setMood("idle");
    }, []);

    const handleChoice = (choiceIdx: number) => {
        const choice = currentScenario.choices[choiceIdx];
        void hapticSelection();

        setStats(prev => ({
            morale: Math.max(0, Math.min(100, prev.morale + choice.impact.morale)),
            resources: Math.max(0, Math.min(100, prev.resources + choice.impact.resources)),
            logic: Math.max(0, Math.min(100, prev.logic + choice.impact.logic))
        }));

        setHistory(prev => [...prev, choice.feedback]);
        setShowResult(true);
        setMood(choice.impact.morale > 0 ? "happy" : "thinking");
        setMessage(choice.feedback);
    };

    const nextScenario = () => {
        setShowResult(false);
        setScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
        void hapticSuccess();
    };

    return (
        <div className="relative min-h-[600px] w-full flex flex-col items-center justify-center p-8 bg-zinc-950 overflow-hidden rounded-[3rem] border-4 border-slate-900 shadow-2xl">
            {/* HUD Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* Dashboard Stats */}
            <div className="absolute top-8 left-8 right-8 grid grid-cols-3 gap-4 z-10">
                <StatCard icon={Users} label="Morale" value={stats.morale} color="text-pink-400" />
                <StatCard icon={Globe} label="Resources" value={stats.resources} color="text-blue-400" />
                <StatCard icon={Cpu} label="Logic" value={stats.logic} color="text-amber-400" />
            </div>

            {/* Main Terminal */}
            <div className="relative z-10 w-full max-w-2xl mt-12">
                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key="scenario"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="p-10 bg-slate-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl"
                        >
                            <div className="space-y-6">
                                <header className="flex items-center gap-3">
                                    <ShieldCheck className="text-amber-500 w-6 h-6" />
                                    <span className="text-xs font-black uppercase text-amber-500/50 tracking-widest italic">Scenario #{currentScenario.id}</span>
                                </header>
                                <h2 className="text-3xl font-black text-white italic">{currentScenario.title}</h2>
                                <p className="text-slate-400 font-medium leading-relaxed">{currentScenario.description}</p>

                                <div className="grid gap-4 pt-6">
                                    {currentScenario.choices.map((choice, idx) => (
                                        <PhysicalButton
                                            key={idx}
                                            onClick={() => handleChoice(idx)}
                                            className="bg-white/5 hover:bg-white/10 text-white text-sm h-16 justify-start px-8 rounded-2xl border border-white/5"
                                        >
                                            {choice.text}
                                        </PhysicalButton>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-10 bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem] backdrop-blur-3xl text-center space-y-8"
                        >
                            <h3 className="text-2xl font-black text-amber-400 uppercase italic">Simulation Result</h3>
                            <div className="h-[2px] w-full bg-amber-500/20" />
                            <p className="text-white text-lg font-medium italic">"{currentScenario.choices[0].feedback}"</p>
                            <PhysicalButton onClick={nextScenario} className="bg-amber-500 text-black px-12 h-14 rounded-2xl">
                                CONTINUE ANALYSIS 💾
                            </PhysicalButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Pixel's Analytical HUD */}
            <div className="absolute bottom-10 left-10 opacity-30 flex items-center gap-4">
                <div className="grid grid-cols-4 gap-1">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                            className="w-1 bg-amber-500"
                        />
                    ))}
                </div>
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Pixel's Logic Engine: Running...</span>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: string }) {
    return (
        <div className="bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2">
                <Icon className={`${color} w-4 h-4`} />
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">{label}</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className={`h-full bg-gradient-to-r from-current to-white/50 ${color}`}
                />
            </div>
        </div>
    );
}
