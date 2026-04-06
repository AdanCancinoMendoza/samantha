"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HERO_IMAGES = ["/S1.png", "/S2.png", "/S3.png", "/S4.png"];

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const imageBoxRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null);
    const transitionRef = useRef<HTMLDivElement>(null);
    const magneticRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        // HOLOGRAM ENTRANCE
        const titleText = titleRef.current;
        const glitchLayers = titleRef.current?.querySelectorAll(".glitch-layer");

        tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
            .fromTo(titleRef.current,
                { opacity: 0, filter: "blur(20px)", scale: 1.05 },
                { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.5, ease: "expo.out" },
                "-=0.4"
            )
            // Entrance Glitch - cleaner spectral separation
            .to(glitchLayers || [],
                {
                    opacity: 0.4,
                    x: (i) => (i % 2 === 0 ? -10 : 10),
                    duration: 0.1,
                    stagger: 0.05,
                    repeat: 3,
                    yoyo: true,
                },
                "-=1.1"
            )
            .set(glitchLayers || [], { opacity: 0, x: 0 })
            .fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
            .fromTo(buttonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.7")
            .fromTo(imageBoxRef.current,
                { scale: 0.9, opacity: 0, rotationY: 25 },
                {
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1.8,
                    ease: "power3.out"
                }, "-=1.2");

        // Digital Pulse Function
        const startDigitalPulse = () => {
            gsap.to(".digital-pulse-beam", {
                x: "100%",
                duration: 2.5,
                repeat: -1,
                repeatDelay: 5,
                ease: "power2.inOut"
            });
        };
        startDigitalPulse();

        // Random Glitch Loop for Title - Refined Spectral Shifts
        const triggerGlitch = () => {
            if (!glitchLayers || glitchLayers.length === 0) return;

            const tlGlitch = gsap.timeline();
            tlGlitch.to(glitchLayers, {
                opacity: 0.3,
                x: (i) => (Math.random() - 0.5) * (10 + i * 5),
                skewX: (i) => (Math.random() - 0.5) * 5,
                duration: 0.08,
                stagger: 0.03,
                yoyo: true,
                repeat: 2
            })
                .set(glitchLayers, { opacity: 0, x: 0, skewX: 0 });

            setTimeout(triggerGlitch, 4000 + Math.random() * 6000);
        };

        setTimeout(triggerGlitch, 5000);

        // Constant floating animation
        gsap.to(floatRef.current, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Scan-line glitch effect animation
        gsap.to(".scan-line", {
            top: "100%",
            duration: 3,
            repeat: -1,
            ease: "none"
        });


        // TILT LOGIC - Localized to imageBoxRef hover
        const handleTilt = (e: MouseEvent) => {
            if (!imageBoxRef.current || !tiltRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = imageBoxRef.current.getBoundingClientRect();
            const x = (clientX - (left + width / 2)) / (width / 2);
            const y = (clientY - (top + height / 2)) / (height / 2);

            gsap.to(tiltRef.current, {
                rotationY: x * 15,
                rotationX: -y * 10,
                duration: 0.6,
                ease: "power2.out"
            });
        };

        const handleTiltReset = () => {
            gsap.to(tiltRef.current, {
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: "power3.out"
            });
        };

        const imBox = imageBoxRef.current;
        if (imBox) {
            imBox.addEventListener("mousemove", handleTilt);
            imBox.addEventListener("mouseleave", handleTiltReset);
        }

        // Magnetic Button Effect
        const handleMagneticMove = (e: MouseEvent, el: HTMLButtonElement) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
        };

        const handleMagneticLeave = (el: HTMLButtonElement) => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        };

        const buttons = magneticRefs.current;
        const moveHandlers = buttons.map(btn => {
            if (!btn) return null;
            const h = (e: MouseEvent) => handleMagneticMove(e, btn);
            btn.addEventListener("mousemove", h);
            return h;
        });

        const leaveHandlers = buttons.map(btn => {
            if (!btn) return null;
            const h = () => handleMagneticLeave(btn);
            btn.addEventListener("mouseleave", h);
            return h;
        });

        return () => {
            if (imBox) {
                imBox.removeEventListener("mousemove", handleTilt);
                imBox.removeEventListener("mouseleave", handleTiltReset);
            }
            buttons.forEach((btn, i) => {
                if (!btn) return;
                if (moveHandlers[i]) btn.removeEventListener("mousemove", moveHandlers[i] as EventListener);
                if (leaveHandlers[i]) btn.removeEventListener("mouseleave", leaveHandlers[i] as EventListener);
            });
        };
    }, { scope: containerRef });

    // Carousel Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Technological Transition
    useGSAP(() => {
        if (transitionRef.current) {
            const tl = gsap.timeline();
            tl.to(transitionRef.current, { scale: 1.1, opacity: 0, filter: "blur(10px)", duration: 0.4, ease: "power2.in" })
                .fromTo(transitionRef.current,
                    { opacity: 0, scale: 0.9, filter: "blur(20px)" },
                    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
                );
        }
    }, [currentImageIndex]);

    const titleText = "Escala tu Atención al Cliente con Samantha IA";

    return (
        <section ref={containerRef} className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-slate-50 dark:bg-zinc-950">
            {/* Animated Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[140px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-xs mb-8 border border-blue-200 dark:border-blue-800/50 uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            IA V2.0 Disponible Ahora
                        </div>

                        <div className="relative mb-8 text-center lg:text-left w-full group/hologram">
                            {/* Main Hologram Title */}
                            <h1 ref={titleRef} className="relative text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white perspective-1000 animate-hologram inline-block hologram-glow">
                                <span className="relative z-10">{titleText}</span>

                                {/* Glitch Layers - SPECTRAL BLUE THEME */}
                                <span className="glitch-layer absolute inset-0 opacity-0 pointer-events-none text-blue-400/60" aria-hidden="true">{titleText}</span>
                                <span className="glitch-layer absolute inset-0 opacity-0 pointer-events-none text-cyan-300/60" style={{ clipPath: 'inset(40% 0 0 0)' }} aria-hidden="true">{titleText}</span>
                                <span className="glitch-layer absolute inset-0 opacity-0 pointer-events-none text-blue-600/60" style={{ clipPath: 'inset(0 0 70% 0)' }} aria-hidden="true">{titleText}</span>

                                {/* Scanning Effect Beam */}
                                <div className="digital-pulse-beam" />
                            </h1>
                        </div>

                        <p ref={textRef} className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed font-light">
                            Un agente de voz y texto con inteligencia artificial disponible 24/7 para automatizar llamadas, calificar leads y potenciar tus ventas sin contratar más personal.
                        </p>

                        <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                            <button
                                ref={el => { magneticRefs.current[0] = el; }}
                                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-shadow duration-300 shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-blue-500/40 text-base group overflow-hidden relative"
                            >
                                <span className="relative z-10">Probar Demo en Vivo</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button
                                ref={el => { magneticRefs.current[1] = el; }}
                                className="px-8 py-4 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors border border-gray-200 dark:border-gray-800 text-base"
                            >
                                Ver Planes
                            </button>
                        </div>
                    </div>

                    {/* Image Content */}
                    <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
                        <div
                            ref={imageBoxRef}
                            className="relative w-full max-w-3xl aspect-square flex items-center justify-center pointer-events-auto perspective-1000 group/hero-image"
                        >
                            {/* Pulsing Aura */}
                            <div className="absolute w-[90%] h-[90%] bg-blue-500/20 dark:bg-blue-600/30 rounded-full blur-[100px] animate-pulse" />
                            <div className="absolute w-[70%] h-[70%] bg-cyan-400/20 dark:bg-cyan-500/20 rounded-full blur-[80px]" />

                            {/* Glitch Scanline Overlay */}
                            <div className="absolute inset-10 overflow-hidden pointer-events-none z-20 flex items-start">
                                <div className="scan-line w-full h-[2px] bg-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.5)] absolute top-0" />
                            </div>

                            {/* New Tilt Layer */}
                            <div ref={tiltRef} className="relative w-full h-full flex items-center justify-center group-hover/hero-image:brightness-110 transition-all duration-300" style={{ transformStyle: "preserve-3d" }}>
                                {/* Float Layer */}
                                <div ref={floatRef} className="relative w-full h-full flex items-center justify-center">
                                    {/* Transition Layer */}
                                    <div ref={transitionRef} className="relative w-full h-full drop-shadow-[0_45px_70px_rgba(59,130,246,0.4)] scale-110">
                                        <Image
                                            src={HERO_IMAGES[currentImageIndex]}
                                            alt="Samantha AI Assistant"
                                            fill
                                            className="object-contain"
                                            priority
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
