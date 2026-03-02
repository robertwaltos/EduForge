"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ShieldCheck, Lock, Unlock, Zap, Terminal, Cpu, Database, Network, EyeOff, Key } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Cipher Types --- */
type Signal = {
    id: string;
    encrypted: string;
    decrypted: string;
    hint: string;
    complexity: number;
};

export default function CipherCity() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "DECRYPTING" | "BREACHED" | "SECURED">("IDLE");
    const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);
    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);

    const signals: Signal[] = useMemo(() => [
        { id: "s1", encrypted: "Koydo Is Fun", decrypted: "Koydo Is Fun", hint: "Direct Input Test", complexity: 1 },
        { id: "s2", encrypted: "Bqqmf", decrypted: "Apple", hint: "Shift forward by 1", complexity: 2 },
        { id: "s3", encrypted: "Ufdi", decrypted: "Tech", hint: "Shift forward by 1", complexity: 2 },
        { id: "s4", encrypted: "Dzfsh", decrypted: "Cyber", hint: "Shift forward by 1", complexity: 3 }
    ], []);

    const nextLevel = useCallback(() => {
        const signal = signals[Math.min(level - 1, signals.length - 1)];
        setCurrentSignal(signal);
        setUserInput("");
        setTimeLeft(30);
        setGameState("DECRYPTING");
        setMood("thinking");
        setMessage(`Signal intercepted! Complexity Level ${level}. Break the cipher before the firewall resets! 🕵️‍♂️`);
    }, [level, signals, setMessage, setMood]);

    const startBreach = () => {
        setScore(0);
        setLevel(1);
        nextLevel();
        hapticSuccess();
    };

    const handleInput = (char: string) => {
        if (gameState !== "DECRYPTING") return;
        setUserInput(prev => prev + char);
        hapticSelection();
    };

    const checkDecryption = useCallback(() => {
        if (!currentSignal) return;
        if (userInput.toLowerCase() === currentSignal.decrypted.toLowerCase()) {
            setScore(s => s + (timeLeft * 100));
            if (level < signals.length) {
                setLevel(l => l + 1);
                hapticSuccess();
                setMessage("Signal decrypted! Moving to the next node... ⚡");
            } else {
                setGameState("SECURED");
                hapticSuccess();
                setMessage("Mainframe Access Granted! All signals secured. 🏆");
            }
        } else {
            hapticError();
            setUserInput(""); // Reset on wrong try for challenge
        }
    }, [userInput, currentSignal, timeLeft, level, signals.length, setMessage]);

    // Timer Loop
    useEffect(() => {
        if (gameState !== "DECRYPTING" || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 && gameState === "DECRYPTING") {
            setGameState("BREACHED");
            hapticError();
            setMood("sad");
            setMessage("Firewall reset! The encryption reinforced. System lockout imminent. 🛑");
        }
    }, [timeLeft, gameState, setMood, setMessage]);

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[650px] bg-zinc-950 rounded-[4rem] border border-green-500/20 overflow-hidden shadow-2xl flex flex-col font-mono">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>

            {/* Terminal Top Bar */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-black/40 border-b border-green-500/20 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <Terminal className="text-green-400 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic tracking-tighter text-green-400 uppercase">Cipher City</h2>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">Protocol: Encryp-T v2.0.26</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 items-center">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Breach Score</p>
                        <p className="text-2xl font-black italic tracking-tighter text-white tabular-nums">{score.toLocaleString()}</p>
                    </div>
                    <div className="w-px h-10 bg-white/5" />
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Time Remaining</p>
                        <p className={`text-2xl font-black italic tracking-tighter tabular-nums ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-green-400'}`}>
                            {timeLeft}s
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Area: Oscilloscope / Terminal Space */}
            <div className="relative z-10 flex-1 p-8 flex flex-col items-center justify-center">
                {gameState === "DECRYPTING" && currentSignal ? (
                    <div className="w-full max-w-2xl space-y-12 text-center">
                        <div className="p-10 rounded-[3rem] bg-black/40 border border-green-500/10 backdrop-blur-sm relative overflow-hidden group">
                            {/* Animated Scanline in visualizer */}
                            <motion.div
                                className="absolute inset-x-0 h-1 bg-green-500/20 blur-sm z-0"
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.p
                                key={currentSignal.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-6xl font-black italic tracking-[0.2em] text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)] mb-2 relative z-10"
                            >
                                {currentSignal.encrypted.toUpperCase()}
                            </motion.p>
                            <p className="text-[10px] font-bold text-green-900 uppercase tracking-widest relative z-10">Intercepted Ciphertext</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-zinc-900/50 border border-green-500/10 p-6 rounded-[2rem] flex items-center justify-between">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest italic">Decoded Stream:</span>
                                <span className="text-3xl font-black text-white tracking-widest">{userInput.toUpperCase()}</span>
                                <Unlock className={`w-5 h-5 ${userInput.length > 0 ? 'text-green-400 animate-bounce' : 'text-zinc-700'}`} />
                            </div>
                            <div className="grid grid-cols-10 gap-2 p-4 bg-black/20 rounded-[2rem]">
                                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(char => (
                                    <button
                                        key={char}
                                        onClick={() => handleInput(char)}
                                        className="h-10 rounded-lg bg-green-500/5 border border-green-500/10 text-green-400 text-xs font-bold hover:bg-green-500/20 hover:border-green-400/30 transition-all active:scale-95"
                                    >
                                        {char}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <PhysicalButton onClick={checkDecryption} className="bg-green-500 h-20 px-12 rounded-[2rem]">
                            SUBMIT KEY 🗝️
                        </PhysicalButton>
                    </div>
                ) : (
                    <motion.div
                        {...JUICY_VARIANTS.slideUp}
                        className="flex flex-col items-center text-center p-12"
                    >
                        <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center border border-green-500/30 mb-8 overflow-hidden group">
                            <Lock className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase">
                            {gameState === "SECURED" ? "Mainframe Secured" :
                                gameState === "BREACHED" ? "System Lockout" : "Initialize Decrypter"}
                        </h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            {gameState === "SECURED" ? "All encrypted nodes have been stabilized. Level mastery achieved." :
                                gameState === "BREACHED" ? "The firewall reinforcement succeeded. Connection terminated." :
                                    "Accessing external signal relays. Prepare for high-frequency decryption."}
                        </p>
                        <PhysicalButton
                            onClick={startBreach}
                            className={`${gameState === "BREACHED" ? 'bg-rose-500' : 'bg-green-500'} h-24 px-20 rounded-[3rem] text-2xl`}
                        >
                            {gameState === "BREACHED" ? "RETART PROXY 🔄" : "START DECRYPTION ⚡"}
                        </PhysicalButton>
                    </motion.div>
                )}
            </div>

            {/* Terminal Polish */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,118,0.02))] bg-[length:100%_2px,3px_100%] opacity-40" />
        </div>
    );
}
