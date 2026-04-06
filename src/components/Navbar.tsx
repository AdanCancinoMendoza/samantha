"use client";

import { ThemeToggle } from "./ThemeToggle";
import { Bot, Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
    { label: "Características", id: "features" },
    { label: "¿Cómo Funciona?", id: "how-it-works" },
    { label: "Precios", id: "pricing" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const botIconRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        // Entrance animation
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
        });

        // Continuous pulse for the Bot icon
        if (botIconRef.current) {
            gsap.to(botIconRef.current, {
                scale: 1.2,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: "power1.inOut",
            });
        }
    }, { scope: navRef });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setIsOpen(false);

        const target = document.getElementById(id);
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: target,
                    offsetY: 80 // Offset for fixed header
                },
                ease: "power4.inOut"
            });
        }
    };

    return (
        <nav ref={navRef} className="fixed w-full z-50 top-0 left-0 flex items-center h-20 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                            <Bot ref={botIconRef} className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-gray-900 dark:text-white">
                            SAMANTHA<span className="text-blue-600">.</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navItems.map((item, i) => (
                            <a
                                key={i}
                                href={`#${item.id}`}
                                onClick={(e) => handleScroll(e, item.id)}
                                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] transition-colors relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}

                        <div className="flex items-center gap-6 border-l border-gray-200 dark:border-zinc-800/50 pl-8">
                            <ThemeToggle />
                            <button className="px-7 py-3 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-600/20 hover:scale-105 uppercase text-xs tracking-widest">
                                Probar Demo
                            </button>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 rounded-xl text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-gray-200 dark:border-zinc-800 p-8 absolute top-full left-0 w-full animate-in slide-in-from-top-10 fade-in duration-500 shadow-2xl">
                    <div className="flex flex-col space-y-6">
                        {navItems.map((item, i) => (
                            <a
                                key={i}
                                href={`#${item.id}`}
                                onClick={(e) => handleScroll(e, item.id)}
                                className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter hover:text-blue-600 transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <button className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-all text-center uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20">
                            Probar Demo
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}



