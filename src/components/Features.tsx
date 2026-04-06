"use client";

import { Clock, PhoneCall, TrendingUp, ShieldCheck } from "lucide-react";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: <Clock className="h-8 w-8" />,
        title: "Atención 24/7 Sin Descanso",
        description: "Samantha no duerme. Responde a tus clientes a cualquier hora del día o de la noche de forma inmediata.",
        color: "from-blue-500 to-blue-600",
        shadow: "shadow-blue-500/30",
        border: "group-hover:border-blue-500/50"
    },
    {
        icon: <PhoneCall className="h-8 w-8" />,
        title: "Automatización de Llamadas",
        description: "Agenda y responde miles de llamadas telefónicas simultáneas con voz humana natural.",
        color: "from-cyan-400 to-blue-500",
        shadow: "shadow-cyan-400/30",
        border: "group-hover:border-cyan-400/50"
    },
    {
        icon: <TrendingUp className="h-8 w-8" />,
        title: "Aumento de Ventas en un +300%",
        description: "Clasifica prospectos al instante para que tu equipo se concentre solo en cerrar ventas reales.",
        color: "from-blue-600 to-indigo-600",
        shadow: "shadow-indigo-500/30",
        border: "group-hover:border-indigo-500/50"
    },
    {
        icon: <ShieldCheck className="h-8 w-8" />,
        title: "Cumplimiento y Seguridad",
        description: "Conversaciones encriptadas y respuestas limitadas estrictamente a los datos de tu empresa.",
        color: "from-cyan-500 to-teal-400",
        shadow: "shadow-teal-400/30",
        border: "group-hover:border-teal-400/50"
    }
];

export function Features() {
    const containerRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const spotlightRefs = useRef<(HTMLDivElement | null)[]>([]);
    const robotRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Robot Entrance & Float
        gsap.fromTo(".robot-anim",
            { x: -100, opacity: 0, scale: 0.8, rotation: -10 },
            {
                x: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "restart none restart none"
                }
            }
        );

        gsap.to(".robot-anim", {
            y: -15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Heroic Entrance for cards
        gsap.to(".feature-card", {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 85%",
                toggleActions: "restart none restart none"
            }
        });

        // Setup interaction for each card
        const cleanupListeners: (() => void)[] = [];

        cardRefs.current.forEach((card, idx) => {
            if (!card) return;
            const spotlight = spotlightRefs.current[idx];
            const icon = card.querySelector(".feature-icon");
            const title = card.querySelector(".feature-title");
            const desc = card.querySelector(".feature-desc");
            const particleContainer = card.querySelector(".particle-container");

            let hoverTimer: NodeJS.Timeout;

            // The Particle Generator
            const spawnParticle = () => {
                if (!particleContainer || !card) return;
                const particle = document.createElement("div");
                const colors = ["bg-blue-400", "bg-cyan-300", "bg-indigo-400", "bg-white", "bg-sky-300"];
                const color = colors[Math.floor(Math.random() * colors.length)];

                particle.className = `absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full blur-[1px] pointer-events-none mix-blend-screen opacity-0 ${color}`;

                const width = card.clientWidth;
                const height = card.clientHeight;

                // Spawn primarily around the lower-middle section
                const startX = width * 0.15 + Math.random() * (width * 0.7);
                const startY = height - 10;

                gsap.set(particle, { x: startX, y: startY, scale: Math.random() * 1.5 + 0.5 });
                particleContainer.appendChild(particle);

                gsap.to(particle, {
                    y: startY - 100 - Math.random() * 150,
                    x: `+=${(Math.random() - 0.5) * 100}`,
                    rotation: Math.random() * 360,
                    keyframes: [
                        { opacity: 0, duration: 0 },
                        { opacity: 0.9, duration: 0.3 },
                        { opacity: 0, duration: 1.5 }
                    ],
                    scale: 0,
                    duration: 1.5 + Math.random() * 1.0,
                    ease: "power1.out",
                    onComplete: () => particle.remove()
                });
            };

            const onMouseMove = (e: MouseEvent) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left - width / 2) / (width / 2);
                const y = (e.clientY - top - height / 2) / (height / 2);

                // Main card tilt
                gsap.to(card, {
                    rotationY: x * 15,
                    rotationX: -y * 15,
                    transformPerspective: 1200,
                    duration: 0.5,
                    ease: "power2.out"
                });

                // Dramatic Internal Parallax
                if (icon) gsap.to(icon, { x: x * 30, y: y * 30, z: 80, duration: 0.5, ease: "power2.out" });
                if (title) gsap.to(title, { x: x * 20, y: y * 20, z: 50, duration: 0.5, ease: "power2.out" });
                if (desc) gsap.to(desc, { x: x * 10, y: y * 10, z: 25, duration: 0.5, ease: "power2.out" });

                // Follower Spotlight
                if (spotlight) {
                    const spotX = e.clientX - left;
                    const spotY = e.clientY - top;
                    gsap.to(spotlight, {
                        opacity: 1,
                        background: `radial-gradient(500px circle at ${spotX}px ${spotY}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
                        duration: 0.2
                    });
                }
            };

            const onMouseEnter = () => {
                // Instantly spawn a burst of particles
                for (let i = 0; i < 8; i++) setTimeout(spawnParticle, i * 20);

                // Keep spawning while hovered
                hoverTimer = setInterval(spawnParticle, 120);

                // Animate elements to active states
                if (icon) gsap.to(icon, { scale: 1.2, rotation: -10, duration: 0.6, ease: "back.out(2)" });
                if (title) gsap.to(title, { color: "#3b82f6", duration: 0.4 });
            };

            const onMouseLeave = () => {
                clearInterval(hoverTimer);

                // Return to neutral
                gsap.to(card, { rotationY: 0, rotationX: 0, duration: 1, ease: "power3.out" });
                if (icon) gsap.to(icon, { x: 0, y: 0, z: 0, scale: 1, rotation: 0, duration: 1, ease: "power3.out" });
                if (title) gsap.to(title, { x: 0, y: 0, z: 0, color: "", duration: 1, ease: "power3.out" });
                if (desc) gsap.to(desc, { x: 0, y: 0, z: 0, duration: 1, ease: "power3.out" });

                if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.5 });

                // Fade out existing particles smoothly
                if (particleContainer && particleContainer.children.length > 0) {
                    gsap.to(particleContainer.children, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            if (particleContainer) particleContainer.innerHTML = '';
                        }
                    });
                }
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseenter", onMouseEnter);
            card.addEventListener("mouseleave", onMouseLeave);

            cleanupListeners.push(() => {
                clearInterval(hoverTimer);
                card.removeEventListener("mousemove", onMouseMove);
                card.removeEventListener("mouseenter", onMouseEnter);
                card.removeEventListener("mouseleave", onMouseLeave);
            });
        });

        return () => cleanupListeners.forEach(cleanup => cleanup());

    }, { scope: containerRef });

    return (
        <section id="features" ref={containerRef} className="py-24 md:py-32 bg-slate-50 dark:bg-zinc-950 overflow-hidden relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 md:mb-32 relative">
                    <span className="section-overline">Capacidades</span>
                    <h2 className="section-title">
                        Todo el poder de la <br /> <span className="section-title-italic section-title-gradient">Inteligencia Artificial</span>
                    </h2>
                    <p className="section-description">
                        Experimenta el poder de nuestra tecnología alojada en la nube. <br className="hidden md:block" />
                        Posiciona el cursor en las cartas para ver la magia.
                    </p>
                </div>

                {/* Layout Container */}
                <div className="relative mt-16 md:mt-24">

                    {/* The Grid of Cards */}
                    <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-48 xl:gap-x-64 lg:gap-y-8 relative z-10">
                        {/* Left Column (Cards 1 & 3) */}
                        <div className="flex flex-col gap-6 lg:gap-8">
                            {[features[0], features[2]].map((feature, idx) => (
                                <div
                                    key={idx}
                                    ref={el => { cardRefs.current[idx * 2] = el; }}
                                    className={`feature-card group relative bg-white/70 dark:bg-zinc-900/50 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 ${feature.border} hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 overflow-hidden cursor-crosshair opacity-0`}
                                    style={{ transformStyle: "preserve-3d", transform: "translateY(100px) scale(0.95) rotateY(15deg)" }}
                                >
                                    <div ref={el => { spotlightRefs.current[idx * 2] = el; }} className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500 z-[1]" />
                                    <div className="relative z-[10] flex flex-col items-start h-full pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                                        <div className={`feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-8 shadow-lg ${feature.shadow}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="feature-title text-xl font-black text-gray-900 dark:text-white mb-3 drop-shadow-sm leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="feature-desc text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="particle-container absolute inset-0 pointer-events-none z-[5] overflow-hidden rounded-[2.5rem]" />
                                </div>
                            ))}
                        </div>

                        {/* Right Column (Cards 2 & 4) */}
                        <div className="flex flex-col gap-6 lg:gap-8 lg:mt-24">
                            {[features[1], features[3]].map((feature, idx) => (
                                <div
                                    key={idx + 2}
                                    ref={el => { cardRefs.current[idx * 2 + 1] = el; }}
                                    className={`feature-card group relative bg-white/70 dark:bg-zinc-900/50 backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-gray-200 dark:border-zinc-800 ${feature.border} hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10 overflow-hidden cursor-crosshair opacity-0`}
                                    style={{ transformStyle: "preserve-3d", transform: "translateY(100px) scale(0.95) rotateY(15deg)" }}
                                >
                                    <div ref={el => { spotlightRefs.current[idx * 2 + 1] = el; }} className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500 z-[1]" />
                                    <div className="relative z-[10] flex flex-col items-start h-full pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
                                        <div className={`feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-8 shadow-lg ${feature.shadow}`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="feature-title text-xl font-black text-gray-900 dark:text-white mb-3 drop-shadow-sm leading-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="feature-desc text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="particle-container absolute inset-0 pointer-events-none z-[5] overflow-hidden rounded-[2.5rem]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Robot Assistant - Absolute Center Overlay */}
                    <div className="hidden lg:block absolute left-[6%] xl:left-[55%] top-[35%] xl:top-[11%] -translate-x-1/2 -translate-y-[45%] z-20 pointer-events-none">
                        <div className="robot-anim relative w-[550px] h-[550px] xl:w-[650px] xl:h-[650px] opacity-0 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]">
                            <Image
                                src="/M1.png"
                                alt="Samantha AI Assistant"
                                fill
                                className="object-contain lg:scale-110 origin-center"
                                priority
                            />
                        </div>
                    </div>

                    {/* Mobile Robot (Visible only on small screens) */}
                    <div className="lg:hidden w-full flex justify-center items-center mb-8 mt-12 relative z-20 pointer-events-none">
                        <div className="robot-anim relative w-72 h-72 opacity-0 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]">
                            <Image
                                src="/M1.png"
                                alt="Samantha AI Assistant"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
