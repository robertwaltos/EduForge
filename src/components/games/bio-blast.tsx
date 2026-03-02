"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Shield, Zap, Activity, Heart, Target, ChevronRight, Droplets, Microscope, Crosshair, Thermometer, FlaskConical, AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Bio Blast Types --- */
type CellType = "MACROPHAGE" | "T_CELL" | "B_CELL";
interface Pathogen {
    id: string;
    type: "BACTERIA" | "VIRUS";
    x: number;
    y: number;
    health: number;
    speed: number;
}

export default function BioBlast() {
    const { setMessage, setMood } = useMascot();
    const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "UPGRADING" | "SUCCESS" | "GAMEOVER">("IDLE");
    const [pathogens, setPathogens] = useState<Pathogen[]>([]);
    const [immuneHealth, setImmuneHealth] = useState(100);
    const [biomass, setBiomass] = useState(100);
    const [activeCell, setActiveCell] = useState<CellType>("MACROPHAGE");
    const [wave, setWave] = useState(1);

    const spawnPathogen = useCallback(() => {
        const id = Math.random().toString();
        const type = Math.random() > 0.3 ? "BACTERIA" : "VIRUS";
        setPathogens(prev => [...prev, {
            id,
            type,
            x: 100,
            y: Math.random() * 80 + 10,
            health: type === "BACTERIA" ? 50 : 20,
            speed: type === "BACTERIA" ? 0.2 : 0.4
        }]);
    }, []);

    useEffect(() => {
        if (gameState !== "PLAYING") return;
        const spawnInterval = setInterval(spawnPathogen, 3000 / wave);
        return () => clearInterval(spawnInterval);
    }, [gameState, wave, spawnPathogen]);

    useEffect(() => {
        if (gameState !== "PLAYING") return;
        const moveInterval = setInterval(() => {
            setPathogens(prev => {
                const next = prev.map(p => ({ ...p, x: p.x - p.speed }))
                    .filter(p => {
                        if (p.x <= 0) {
                            setImmuneHealth(h => Math.max(0, h - 10));
                            hapticError();
                            return false;
                        }
                        return true;
                    });
                return next;
            });
        }, 50);
        return () => clearInterval(moveInterval);
    }, [gameState]);

    useEffect(() => {
        if (immuneHealth <= 0 && gameState === "PLAYING") {
            setGameState("GAMEOVER");
            setMood("sad");
            setMessage("Immune system breached. Pathogens have successfully colonized the host. 🧬");
        }
    }, [immuneHealth, gameState, setMessage, setMood]);

    const attack = (pathogenId: string) => {
        if (gameState !== "PLAYING") return;
        setPathogens(prev => prev.map(p => {
            if (p.id === pathogenId) {
                const damage = activeCell === "MACROPHAGE" ? 25 : activeCell === "T_CELL" ? 50 : 10;
                hapticSelection();
                return { ...p, health: p.health - damage };
            }
            return p;
        }).filter(p => {
            if (p.health <= 0) {
                setBiomass(b => b + 20);
                return false;
            }
            return true;
        }));
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[700px] bg-red-950/20 rounded-[4rem] border border-red-500/20 overflow-hidden shadow-2xl flex flex-col font-sans text-white">
            {/* Bloodstream Background */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent:80%)]" />
                <motion.div
                    animate={{ x: [-100, 100], y: [-50, 50] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
                />
            </div>

            {/* Header HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/60 backdrop-blur-2xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <ShieldCheck className="text-red-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Bio Blast</h2>
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Immune Defense v2.4</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <StatusBox label="SYSTEM HEALTH" value={`${immuneHealth}%`} color="text-red-400" icon={Heart} />
                    <StatusBox label="BIOMASS STOCK" value={biomass} color="text-emerald-400" icon={FlaskConical} />
                    <StatusBox label="THREAT LEVEL" value={`Wave ${wave}`} color="text-amber-400" icon={ShieldAlert} />
                </div>
            </div>

            {/* Main Defense Theater */}
            <div className="relative z-10 flex-1 flex overflow-hidden">
                {/* Cell Deployment */}
                <div className="w-72 border-r border-white/5 p-8 flex flex-col gap-6 bg-zinc-900/40">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Microscope className="w-3 h-3 text-red-400" /> Cell Selection
                    </h3>

                    <DeploymentButton
                        type="MACROPHAGE"
                        active={activeCell === "MACROPHAGE"}
                        label="Macrophage"
                        desc="Phagocyte / Heavy"
                        icon={Shield}
                        color="bg-red-500"
                        onClick={() => setActiveCell("MACROPHAGE")}
                    />
                    <DeploymentButton
                        type="T_CELL"
                        active={activeCell === "T_CELL"}
                        label="Cytotoxic T"
                        desc="Precision Strike"
                        icon={Crosshair}
                        color="bg-indigo-500"
                        onClick={() => setActiveCell("T_CELL")}
                    />
                    <DeploymentButton
                        type="B_CELL"
                        active={activeCell === "B_CELL"}
                        label="B-Lymphocyte"
                        desc="Antibody Production"
                        icon={Droplets}
                        color="bg-emerald-500"
                        onClick={() => setActiveCell("B_CELL")}
                    />

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[9px] font-black text-zinc-500 uppercase">Inflammatory Response</span>
                            <Thermometer className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: `${(100 - immuneHealth)}%` }}
                                className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Microscopic Combat Zone */}
                <div className="flex-1 relative p-12 overflow-hidden">
                    <AnimatePresence>
                        {pathogens.map(p => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1, left: `${p.x}%`, top: `${p.y}%` }}
                                exit={{ opacity: 0, scale: 2 }}
                                onClick={() => attack(p.id)}
                                className={`absolute w-16 h-16 cursor-crosshair group flex items-center justify-center`}
                            >
                                <div className={`relative w-12 h-12 rounded-full border-2 transition-all 
                                    ${p.type === 'BACTERIA' ? 'bg-emerald-500/20 border-emerald-500' : 'bg-red-500/20 border-red-500'}
                                    shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:scale-110`}
                                >
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-1 flex items-center justify-center opacity-50"
                                    >
                                        <Activity className={`w-6 h-6 ${p.type === 'BACTERIA' ? 'text-emerald-400' : 'text-red-400'}`} />
                                    </motion.div>
                                    <div className="absolute -top-4 left-0 w-full bg-black/40 h-1 rounded-full overflow-hidden">
                                        <motion.div
                                            animate={{ width: `${p.health}%` }}
                                            className="h-full bg-red-500"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* HUD Overlays */}
                    <div className="absolute top-8 right-8 flex flex-col items-end gap-2 pointer-events-none opacity-40">
                        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            <AlertTriangle className="w-3 h-3 text-red-500" /> Pathogen Count: {pathogens.length}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            <Droplets className="w-3 h-3 text-blue-500" /> Host Concentration: Stable
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
                {gameState === "GAMEOVER" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-40 bg-zinc-950/80 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="w-24 h-24 bg-red-500/20 rounded-[2.5rem] flex items-center justify-center border border-red-500/30 mb-8 overflow-hidden group shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                            <AlertTriangle className="w-12 h-12 text-red-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">System Breached</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                            Defensive integrity compromised. Host stability failing. Pathogen concentration exceeds critical threshold.
                        </p>
                        <PhysicalButton
                            onClick={() => window.location.reload()}
                            className="bg-red-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-red-400/30"
                        >
                            RETRY DEFENSE 🧬
                        </PhysicalButton>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Idle Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-red-500/20 rounded-[2.5rem] flex items-center justify-center border border-red-500/30 mb-8 overflow-hidden group shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                        <ShieldCheck className="w-12 h-12 text-red-400 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-6xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">Bio Blast</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        Commander of the immune core. Lead the microscopic vanguard against elite pathogens. Master cellular immunology in 4K.
                    </p>
                    <PhysicalButton
                        onClick={() => { setGameState("PLAYING"); hapticSelection(); setMessage("Immune response activated. Deploy defenders to neutralize the threat. 🧬"); }}
                        className="bg-red-600 h-24 px-20 rounded-[3rem] text-2xl shadow-lg border border-red-400/30"
                    >
                        ACTIVATE IMMUNE CORE 🧬
                    </PhysicalButton>
                </motion.div>
            )}
        </div>
    );
}

function StatusBox({ label, value, color, icon: Icon }: { label: string, value: string | number, color: string, icon: any }) {
    return (
        <div className="bg-white/5 border border-white/5 px-6 py-2 rounded-2xl flex items-center gap-4 min-w-[160px]">
            <div className={`w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-right flex-1">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block leading-none mb-1">{label}</span>
                <span className={`text-lg font-black italic ${color} leading-none tabular-nums`}>{value}</span>
            </div>
        </div>
    );
}

function DeploymentButton({ label, desc, icon: Icon, color, active, onClick }: any) {
    return (
        <motion.button
            whileHover={{ x: 8 }}
            onClick={onClick}
            className={`group flex items-center gap-4 w-full p-4 rounded-3xl border transition-all text-left
            ${active ? 'bg-white/10 border-white/20 shadow-xl' : 'bg-white/5 border-white/5 hover:bg-white/8'}`}
        >
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
                <span className="block text-sm font-black text-white italic uppercase leading-none">{label}</span>
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{desc}</span>
            </div>
            {active && (
                <div className="ml-auto w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)] animate-pulse" />
            )}
        </motion.button>
    );
}
