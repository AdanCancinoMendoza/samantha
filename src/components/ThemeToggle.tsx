"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-9 h-9" />; // Placeholder to avoid layout shift

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 animate-in spin-in duration-300" />
            ) : (
                <Moon className="h-5 w-5 animate-in spin-in duration-300" />
            )}
        </button>
    );
}

