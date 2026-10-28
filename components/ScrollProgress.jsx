'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

// useLayoutEffect on the client so the first ratio is written before the
// browser paints the bar — otherwise a client-side navigation would flash the
// previous route's fill value for one frame.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * ScrollProgress — a thin reading-position bar pinned to the top of the
 * viewport, showing how far down the document the visitor is.
 *
 * WHY the ratio comes from Lenis and not from `window.scrollY`:
 * `components/SmoothScroll.jsx` creates the single Lenis instance for the
 * whole site and publishes it as `window.__lenis`. Lenis animates the scroll
 * itself, so the browser's own scroll position is only the *destination* of
 * that animation while the page is still visibly moving. Lenis emits its own
 * `scroll` event on every frame of the animation
 * (`this.emitter.emit("scroll", this)` in lenis' own source) and hands the
 * callback the Lenis instance, whose `scroll` getter is the animated
 * position and whose `limit` getter is `scrollHeight - clientHeight`. That is
 * exactly the `scrollTop / (scrollHeight - clientHeight)` ratio the bar
 * needs, and it costs no layout read at all on the frame.
 *
 * WHY there is still a native fallback: `SmoothScroll.jsx` returns early and
 * never creates Lenis when the visitor prefers reduced motion. The bar is an
 * orientation aid, not decoration, so it keeps working there — driven by the
 * browser's own scroll event, coalesced into a single animation frame.
 *
 * WHY a CSS custom property instead of writing the transform from JS: one
 * number drives both the fill's scaleX and the glow head's position on the
 * leading edge, and a custom-property write never triggers layout — unlike
 * animating `width`.
 */
export default function ScrollProgress() {
    const barRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        let frame = 0;
        let bindFrame = 0;
        let lenis = null;
        let unsubscribe = null;

        const write = (progress) => {
            const ratio = Math.min(1, Math.max(0, progress));
            bar.style.setProperty('--scroll-progress', ratio.toFixed(4));
        };

        // scrollTop / (scrollHeight - clientHeight). A page that is shorter
        // than the viewport has nothing to scroll, so the ratio is 0 — never
        // a division by zero.
        const apply = (scrollTop, limit) => {
            write(limit > 0 ? scrollTop / limit : 0);
        };

        // Lenis' animated position over its own limit.
        const applyLenis = () => {
            if (!lenis) return;
            apply(lenis.scroll, lenis.limit);
        };

        // Native fallback (reduced motion): the browser's own scroll position.
        const applyNative = () => {
            const doc = document.documentElement;
            apply(window.scrollY || doc.scrollTop || 0, doc.scrollHeight - doc.clientHeight);
        };

        // Bind to whichever Lenis instance is live right now. SmoothScroll
        // deletes `window.__lenis` when it unmounts, so a route change that
        // tears Lenis down falls back to the native path on the next tick.
        const bindLenis = () => {
            const current = typeof window !== 'undefined' ? window.__lenis : null;
            if (current === lenis) return;

            if (unsubscribe) {
                unsubscribe();
                unsubscribe = null;
            }
            lenis = current;

            if (lenis) {
                unsubscribe = lenis.on('scroll', applyLenis);
                applyLenis();
            }
        };

        const onScroll = () => {
            // Lenis may only appear after this component mounted (SmoothScroll
            // runs its own effect), so the native listener doubles as the
            // bootstrap for the Lenis binding.
            bindLenis();
            if (lenis) return;

            // Coalesce to one read + one write per frame.
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                applyNative();
            });
        };

        // First paint from the browser's own position, so a reload that
        // restores the scroll offset does not flash an empty fill.
        applyNative();

        // Bind to Lenis if it is already there…
        bindLenis();

        // …and re-check on the next frame: SmoothScroll creates the Lenis
        // instance in its own layout effect and the two components live in
        // different subtrees, so the instance may not exist yet when this
        // effect runs.
        bindFrame = requestAnimationFrame(() => {
            bindFrame = 0;
            bindLenis();
        });

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (unsubscribe) unsubscribe();
            if (frame) cancelAnimationFrame(frame);
            if (bindFrame) cancelAnimationFrame(bindFrame);
        };
    }, []);

    return (
        <div className="scroll-progress" aria-hidden="true" ref={barRef}>
            <span className="scroll-progress__fill" />
        </div>
    );
}
