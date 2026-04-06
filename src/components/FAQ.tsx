"use client";

import { ChevronDown, MessageCircleQuestion, Database, ShieldCheck, Zap, Repeat, Headset, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        id: 1,
        icon: <Zap className="w-5 h-5" />,
        question: "¿Cuánto tiempo toma implementar Samantha?",
        answer: "La implementación promedio toma entre 2 y 5 días hábiles. Integramos Samantha con tu CRM o plataforma telefónica sin procesos técnicos lentos.",
        thinkingImg: "/Samap1.png"
    },
    {
        id: 2,
        icon: <Database className="w-5 h-5" />,
        question: "¿Cómo se entrena a la IA con mis datos?",
        answer: "Simplemente subes tus manuales o PDFs. Samantha procesa la información en segundos y responde basándose estrictamente en tus políticas.",
        thinkingImg: "/Samap2.png"
    },
    {
        id: 3,
        icon: <ShieldCheck className="w-5 h-5" />,
        question: "¿Es segura la información de mis clientes?",
        answer: "Absolutamente. Samantha cumple con estándares SOC-2 y GDPR. Todas las conversaciones están encriptadas y los datos son privados.",
        thinkingImg: "/Samap3.png"
    },
    {
        id: 4,
        icon: <Headset className="w-5 h-5" />,
        question: "¿Qué pasa si la IA no sabe la respuesta?",
        answer: "Samantha está configurada para no alucinar. Si no tiene la respuesta, transfiere la conversación a un humano inmediatamente.",
        thinkingImg: "/Samap1.png"
    },
    {
        id: 5,
        icon: <Repeat className="w-5 h-5" />,
        question: "¿Puede agendar citas en mi calendario?",
        answer: "Sí, Samantha se integra directamente con Google Calendar y Calendly para agendar reuniones y enviar confirmaciones automáticas.",
        thinkingImg: "/Samap2.png"
    },
    {
        id: 6,
        icon: <MessageCircleQuestion className="w-5 h-5" />,
        question: "¿En qué idiomas puede atender?",
        answer: "Soporta más de 30 idiomas de forma nativa, incluyendo español latino y regional, con un tono natural y empático.",
        thinkingImg: "/Samap3.png"
    }
];

export function FAQ() {
    const [openId, setOpenId] = useState<number | null>(null);
    const [robotImg, setRobotImg] = useState("/Samap1.png");
    const [isAnswering, setIsAnswering] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const robotRef = useRef<HTMLDivElement>(null);

    // Ultra-Fast Sequence: Instant Feeling
    useEffect(() => {
        if (!openId || !robotRef.current) return;

        const targetFaq = faqs.find(f => f.id === openId);
        if (!targetFaq) return;

        setIsAnswering(false);

        const tl = gsap.timeline();

        // Sub-second Interaction Sequence (~0.7s total)
        tl.to(robotRef.current, {
            opacity: 0,
            scale: 0.98,
            duration: 0.1,
            onComplete: () => setRobotImg(targetFaq.thinkingImg)
        })
            .to(robotRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.15,
                ease: "power2.out"
            })
            .to(robotRef.current, {
                opacity: 0,
                scale: 1.02,
                delay: 0.2, // Ultra-fast thinking
                duration: 0.1,
                onComplete: () => setRobotImg("/Samap4.png")
            })
            .to(robotRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.2)",
                onComplete: () => {
                    setIsAnswering(true);
                }
            });

    }, [openId]);

    useGSAP(() => {
        gsap.to(".faq-list-item", {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".faq-list-container",
                start: "top 90%"
            }
        });

        gsap.to(".robot-display", {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".robot-display",
                start: "top 90%"
            }
        });

        // Life-like float
        gsap.to(robotRef.current, {
            y: "-=10",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    const activeFaq = faqs.find(f => f.id === openId);

    return (
        <section id="faq" ref={containerRef} className="py-24 md:py-32 bg-white dark:bg-zinc-950 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <span className="section-overline">IA Cognitiva</span>
                    <h2 className="section-title text-gray-900 dark:text-white">
                        Samantha <span className="section-title-italic section-title-gradient">Responde</span>
                    </h2>
                    <p className="section-description">
                        Haz clic en una pregunta para obtener información detallada sobre el funcionamiento de Samantha.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
                    {/* Left: Questions List */}
                    <div className="faq-list-container w-full lg:w-5/12 space-y-2">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className={`faq-list-item group transition-all duration-300 rounded-2xl border ${openId === faq.id
                                    ? 'bg-blue-600 dark:bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1'
                                    : 'bg-white dark:bg-zinc-900/40 border-gray-100 dark:border-zinc-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800'
                                    } opacity-0 -translate-x-8`}
                                onClick={() => setOpenId(faq.id)}
                            >
                                <div className="p-4 md:p-5 cursor-pointer flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openId === faq.id ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-zinc-800 text-blue-500'
                                        }`}>
                                        {faq.icon}
                                    </div>
                                    <h3 className="text-sm md:text-base font-black flex-1 tracking-tight">
                                        {faq.question}
                                    </h3>
                                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${openId === faq.id ? 'bg-white' : 'bg-gray-200 dark:bg-zinc-700'}`} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Dynamic Robot & Answer Console */}
                    <div className="robot-display w-full lg:w-7/12 flex flex-col items-center opacity-0 translate-x-8">
                        <div className="relative w-full aspect-video max-w-[500px] flex items-center justify-center bg-gray-50/50 dark:bg-zinc-900/30 rounded-[3rem] border border-gray-100 dark:border-zinc-800/50 overflow-hidden">
                            <div className={`absolute inset-0 bg-blue-500/5 blur-[60px] rounded-full transition-opacity duration-700 ${openId ? 'opacity-100' : 'opacity-0'}`} />

                            <div ref={robotRef} className="relative z-10 w-full h-full max-w-[300px]">
                                <Image
                                    src={robotImg}
                                    alt="Samantha Character"
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.25)]"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px" // Added sizes prop
                                />
                            </div>

                        </div>

                        <div className="w-full mt-8 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-5 transition duration-1000 group-hover:opacity-10" />

                            <div className={`relative transition-all duration-500 p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-2xl border border-gray-100 dark:border-zinc-800 ${isAnswering ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 blur-sm'
                                }`}>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                <p className={`text-2xl md:text-3xl font-black leading-tight tracking-tight transition-all duration-500 ${isAnswering ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-zinc-800'
                                    }`}>
                                    {isAnswering ? activeFaq?.answer : "¿En qué puedo ayudarte hoy?"}
                                </p>

                                {isAnswering && (
                                    <div className="mt-10 pt-8 border-t border-gray-50 dark:border-zinc-800/50 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gray-100 overflow-hidden relative shadow-sm">
                                                        <Image src={`/Samap${i}.png`} alt="state" fill className="object-cover grayscale" sizes="32px" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">Cognición Completa</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f066_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f066_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        </section>
    );
}
