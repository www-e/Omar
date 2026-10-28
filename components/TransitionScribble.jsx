'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ANIMATION_CONFIG } from '@/lib/data';
import LottieCharacter from './LottieCharacter';

/**
 * TransitionScribble — the site signature: a thick coloured scribble that
 * draws itself across the screen, hands over to the logo, throws a burst of
 * confetti and then wipes away to reveal the page the visitor asked for.
 *
 * It used to be a dead flourish: it auto-ran ~100 ms after hydration, froze the
 * page for ~4.9 s behind `body.is-transitioning` (pointer-events: none) and was
 * attached to a logo that was not even a link. Now:
 *
 *  - An internal link click starts the "cover"; the browser / Next.js performs
 *    the navigation as usual and the "wipe" plays once the route actually
 *    changed. Nothing is preventDefault-ed, so navigation can never be
 *    swallowed by this component.
 *  - The overlay is `pointer-events: none`, so the visitor can always leave.
 *  - The overlay lives in the ROOT LAYOUT, so it survives the navigation it
 *    triggers (a per-page overlay would unmount mid-animation).
 *  - A one-shot confetti Lottie bursts at the handover moment.
 *
 * Guard rails: reduced motion skips the whole thing, and a safety timer wipes
 * the overlay even if the route never changes (a failed navigation).
 */

const CONFETTI_SRC = '/assets/lottie/confetti.json';
const CONFETTI_POSTER = '/assets/lottie/confetti-poster.png';

// The brand palette, by token name. The token is used for the scribble colour
// (`var(--token)`) and the resolved hex is used to pick a readable wordmark
// colour on top of it.
const TRANSITION_COLORS = [
    '--color-green', '--color-lightblue', '--color-darkblue',
    '--color-lightgreen', '--color-orange', '--color-maroon', '--color-pink'
];

/**
 * Picks black or white for text sitting on `cssColor`, whichever has the
 * higher WCAG contrast ratio. A hardcoded "is this a light colour?" list gets
 * it wrong for mid-tone colours: white on the brand orange is only 3.1:1,
 * black is 6.7:1.
 */
function pickReadableInk(cssColor) {
    const hex = (cssColor || '').trim();
    const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) return '#fff';

    const channel = (value) => {
        const c = parseInt(value, 16) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    const luminance =
        0.2126 * channel(match[1]) +
        0.7152 * channel(match[2]) +
        0.0722 * channel(match[3]);

    const onBlack = (luminance + 0.05) / 0.05;
    const onWhite = 1.05 / (luminance + 0.05);
    return onBlack >= onWhite ? '#000000' : '#ffffff';
}

export default function TransitionScribble() {
    const pathname = usePathname();
    const [confetti, setConfetti] = useState({ enabled: false, replayKey: 0, visible: false });

    // 'idle' -> 'covering' -> 'wiping'. Kept in a ref: the animation is driven
    // by GSAP, and the wipe has to fire from a pathname change that happens
    // outside React's render cycle.
    const phaseRef = useRef('idle');
    const pendingPathRef = useRef(null);
    const startWipeRef = useRef(null);
    // Resolves when the cover timeline has finished drawing. The route change
    // usually lands in ~150 ms (the pages are prefetched and statically
    // rendered), which is far too early to wipe on — the scribble would be
    // erased half-drawn and the logo would never reach full opacity. The wipe
    // therefore waits for the cover to complete.
    const coverReadyRef = useRef(null);
    // The cloned wordmark. It has to be reachable later because its ink
    // colour depends on the cover colour, which is only chosen on click.
    const logoCloneRef = useRef(null);

    useEffect(() => {
        const transitionScribblePath = document.querySelector('.transition-scribble path');
        const transitionScribbleSvg = document.querySelector('.transition-scribble');

        if (!transitionScribblePath || !transitionScribbleSvg) return;

        const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /**
         * Only same-origin, same-tab, unmodified left clicks on real links are
         * eligible. Everything else (external links, downloads, mailto, new
         * tabs, in-page anchors) is left completely alone.
         */
        const getInternalTarget = (event) => {
            if (event.defaultPrevented) return null;
            if (event.button !== 0) return null;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

            const anchor = event.target.closest('a');
            if (!anchor) return null;
            if (anchor.target && anchor.target !== '_self') return null;
            if (anchor.hasAttribute('download')) return null;

            const href = anchor.getAttribute('href');
            if (!href) return null;
            if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('//')) return null;

            let url;
            try {
                url = new URL(href, window.location.href);
            } catch (error) {
                return null;
            }
            if (url.origin !== window.location.origin) return null;
            // Same document (an in-page anchor, or a reload of the current
            // path) is not a route change — leave it to the browser.
            if (url.pathname === window.location.pathname) return null;

            return url;
        };

        const buildTransitionLogo = () => {
            let transitionLogo = document.querySelector('.transition-logo');
            if (!transitionLogo) {
                transitionLogo = document.createElement('div');
                transitionLogo.className = 'transition-logo';
                transitionLogo.setAttribute('aria-hidden', 'true');
                const sourceLogo = document.querySelector('.logo-omar') || document.querySelector('.logo-truus');
                if (sourceLogo) {
                    const clone = sourceLogo.cloneNode(true);
                    // The wordmark is a real <a href="/"> now. Cloning it into
                    // an aria-hidden overlay would put a focusable link inside
                    // an aria-hidden container (an accessibility violation) and
                    // give the visitor a second "home" link mid-transition.
                    clone.removeAttribute('href');
                    clone.removeAttribute('target');
                    clone.removeAttribute('aria-label');
                    clone.removeAttribute('aria-current');
                    clone.removeAttribute('tabindex');
                    // The clone keeps the `.logo-omar` class, and that class
                    // carries its own colour (the brand blue). Without this,
                    // the wordmark ignores the ink colour chosen for the
                    // cover and stays blue on a coloured background.
                    clone.style.color = 'inherit';
                    clone.style.width = '150px';
                    clone.style.height = 'auto';
                    transitionLogo.appendChild(clone);
                    logoCloneRef.current = clone;
                }
                document.body.appendChild(transitionLogo);
            }
            return transitionLogo;
        };

        const config = ANIMATION_CONFIG.transitionScribble;
        const durIn = config.durationIn || 0.42;
        const durOut = config.durationOut || 0.5;

        const transitionLogo = buildTransitionLogo();
        const pathLength = transitionScribblePath.getTotalLength();
        const dashLength = pathLength + 5;

        let safetyTimer = null;
        let confettiHideTimer = null;

        const startCover = (targetPath) => {
            if (phaseRef.current !== 'idle') return;
            if (reducedMotion()) return;

            phaseRef.current = 'covering';
            pendingPathRef.current = targetPath;

            const randomColor = TRANSITION_COLORS[Math.floor(Math.random() * TRANSITION_COLORS.length)];
            transitionScribbleSvg.style.color = `var(${randomColor})`;
            const resolvedColor = getComputedStyle(document.documentElement).getPropertyValue(randomColor);
            const ink = pickReadableInk(resolvedColor);
            transitionLogo.style.color = ink;

            // The wordmark is painted with `background-clip: text` and a
            // gradient, so it ignores `color` completely. Left alone, the
            // brand gradient sits on the cover at ~1.6:1 — the letters
            // disappear. Flatten the clone to a solid ink instead.
            const clone = logoCloneRef.current;
            if (clone) {
                clone.style.background = 'none';
                clone.style.backgroundClip = 'border-box';
                clone.style.webkitBackgroundClip = 'border-box';
                clone.style.color = ink;
                clone.style.webkitTextFillColor = ink;
            }

            gsap.set(transitionScribbleSvg, { scale: config.scale });
            gsap.set(transitionScribblePath, { strokeDasharray: dashLength, strokeDashoffset: dashLength, strokeWidth: config.strokeWidthStart, opacity: 1 });
            gsap.set(transitionScribbleSvg, { opacity: 1, x: 0, y: 0, rotation: 0 });
            gsap.set(transitionLogo, { opacity: 0, scale: 1 });

            document.body.classList.add('is-transitioning');
            const cursorBubble = document.querySelector('.cursor-bubble');
            if (cursorBubble) gsap.to(cursorBubble, { opacity: 0, duration: 0.2 });

            // The confetti burst: loaded on the first navigation only, so a
            // visitor who never leaves the landing page never pays for it.
            setConfetti((prev) => ({ enabled: true, replayKey: prev.replayKey + 1, visible: true }));
            if (confettiHideTimer) clearTimeout(confettiHideTimer);
            confettiHideTimer = setTimeout(() => {
                setConfetti((prev) => ({ ...prev, visible: false }));
            }, 1900);

            const coverTl = gsap.timeline();
            coverTl.to(transitionScribblePath, { strokeDashoffset: 0, duration: durIn, ease: 'power1.inOut' }, 0);
            coverTl.to(transitionScribblePath, { strokeWidth: config.strokeWidthMax, duration: durIn, ease: 'power2.inOut' }, 0);
            coverTl.to(transitionLogo, {
                autoAlpha: 1, duration: durIn * 0.6, ease: 'power2.out',
                onStart: () => {
                    const logoSvg = transitionLogo.querySelector('svg');
                    if (logoSvg) {
                        gsap.to(logoSvg, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)', overwrite: 'auto' });
                    }
                }
            }, durIn * 0.35);

            // The wipe is armed on the cover's completion, not on the click.
            coverReadyRef.current = new Promise((resolve) => {
                coverTl.eventCallback('onComplete', resolve);
            });

            // Safety net: if the navigation never happens (or never resolves),
            // the overlay still wipes away so the visitor is not left looking
            // at a scribble.
            safetyTimer = setTimeout(() => {
                if (phaseRef.current === 'covering') startWipeRef.current?.();
            }, 2500);
        };

        const startWipe = () => {
            if (phaseRef.current !== 'covering') return;
            phaseRef.current = 'wiping';
            if (safetyTimer) {
                clearTimeout(safetyTimer);
                safetyTimer = null;
            }

            const wipeTl = gsap.timeline({
                onComplete: () => {
                    phaseRef.current = 'idle';
                    pendingPathRef.current = null;
                    coverReadyRef.current = null;
                    document.body.classList.remove('is-transitioning');
                    gsap.set(transitionScribblePath, { strokeWidth: '0%' });
                    gsap.set(transitionLogo, { opacity: 0 });
                    const logoSvg = transitionLogo.querySelector('svg');
                    if (logoSvg) {
                        gsap.killTweensOf(logoSvg);
                        gsap.set(logoSvg, { rotation: 0 });
                    }
                }
            });

            wipeTl.to(transitionScribblePath, { strokeDashoffset: -dashLength, duration: durOut, ease: 'power2.inOut' }, 0);
            wipeTl.to(transitionScribblePath, { strokeWidth: config.strokeWidthStart, duration: durOut, ease: 'power2.inOut' }, 0);
            wipeTl.to(transitionLogo, {
                autoAlpha: 0, duration: durOut * 0.5, ease: 'power2.in',
                onComplete: () => {
                    const logoSvg = transitionLogo.querySelector('svg');
                    if (logoSvg) {
                        gsap.killTweensOf(logoSvg);
                        gsap.set(logoSvg, { rotation: 0 });
                    }
                }
            }, durOut * 0.4);
        };

        startWipeRef.current = startWipe;

        const onClick = (event) => {
            const url = getInternalTarget(event);
            if (!url) return;
            // No preventDefault: Next.js keeps full ownership of the
            // navigation, this component only dresses it.
            startCover(url.pathname);
        };

        // CAPTURE phase, on purpose. Next.js' <Link> calls preventDefault() in
        // its own click handler, and React dispatches that handler on the root
        // container — which is a DESCENDANT of document. A document-level
        // BUBBLE listener therefore runs after Next already cancelled the
        // event, and the `event.defaultPrevented` guard above would reject
        // every click (measured: capture = false, bubble = true). Capture
        // runs first, so the guard sees the real state and the cover starts
        // before the router pushes.
        document.addEventListener('click', onClick, true);

        return () => {
            document.removeEventListener('click', onClick, true);
            if (safetyTimer) clearTimeout(safetyTimer);
            if (confettiHideTimer) clearTimeout(confettiHideTimer);
            document.body.classList.remove('is-transitioning');
            gsap.killTweensOf([transitionScribblePath, transitionScribbleSvg]);
            const logoSvg = transitionLogo.querySelector('svg');
            if (logoSvg) gsap.killTweensOf(logoSvg);
            transitionLogo.remove();
        };
    }, []);

    // The wipe plays once the route has actually changed AND the cover has
    // finished drawing. Wiping earlier would erase the scribble half-drawn
    // and cut the logo pop short.
    useEffect(() => {
        if (phaseRef.current !== 'covering') return;
        const ready = coverReadyRef.current;
        if (ready) {
            ready.then(() => startWipeRef.current?.());
        } else {
            startWipeRef.current?.();
        }
    }, [pathname]);

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 3222 3114"
                fill="none"
                preserveAspectRatio="none"
                className="transition-scribble"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M299.654 453.865C505.574 319.225 711.494 184.585 836.054 109.945C960.614 35.3048 997.574 24.7448 944.014 110.385C890.454 196.025 745.254 378.185 571.454 634.385C397.654 890.585 199.654 1215.3 110.854 1382.58C22.0544 1549.86 48.4544 1549.86 77.8944 1540.62C107.334 1531.38 139.014 1512.9 367.854 1319.9C596.694 1126.9 1021.73 759.945 1255.21 555.065C1488.69 350.185 1517.73 318.505 1527.41 306.145C1537.09 293.785 1526.53 301.705 1346.85 618.625C1167.17 935.545 818.694 1561.22 635.214 1896.74C451.734 2232.26 443.814 2258.66 447.654 2268.3C451.494 2277.94 467.334 2270.02 511.134 2236.9C554.934 2203.78 626.214 2145.7 966.534 1817.46C1306.85 1489.22 1914.05 892.585 2263.81 557.505C2613.57 222.425 2687.49 166.985 2741.41 129.185C2795.33 91.3848 2827.01 72.9048 2843.33 67.3448C2859.65 61.7848 2859.65 69.7048 2849.09 96.2248C2838.53 122.745 2817.41 167.625 2584.77 544.505C2352.13 921.385 1370.37 2165.43 1139.25 2537.83C908.134 2910.23 902.854 2926.07 902.774 2939.51C902.694 2952.95 907.974 2963.51 1255.21 2613.87C1602.45 2264.23 2829.73 1017.54 2903.53 1071.46C2977.33 1125.38 2176.12 2817.04 2128 3037C2079.88 3256.96 2911.24 2018.56 3172 1793"
                    stroke="currentColor"
                    strokeLinecap="round"
                    style={{ strokeWidth: '0%', strokeDashoffset: '0.001', strokeDasharray: '0px, 999999px' }}
                />
            </svg>

            {/* Exit flourish: one-shot confetti burst, mounted on first use. */}
            {confetti.enabled && (
                <div className={`transition-confetti ${confetti.visible ? 'is-active' : ''}`.trim()} aria-hidden="true">
                    <LottieCharacter
                        src={CONFETTI_SRC}
                        poster={CONFETTI_POSTER}
                        className="transition-confetti__lottie"
                        enabled
                        loop={false}
                        replayKey={confetti.replayKey}
                        ratio="1 / 1"
                        posterWidth={512}
                        posterHeight={512}
                    />
                </div>
            )}
        </>
    );
}
