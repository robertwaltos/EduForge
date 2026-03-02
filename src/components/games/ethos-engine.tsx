"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Scale, Zap, Globe, Users, ChevronRight, MessageSquare, Info, ShieldCheck, TrendingUp, Heart, AlertCircle, History, Sparkles } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Ethos Engine Types --- */
interface PillarStats {
    social: number;
    tech: number;
    environment: number;
}

interface Choice {
    text: string;
    impact: Partial<PillarStats>;
    consequence: string;
    nextNode: string;
}

interface StoryNode {
    id: string;
    speaker: string;
    text: string;
    choices: Choice[];
}

const STORY_GRAPH: Record<string, StoryNode> = {
    START: {
        id: "START",
        speaker: "Council Overseer",
        text: "The year is 2092. The 'Great Pivot' has reached a stalemate. We must decide the fate of the first Mars colony. Do we prioritize open-source tech sharing or private ecological preserves?",
        choices: [
            {
                text: "Open-Source Tech Sharing",
                impact: { tech: 20, social: 10, environment: -5 },
                consequence: "Acceleration of Martian development, but at a cost to the delicate desert ecosystem.",
                nextNode: "TECH_ROUTE"
            },
            {
                text: "Private Ecological Preserves",
                impact: { environment: 25, social: -10, tech: -5 },
                consequence: "Preservation of Martian minerals, though social equity for colonists lags behind.",
                nextNode: "BIO_ROUTE"
            }
        ]
    },
    TECH_ROUTE: {
        id: "TECH_ROUTE",
        speaker: "Chief Engineer",
        text: "Innovation is booming! However, the colonists are demanding access to the genetic modification nodes. Should we allow unrestricted biological enhancement?",
        choices: [
            {
                text: "Authorize Enhancement",
                impact: { tech: 15, social: -15, environment: 10 },
                consequence: "A new era of human evolution begins, creating a massive social divide.",
                nextNode: "END_TECH"
            },
            {
                text: "Restrict Access",
                impact: { social: 20, tech: -10, environment: 5 },
                consequence: "Traditional humanity is preserved, but progress slows significantly.",
                nextNode: "END_SOCIAL"
            }
        ]
    },
    BIO_ROUTE: {
        id: "BIO_ROUTE",
        speaker: "Lead Xenobiologist",
        text: "The preserves are thriving, but Earth-side corporations are lobbying to extract 'Cryo-Oxygen'. Do we allow limited extraction to fund the colony?",
        choices: [
            {
                text: "Allow Extraction",
                impact: { tech: 10, environment: -20, social: 15 },
                consequence: "The economy thrives, but the Martian sky loses its pristine clarity.",
                nextNode: "END_ECON"
            },
            {
                text: "Deny All Extraction",
                impact: { environment: 20, social: 5, tech: -15 },
                consequence: "The planet remains untouched, while the colony faces extreme austerity.",
                nextNode: "END_BIO"
            }
        ]
    },
    END_TECH: { id: "END_TECH", speaker: "History Core", text: "You have forged a post-human future. Innovation is absolute, but the soul of humanity has fundamentally shifted. Phase 8 complete.", choices: [] },
    END_SOCIAL: { id: "END_SOCIAL", speaker: "History Core", text: "Stability achieved. You chose the people over the machines. Progress is slow, but harmony is high. Phase 8 complete.", choices: [] },
    END_BIO: { id: "END_BIO", speaker: "History Core", text: "A Green Mars. You preserved a world at the cost of its expansion. A quiet, beautiful victory. Phase 8 complete.", choices: [] },
    END_ECON: { id: "END_ECON", speaker: "History Core", text: "The Prosperity Path. A booming trade hub that sacrificed its environment for the golden age. Phase 8 complete.", choices: [] }
};

export default function EthosEngine() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "STORY" | "RESULT" | "FINISH">("IDLE");
    const [currentNodeId, setCurrentNodeId] = useState("START");
    const [stats, setStats] = useState<PillarStats>({ social: 50, tech: 50, environment: 50 });
    const [history, setHistory] = useState<string[]>([]);

    const currentNode = useMemo(() => STORY_GRAPH[currentNodeId], [currentNodeId]);

    const handleChoice = (choice: Choice) => {
        hapticSelection();
        setStats(prev => ({
            social: Math.max(0, Math.min(100, prev.social + (choice.impact.social || 0))),
            tech: Math.max(0, Math.min(100, prev.tech + (choice.impact.tech || 0))),
            environment: Math.max(0, Math.min(100, prev.environment + (choice.impact.environment || 0)))
        }));
        setHistory(prev => [...prev, choice.consequence]);

        if (choice.nextNode.startsWith("END")) {
            setGameState("FINISH");
            hapticSuccess();
            setMessage("Final verdict logged. The timeline is set. 📜");
            setMood("happy");
        }

        setCurrentNodeId(choice.nextNode);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-zinc-950/20 rounded-[4rem] border border-blue-500/20 overflow-hidden shadow-2xl flex flex-col font-sans text-white">
            {/* Grand Council Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent:70%)]" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[50%] opacity-10"
                >
                    <div className="w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent:1px),linear-gradient(to_bottom,#1e293b_1px,transparent:1px)] bg-[size:100px_100px]" />
                </motion.div>
            </div>

            {/* Header HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <Scale className="text-blue-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Ethos Engine</h2>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Global Mediator v3.0</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <PillarBox label="SOCIAL EQUITY" value={stats.social} color="text-emerald-400" icon={Users} />
                    <PillarBox label="TECH PROGRESS" value={stats.tech} color="text-blue-400" icon={Zap} />
                    <PillarBox label="BIO STABILITY" value={stats.environment} color="text-teal-400" icon={Globe} />
                </div>
            </div>

            {/* Main Stage */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-12 overflow-hidden">
                <AnimatePresence mode="wait">
                    {gameState === "STORY" && (
                        <motion.div
                            key={currentNodeId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                <History className="w-20 h-20 text-blue-400 -rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4 block">
                                    Transmission: {currentNode.speaker}
                                </span>
                                <h3 className="text-2xl font-black italic leading-tight mb-12 text-white">
                                    "{currentNode.text}"
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {currentNode.choices.map((choice, i) => (
                                        <ChoiceButton
                                            key={i}
                                            text={choice.text}
                                            onClick={() => handleChoice(choice)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {gameState === "FINISH" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-3xl text-center"
                        >
                            <div className="w-24 h-24 bg-blue-500/20 rounded-[2.5rem] flex items-center justify-center border border-blue-500/30 mx-auto mb-8 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                                <Sparkles className="w-12 h-12 text-blue-400" />
                            </div>
                            <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Epoch Defined</h3>
                            <p className="text-zinc-500 text-lg mb-12 italic max-w-xl mx-auto">
                                "{currentNode.text}"
                            </p>

                            <div className="bg-white/5 border border-white/5 p-8 rounded-3xl mb-12 text-left">
                                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Historical Record</h4>
                                {history.map((h, i) => (
                                    <div key={i} className="flex gap-4 mb-2 text-sm text-zinc-300">
                                        <span className="text-blue-500 font-bold italic tabular-nums">P.0{i + 1}:</span>
                                        <p>{h}</p>
                                    </div>
                                ))}
                            </div>

                            <PhysicalButton
                                onClick={() => window.location.reload()}
                                className="bg-blue-600 h-20 px-16 rounded-[2.5rem] text-xl shadow-lg border border-blue-400/30"
                            >
                                CLOSE TIMELINE 📖
                            </PhysicalButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Stats / Context */}
            <div className="relative z-20 p-8 bg-zinc-900/40 border-t border-white/5 flex justify-between items-center overflow-hidden">
                <div className="flex gap-8">
                    <MiniStat label="ACTIVE NODES" value="84.2k" />
                    <MiniStat label="TIMELINE DRIFT" value="+0.04%" />
                    <MiniStat label="CONSENSUS" value="High" />
                </div>

                <div className="flex items-center gap-2 px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Grand Council Online</span>
                </div>
            </div>

            {/* Idle Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-blue-500/20 rounded-[2.5rem] flex items-center justify-center border border-blue-500/30 mb-8 shadow-[0_0_40px_rgba(59,130,246,0.2)] group">
                        <Scale className="w-12 h-12 text-blue-400 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Ethos Engine</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Become the architect of the future. Navigate through civilization-defining choices, balance competing pillars, and archive your epoch in stunning 4K.
                    </p>
                    <PhysicalButton
                        onClick={() => { setGameState("STORY"); hapticSelection(); setMessage("Timeline synchronization initiated. The council awaits your decision. 📜"); }}
                        className="bg-blue-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-blue-400/30"
                    >
                        SYNCHRONIZE TIMELINE 📜
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function PillarBox({ label, value, color, icon: Icon }: { label: string, value: number, color: string, icon: any }) {
    return (
        <div className="bg-white/5 border border-white/5 px-6 py-2 rounded-2xl flex items-center gap-4 min-w-[160px]">
            <div className={`w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-right flex-1">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block leading-none mb-1">{label}</span>
                <div className="flex items-center justify-end gap-2">
                    <span className={`text-lg font-black italic ${color} leading-none tabular-nums`}>{value}</span>
                    <div className="w-12 h-1.5 bg-black/20 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${value}%` }} className={`h-full ${color.replace('text', 'bg')}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniStat({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-0.5">{label}</span>
            <span className="text-xs font-black italic text-zinc-300 uppercase tabular-nums">{value}</span>
        </div>
    );
}

function ChoiceButton({ text, onClick }: { text: string, onClick: () => void }) {
    return (
        <motion.button
            whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="w-full p-6 text-left border border-white/10 rounded-2xl flex items-center justify-between group transition-all"
        >
            <span className="text-lg font-black italic text-zinc-300 group-hover:text-blue-400">{text}</span>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all border border-transparent">
                <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-blue-400" />
            </div>
        </motion.button>
    );
}
