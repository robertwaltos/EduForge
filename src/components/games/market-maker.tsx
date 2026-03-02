"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Briefcase } from "lucide-react";
import { JUICY_SPRINGS, JUICY_VARIANTS } from "@/lib/experience/interaction-primitives";
import { hapticSelection, hapticSuccess, hapticError } from "@/lib/platform/haptics";
import PhysicalButton from "@/components/experience/PhysicalButton";
import { useMascot } from "@/components/experience/MascotHost";

/* --- Financial Types --- */
type Asset = {
    symbol: string;
    name: string;
    price: number;
    history: number[];
    volatility: number;
    trend: number;
};

export default function MarketMaker() {
    const { setMessage, setMood } = useMascot();
    const [balance, setBalance] = useState(10000);
    const [portfolio, setPortfolio] = useState<Record<string, number>>({
        "ENER": 0,
        "TECH": 0,
        "BIO": 0
    });
    const [assets, setAssets] = useState<Asset[]>([
        { symbol: "ENER", name: "Solaris Power", price: 100, history: [100], volatility: 0.2, trend: 0.1 },
        { symbol: "TECH", name: "Quantum Core", price: 250, history: [250], volatility: 0.4, trend: -0.05 },
        { symbol: "BIO", name: "Genetix Ltd", price: 50, history: [50], volatility: 0.1, trend: 0.02 }
    ]);
    const [day, setDay] = useState(1);
    const [gameState, setGameState] = useState<"IDLE" | "TRADING" | "CLOSED">("IDLE");

    // Market Simulation Loop
    useEffect(() => {
        if (gameState !== "TRADING") return;

        const interval = setInterval(() => {
            setAssets(prev => prev.map(asset => {
                const change = (Math.random() - 0.5) * asset.volatility + asset.trend;
                const newPrice = Math.max(1, asset.price * (1 + change));
                const newHistory = [...asset.history.slice(-19), newPrice];
                return { ...asset, price: newPrice, history: newHistory };
            }));
        }, 1500);

        return () => clearInterval(interval);
    }, [gameState]);

    const buyAsset = (symbol: string) => {
        const asset = assets.find(a => a.symbol === symbol);
        if (!asset || balance < asset.price) {
            hapticError();
            return;
        }

        setBalance(b => b - asset.price);
        setPortfolio(p => ({ ...p, [symbol]: p[symbol] + 1 }));
        hapticSelection();
    };

    const sellAsset = (symbol: string) => {
        const asset = assets.find(a => a.symbol === symbol);
        if (!asset || portfolio[symbol] <= 0) {
            hapticError();
            return;
        }

        setBalance(b => b + asset.price);
        setPortfolio(p => ({ ...p, [symbol]: p[symbol] - 1 }));
        hapticSelection();
    };

    const totalValue = useMemo(() => {
        const assetValue = assets.reduce((acc, asset) => acc + (portfolio[asset.symbol] * asset.price), 0);
        return balance + assetValue;
    }, [balance, portfolio, assets]);

    const startTrading = () => {
        setGameState("TRADING");
        setMood("happy");
        setMessage("The market is open! Use your mathematical intuition to spot trends and build your wealth. 📈");
        hapticSuccess();
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto min-h-[700px] bg-zinc-950 rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(63,63,70,0.15)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(39,39,42,0.1)_0%,transparent_50%)]" />
            </div>

            {/* Top Bar: Finance HUD */}
            <div className="relative z-20 p-8 flex justify-between items-center bg-zinc-900/50 backdrop-blur-3xl border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/5">
                        <TrendingUp className="text-emerald-400 w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tighter text-white">MARKET MAKER</h2>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-[0.2em]">Live Simulation Link Active</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-zinc-800/50 border border-white/5 px-8 py-3 rounded-2xl flex flex-col items-end">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Available Capital</span>
                        <span className="text-2xl font-black italic tabular-nums text-white">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-8 py-3 rounded-2xl flex flex-col items-end">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Total Net Worth</span>
                        <span className="text-2xl font-black italic tabular-nums text-emerald-400">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>

            {/* Main Trading Floor */}
            <div className="relative z-10 flex-1 p-8 grid grid-cols-12 gap-8">
                {/* Left: Asset List */}
                <div className="col-span-8 space-y-4">
                    {assets.map((asset, idx) => (
                        <motion.div
                            key={asset.symbol}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-6 hover:bg-zinc-900/60 transition-colors group"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                                <Activity className="text-zinc-400 w-8 h-8" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-xl font-black text-white">{asset.name}</h3>
                                    <span className="text-xs font-bold text-zinc-500">{asset.symbol}</span>
                                </div>
                                {/* Mini Sparkline */}
                                <div className="h-10 mt-2 flex items-end gap-0.5">
                                    {asset.history.map((p, i) => {
                                        const max = Math.max(...asset.history);
                                        const min = Math.min(...asset.history);
                                        const height = ((p - min) / (max - min + 1)) * 100;
                                        return (
                                            <div
                                                key={i}
                                                className={`w-2 rounded-t-sm transition-all duration-300 ${p >= asset.history[i - 1] ? 'bg-emerald-500' : 'bg-rose-500'} opacity-20`}
                                                style={{ height: `${Math.max(10, height)}%` }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="text-right px-6">
                                <div className="flex items-center justify-end gap-2">
                                    {asset.price >= (asset.history[asset.history.length - 2] || 0) ?
                                        <ArrowUpRight className="text-emerald-400 w-4 h-4" /> :
                                        <ArrowDownRight className="text-rose-400 w-4 h-4" />
                                    }
                                    <span className={`text-2xl font-black italic tabular-nums ${asset.price >= (asset.history[asset.history.length - 2] || 0) ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        ${asset.price.toFixed(2)}
                                    </span>
                                </div>
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Spot Price</span>
                            </div>

                            <div className="flex gap-2">
                                <PhysicalButton
                                    onClick={() => buyAsset(asset.symbol)}
                                    className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 h-14 rounded-2xl font-black italic"
                                >
                                    BUY
                                </PhysicalButton>
                                <PhysicalButton
                                    onClick={() => sellAsset(asset.symbol)}
                                    className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-6 h-14 rounded-2xl font-black italic"
                                >
                                    SELL
                                </PhysicalButton>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Portfolio & Info */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="text-sky-400 w-5 h-5" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Your Portfolio</h3>
                        </div>
                        <div className="space-y-4">
                            {Object.entries(portfolio).map(([symbol, qty]) => (
                                <div key={symbol} className="flex justify-between items-center p-4 bg-zinc-800/30 rounded-2xl border border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-black text-white italic">{symbol}</span>
                                        <span className="text-[10px] font-bold text-zinc-500">QUANTITY</span>
                                    </div>
                                    <span className="text-2xl font-black italic tracking-tighter text-sky-400">{qty}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <Activity className="text-white w-5 h-5" />
                            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Market Insight</h3>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed italic">
                            Buy low, sell high. Watch the sparklines to identify momentum patterns. Diversification is key to long-term stability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trading Overlay */}
            {gameState === "IDLE" && (
                <motion.div
                    {...JUICY_VARIANTS.slideUp}
                    className="absolute inset-0 z-40 bg-zinc-950/90 backdrop-blur-3xl flex flex-col items-center justify-center p-12 text-center"
                >
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-[2.5rem] flex items-center justify-center border border-emerald-500/30 mb-8 overflow-hidden">
                        <motion.div
                            animate={{ y: [0, -40, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <BarChart3 className="w-12 h-12 text-emerald-400" />
                        </motion.div>
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-4 uppercase">MARKET OPEN</h3>
                    <p className="text-zinc-500 text-sm max-w-sm mb-12 italic leading-relaxed">
                        The Global Exchange is now accepting orders. Deploy your capital and master the fundamentals of supply and demand.
                    </p>
                    <PhysicalButton onClick={startTrading} className="bg-emerald-500 h-24 px-20 rounded-[3rem] text-2xl">
                        START TRADING 💸
                    </PhysicalButton>
                </motion.div>
            )}

            {/* CRT Distortion Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-20 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] mix-blend-overlay" />
        </div>
    );
}
