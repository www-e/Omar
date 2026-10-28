'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * LottieCharacter
 *
 * Renders a Lottie animation with a static poster fallback.
 * - The poster PNG is always in the DOM, so the block is never empty while the
 *   animation loads (and it is what reduced-motion visitors see).
 * - lottie-web is imported dynamically, so it lands in its own chunk instead of
 *   the page bundle and is only fetched when the animation is actually needed.
 * - The animation pauses when it scrolls out of view or when the tab is hidden.
 * - Purely decorative: aria-hidden, no focusable content.
 *
 * `enabled` lets a caller mount the poster only and defer the (network-heavy)
 * lottie-web fetch until it is worth paying for — the page loader uses it to
 * keep the lottie chunk off routes that never show the splash.
 *
 * Asset: "Doug" by Anwar Hossain, free to use under the Lottie Simple License
 * (https://lottiefiles.com/free-animation/doug-cznHs0XFNV).
 */
export default function LottieCharacter({
    src = '/assets/lottie/doug.json',
    poster = '/assets/lottie/doug-poster.png',
    alt = '',
    className = '',
    replayKey = null,
    enabled = true,
    loop = true,
    ratio = '247 / 359',
    posterWidth = 247,
    posterHeight = 359
}) {
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        const container = containerRef.current;
        if (!container) return;

        const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        // Reduced motion: keep the poster frame, never start the animation.
        if (mqReducedMotion.matches) return;

        let animation = null;
        let cancelled = false;

        const start = async () => {
            try {
                const [{ default: lottie }, response] = await Promise.all([
                    import('lottie-web'),
                    fetch(src)
                ]);
                if (cancelled || !response.ok) return;

                const animationData = await response.json();
                if (cancelled) return;

                animation = lottie.loadAnimation({
                    container,
                    renderer: 'svg',
                    loop,
                    autoplay: true,
                    animationData,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid meet',
                        progressiveLoad: false
                    }
                });
                animationRef.current = animation;

                animation.addEventListener('DOMLoaded', () => {
                    if (!cancelled) setLoaded(true);
                });
            } catch (error) {
                // Network/parse failure: the poster frame stays visible.
                console.warn('[LottieCharacter] animation unavailable, showing poster', error);
            }
        };

        start();

        // Pause the loop while the character is off-screen or the tab is hidden.
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!animation) return;
                if (entry.isIntersecting && !document.hidden) animation.play();
                else animation.pause();
            },
            { threshold: 0.05 }
        );
        observer.observe(container);

        const onVisibility = () => {
            if (!animation) return;
            if (document.hidden) animation.pause();
            else animation.play();
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            cancelled = true;
            observer.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            animationRef.current = null;
            if (animation) animation.destroy();
        };
    }, [src, enabled, loop]);

    // Replay the loop from the first frame whenever the caller bumps replayKey
    // (used to let the character react when a filter changes).
    useEffect(() => {
        if (replayKey === null) return;
        const animation = animationRef.current;
        if (!animation) return;
        animation.goToAndPlay(0, true);
    }, [replayKey]);

    return (
        <div className={`lottie-character ${className}`.trim()} aria-hidden="true">
            <div className="lottie-character__inner" style={{ aspectRatio: ratio }}>
                <img
                    className={`lottie-character__poster ${loaded ? 'is-hidden' : ''}`.trim()}
                    src={poster}
                    alt={alt}
                    width={posterWidth}
                    height={posterHeight}
                    decoding="async"
                />
                <div className="lottie-character__stage" ref={containerRef}></div>
            </div>
        </div>
    );
}
