"use client";

import { motion } from "framer-motion";
import { useId } from "react";

type TabItem<T extends string> = {
    id: T;
    label: string;
    count?: number;
};

type JuicyTabBarProps<T extends string> = {
    value: T;
    tabs: Array<TabItem<T>>;
    onChange: (next: T) => void;
    ariaLabel: string;
    className?: string;
};

/**
 * A ultra-smooth, "Juicy" tab bar with layout animation transition.
 */
export default function JuicyTabBar<T extends string>({
    value,
    tabs,
    onChange,
    ariaLabel,
    className = "",
}: JuicyTabBarProps<T>) {
    const layoutId = useId();

    return (
        <nav
            aria-label={ariaLabel}
            className={`relative flex items-center gap-1 overflow-x-auto p-2 rounded-3xl bg-white/50 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200 dark:border-stone-800 ${className}`}
        >
            {tabs.map((tab) => {
                const selected = tab.id === value;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={`
              relative z-10 flex h-10 items-center gap-2 px-5 py-2 text-sm font-bold transition-colors
              ${selected ? "text-white" : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"}
            `}
                    >
                        {selected && (
                            <motion.div
                                layoutId={layoutId}
                                className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}

                        <span>{tab.label}</span>
                        {typeof tab.count === "number" && (
                            <span className={`
                rounded-full px-2 py-0.5 text-[10px] font-black
                ${selected ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-stone-800 text-stone-500"}
              `}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>
    );
}
