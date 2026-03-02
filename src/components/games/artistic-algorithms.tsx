"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMascot } from "@/components/experience/MascotHost";
import { JUICY_VARIANTS, JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";
import PhysicalButton from "@/components/experience/PhysicalButton";
import JuicyStreak from "@/components/experience/JuicyStreak";
import { hapticSuccess, hapticCelebration, hapticSelection } from "@/lib/platform/haptics";
import { Moon, Star, Palette, RefreshCw } from "lucide-react";

export default function ArtisticAlgorithms() {
    const { setMood, setMessage } = useMascot();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [params, setParams] = useState({ frequency: 2, amplitude: 50, step: 0.1 });
    const [targetParams] = useState({ frequency: 5, amplitude: 80, step: 0.05 });
    const [streak, setStreak] = useState(0);
    const [isMatching, setIsMatching] = useState(false);

    useEffect(() => {
        setMessage("Welcome to the Stellar Canvas. Let's paint with the mathematics of the moon! 🌙✨");
        setMood("happy");
    }, []);

    // Drawing Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrame: number;
        let time = 0;

        const draw = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.beginPath();
            ctx.strokeStyle = "#818cf8"; // Indigo 400
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#818cf8";

            for (let i = 0; i < Math.PI * 20; i += params.step) {
                const r = params.amplitude * Math.sin(params.frequency * i + time);
                const x = centerX + r * Math.cos(i);
                const y = centerY + r * Math.sin(i);

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.stroke();
            animationFrame = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationFrame);
    }, [params]);

    const checkMatch = () => {
        const diff = Math.abs(params.frequency - targetParams.frequency) +
            Math.abs(params.amplitude - targetParams.amplitude);

        setIsMatching(true);
        void hapticSelection();

        setTimeout(() => {
            if (diff < 15) {
                handleSuccess();
            } else {
                setMood("thinking");
                setMessage("Almost there... Adjust the resonance of the lines. 🔭");
                setIsMatching(false);
            }
        }, 1000);
    };

    const handleSuccess = () => {
        setStreak(prev => prev + 1);
        setMood("happy");
        setMessage("A masterpiece! The constellation is perfectly aligned. 🌌🎨");
        void hapticCelebration();
        setIsMatching(false);
    };

    const handleSliderChange = (key: keyof typeof params, val: string) => {
        setParams(prev => ({ ...prev, [key]: parseFloat(val) }));
        void hapticSelection();
    };

    return (
        <div className="relative min-h-[600px] w-full flex flex-col items-center justify-center p-8 bg-slate-950 overflow-hidden rounded-[3rem] border-4 border-indigo-900 shadow-2xl">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Header */}
            <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.3em]">Artistic Lab</span>
                    <h2 className="text-4xl font-black italic text-white leading-none">ALGORITHMS OF LUNA</h2>
                </div>
                <JuicyStreak count={streak} />
            </div>

            {/* Canvas Area */}
            <div className="relative w-full max-w-xl aspect-square mb-8 bg-black/40 rounded-full border border-white/5 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(129,140,248,0.1)]">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    className="w-full h-full"
                />
            </div>

            {/* Controls */}
            <div className="w-full max-w-md space-y-6 z-10 p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
                <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300">
                        <span>Frequency</span>
                        <span>{params.frequency.toFixed(1)}</span>
                    </div>
                    <input
                        type="range" min="1" max="20" step="0.1"
                        value={params.frequency}
                        onChange={(e) => handleSliderChange("frequency", e.target.value)}
                        className="w-full h-2 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-300">
                        <span>Amplitude</span>
                        <span>{params.amplitude.toFixed(0)}</span>
                    </div>
                    <input
                        type="range" min="10" max="150" step="1"
                        value={params.amplitude}
                        onChange={(e) => handleSliderChange("amplitude", e.target.value)}
                        className="w-full h-2 bg-indigo-950 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                    />
                </div>

                <div className="pt-4">
                    <PhysicalButton
                        onClick={checkMatch}
                        disabled={isMatching}
                        className="w-full h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white font-black italic"
                    >
                        {isMatching ? "ALIGNING..." : "MATCH CONSTELLATION 🌌"}
                    </PhysicalButton>
                </div>
            </div>

            {/* Luna's Hint */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4 bg-indigo-950/40 border border-indigo-500/20 px-6 py-3 rounded-2xl backdrop-blur-md">
                <Moon className="text-indigo-400 w-5 h-5" />
                <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Luna is dreaming of symmetrical harmonics...</span>
            </div>
        </div>
    );
}
