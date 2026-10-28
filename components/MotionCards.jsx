"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "@/lib/data";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

const featuredCards = PROJECTS_DATA.filter((project) => project.featured && project.image).slice(0, 4);
const totalHours = PROJECTS_DATA.reduce((sum, project) => sum + (project.hours || 0), 0);
const MAX_TILT = 6;

export default function MotionCards() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const cleanups = [];
        const tweens = [];
        const tiltTweens = [];
        const scrollTriggers = [];

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

            // 3D tilt on hover — applied to the inner image so it never fights the
            // card's own InertiaPlugin fling (which owns the outer card transform).
            if (window.matchMedia("(pointer: fine)").matches) {
                sectionRef.current
                    .querySelectorAll(".motion-card__card")
                    .forEach((card) => {
                        const image = card.querySelector(".motion-card__card-image");
                        if (!image) return;

                        // Self-perspective avoids touching the parent layout.
                        gsap.set(image, { transformPerspective: 800 });

                        const rotateXTo = gsap.quickTo(image, "rotationX", { duration: 0.6, ease: "power3.out" });
                        const rotateYTo = gsap.quickTo(image, "rotationY", { duration: 0.6, ease: "power3.out" });
                        tiltTweens.push(rotateXTo.tween, rotateYTo.tween);

                        let rect = null;

                        const applyTilt = (e) => {
                            if (!rect) rect = card.getBoundingClientRect();
                            const relX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
                            const relY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
                            rotateYTo(relX * MAX_TILT);
                            rotateXTo(-relY * MAX_TILT);
                        };

                        const onEnter = (e) => {
                            rect = card.getBoundingClientRect();
                            applyTilt(e);
                        };

                        const onLeave = () => {
                            rect = null;
                            rotateXTo(0);
                            rotateYTo(0);
                        };

                        attach(card, "pointerenter", onEnter);
                        attach(card, "pointermove", applyTilt);
                        attach(card, "pointerleave", onLeave);
                    });
            }

            // Count-up stats — the numbers animate from 0 once the stat line scrolls
            // into view. Under prefers-reduced-motion the whole effect is skipped by
            // the guard above, so the rendered final value stays put (no animation).
            const formatCount = (value) => Math.round(value).toLocaleString("en-US");
            const subtitle = sectionRef.current.querySelector(".motion-card__subtitle");

            if (subtitle) {
                const statValues = Array.from(subtitle.querySelectorAll(".motion-card__stat-value"));
                const statTargets = statValues.map((el) => Number(el.dataset.countTo));

                statValues.forEach((el) => {
                    el.textContent = formatCount(0);
                });

                scrollTriggers.push(ScrollTrigger.create({
                    trigger: subtitle,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        statValues.forEach((el, index) => {
                            const counter = { value: 0 };
                            tweens.push(gsap.to(counter, {
                                value: statTargets[index],
                                duration: 1.6,
                                ease: "power3.out",
                                onUpdate: () => {
                                    el.textContent = formatCount(counter.value);
                                },
                                onComplete: () => {
                                    el.textContent = formatCount(statTargets[index]);
                                },
                            }));
                        });
                    },
                }));
            }

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
            tiltTweens.forEach((t) => t.kill());
            scrollTriggers.forEach((st) => st.kill());
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
                    <span className="motion-card__sr-only">{totalHours.toLocaleString("en-US")}</span>
                    <span className="motion-card__stat-value" data-count-to={totalHours} aria-hidden="true">{totalHours.toLocaleString("en-US")}</span>
                    + client hours •{" "}
                    <span className="motion-card__sr-only">{PROJECTS_DATA.length}</span>
                    <span className="motion-card__stat-value" data-count-to={PROJECTS_DATA.length} aria-hidden="true">{PROJECTS_DATA.length}</span>{" "}
                    selected projects
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


                {/* 4 Photo Cards - pulled from the same project data as /projects */}
                <div className="motion-card__cards">
                    {featuredCards.map((project, index) => (
                        <a
                            key={project.id}
                            className={`motion-card__card motion-card__card--${index + 1}`}
                            href={project.live || `https://github.com/www-e/${project.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.name} — ${project.category}`}
                        >
                            <div className="motion-card__card-image">
                                <img
                                    src={project.image}
                                    loading="lazy"
                                    width={1000}
                                    height={1000}
                                    alt={`${project.name} — ${project.category} project cover`}
                                    className="cover-image"
                                />
                            </div>
                        </a>
                    ))}
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
