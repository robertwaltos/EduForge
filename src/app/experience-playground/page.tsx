"use client";

import AchievementToast from "@/components/experience/AchievementToast";
import JuicyLevelCard from "@/components/experience/JuicyLevelCard";
import JuicyTabBar from "@/components/experience/JuicyTabBar";
import PhysicalButton from "@/components/experience/PhysicalButton";
import MascotHost from "@/components/experience/MascotHost";
import JuicyConfetti from "@/components/experience/JuicyConfetti";
import JuicyStreak from "@/components/experience/JuicyStreak";
import MascotFriend from "@/components/experience/KoydoMascotFriends";
import { useState } from "react";
import { Sparkles, Trophy, Rocket, Heart, Zap, Music, Palette, Leaf, Flame, Bell, Star } from "lucide-react";

type FriendId = "pixel" | "spark" | "echo" | "luna" | "terra";

export default function ExperiencePlayground() {
    const [activeTab, setActiveTab] = useState<"visuals" | "feedback" | "mascot">("visuals");
    const [showConfetti, setShowConfetti] = useState(false);
    const [streakCount, setStreakCount] = useState(0);
    const [selectedFriend, setSelectedFriend] = useState<FriendId>("pixel");
    const [toast, setToast] = useState<{ show: boolean; title: string; description: string; type: "achievement" | "level-up" | "streak" } | null>(null);

    const triggerConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const triggerToast = (type: "achievement" | "level-up" | "streak") => {
        const titles = {
            achievement: "Collector Status!",
            "level-up": "Mastery Level 13",
            streak: "Unstoppable!"
        };
        const descriptions = {
            achievement: "You've earned the 'Alpha Catcher' badge!",
            "level-up": "You've unlocked the Galactic Map!",
            streak: "A perfect 10-answer run. Incredible!"
        };
        setToast({
            show: true,
            title: titles[type],
            description: descriptions[type],
            type
        });
    };

    return (
        <MascotHost initialMood="happy" friendId={selectedFriend}>
            <div className="space-y-12 py-10 min-h-screen pb-32">
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600">
                        2026 Experience Playground
                    </h1>
                    <p className="text-stone-500 text-xl font-medium max-w-2xl mx-auto">
                        A universe of delight, materiality, and emotional intelligence.
                    </p>
                </header>

                <JuicyTabBar
                    ariaLabel="Playground sections"
                    value={activeTab}
                    tabs={[
                        { id: "visuals", label: "Visual Mastery" },
                        { id: "feedback", label: "Juicy Feedback" },
                        { id: "mascot", label: "Galaxy of Friends" },
                    ]}
                    onChange={setActiveTab}
                    className="max-w-md mx-auto"
                />

                {activeTab === "visuals" && (
                    <div className="grid gap-8 max-w-4xl mx-auto px-4">
                        <JuicyLevelCard level={12} xp={850} maxXp={1000} userName="Koydo Star" friendId={selectedFriend} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2.5rem] bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-100 dark:border-indigo-900 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Rocket size={80} />
                                </div>
                                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-4">Glassmorphism UI</h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                    Depth, transparency, and background blurs create a premium, high-focus environment that feels clean yet playful.
                                </p>
                            </div>
                            <div className="p-8 rounded-[2.5rem] bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-100 dark:border-amber-900 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Zap size={80} />
                                </div>
                                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 mb-4">Materiality</h3>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                    Every interaction has physics-based weight, squash, and stretch, bridging the gap between digital and physical toys.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "feedback" && (
                    <div className="max-w-4xl mx-auto px-4 space-y-12">
                        <div className="flex flex-wrap justify-center gap-6 py-4">
                            <PhysicalButton onClick={triggerConfetti} variant="primary">
                                <Trophy className="h-6 w-6" />
                                Celebrate Achievement
                            </PhysicalButton>

                            <PhysicalButton onClick={() => triggerToast("achievement")} variant="primary">
                                <Bell className="h-6 w-6" />
                                Achievement Popup
                            </PhysicalButton>

                            <PhysicalButton onClick={() => triggerToast("level-up")} variant="primary" className="from-purple-500 to-indigo-600">
                                <Star className="h-6 w-6" />
                                Level Up Popup
                            </PhysicalButton>

                            <PhysicalButton onClick={() => setStreakCount(s => s + 1)} variant="success">
                                <Zap className="h-6 w-6" />
                                Correct Answer (+ Streak)
                            </PhysicalButton>

                            <PhysicalButton onClick={() => setStreakCount(0)} variant="danger">
                                <Flame className="h-6 w-6" />
                                Reset Streak
                            </PhysicalButton>
                        </div>

                        <div className="flex flex-col items-center gap-6 p-12 rounded-[3.5rem] bg-stone-50 dark:bg-stone-900/50 border-2 border-stone-100 dark:border-stone-800">
                            <h3 className="text-2xl font-black text-stone-800 dark:text-stone-100 italic">Combo System</h3>
                            <JuicyStreak count={streakCount} />
                            <p className="text-stone-500 font-medium">Get multiple correct answers to ignite the streak!</p>
                        </div>

                        <JuicyConfetti active={showConfetti} durationMs={3000} />
                    </div>
                )}

                {activeTab === "mascot" && (
                    <div className="max-w-5xl mx-auto px-4 space-y-12 text-center">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {(["pixel", "spark", "echo", "luna", "terra"] as const).map((fid) => (
                                <button
                                    key={fid}
                                    onClick={() => setSelectedFriend(fid)}
                                    className={`p-6 rounded-[2.5rem] border-2 transition-all space-y-4 hover:scale-105 ${selectedFriend === fid
                                        ? "bg-white dark:bg-stone-800 border-indigo-500 shadow-xl scale-110"
                                        : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 grayscale hover:grayscale-0 opacity-60"
                                        }`}
                                >
                                    <MascotFriend id={fid} size={80} />
                                    <p className="font-black capitalize">{fid}</p>
                                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                                        {fid === "pixel" && "General"}
                                        {fid === "spark" && "Math"}
                                        {fid === "echo" && "Phonics"}
                                        {fid === "luna" && "Creativity"}
                                        {fid === "terra" && "Science"}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-12 rounded-[3.5rem] bg-white dark:bg-stone-900 shadow-2xl border-2 border-stone-50 dark:border-stone-800 mt-8">
                            <h3 className="text-3xl font-black mb-6">World Integration</h3>
                            <p className="max-w-2xl mx-auto text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
                                In 2026, the mascot isn't just a static SVG. It's a **context-aware companion**.
                                Taking a math lesson? **Spark** flies in. Working on art? **Luna** appears to guide your creativity.
                            </p>
                        </div>
                    </div>
                )}

                {toast && (
                    <AchievementToast
                        show={toast.show}
                        title={toast.title}
                        description={toast.description}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </MascotHost>
    );
}
