'use client';

import { useEffect, useRef, useState } from 'react';
import LottieCharacter from './LottieCharacter';

/**
 * PageLoader — the first-load splash screen.
 *
 * Design C (character loader) with the sparkle running alongside it.
 *
 * Rules this component must not break:
 * - It is dismissed by a REAL signal (web fonts settled + the hero image
 *   decoded), never by a fixed timer. The 2.5s ceiling is only a safety net
 *   for a slow network so the visitor is never trapped.
 * - It never reuses `body.is-transitioning` — TransitionScribble guards on
 *   that class and the two would deadlock each other.
 * - It does not trap focus and it does not set `inert` on the body.
 * - It is first-load only. The inline script in app/layout.jsx sets
 *   `data-loader="show"` on <html> before the first paint, but only when this
 *   session has not already seen it; the component clears the flag (and
 *   sessionStorage) once it has run.
 *
 * Reduced motion: no Lottie, no transitions — the poster frame and the word
 * mark are shown statically and the splash is removed as soon as the content
 * is ready.
 */

const SEEN_KEY = 'om:loader-seen';
const CEILING_MS = 2500;

/**
 * Resolves when the hero image (the LCP surface) has finished decoding.
 * Falls back to resolving on its own if there is no hero on this route.
 */
function waitForHeroSignal(timeout = 1200) {
    return new Promise((resolve) => {
        const deadline = Date.now() + timeout;
        const check = () => {
            const img = document.querySelector('[data-loader-signal]');
            if (img) {
                if (img.complete && img.naturalWidth > 0) {
                    resolve();
                    return;
                }
                const done = () => resolve();
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
                return;
            }
            if (Date.now() > deadline) {
                resolve();
                return;
            }
            setTimeout(check, 50);
        };
        check();
    });
}

export default function PageLoader() {
    // 'idle' -> 'active' -> 'ready' -> 'exiting' -> 'done'
    const [phase, setPhase] = useState('idle');
    const timers = useRef([]);

    useEffect(() => {
        const html = document.documentElement;
        // The pre-paint script in the layout only sets this for a first visit.
        if (html.getAttribute('data-loader') !== 'show') {
            // Repeat visit: the splash never ran. Unmount the component so its
            // `role="status" aria-live="polite"` region does not sit in the DOM
            // forever announcing a loader that is not there.
            setPhase('done');
            return;
        }

        let cancelled = false;
        let settled = false;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        setPhase('active');

        const dismiss = () => {
            if (cancelled || settled) return;
            settled = true;

            try {
                sessionStorage.setItem(SEEN_KEY, '1');
            } catch (error) {
                /* private mode — the splash will simply show again next visit */
            }

            setPhase('ready');

            if (reduced) {
                html.removeAttribute('data-loader');
                setPhase('done');
                return;
            }

            setPhase('exiting');
            const timer = setTimeout(() => {
                if (cancelled) return;
                html.removeAttribute('data-loader');
                setPhase('done');
            }, 520);
            timers.current.push(timer);
        };

        const ready = Promise.all([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            waitForHeroSignal()
        ]).catch(() => undefined);

        ready.then(() => dismiss());

        // Safety net: a stalled font request or a hero that never fires load
        // must not hold the visitor on the splash.
        const ceiling = setTimeout(dismiss, CEILING_MS);
        timers.current.push(ceiling);

        return () => {
            cancelled = true;
            timers.current.forEach(clearTimeout);
            timers.current = [];
        };
    }, []);

    if (phase === 'done') return null;

    const isExiting = phase === 'exiting' || phase === 'ready';

    return (
        <div
            className={`page-loader ${isExiting ? 'is--exiting' : ''}`.trim()}
            role="status"
            aria-live="polite"
        >
            <span className="page-loader__status">Loading Omar Ashraf&apos;s portfolio</span>

            <div className="page-loader__inner">
                <div className="page-loader__stage" aria-hidden="true">
                    <div className="page-loader__bubble">
                        <span className="page-loader__bubble-text">Warming up the studio</span>
                    </div>

                    <div className="page-loader__character">
                        <LottieCharacter
                            src="/assets/lottie/doug.json"
                            poster="/assets/lottie/doug-poster.png"
                            enabled={phase === 'active'}
                            ratio="247 / 359"
                        />
                    </div>

                    <div className="page-loader__sparkle">
                        <LottieCharacter
                            src="/assets/lottie/sparkle.json"
                            poster="/assets/lottie/sparkle-poster.png"
                            enabled={phase === 'active'}
                            ratio="1 / 1"
                            posterWidth={256}
                            posterHeight={256}
                        />
                    </div>
                </div>

                <p className="page-loader__brand">Omar Ashraf</p>
                <p className="page-loader__tagline">Full-Stack Engineer &amp; Tech Solution Architect</p>

                <div className="page-loader__bar" aria-hidden="true">
                    <span className="page-loader__bar-fill" />
                </div>
            </div>
        </div>
    );
}
