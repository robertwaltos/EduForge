"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Music, Radio, Mic2, Speaker, Zap, Star, Trophy, Volume2, Globe, Sparkles } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Rhythm Types --- */
type Note = {
    id: string;
    lane: number; // 0, 1, 2
    time: number; // In ms
    text: string;
    type: "SYLLABLE" | "WORD";
};

export default function RhythmRules() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "RESULT">("IDLE");
    const [score, setScore] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [combo, setCombo] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [activeNotes, setActiveNotes] = useState<Note[]>([]);

    const gameLoopRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const levelData: Note[] = useMemo(() => [
        { id: "n1", lane: 0, time: 2000, text: "BA-", type: "SYLLABLE" },
        { id: "n2", lane: 1, time: 3000, text: "NA-", type: "SYLLABLE" },
        { id: "n3", lane: 2, time: 4000, text: "NA", type: "SYLLABLE" },
        { id: "n4", lane: 1, time: 5500, text: "AP-", type: "SYLLABLE" },
        { id: "n5", lane: 1, time: 6500, text: "PLE", type: "SYLLABLE" },
        { id: "n6", lane: 0, time: 8000, text: "OR-", type: "SYLLABLE" },
        { id: "n7", lane: 2, time: 9000, text: "ANGE", type: "SYLLABLE" },
    ], []);

    const startGame = () => {
        setGameState("PLAYING");
        setScore(0);
        setCombo(0);
        setMultiplier(1);
        setCurrentTime(0);
        setActiveNotes([]);
        startTimeRef.current = Date.now();
        setMood("happy");
        setMessage("Feel the beat! Tap the syllables in rhythm to unlock the linguistic flow. 🎵");
        hapticSuccess();
    };

    const handleHit = (lane: number) => {
        if (gameState !== "PLAYING") return;

        const hitWindow = 300; // ms
        const now = Date.now() - startTimeRef.current;

        const targetNote = levelData.find(n =>
            n.lane === lane &&
            Math.abs(n.time - now) < hitWindow &&
            !activeNotes.some(an => an.id === n.id)
        );

        if (targetNote) {
            setScore(s => s + (100 * multiplier));
            setCombo(c => c + 1);
            if (combo > 5) setMultiplier(Math.min(4, multiplier + 0.5));
            setActiveNotes(prev => [...prev, targetNote]);
            hapticSelection();
        } else {
            setCombo(0);
            setMultiplier(1);
            hapticError();
        }
    };

    // Game Loop
    useEffect(() => {
        if (gameState !== "PLAYING") return;

        const loop = () => {
            const now = Date.now() - startTimeRef.current;
            setCurrentTime(now);

            if (now > 12000) { // End of song
                setGameState("RESULT");
                setMood("happy");
                setMessage(`Masterful performance! Final Score: ${score}. You've mastered the Syllabic Rhythm. 🏆`);
                hapticSuccess();
            } else {
                gameLoopRef.current = requestAnimationFrame(loop);
            }
        };

        gameLoopRef.current = requestAnimationFrame(loop);
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameState, score, setMessage, setMood]);

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[600px] bg-zinc-950 rounded-[4rem] border border-fuchsia-500/20 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* 4K Music Visualizer Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.1)_0%,transparent_70%)]" />
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fuchsia-500/10 to-transparent"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>

            {/* HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center">
                        <Music className="text-fuchsia-400 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Rhythm Rules</h2>
                        <span className="text-[10px] font-bold text-fuchsia-600 uppercase tracking-widest">Syllabic Sync v1.0</span>
                    </div>
                </div>

                <div className="flex gap-8">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Groove Combo</p>
                        <p className="text-2xl font-black italic tracking-tighter text-fuchsia-400 tabular-nums">x{multiplier} | {combo}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Session Score</p>
                        <p className="text-2xl font-black italic tracking-tighter text-white tabular-nums">{score.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Rhythm Lanes */}
            <div className="relative z-10 flex-1 flex justify-center gap-12 px-12 mb-12">
                {[0, 1, 2].map(lane => (
                    <div key={lane} className="relative w-24 h-full bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center">
                        {/* Notes Falling */}
                        <AnimatePresence>
                            {levelData
                                .filter(n => n.lane === lane && n.time > currentTime - 1000 && n.time < currentTime + 3000)
                                .map(note => (
                                    <RhythmNote
                                        key={note.id}
                                        note={note}
                                        currentTime={currentTime}
                                        isHit={activeNotes.some(an => an.id === note.id)}
                                    />
                                ))
                            }
                        </AnimatePresence>

                        {/* Hit Zone */}
                        <div className="absolute bottom-10 w-20 h-20 rounded-2xl border-2 border-white/10 flex items-center justify-center group">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleHit(lane)}
                                className="w-16 h-16 rounded-xl bg-white/5 group-active:bg-fuchsia-500/40 transition-colors flex items-center justify-center"
                            >
                                <Zap className="w-6 h-6 text-white opacity-20 group-active:opacity-100" />
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overlays */}
            {(gameState === "IDLE" || gameState === "RESULT") && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-fuchsia-500/20 rounded-[2.5rem] flex items-center justify-center border border-fuchsia-500/30 mb-8 overflow-hidden group">
                        <Radio className="w-12 h-12 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase">
                        {gameState === "RESULT" ? "Encore Achieved" : "Sync the Language"}
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Linguistics meets rhythm. Tap to the beat of syllables to master the flow of modern communication in 4K.
                    </p>
                    <PhysicalButton
                        onClick={startGame}
                        className="bg-fuchsia-500 h-24 px-20 rounded-[3rem] text-2xl"
                    >
                        {gameState === "RESULT" ? "NEW TRACK 🎵" : "START SYNC ⚡"}
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function RhythmNote({ note, currentTime, isHit }: { note: Note, currentTime: number, isHit: boolean }) {
    const y = ((note.time - currentTime) / 3000) * 100; // Percentage from bottom

    if (isHit) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: `${80 - y}%` }}
            exit={{ opacity: 0 }}
            className="absolute p-4 rounded-xl bg-fuchsia-500 border border-fuchsia-400 shadow-[0_0_20px_rgba(232,121,249,0.4)] flex items-center justify-center min-w-[60px]"
        >
            <span className="text-xs font-black text-white italic">{note.text}</span>
        </motion.div>
    );
}
