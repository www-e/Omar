'use client';

import { useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// useLayoutEffect on the client so scroll reset + lenis init happen synchronously
// in the commit phase, before the browser paints the new route.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function SmoothScroll() {
    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        // New pages must start from the very top: Lenis keeps its internal
        // scroll position across client-side navigations, which overrides
        // Next.js's default scroll reset. Force an immediate jump to 0.
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        // Dynamic Tab Title Change
        const originalTitle = document.title;
        const handleVisibility = () => {
            document.title = document.hidden ? "Hey, over here!👋 - Omar" : originalTitle;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Store lenis on window so other components can access it
        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            document.removeEventListener('visibilitychange', handleVisibility);
            delete window.__lenis;
        };
    }, []);

    return null;
}
