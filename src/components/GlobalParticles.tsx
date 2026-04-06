"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

interface Particle {
    id: number;
    top: number; // Use numbers for easier calculation
    left: number;
    opacity: number;
    size: number;
}

export function GlobalParticles() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const newParticles = [...Array(50)].map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            opacity: 0.1 + Math.random() * 0.4,
            size: 1 + Math.random() * 3
        }));
        setParticles(newParticles);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useGSAP(() => {
        const particleEls = containerRef.current?.querySelectorAll(".particle");
        if (!particleEls?.length) return;

        const particleData = Array.from(particleEls).map((el) => {
            const rect = el.getBoundingClientRect();
            return {
                el: el as HTMLDivElement,
                baseX: rect.left + rect.width / 2,
                baseY: rect.top + rect.height / 2,
                x: 0,
                y: 0,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            };
        });

        const tick = () => {
            particleData.forEach((p) => {
                const dx = mouseRef.current.x - (p.baseX + p.x);
                const dy = mouseRef.current.y - (p.baseY + p.y);
                const dist = Math.sqrt(dx * dx + dy * dy);

                let forceX = 0;
                let forceY = 0;

                // Repulsion force
                if (dist < 250) {
                    const angle = Math.atan2(dy, dx);
                    const force = (250 - dist) / 250;
                    forceX = -Math.cos(angle) * force * 15;
                    forceY = -Math.sin(angle) * force * 15;
                }

                // Spring back to base
                p.vx += forceX + (0 - p.x) * 0.02;
                p.vy += forceY + (0 - p.y) * 0.02;

                p.vx *= 0.95; // Friction
                p.vy *= 0.95;

                p.x += p.vx;
                p.y += p.vy;

                // Update DOM
                gsap.set(p.el, { x: p.x, y: p.y });
            });
        };

        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
    }, [particles]);

    if (particles.length === 0) return <div className="fixed inset-0 pointer-events-none z-0" />;

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle absolute bg-blue-500/20 dark:bg-blue-400/30 rounded-full blur-[0.5px]"
                    style={{
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        opacity: p.opacity,
                        width: `${p.size}px`,
                        height: `${p.size}px`
                    }}
                />
            ))}
        </div>
    );
}
