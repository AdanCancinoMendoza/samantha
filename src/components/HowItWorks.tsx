"use client";

import { Bot, MessageSquareText, Sparkles } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
    const containerRef = useRef<HTMLElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    const steps = [
        {
            num: "01",
            title: "Conecta y Configura",
            desc: "Integramos Samantha con tu CRM o plataforma telefónica. Rápido, seguro y sin escribir código.",
            icon: <Bot className="w-10 h-10 text-blue-600" />
        },
        {
            num: "02",
            title: "Entrena con tu Data",
            desc: "Sube tus documentos, PDFs, o sitios web para que Samantha aprenda sobre tus productos y políticas.",
            icon: <MessageSquareText className="w-10 h-10 text-blue-600" />
        },
        {
            num: "03",
            title: "Resultados Automáticos",
            desc: "Samantha empieza a responder, filtrar prospectos y agendar reuniones por ti, 24 horas al día.",
            icon: <Sparkles className="w-10 h-10 text-blue-600" />
        }
    ];

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "restart none restart none"
            }
        });

        tl.from(".how-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "expo.out"
        })
            .from(".how-line", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.5,
                ease: "power4.inOut"
            }, "-=0.5")
            .from(".how-step", {
                y: 60,
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                stagger: 0.3,
                ease: "back.out(2)"
            }, "-=1");

        // Background Text - Infinite Marquee + Parallax
        if (bgTextRef.current) {
            // Infinite loop - SLOWER (60s)
            gsap.to(bgTextRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 60,
                ease: "none",
            });

            // Parallax shift on scroll
            gsap.to(bgTextRef.current, {
                x: -300,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        // Particle Burst Effect on Hover
        stepRefs.current.forEach((step) => {
            if (!step) return;

            const spawnParticles = () => {
                const burstContainer = step.querySelector(".particle-burst");
                if (!burstContainer) return;

                // Create 15 particles
                for (let i = 0; i < 15; i++) {
                    const p = document.createElement("div");
                    p.className = "absolute w-1.5 h-1.5 bg-blue-500 rounded-full pointer-events-none z-20";
                    burstContainer.appendChild(p);

                    // Random direction
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 40 + Math.random() * 60;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;

                    gsap.fromTo(p,
                        { x: 0, y: 0, opacity: 1, scale: 1 },
                        {
                            x,
                            y,
                            opacity: 0,
                            scale: 0,
                            duration: 0.8 + Math.random() * 0.4,
                            ease: "power2.out",
                            onComplete: () => p.remove()
                        }
                    );
                }
            };

            step.addEventListener("mouseenter", spawnParticles);
        });

    }, { scope: containerRef });

    return (
        <section id="how-it-works" ref={containerRef} className="py-24 bg-white dark:bg-zinc-950 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-32">
                    <span className="section-overline">Proceso</span>
                    <h2 className="section-title">
                        Samantha en <span className="section-title-italic section-title-gradient">3 Pasos</span>
                    </h2>
                    <p className="section-description">
                        Un despliegue quirúrgico para transformar tu atención al cliente de inmediato.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
                    {/* Connecting line - visible only on desktop */}
                    <div className="how-line hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 z-0"></div>

                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            ref={el => { stepRefs.current[idx] = el; }}
                            className="how-step relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-32 h-32 bg-white dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-blue-500/5 group-hover:shadow-blue-500/20 group-hover:-translate-y-4 transition-all duration-500 mb-10 relative">
                                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 rounded-[2.5rem] transition-opacity duration-500" />

                                {/* Burst Container */}
                                <div className="particle-burst absolute inset-0 flex items-center justify-center pointer-events-none" />

                                {step.icon}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl shadow-blue-600/30">
                                    {step.num}
                                </div>
                            </div>

                            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-6 tracking-tight group-hover:text-blue-600 transition-colors duration-300">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm text-lg font-light">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decorative text - Marquee style */}
            <div
                ref={bgTextRef}
                className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black text-gray-500/5 dark:text-white/5 select-none pointer-events-none whitespace-nowrap z-0 flex items-center gap-24"
            >
                <span>SAMANTHA</span>
                <span>SAMANTHA</span>
                <span>SAMANTHA</span>
                <span>SAMANTHA</span>
            </div>
        </section>
    );
}


