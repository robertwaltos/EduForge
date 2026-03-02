"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TreePine,
    Leaf,
    Camera,
    Database,
    CheckCircle2,
    Info,
    ArrowRight,
    Search,
    Wind,
    Droplets
} from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSuccess, hapticSelection } from "@/lib/platform/haptics";
import MascotFriend from "../experience/KoydoMascotFriends";

/**
 * TERRA'S TREK - Phase 9 (Explorer Batch)
 * A 4K biological survey mission through realistic biomes.
 * Theme: "Dora the Explorer" style discovery with scientific logging.
 */

interface SurveyPoint {
    id: string;
    species: string;
    description: string;
    x: number;
    y: number;
    fact: string;
}

const SURVEY_POINTS: SurveyPoint[] = [
    {
        id: "flora_1",
        species: "Bioluminescent Fern",
        description: "A rare plant that glows under moonlight. Identify its root system.",
        x: 25,
        y: 40,
        fact: "These ferns use chemical reactions to attract nocturnal pollinators."
    },
    {
        id: "flora_2",
        species: "Emerald Canopy Tree",
        description: "The giant of the forest. Sample the bark texture for structural analysis.",
        x: 75,
        y: 20,
        fact: "Its bark is naturally resistant to pests and extremely efficient at moisture retention."
    },
    {
        id: "flora_3",
        species: "Crystal Moss",
        description: "Found only near water. Analyze its hydration levels near the stream.",
        x: 50,
        y: 75,
        fact: "Crystal Moss can store up to 50x its weight in water, preventing soil erosion."
    }
];

export default function TerrasTrek() {
    const [pointIndex, setPointIndex] = useState(0);
    const [loggedPoints, setLoggedPoints] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const [scannerActive, setScannerActive] = useState(false);

    const currentPoint = SURVEY_POINTS[pointIndex];

    const handleSurvey = (e: React.MouseEvent | React.TouchEvent) => {
        if (isComplete || isCapturing) return;

        const bounds = e.currentTarget.getBoundingClientRect();
        const x = (('touches' in e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX) - bounds.left;
        const y = (('touches' in e) ? e.touches[0].clientY : (e as React.MouseEvent).clientY) - bounds.top;

        const pctX = (x / bounds.width) * 100;
        const pctY = (y / bounds.height) * 100;

        // Visual feedback
        hapticSelection();
        setScannerActive(true);
        setTimeout(() => setScannerActive(false), 800);

        const dist = Math.sqrt(Math.pow(pctX - currentPoint.x, 2) + Math.pow(pctY - currentPoint.y, 2));

        if (dist < 6) {
            triggerCapture();
        }
    };

    const triggerCapture = () => {
        setIsCapturing(true);
        hapticSuccess();

        setTimeout(() => {
            setLoggedPoints(prev => [...prev, currentPoint.id]);
            if (pointIndex < SURVEY_POINTS.length - 1) {
                setPointIndex(prev => prev + 1);
                setIsCapturing(false);
            } else {
                setIsComplete(true);
            }
        }, 1500);
    };

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-emerald-950 border border-emerald-500/20 shadow-2xl font-sans group">
            {/* 4K Realistic Biome Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-75 transition-transform duration-1000 group-hover:scale-105" />

            {/* Survey Overlay */}
            <motion.div
                className="absolute inset-0 cursor-crosshair"
                onMouseDown={handleSurvey}
                onTouchStart={handleSurvey}
            >
                {/* Scanner Interface */}
                <AnimatePresence>
                    {scannerActive && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5 }}
                            className="absolute pointer-events-none w-32 h-32 border-2 border-emerald-400/50 rounded-full flex items-center justify-center bg-emerald-400/5"
                            style={{ left: `${currentPoint.x - 5}%`, top: `${currentPoint.y - 12}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className="w-1 h-16 bg-emerald-400/40 absolute rotate-45" />
                            <div className="w-1 h-16 bg-emerald-400/40 absolute -rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Logged Markers */}
                {SURVEY_POINTS.map((point, idx) => (
                    loggedPoints.includes(point.id) && (
                        <motion.div
                            key={point.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute w-10 h-10 flex items-center justify-center bg-emerald-500/30 backdrop-blur-md rounded-full border border-emerald-400/50"
                            style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        </motion.div>
                    )
                ))}
            </motion.div>

            {/* HUD: Bio-Log (Top Left) */}
            <div className="absolute top-6 left-6 max-w-xs w-full">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden">
                    <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-2">
                        <Database className="w-5 h-5 text-emerald-400" />
                        <span className="text-white font-bold tracking-tight uppercase text-sm">Bio-Survey Log</span>
                    </div>

                    <div className="space-y-2">
                        {SURVEY_POINTS.map((point, idx) => (
                            <div key={point.id} className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${loggedPoints.includes(point.id) ? "bg-emerald-400" : idx === pointIndex ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
                                <span className={`text-xs font-medium ${idx === pointIndex ? "text-white" : "text-white/40"}`}>{point.species}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* HUD: Captured Data Notification */}
            <AnimatePresence>
                {isCapturing && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-40"
                    >
                        <Camera className="w-6 h-6 animate-pulse" />
                        <div>
                            <div className="font-bold text-sm uppercase">Capturing Data...</div>
                            <div className="text-xs opacity-80">Processing biological structural scan</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD: Terra Interaction (Dora Style) */}
            <div className="absolute bottom-6 left-6 right-6">
                <AnimatePresence mode="wait">
                    {!isComplete && (
                        <motion.div
                            key={pointIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="bg-black/80 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-6 flex gap-8 items-center"
                        >
                            <div className="w-24 h-24 relative flex-shrink-0">
                                <MascotFriend id="terra" size="lg" mood={isCapturing ? "cheering" : "happy"} />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-emerald-400 font-black text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
                                    <Leaf className="w-4 h-4" />
                                    Terra's Field Guide
                                </h3>
                                <p className="text-white text-2xl font-medium leading-tight">
                                    {isCapturing ? `Checking the ${currentPoint.species}... Success!` : currentPoint.description}
                                </p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-emerald-400/80 text-sm mt-2 italic flex items-center gap-2"
                                >
                                    <Info className="w-4 h-4" />
                                    {currentPoint.fact}
                                </motion.p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Progress</div>
                                <div className="flex gap-1">
                                    {SURVEY_POINTS.map((_, i) => (
                                        <div key={i} className={`w-8 h-1.5 rounded-full transition-colors ${i <= pointIndex ? "bg-emerald-400" : "bg-white/10"}`} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Win Screen */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-emerald-950/95 backdrop-blur-3xl flex items-center justify-center z-50 p-12 overflow-hidden"
                    >
                        {/* Decorative particles */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,theme(colors.emerald.400)_0%,transparent_70%)]" />

                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full text-center relative z-10"
                        >
                            <div className="w-40 h-40 mx-auto mb-8">
                                <MascotFriend id="terra" size="xl" mood="happy" />
                            </div>

                            <h2 className="text-6xl font-black text-emerald-400 mb-2 italic uppercase tracking-tighter">
                                Survey <br /> Secured
                            </h2>
                            <p className="text-white/60 text-lg mb-10 px-8">
                                You've successfully cataloged the endangered flora of the Emerald Biome.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-emerald-500/40"
                            >
                                Submit Report
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cinematic Grids & Overlays */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.1)_0%,transparent_50%)]" />
        </div>
    );
}
