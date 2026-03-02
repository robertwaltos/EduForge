"use client";

import { ReactNode, useState, useEffect, createContext, useContext } from "react";
import MascotFriend from "./KoydoMascotFriends";
import { MascotMood } from "./KoydoMascot";
import { motion, AnimatePresence } from "framer-motion";
import { JUICY_SPRINGS } from "@/lib/experience/interaction-primitives";

interface MascotContextType {
    mood: MascotMood;
    setMood: (mood: MascotMood) => void;
    message: string | null;
    setMessage: (msg: string | null) => void;
    friendId: string;
    interactionCount: number;
    friendshipLevel: number;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export function useMascot() {
    const context = useContext(MascotContext);
    if (!context) throw new Error("useMascot must be used within a MascotHost");
    return context;
}

interface MascotHostProps {
    children: ReactNode;
    initialMood?: MascotMood;
    friendId?: "pixel" | "spark" | "echo" | "luna" | "terra";
    persistenceKey?: string;
}

export default function MascotHost({
    children,
    initialMood = "idle",
    friendId = "pixel",
    persistenceKey = "koydo_mascot_memory"
}: MascotHostProps) {
    const [mood, setMood] = useState<MascotMood>(initialMood);
    const [message, setMessage] = useState<string | null>(null);
    const [interactionCount, setInteractionCount] = useState(0);
    const [friendshipLevel, setFriendshipLevel] = useState(1);

    // Persistence: Load mascot "memory"
    useEffect(() => {
        const saved = localStorage.getItem(`${persistenceKey}_${friendId}`);
        if (saved) {
            const data = JSON.parse(saved);
            setInteractionCount(data.interactions || 0);
            setFriendshipLevel(Math.floor((data.interactions || 0) / 10) + 1);
        }
    }, [friendId, persistenceKey]);

    // Save mascot "memory"
    useEffect(() => {
        localStorage.setItem(`${persistenceKey}_${friendId}`, JSON.stringify({
            interactions: interactionCount,
            level: friendshipLevel,
            lastSeen: new Date().toISOString()
        }));
    }, [interactionCount, friendshipLevel, friendId, persistenceKey]);

    // Random idle behavior
    useEffect(() => {
        const idleInterval = setInterval(() => {
            if (mood === "idle") {
                const moods: MascotMood[] = ["idle", "thinking", "happy"];
                const randomMood = moods[Math.floor(Math.random() * moods.length)];
                setMood(randomMood);
            }
        }, 12000);

        return () => clearInterval(idleInterval);
    }, [mood]);

    const handleMascotClick = () => {
        setMood("happy");
        setInteractionCount(prev => prev + 1);

        const greetings = [
            "Ready for another mission? 🚀",
            "You're becoming a legend! ✨",
            "Need a hint? Just ask! 🧠",
            "We've hung out " + (interactionCount + 1) + " times already! 😍"
        ];

        const msg = greetings[Math.floor(Math.random() * greetings.length)];
        setMessage(msg);
        setTimeout(() => setMessage(null), 4000);
    };

    return (
        <MascotContext.Provider value={{ mood, setMood, message, setMessage, friendId, interactionCount, friendshipLevel }}>
            <div className="relative isolate min-h-screen w-full overflow-x-hidden pt-16">
                {/* The Mascot Layer */}
                <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
                    <motion.div
                        className="absolute bottom-10 right-10 pointer-events-auto cursor-pointer"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={JUICY_SPRINGS.bouncy}
                        onClick={handleMascotClick}
                    >
                        <MascotFriend id={friendId} mood={mood} size={120} message={message || undefined} />
                    </motion.div>
                </div>

                {/* Main Content Area */}
                <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                    {children}
                </main>

                {/* Background Ambience (Subtle life) */}
                <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/50 dark:from-indigo-950/20 dark:via-stone-950 dark:to-sky-950/20" />

                {/* Decorative Floating Blobs */}
                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                    <motion.div
                        animate={{
                            x: [0, 80, 0],
                            y: [0, -40, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -60, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -right-20 top-1/2 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl"
                    />
                </div>
            </div>
        </MascotContext.Provider>
    );
}
