"use client";

import { useRef } from "react";
import { X, Check, UserPlus, BotMessageSquare } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    { name: "Costo Promedio", human: "$2,500 - $5,000 USD/mes", ai: "Desde $49 USD/mes" },
    { name: "Disponibilidad", human: "Turnos de 8 horas", ai: "24/7 sin descanso" },
    { name: "Tiempo de Respuesta", human: "2 a 15 minutos", ai: "Al instante (< 1s)" },
    { name: "Capacidad Simultánea", human: "1 cliente a la vez", ai: "Miles de clientes a la vez" },
    { name: "Idiomas", human: "1 o 2", ai: "Más de 15 idiomas" },
    { name: "Curva de Aprendizaje", human: "Semanas de capacitación", ai: "Operativo en minutos" },
    { name: "Consistencia", human: "Variable según el humor", ai: "100% de precisión siempre" },
    { name: "Escalabilidad", human: "Lenta y costosa", ai: "Inmediata a demanda" },
];

export function WhySamantha() {
    const containerRef = useRef<HTMLElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Timeline for the entire section entrance
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // 1. Header fade up
        tl.fromTo(".ws-anim-header",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            // 2. Table container fade up
            .fromTo(".ws-anim-table",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            )
            // 3. Staggered reveal of the rows inside the table
            .fromTo(".ws-anim-row",
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
                "-=0.2"
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-slate-50 dark:bg-zinc-950 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="ws-anim-header opacity-0 text-center mb-16">
                    <span className="section-overline">Eficiencia</span>
                    <h2 className="section-title">
                        El impacto de usar <span className="section-title-italic section-title-gradient">IA vs Humanos</span>
                    </h2>
                    <p className="section-description max-w-2xl mx-auto">
                        Un análisis directo de por qué la automatización conversacional es el siguiente paso lógico para multiplicar tus ventas.
                    </p>
                </div>

                <div ref={tableRef} className="ws-anim-table opacity-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-xl drop-shadow-sm">

                    {/* Header Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 border-b border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
                        {/* Hidden on mobile, takes 1 column on desktop */}
                        <div className="hidden md:flex p-6 md:p-8 items-end">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Característica</span>
                        </div>

                        <div className="p-4 md:p-8 flex flex-col items-center justify-end gap-2 md:gap-3 md:border-l border-gray-200 dark:border-zinc-800">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                                <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-gray-500 dark:text-gray-400" />
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white text-sm md:text-base text-center leading-tight">Agente Humano</span>
                        </div>

                        <div className="p-4 md:p-8 flex flex-col items-center justify-end gap-2 md:gap-3 bg-blue-50/50 dark:bg-blue-900/10 border-l border-blue-100 dark:border-blue-900/30">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                                <BotMessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="font-black text-blue-600 dark:text-blue-400 text-sm md:text-base text-center leading-tight">Samantha AI</span>
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800/80">
                        {features.map((item, idx) => (
                            <div key={idx} className="ws-anim-row opacity-0 grid grid-cols-2 md:grid-cols-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors relative">

                                {/* Label spans full width on mobile, 1 col on desktop */}
                                <div className="col-span-2 md:col-span-1 p-4 md:p-6 pb-0 md:pb-6 flex items-center justify-center md:justify-start bg-gray-50/30 md:bg-transparent dark:bg-zinc-800/10 md:dark:bg-transparent">
                                    <span className="font-semibold text-gray-900 dark:text-gray-200 text-sm md:text-base text-center md:text-left">{item.name}</span>
                                </div>

                                {/* Human value */}
                                <div className="col-span-1 p-4 pt-3 md:p-6 flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-3 md:border-l border-gray-100 dark:border-zinc-800/80">
                                    <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-500 shrink-0" />
                                    <span className="text-[11px] md:text-sm text-gray-600 dark:text-gray-400 leading-tight text-center md:text-left">{item.human}</span>
                                </div>

                                {/* AI value */}
                                <div className="col-span-1 p-4 pt-3 md:p-6 flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-3 bg-blue-50/30 dark:bg-blue-900/5 border-l border-blue-100/50 dark:border-blue-900/20">
                                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500 shrink-0" />
                                    <span className="text-[11px] md:text-sm font-bold text-gray-900 dark:text-white leading-tight text-center md:text-left">{item.ai}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
