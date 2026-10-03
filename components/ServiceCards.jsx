'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '@/lib/data';

export default function ServiceCards() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.registerPlugin(ScrollTrigger);

        let cleanupCards = null;
        const ctx = gsap.context(() => {
            // Animate underline SVG paths on scroll
            gsap.to('.title-underline-svg path', {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.3,
                scrollTrigger: {
                    trigger: '.service-cards-wrapper',
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });

            cleanupCards = initCardAnimations();
        });

        return () => {
            if (cleanupCards) cleanupCards();
            ctx.revert();
        };
    }, []);

    return (
        <>
            {/* ─── "Expertise Across:" Heading ─── */}
            <div className="title-container">
                <h2 className="main-title">expertise <span className="italic-text">across:</span></h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" viewBox="0 0 159 17" fill="none" className="title-underline-svg" aria-hidden="true" focusable="false">
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>

            {/* ─── Skills Cards ─── */}
            <div className="cards-wrapper" id="cards-wrapper">
                {SKILLS_DATA.map((skill) => (
                    <div key={skill.color} className={`card card-${skill.color}`}>
                        <h3 className="card-title">{skill.category}</h3>
                        <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true">
                            <use href="#card-divider" />
                        </svg>
                        <ul className="card-list">
                            {skill.skills.map((skillItem) => (
                                <li key={skillItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" className="services-card__bullet-svg" aria-hidden="true">
                                        <use href="#bullet-icon" />
                                    </svg>
                                    {skillItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

function initCardAnimations() {
    const cards = gsap.utils.toArray('.card');
    if (!cards.length) return () => {};

    const detach = [];
    const on = (target, type, handler, options) => {
        target.addEventListener(type, handler, options);
        detach.push(() => target.removeEventListener(type, handler, options));
    };

    const cleanup = () => {
        detach.forEach((fn) => fn());
        gsap.killTweensOf(cards);
    };

    const originalData = [
        { rotation: 4 },
        { rotation: -5 },
        { rotation: 5 },
        { rotation: -8 },
        { rotation: 5 }
    ];

    const isDeck = window.matchMedia('(max-width: 768px)').matches;
    // 769–1200px: responsive.css stacks the cards in normal flow —
    // hover fan-out and the swipe deck both assume the scattered layout, so skip.
    const isStackedFlow = window.matchMedia('(min-width: 769px) and (max-width: 1200px)').matches;
    if (isStackedFlow) return cleanup;

    let leaveTimeout = null;

    if (!isDeck) {
        cards.forEach((card, index) => {
            on(card, 'mouseenter', () => {
                if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
                const hoverGap = 120;
                const clusterGap = 150;
                const cardWidth = 320;
                const hoveredLeft = cards[index].offsetLeft;
                const leftCards = [];
                const rightCards = [];

                cards.forEach((otherCard, otherIndex) => {
                    if (otherIndex < index) leftCards.push({ card: otherCard, index: otherIndex });
                    else if (otherIndex > index) rightCards.push({ card: otherCard, index: otherIndex });
                });

                const currentTop = cards[index].offsetTop;
                const targetCommonTop = 50;
                const moveY = targetCommonTop - currentTop;

                gsap.to(cards[index], { x: 0, y: moveY, rotation: 0, scale: 1.08, duration: 0.9, ease: 'elastic.out(1, 0.5)', overwrite: true });

                if (rightCards.length) {
                    const clusterStart = hoveredLeft + cardWidth + hoverGap;
                    rightCards.forEach((item, i) => {
                        const targetAbsLeft = clusterStart + (i * clusterGap);
                        const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 10);
                        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                        const targetY = targetX * Math.tan(angleRad);
                        gsap.to(item.card, { x: targetX, y: targetY, rotation: originalData[item.index].rotation, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true });
                    });
                }

                if (leftCards.length) {
                    leftCards.reverse();
                    const clusterStart = hoveredLeft - hoverGap - cardWidth;
                    leftCards.forEach((item, i) => {
                        const targetAbsLeft = clusterStart - (i * clusterGap);
                        const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -10);
                        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                        const targetY = targetX * Math.tan(angleRad);
                        gsap.to(item.card, { x: targetX, y: targetY, rotation: originalData[item.index].rotation, scale: 1, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true });
                    });
                }
            });

            on(card, 'mouseleave', () => {
                leaveTimeout = setTimeout(() => {
                    cards.forEach((c, i) => {
                        gsap.to(c, { x: 0, y: 0, scale: 1, rotation: originalData[i].rotation, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true, zIndex: i + 1 });
                    });
                }, 80);
            });
        });

        return () => {
            if (leaveTimeout) clearTimeout(leaveTimeout);
            cleanup();
        };
    }

    // ─── Mobile: Stacked card deck with swipe interaction ───
    const mobileRotations = [-3, 2, -2, 3, -3];
    const cardHeights = [40, 50, 60, 70, 80];

    // Set initial stacked positions
    cards.forEach((card, i) => {
        gsap.set(card, {
            position: 'absolute',
            left: '50%',
            top: `${cardHeights[i]}px`,
            xPercent: -50,
            rotation: mobileRotations[i],
            zIndex: i + 1,
            transformOrigin: 'center center'
        });
    });

    // Track which card is currently on top
    let currentTopCardIndex = 0;

    // Add touch/swipe interaction for each card
    cards.forEach((card, i) => {
        let startX = 0;
        let isDragging = false;
        let startLeft = 0;

        const onStart = (e) => {
            // Only allow interaction for the top card
            if (i !== currentTopCardIndex) return;

            isDragging = true;
            startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            startLeft = gsap.getProperty(card, 'x');
            gsap.set(card, { cursor: 'grabbing' });
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const deltaX = currentX - startX;
            const rotation = mobileRotations[i] + (deltaX * 0.15);
            gsap.set(card, { x: startLeft + deltaX, rotation });
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            gsap.set(card, { cursor: 'grab' });

            const deltaX = gsap.getProperty(card, 'x');
            const threshold = 100;
            const isLastCard = currentTopCardIndex >= cards.length - 1;

            if (Math.abs(deltaX) > threshold && !isLastCard) {
                // Swipe far enough - animate card away to reveal the next one
                gsap.to(card, {
                    x: deltaX > 0 ? '150%' : '-150%',
                    rotation: deltaX > 0 ? 30 : -30,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        currentTopCardIndex += 1;

                        // Animate the next card to pop forward
                        const nextCard = cards[currentTopCardIndex];
                        gsap.fromTo(nextCard,
                            { scale: 0.95, opacity: 0.8 },
                            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
                        );
                    }
                });
            } else {
                // Not far enough (or last card) - spring back to center
                gsap.to(card, {
                    x: 0,
                    rotation: mobileRotations[i],
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
            startX = 0;
        };

        // Touch events
        on(card, 'touchstart', onStart, { passive: true });
        on(card, 'touchmove', onMove, { passive: true });
        on(card, 'touchend', onEnd);

        // Mouse drag support
        const onMouseUpGlobal = () => {
            document.removeEventListener('mousemove', onMove);
            if (isDragging) onEnd();
        };

        const onMouseDown = (e) => {
            if (i === currentTopCardIndex) {
                onStart(e);
                document.addEventListener('mousemove', onMove);
                document.addEventListener('mouseup', onMouseUpGlobal, { once: true });
            }
        };

        on(card, 'mousedown', onMouseDown);
    });

    // Scroll-based reveal animation
    const cardsWrapper = document.querySelector('.cards-wrapper');
    if (cardsWrapper) {
        ScrollTrigger.create({
            trigger: cardsWrapper,
            start: 'top 80%',
            end: 'bottom 60%',
            onEnter: () => {
                cards.forEach((card, i) => {
                    gsap.fromTo(card,
                        { y: 100, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            delay: i * 0.1,
                            ease: 'power3.out'
                        }
                    );
                });
            },
            onLeaveBack: () => {
                gsap.to(cards, { y: 100, opacity: 0, duration: 0.4 });
            }
        });
    }

    return cleanup;
}
