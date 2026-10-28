'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect on the client (runs synchronously in React's commit phase,
// BEFORE DOM nodes are removed on unmount) — the same pin-spacer +
// React `removeChild` NotFoundError fix HorizontalWords applies to its strip.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// The four process steps live here (not in lib/data.js) so the section stays
// self-contained and can be dropped into any route.
const DEFAULT_STEPS = [
    {
        number: '01',
        title: 'Discover',
        color: 'green',
        description: 'Every engagement starts with the problem, not the stack: who it serves, what it has to do, and the deadline that actually matters.'
    },
    {
        number: '02',
        title: 'Architect',
        color: 'darkblue',
        description: 'Data model, API surface, and deployment shape are settled before the first screen is drawn, so the foundation survives the first big feature.'
    },
    {
        number: '03',
        title: 'Build',
        color: 'maroon',
        description: 'Next.js, PostgreSQL, and Python where it earns its place — shipped in reviewable slices, with tests where they pay for themselves.'
    },
    {
        number: '04',
        title: 'Ship',
        color: 'orange',
        description: 'Deployment, monitoring, and handover notes — then staying on to keep the product healthy once it is live.'
    }
];

export default function HowIWork({ steps = DEFAULT_STEPS }) {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    // `steps` defaults to a module-level constant; pass a stable reference
    // (not an inline array) so the ScrollTrigger is not rebuilt every render.
    useIsomorphicLayoutEffect(() => {
        const section = sectionRef.current;
        const viewport = viewportRef.current;
        const track = trackRef.current;
        const progress = progressRef.current;

        if (!section || !viewport || !track || !progress) return;

        const mm = gsap.matchMedia();

        mm.add(
            {
                // Desktop only, and only when motion is welcome. On mobile or
                // under prefers-reduced-motion the stylesheet already lays the
                // steps out as a static vertical list, so no pin/scrub is made.
                desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)'
            },
            (context) => {
                if (!context.conditions.desktop) return;

                const stepEls = gsap.utils.toArray('.how-i-work__step', track);
                const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

                // Nothing to scrub when the whole strip already fits.
                if (distance() <= 0) return;

                let activeIndex = -1;
                const setActive = (index) => {
                    if (index === activeIndex) return;
                    activeIndex = index;
                    stepEls.forEach((el, i) => el.classList.toggle('is-active', i === index));
                };

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${distance()}`,
                        scrub: 1,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const last = stepEls.length - 1;
                            setActive(Math.min(last, Math.round(self.progress * last)));
                        }
                    }
                });

                tl.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0)
                    .fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);

                setActive(0);

                return () => {
                    tl.scrollTrigger?.kill();
                    tl.kill();
                };
            },
            section
        );

        return () => {
            mm.revert();
        };
    }, [steps]);

    return (
        <section ref={sectionRef} className="how-i-work" aria-labelledby="how-i-work-heading">
            <div className="how-i-work__header">
                <h2 id="how-i-work-heading" className="how-i-work__title">
                    how i <span className="how-i-work__title-accent">work.</span>
                </h2>
                <p className="how-i-work__intro">
                    The same four steps on every engagement — from the first call to a product that stays running.
                </p>
                <div className="how-i-work__progress" aria-hidden="true">
                    <span className="how-i-work__progress-fill" ref={progressRef} />
                </div>
            </div>

            <div className="how-i-work__viewport" ref={viewportRef}>
                <ol className="how-i-work__track" ref={trackRef} role="list">
                    {steps.map((step, index) => (
                        <li
                            key={step.number || step.title}
                            className={`how-i-work__step how-i-work__step--${step.color || 'green'}${index === 0 ? ' is-active' : ''}`}
                        >
                            <span className="how-i-work__number">{step.number}</span>
                            <h3 className="how-i-work__step-title">{step.title}</h3>
                            <p className="how-i-work__step-text">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
