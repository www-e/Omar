"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export default function MotionCards() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const cleanups = [];
        const tweens = [];

        const attach = (el, type, handler, options) => {
            el.addEventListener(type, handler, options);
            cleanups.push(() => el.removeEventListener(type, handler, options));
        };

        const ctx = gsap.context(() => {
            // Shared inertia-fling behaviour for cards and floating labels
            const addInertia = (el, velocityScale, rotationScale) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(el, "rotation");
                const startX = gsap.getProperty(el, "x");
                const startY = gsap.getProperty(el, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    tweens.push(gsap.to(el, {
                        inertia: {
                            x: { velocity: speedX * velocityScale, end: startX },
                            y: { velocity: speedY * velocityScale, end: startY },
                            rotation: { velocity: speedX * rotationScale, end: startRotation },
                        },
                    }));
                };

                attach(el, "mousemove", onMove);
                attach(el, "mouseenter", onEnter);
                attach(el, "mouseleave", onLeave);
            };

            sectionRef.current
                .querySelectorAll(".motion-card__card")
                .forEach((card) => addInertia(card, 20, 1.5));

            sectionRef.current
                .querySelectorAll(".motion-card__floating-label")
                .forEach((label) => addInertia(label, 25, 2));

            // Entry Animations: Sticker Pop & Underline Draw
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            const topStickerImg = sectionRef.current.querySelector(".motion-card__sticker--top img");
            if (topStickerImg) {
                gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
                tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
            }

            const underlinePath = sectionRef.current.querySelector(".motion-card__underline-path");
            if (underlinePath) {
                const pathLen = underlinePath.getTotalLength();
                gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);
            }
        }, sectionRef);

        return () => {
            tweens.forEach((t) => t.kill());
            ctx.revert();
            cleanups.forEach((detach) => detach());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="motion-card-section" id="motion-card-section">
            {/* ─── Part 1: Bold Heading Text with SVG Sticker Placeholders ─── */}
            <div className="motion-card__heading">
                <h2 className="motion-card__title">
                    featured projects.
                    <br />
                    built for impact.
                </h2>
                <p className="motion-card__subtitle">
                    2040+ hours • 15+ production apps
                    {/* SVG sticker placeholder — top-right area */}
                    <span className="motion-card__sticker motion-card__sticker--top" aria-hidden="true">
                        <img
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt=""
                            className="motion-card__sticker-img"
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg" aria-hidden="true" focusable="false">
                    <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: Cards with Colorful Bars & Blue Blob ─── */}
            <div className="motion-card__cards-area">
                {/* Blue SVG blob behind everything */}
                <div className="motion-card__blob">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="motion-card__blob-svg"
                    />
                </div>


                {/* 4 Photo Cards - Featured Projects */}
                <div className="motion-card__cards">
                    <a className="motion-card__card motion-card__card--1" href="https://agentic.navaia.sa/dashboard" target="_blank" rel="noopener noreferrer">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/projects/navaia-agentic.jpg"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Navaia Agentic AI Platform"
                                className="cover-image"
                            />
                        </div>
                    </a>

                    <a className="motion-card__card motion-card__card--2" href="https://www.graphictablet.store/" target="_blank" rel="noopener noreferrer">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/projects/graphictablet-store.jpg"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Graphic Tablet Store E-commerce"
                                className="cover-image"
                            />
                        </div>
                    </a>

                    <a className="motion-card__card motion-card__card--3" href="https://sportologyacademy.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/projects/sportology-academy.jpg"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Sportology Academy Education Platform"
                                className="cover-image"
                            />
                        </div>
                    </a>

                    <a className="motion-card__card motion-card__card--4" href="https://qaportal1.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <div className="motion-card__card-image">
                            <img
                                src="/assets/projects/tawaqlna.jpg"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Tawaqlna QA Portal"
                                className="cover-image"
                            />
                        </div>
                    </a>
                </div>

                {/* Floating labels — positioned freely over the cards area */}
                <div className="motion-card__floating-labels">
                    <div className="motion-card__floating-label motion-card__floating-label--pink">
                        <p className="motion-card__floating-text">AI-Powered Platform</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--orange">
                        <p className="motion-card__floating-text">E-commerce Solutions</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--red">
                        <p className="motion-card__floating-text">Education Platforms</p>
                    </div>
                </div>
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="motion-card__footer-text">
                <p className="motion-card__description">
                    Full-stack developer specializing in AI-powered platforms, e-commerce solutions,
                    and education technology. Building production applications with modern tech stacks
                    including Next.js, React, Python, and cloud infrastructure. From market intelligence
                    dashboards to specialized e-commerce stores, delivering robust solutions that scale.
                </p>
            </div>
        </section>
    );
}
