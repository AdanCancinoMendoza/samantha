"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });
        };

        const handleHover = () => {
            gsap.to(follower, {
                scale: 2.5,
                backgroundColor: "rgba(59, 130, 246, 0.2)", // blue-500 with opacity
                borderColor: "rgba(59, 130, 246, 0.5)",
                duration: 0.3,
            });
        };

        const handleUnhover = () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: "rgba(59, 130, 246, 0.5)",
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll('button, a, .interactive');
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleUnhover);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleUnhover);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-blue-600 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-blue-500/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
        </>
    );
}
