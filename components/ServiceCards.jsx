'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '@/lib/data';

export default function ServiceCards() {
    useEffect(() => {
        // Reduced motion: the decorative scroll animations are skipped, but the
        // keyboard equivalents of the hover / swipe interactions have to stay
        // available (WCAG 2.1.1 and 2.5.7). Only the animation work is
        // conditional below - the interaction wiring always runs.
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Registering a plugin is not an animation, so it is safe to do even
        // when the motion itself is reduced.
        gsap.registerPlugin(ScrollTrigger);

        let cleanupCards = null;
        const ctx = gsap.context(() => {
            if (!reducedMotion) {
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
            }

            cleanupCards = initCardAnimations({ reducedMotion });
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
            <div className="cards-wrapper" id="cards-wrapper" role="group" aria-label="Expertise areas">
                {/* Keyboard users get the same deck controls the pointer has,
                    so the instruction has to be readable by a screen reader. */}
                <p className="sr-only" id="cards-instructions">
                    Use the left and right arrow keys to move between the expertise cards. Press Enter or Space to activate the focused card.
                </p>
                {SKILLS_DATA.map((skill, index) => (
                    <div
                        key={skill.color}
                        className={`card card-${skill.color}`}
                        tabIndex={0}
                        role="group"
                        aria-labelledby={`service-card-title-${index}`}
                        aria-describedby="cards-instructions"
                    >
                        <h3 className="card-title" id={`service-card-title-${index}`}>{skill.category}</h3>
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

function initCardAnimations({ reducedMotion = false } = {}) {
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

    // Moving the keyboard focus to a card must not scroll the page: the arrow
    // keys walk the cards while the deck stays where the user left it.
    const focusCard = (index) => {
        const target = cards[index];
        if (target) target.focus({ preventScroll: true });
    };

    if (!isDeck) {
        const expand = (index) => {
            if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
            // Reduced motion: the fan-out is a movement, so it is skipped. The
            // hover state keeps its static CSS shadow instead.
            if (reducedMotion) return;

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
        };

        const collapse = () => {
            if (reducedMotion) return;
            leaveTimeout = setTimeout(() => {
                cards.forEach((c, i) => {
                    gsap.to(c, { x: 0, y: 0, scale: 1, rotation: originalData[i].rotation, duration: 1.0, ease: 'elastic.out(1, 0.5)', overwrite: true, zIndex: i + 1 });
                });
            }, 80);
        };

        cards.forEach((card, index) => {
            on(card, 'mouseenter', () => expand(index));
            on(card, 'focus', () => {
                // Keyboard focus reveals the same fan-out the hover gives.
                if (reducedMotion) {
                    cards.forEach((c, i) => c.classList.toggle('card--focused', i === index));
                    return;
                }
                expand(index);
            });
            on(card, 'mouseleave', collapse);
            on(card, 'blur', () => {
                if (reducedMotion) {
                    cards.forEach((c) => c.classList.remove('card--focused'));
                    return;
                }
                collapse();
            });
            on(card, 'keydown', (e) => {
                const key = e.key;
                if (key === 'ArrowRight' || key === 'ArrowDown') {
                    e.preventDefault();
                    focusCard(Math.min(index + 1, cards.length - 1));
                } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
                    e.preventDefault();
                    focusCard(Math.max(index - 1, 0));
                } else if (key === 'Home') {
                    e.preventDefault();
                    focusCard(0);
                } else if (key === 'End') {
                    e.preventDefault();
                    focusCard(cards.length - 1);
                } else if (key === 'Enter' || key === ' ') {
                    // Space scrolls the page by default, so it has to be
                    // claimed here to avoid a double action.
                    e.preventDefault();
                    expand(index);
                }
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

    // Track which card is currently on top and which ones were swiped away.
    let currentTopCardIndex = 0;
    const dismissedCards = new Set();

    // The front card has to sit above every other card of the pile, the rest
    // keep a descending order so they fan out below it.
    const zIndexFor = (i) => (i === currentTopCardIndex ? cards.length + 1 : cards.length - i);

    // Set initial stacked positions. The first card ends up on top of the pile:
    // it is the card the user drags, so it has to be the visible one.
    cards.forEach((card, i) => {
        gsap.set(card, {
            position: 'absolute',
            left: '50%',
            top: `${cardHeights[i]}px`,
            xPercent: -50,
            rotation: mobileRotations[i],
            zIndex: zIndexFor(i),
            transformOrigin: 'center center'
        });
    });

    // Reduced motion has no tweens, so every animated change is applied at once.
    const applyState = (card, props, options, onDone) => {
        if (reducedMotion) {
            gsap.set(card, props);
            if (onDone) onDone();
            return;
        }
        gsap.to(card, { ...props, ...options, overwrite: true, onComplete: onDone });
    };

    // Bring one card to the front of the pile. Cards that were swiped away stay
    // hidden until the focus returns to them.
    const setFrontCard = (index, animate) => {
        currentTopCardIndex = index;
        dismissedCards.delete(index);

        cards.forEach((card, i) => {
            const isFront = i === index;
            // A swiped away card keeps its hidden state - only the card the
            // focus returns to is brought back.
            if (dismissedCards.has(i) && !isFront) return;

            const props = {
                zIndex: zIndexFor(i),
                x: 0,
                rotation: mobileRotations[i],
                opacity: 1,
                scale: 1,
                pointerEvents: 'auto'
            };

            if (!animate || reducedMotion) {
                gsap.set(card, props);
                return;
            }

            if (isFront) {
                // The card taking the front position pops forward so the change
                // of the front card stays visible.
                gsap.fromTo(card, { scale: 0.95, opacity: 0.8 }, { ...props, duration: 0.4, ease: 'back.out(1.7)', overwrite: true });
            } else {
                gsap.to(card, { ...props, duration: 0.4, ease: 'back.out(1.7)', overwrite: true });
            }
        });
    };

    // Move a card off the deck and hand the front position to the next one.
    // This is the keyboard equivalent of a completed swipe (WCAG 2.5.7).
    const dismissCard = (index) => {
        const card = cards[index];
        const nextIndex = index + 1;
        dismissedCards.add(index);
        focusCard(nextIndex);

        applyState(card, { x: '150%', rotation: 30, opacity: 0, zIndex: 0, pointerEvents: 'none' },
            { duration: 0.5, ease: 'power2.in' },
            () => setFrontCard(nextIndex, true));
    };

    // Move the deck focus to another card and bring it to the front of the pile.
    const moveDeckFocus = (index) => {
        const target = Math.min(Math.max(index, 0), cards.length - 1);
        setFrontCard(target, true);
        focusCard(target);
    };

    // Enter / Space: the card leaves the deck exactly like a swipe does. The
    // last card cannot leave the deck, so it is emphasised instead.
    const activateCard = (index) => {
        if (index >= cards.length - 1) {
            // Reduced motion: no pop animation, the focus ring is the feedback.
            if (reducedMotion) return;
            gsap.to(cards[index], { scale: 1.05, duration: 0.25, ease: 'power2.out', overwrite: true, yoyo: true, repeat: 1 });
            return;
        }
        dismissCard(index);
    };

    // Add touch/swipe interaction for each card
    cards.forEach((card, i) => {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let startLeft = 0;

        const onStart = (e) => {
            // Only allow interaction for the top card
            if (i !== currentTopCardIndex) return;

            isDragging = true;
            const isTouch = e.type.includes('touch');
            startX = isTouch ? e.touches[0].clientX : e.clientX;
            startY = isTouch ? e.touches[0].clientY : e.clientY;
            startLeft = Number(gsap.getProperty(card, 'x'));
            gsap.set(card, { cursor: 'grabbing' });
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const isTouch = e.type.includes('touch');
            const currentX = isTouch ? e.touches[0].clientX : e.clientX;
            const deltaX = currentX - startX;
            const rotation = mobileRotations[i] + (deltaX * 0.15);

            // Only claim clearly horizontal gestures: a vertical swipe still has
            // to scroll the page. touch-action: pan-y on the card (cards.css)
            // already stops the browser from panning sideways.
            if (isTouch && e.cancelable) {
                const deltaY = e.touches[0].clientY - startY;
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
                    e.preventDefault();
                }
            }

            gsap.set(card, { x: startLeft + deltaX, rotation });
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            gsap.set(card, { cursor: 'grab' });

            const deltaX = Number(gsap.getProperty(card, 'x')) - startLeft;
            const threshold = 100;
            const isLastCard = currentTopCardIndex >= cards.length - 1;

            if (Math.abs(deltaX) > threshold && !isLastCard) {
                // Swipe far enough - animate card away to reveal the next one
                dismissedCards.add(i);
                applyState(card, {
                    x: deltaX > 0 ? '150%' : '-150%',
                    rotation: deltaX > 0 ? 30 : -30,
                    opacity: 0,
                    zIndex: 0,
                    pointerEvents: 'none'
                }, { duration: 0.5, ease: 'power2.in' }, () => setFrontCard(currentTopCardIndex + 1, true));
            } else {
                // Not far enough (or last card) - spring back to center
                applyState(card, { x: 0, rotation: mobileRotations[i] }, { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            }
            startX = 0;
        };

        // Touch events. touchmove is not passive so a horizontal gesture can be
        // claimed, while touch-action: pan-y keeps the vertical page scroll.
        on(card, 'touchstart', onStart, { passive: true });
        on(card, 'touchmove', onMove, { passive: false });
        on(card, 'touchend', onEnd);
        // A cancelled touch (the browser took the gesture over) must not leave
        // the card stuck at the drag offset.
        on(card, 'touchcancel', () => {
            if (!isDragging) return;
            isDragging = false;
            gsap.set(card, { cursor: 'grab' });
            applyState(card, { x: 0, rotation: mobileRotations[i] }, { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });

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

        // Keyboard equivalent of the drag (WCAG 2.5.7 - a dragging movement
        // needs a single pointer alternative).
        on(card, 'keydown', (e) => {
            const key = e.key;
            if (key === 'ArrowRight' || key === 'ArrowDown') {
                e.preventDefault();
                moveDeckFocus(i + 1);
            } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
                e.preventDefault();
                moveDeckFocus(i - 1);
            } else if (key === 'Home') {
                e.preventDefault();
                moveDeckFocus(0);
            } else if (key === 'End') {
                e.preventDefault();
                moveDeckFocus(cards.length - 1);
            } else if (key === 'Enter' || key === ' ') {
                // Space scrolls the page by default, so it has to be claimed
                // here to avoid a double action.
                e.preventDefault();
                activateCard(i);
            }
        });
    });

    // Scroll-based reveal animation
    const cardsWrapper = document.querySelector('.cards-wrapper');
    if (cardsWrapper && !reducedMotion) {
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
