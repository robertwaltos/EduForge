"use client";

import { useEffect, useState } from "react";

export type MascotMood = "idle" | "happy" | "thinking" | "sad" | "cheering" | "surprised";

type KoydoMascotProps = {
    mood?: MascotMood;
    className?: string;
    size?: number;
    message?: string;
};

/**
 * KoydoMascot: "Pixel"
 * An original, non-copyrighted guide mascot for the Koydo platform.
 * Design: A friendly, circular drone robot with expressive digital eyes.
 */
export default function KoydoMascot({
    mood = "idle",
    className = "",
    size = 120,
    message,
}: KoydoMascotProps) {
    const [floatOffset, setFloatOffset] = useState(0);

    // Gentle floating animation
    useEffect(() => {
        let frame: number;
        const animate = (time: number) => {
            setFloatOffset(Math.sin(time / 1000) * 5);
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    // Eye configurations based on mood
    const getEyePath = () => {
        switch (mood) {
            case "happy":
                return "M 35 45 Q 40 40 45 45 M 55 45 Q 60 40 65 45"; // Curved happy eyes
            case "thinking":
                return "M 35 45 L 45 45 M 55 42 L 65 42"; // One eye higher
            case "sad":
                return "M 35 48 Q 40 52 45 48 M 55 48 Q 60 52 65 48"; // Droopy eyes
            case "surprised":
                return "M 40 45 A 3 3 0 1 1 34 45 A 3 3 0 1 1 40 45 M 60 45 A 3 3 0 1 1 54 45 A 3 3 0 1 1 60 45"; // Wide circles
            case "cheering":
                return "M 35 42 L 45 48 L 35 54 M 65 42 L 55 48 L 65 54"; // > < eyes
            default:
                return "M 38 45 L 42 45 M 58 45 L 62 45"; // Neutral dashes
        }
    };

    return (
        <div className={`relative flex flex-col items-center gap-3 ${className}`} style={{ width: size }}>
            <div
                style={{ transform: `translateY(${floatOffset}px)` }}
                className="transition-transform duration-300 ease-out"
            >
                <svg
                    viewBox="0 0 100 100"
                    width={size}
                    height={size}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Main Body (Soft Rounded Drone) */}
                    <circle cx="50" cy="50" r="45" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="38" fill="var(--surface-muted)" />

                    {/* Decorative Side Pins (Rotors) */}
                    <rect x="5" y="45" width="6" height="10" rx="2" fill="var(--accent)" opacity="0.8" />
                    <rect x="89" y="45" width="6" height="10" rx="2" fill="var(--accent)" opacity="0.8" />

                    {/* Eye Display Panel */}
                    <rect x="30" y="35" width="40" height="30" rx="15" fill="var(--foreground)" fillOpacity="0.05" />

                    {/* Dynamic Eyes */}
                    <path
                        d={getEyePath()}
                        stroke="var(--accent)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-300"
                    />

                    {/* Antenna / Communication light */}
                    <line x1="50" y1="5" x2="50" y2="15" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" y="5" r="3" fill={mood === "cheering" ? "var(--success)" : "var(--accent)"}>
                        <animate
                            attributeName="opacity"
                            values="1;0.4;1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </svg>
            </div>

            {message && (
                <div className="ui-soft-card animate-in fade-in slide-in-from-bottom-2 absolute -top-16 left-1/2 min-w-[140px] -translate-x-1/2 border-sky-100 bg-white p-3 text-center shadow-lg">
                    <p className="text-sm font-semibold text-zinc-900">{message}</p>
                    <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-r border-b border-sky-100 bg-white" />
                </div>
            )}
        </div>
    );
}
