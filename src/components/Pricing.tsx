"use client";

import { CheckCircle2, Zap, Sparkles, Building2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
    const containerRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const spotlightRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pricingRobotRef = useRef<HTMLDivElement>(null);
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: "Básico",
            icon: <Zap className="w-8 h-8" />,
            monthlyPrice: 49,
            yearlyPrice: 39,
            desc: "Perfecto para pequeños negocios que buscan automatizar la atención básica.",
            features: ["Agenda hasta 500 citas/mes", "Soporte para 1 idioma", "Integración web básica", "Atención 24/7"],
            isPopular: false,
            color: "from-blue-500 to-cyan-400"
        },
        {
            name: "Pro",
            icon: <Sparkles className="w-8 h-8" />,
            monthlyPrice: 199,
            yearlyPrice: 159,
            desc: "Ideal para agencias inmobiliarias, clínicas y e-commerce en crecimiento.",
            features: ["Llamadas ilimitadas", "Soporte multilingüe (15+)", "Integración CRM Avanzada", "Análisis de Sentimiento"],
            isPopular: true,
            color: "from-blue-600 to-indigo-600"
        },
        {
            name: "Enterprise",
            icon: <Building2 className="w-8 h-8" />,
            monthlyPrice: "Custom",
            yearlyPrice: "Custom",
            desc: "Para grandes volúmenes y requerimientos estrictos de seguridad o cumplimiento.",
            features: ["Despliegue On-Premise opcional", "Soporte dedicado 24/7", "Entrenamiento de modelos a medida", "SLA del 99.99%"],
            isPopular: false,
            color: "from-indigo-600 to-purple-600"
        }
    ];

    useGSAP(() => {
        // Pricing Robot Entrance & Float
        if (pricingRobotRef.current) {
            gsap.fromTo(pricingRobotRef.current,
                { y: 60, opacity: 0, scale: 0.85 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 1.4,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "restart none restart none"
                    }
                }
            );
            gsap.to(pricingRobotRef.current, {
                y: -2,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.4
            });
        }

        // Entrance Animation
        gsap.to(".pricing-card", {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".pricing-grid",
                start: "top 85%",
                toggleActions: "restart none restart none"
            }
        });

        // Interactive Effects
        cardRefs.current.forEach((card, idx) => {
            if (!card) return;
            const spotlight = spotlightRefs.current[idx];
            const content = card.querySelector(".card-content");
            const price = card.querySelector(".price-anim");
            const button = card.querySelector(".button-anim");

            const onMouseMove = (e: MouseEvent) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left - width / 2) / (width / 2);
                const y = (e.clientY - top - height / 2) / (height / 2);

                gsap.to(card, {
                    rotationY: x * 8,
                    rotationX: -y * 8,
                    transformPerspective: 1000,
                    duration: 0.5,
                    ease: "power2.out"
                });

                if (spotlight) {
                    const spotX = e.clientX - left;
                    const spotY = e.clientY - top;
                    gsap.to(spotlight, {
                        opacity: 1,
                        background: `radial-gradient(400px circle at ${spotX}px ${spotY}px, rgba(59, 130, 246, 0.1), transparent 80%)`,
                        duration: 0.3
                    });
                }

                if (price) gsap.to(price, { x: x * 15, y: y * 15, z: 40, duration: 0.5 });
                if (button) gsap.to(button, { x: x * 10, y: y * 10, z: 60, duration: 0.5 });
            };

            const onMouseLeave = () => {
                gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
                if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.5 });
                if (price) gsap.to(price, { x: 0, y: 0, z: 0, duration: 0.8 });
                if (button) gsap.to(button, { x: 0, y: 0, z: 0, duration: 0.8 });
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);
        });

    }, { scope: containerRef });

    return (
        <section id="pricing" ref={containerRef} className="py-24 md:py-32 bg-slate-50 dark:bg-zinc-950 overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-1/2 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-6 md:mb-10">
                    <span className="section-overline">Inversión</span>
                    <h2 className="section-title">
                        Planes <span className="section-title-italic section-title-gradient">Transparentes</span>
                    </h2>

                    {/* Plan Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm font-bold ${!isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Mensual</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="w-14 h-7 bg-gray-200 dark:bg-zinc-800 rounded-full relative p-1 transition-colors duration-300 hover:bg-blue-100 dark:hover:bg-zinc-700"
                        >
                            <div className={`w-5 h-5 bg-blue-600 rounded-full transition-all duration-500 ${isYearly ? 'translate-x-[28px]' : 'translate-x-0'}`} />
                        </button>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${isYearly ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Anual</span>
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                                Ahorra 20%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Robot + Cards stacked with natural flow */}
                <div className="flex flex-col items-center">
                    {/* Robot: sits in normal flow, negative margin pulls cards up to meet its base */}
                    <div ref={pricingRobotRef} className="relative z-20 pointer-events-none w-72 h-72 md:w-96 md:h-66 -mb-54 md:-mb-10 drop-shadow-[0_20px_60px_rgba(59,130,246,0.25)] opacity-0">
                        <Image
                            src="/M2.png"
                            alt="Samantha Pricing Robot"
                            fill
                            className="object-contain object-bottom"
                            priority
                        />
                    </div>

                    <div className="pricing-grid w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                ref={el => { cardRefs.current[idx] = el; }}
                                className={`pricing-card group relative bg-white/70 dark:bg-zinc-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-gray-200 dark:border-zinc-800 overflow-hidden opacity-0`}
                                style={{ transformStyle: "preserve-3d", transform: "translateY(80px) scale(0.96)" }}
                            >
                                {/* Spotlight */}
                                <div ref={el => { spotlightRefs.current[idx] = el; }} className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500" />

                                <div className="card-content flex flex-col h-full relative z-[10]" style={{ transformStyle: "preserve-3d" }}>
                                    {plan.isPopular && (
                                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-bl-2xl rounded-tr-xl text-[10px] font-black tracking-widest uppercase shadow-lg z-20">
                                            MÁS ELEGIDO
                                        </div>
                                    )}

                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} text-white flex items-center justify-center mb-10 shadow-lg`}>
                                        {plan.icon}
                                    </div>

                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 font-medium leading-relaxed">{plan.desc}</p>

                                    <div className="price-anim mb-10" style={{ transformStyle: "preserve-3d" }}>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                                                {typeof plan.monthlyPrice === 'number'
                                                    ? `$${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`
                                                    : plan.monthlyPrice}
                                            </span>
                                            {typeof plan.monthlyPrice === 'number' && (
                                                <span className="text-gray-500 dark:text-gray-400 font-bold">/mes</span>
                                            )}
                                        </div>
                                        {isYearly && typeof plan.monthlyPrice === 'number' && (
                                            <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-1 uppercase tracking-wider">Facturado anualmente</p>
                                        )}
                                    </div>

                                    <ul className="mb-12 flex-1 space-y-5">
                                        {plan.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                                <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm leading-tight">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`button-anim w-full py-5 rounded-[1.5rem] font-black text-lg transition-all duration-300 shadow-xl ${plan.isPopular
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                                        : 'bg-white dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-zinc-700 text-blue-600 dark:text-gray-200 border border-gray-100 dark:border-zinc-700'
                                        }`}>
                                        {plan.monthlyPrice === "Custom" ? 'Hablar con Ventas' : 'Comenzar Ahora'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
