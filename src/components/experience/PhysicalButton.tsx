"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { hapticSuccess } from "@/lib/platform/haptics";

interface PhysicalButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "success" | "danger";
    className?: string;
    disabled?: boolean;
}

/**
 * A "Juicy" physical button that mimics a toy / arcade button.
 * Uses physics-based recoil and squash/stretch.
 */
export default function PhysicalButton({
    children,
    onClick,
    variant = "primary",
    className = "",
    disabled = false,
}: PhysicalButtonProps) {

    const variants = {
        primary: "bg-sky-500 shadow-[0_8px_0_rgb(12,74,110)] active:shadow-[0_2px_0_rgb(12,74,110)] border-sky-400",
        secondary: "bg-indigo-500 shadow-[0_8px_0_rgb(49,46,129)] active:shadow-[0_2px_0_rgb(49,46,129)] border-indigo-400",
        success: "bg-emerald-500 shadow-[0_8px_0_rgb(6,78,59)] active:shadow-[0_2px_0_rgb(6,78,59)] border-emerald-400",
        danger: "bg-rose-500 shadow-[0_8px_0_rgb(159,18,57)] active:shadow-[0_2px_0_rgb(159,18,57)] border-rose-400",
    };

    const handleClick = () => {
        if (disabled) return;
        void hapticSuccess();
        onClick?.();
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95, y: 6 }}
            onClick={handleClick}
            disabled={disabled}
            className={`
        relative px-8 py-4 rounded-3xl border-2 text-xl font-black text-white
        transition-colors uppercase tracking-wider select-none
        ${variants[variant]}
        ${disabled ? "opacity-50 grayscale cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
        >
            <div className="flex items-center justify-center gap-2">
                {children}
            </div>

            {/* Glossy Reflection overlay */}
            <div className="absolute top-1 left-2 right-2 h-[40%] bg-white/20 rounded-t-2xl pointer-events-none" />
        </motion.button>
    );
}
