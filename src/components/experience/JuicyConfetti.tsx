"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    vRotation: number;
    color: string;
    size: number;
    shape: "circle" | "square";
};

type JuicyConfettiProps = {
    active?: boolean;
    onComplete?: () => void;
    durationMs?: number;
    particleCount?: number;
};

const COLORS = ["#FF5F7F", "#22B46E", "#FFB341", "#C2185B", "#8B5CF6", "#0EA5E9"];

export default function JuicyConfetti({
    active = false,
    onComplete,
    durationMs = 3000,
    particleCount = 80,
}: JuicyConfettiProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const particles = useRef<Particle[]>([]);
    const animationFrame = useRef<number>(0);
    const startTime = useRef<number>(0);

    useEffect(() => {
        if (active) {
            setShouldRender(true);
            startTime.current = Date.now();

            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * devicePixelRatio;
            canvas.height = rect.height * devicePixelRatio;

            // Initialize particles
            particles.current = Array.from({ length: particleCount }).map(() => ({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 30,
                vy: (Math.random() - 0.7) * 30,
                rotation: Math.random() * 360,
                vRotation: (Math.random() - 0.5) * 10,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: Math.random() * 10 + 5,
                shape: Math.random() > 0.5 ? "circle" : "square",
            }));

            const animate = () => {
                const elapsed = Date.now() - startTime.current;
                if (elapsed > durationMs) {
                    setShouldRender(false);
                    onComplete?.();
                    return;
                }

                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                particles.current.forEach((p) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.8; // gravity
                    p.vx *= 0.98; // friction
                    p.rotation += p.vRotation;

                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);

                    if (p.shape === "circle") {
                        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    } else {
                        ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
                    }

                    ctx.fill();
                    ctx.restore();
                });

                animationFrame.current = requestAnimationFrame(animate);
            };

            animationFrame.current = requestAnimationFrame(animate);
        } else {
            setShouldRender(false);
        }

        return () => {
            cancelAnimationFrame(animationFrame.current);
        };
    }, [active, durationMs, onComplete, particleCount]);

    if (!shouldRender) return null;

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
        />
    );
}
