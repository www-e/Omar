'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import LottieCharacter from '@/components/LottieCharacter';

/* The reel ships in two H.264 grades so the browser can pick the one that
   matches its bandwidth. The poster is not only a preload hint: it is the
   plate the section falls back to, so the reel is never an empty black box. */
const REEL_POSTER = '/assets/showreel/reel-poster.jpg';
const REEL_SOURCES = [
    { src: '/assets/showreel/reel-1080.mp4', type: 'video/mp4' },
    { src: '/assets/showreel/reel-720.mp4', type: 'video/mp4' }
];
/* Nominal length of the cut, used for the eyebrow until the real duration
   arrives with the video metadata. */
const REEL_DURATION = 16;

const formatTime = (seconds) => {
    const total = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
    const minutes = Math.floor(total / 60).toString().padStart(2, '0');
    const rest = (total % 60).toString().padStart(2, '0');
    return `${minutes}:${rest}`;
};

// useLayoutEffect on the client (runs in the commit phase, before the browser
// paints) so the start of the reel happens inside the click that asked for it —
// a deferred play() would lose the user gesture and be refused.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Showreel() {
    const frameRef = useRef(null);
    const videoRef = useRef(null);

    const [shouldLoad, setShouldLoad] = useState(false);
    const [isStatic, setIsStatic] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [reducedMotion, setReducedMotion] = useState(false);

    // Refs mirror the state the observers and timers need to read without
    // re-binding their listeners on every render.
    const startedRef = useRef(false);
    const userIntentRef = useRef(false);
    const loadedRef = useRef(false);

    /* ── Reduced-motion preference ────────────────────────────────────────── */
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReducedMotion(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    /* ── Load the reel only when it is close to the viewport ─────────────── */
    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Reduced motion: the poster holds until the visitor asks.
                    if (reducedMotion) return;

                    if (loadedRef.current) {
                        // Already mounted — pick the loop back up.
                        if (userIntentRef.current) videoRef.current?.play().catch(() => {});
                    } else {
                        setShouldLoad(true);
                    }
                } else {
                    // Off-screen: a looping reel nobody is watching is just
                    // battery drain.
                    videoRef.current?.pause();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(frame);
        return () => observer.disconnect();
    }, [reducedMotion]);

    /* ── Start the reel ──────────────────────────────────────────────────── */
    useIsomorphicLayoutEffect(() => {
        if (!shouldLoad) return;
        const video = videoRef.current;
        if (!video) return;

        loadedRef.current = true;
        // Muted autoplay is allowed by every modern browser, but the *property*
        // is what the autoplay policy looks at, not the attribute.
        video.muted = true;
        // React treats `muted` as a DOM property, so it never writes the
        // attribute: set it too, so the markup matches the media contract.
        video.setAttribute('muted', '');

        // Reduced motion: nothing runs until the visitor presses play.
        if (reducedMotion && !userIntentRef.current) return;

        const attempt = video.play();
        if (attempt && typeof attempt.catch === 'function') {
            attempt.catch((error) => {
                // AbortError just means a new load/pause interrupted the attempt.
                if (error && error.name === 'AbortError') return;
                setIsStatic(true);
            });
        }

        // No 'play' event after a while means the autoplay was refused (low
        // power mode, data saver, a missing file): keep the poster on screen
        // instead of an empty black box.
        const fallback = window.setTimeout(() => {
            if (!startedRef.current) setIsStatic(true);
        }, 4000);

        return () => window.clearTimeout(fallback);
    }, [shouldLoad, reducedMotion]);

    /* ── Stop the reel when the section unmounts ─────────────────────────── */
    useEffect(() => () => videoRef.current?.pause(), []);

    /* ── Media handlers ──────────────────────────────────────────────────── */
    const handleLoadedData = useCallback(() => setIsReady(true), []);

    const handleLoadedMetadata = useCallback((event) => {
        const value = event.currentTarget.duration;
        if (Number.isFinite(value) && value > 0) setDuration(value);
    }, []);

    const handleTimeUpdate = useCallback((event) => {
        const seconds = Math.floor(event.currentTarget.currentTime);
        setElapsed((previous) => (previous === seconds ? previous : seconds));
    }, []);

    const handlePlay = useCallback(() => {
        startedRef.current = true;
        userIntentRef.current = true;
        setHasStarted(true);
        setIsPlaying(true);
        setIsStatic(false);
    }, []);

    const handlePause = useCallback(() => setIsPlaying(false), []);

    // A failed load also stops the media element, but the browser can fire
    // 'play' before it gives up: reset the toggle so the chip never claims to
    // pause something that is not running.
    const handleError = useCallback(() => {
        setIsStatic(true);
        setIsPlaying(false);
    }, []);

    /* ── Play / pause (WCAG 2.2.2: moving content needs a stop mechanism) ── */
    const togglePlayback = useCallback(() => {
        const video = videoRef.current;

        if (video && !video.paused) {
            // The visitor wants it to stop, so the next scroll must not
            // resume it behind their back.
            userIntentRef.current = false;
            video.pause();
            setIsPlaying(false);
            // Reduced motion visitors get the poster back, not a frozen frame.
            if (reducedMotion) setIsStatic(true);
            return;
        }

        // Starting the reel is always a deliberate act, so it is allowed even
        // when the visitor asked for reduced motion.
        userIntentRef.current = true;
        setIsStatic(false);
        setShouldLoad(true);

        if (video) {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(() => setIsStatic(true));
            }
        }
    }, [reducedMotion]);

    // The plate only shows the reel once it has painted a frame; until then the
    // poster sits underneath it.
    const showVideo = isReady && hasStarted && !isStatic;

    return (
        <section
            className={`showreel-section${isStatic ? ' is-static' : ''}`}
            id="showreel-section"
            aria-labelledby="showreel-heading"
        >
            <div className="showreel__frame" ref={frameRef}>
                {shouldLoad && (
                    <video
                        ref={videoRef}
                        className={`showreel__video${showVideo ? ' is-ready' : ''}`}
                        muted
                        playsInline
                        loop
                        autoPlay
                        preload="metadata"
                        poster={REEL_POSTER}
                        aria-hidden="true"
                        onLoadedData={handleLoadedData}
                        onLoadedMetadata={handleLoadedMetadata}
                        onTimeUpdate={handleTimeUpdate}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onError={handleError}
                    >
                        <source src={REEL_SOURCES[0].src} type={REEL_SOURCES[0].type} />
                        <source
                            src={REEL_SOURCES[1].src}
                            type={REEL_SOURCES[1].type}
                            onError={handleError}
                        />
                    </video>
                )}

                <div className="showreel__scrim" aria-hidden="true" />

                <div className="showreel__chip">
                    <span className="showreel__chip-label">reel</span>
                    <span className="showreel__chip-time" aria-hidden="true">
                        {formatTime(elapsed)}
                    </span>
                    <button
                        type="button"
                        className="showreel__chip-btn"
                        onClick={togglePlayback}
                        aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
                        aria-pressed={isPlaying}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
                                <rect x="5" y="4" width="3.6" height="12" rx="1.2" />
                                <rect x="11.4" y="4" width="3.6" height="12" rx="1.2" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
                                <path d="M6.6 3.9v12.2a1 1 0 0 0 1.52.85l9.4-6.1a1 1 0 0 0 0-1.7l-9.4-6.1A1 1 0 0 0 6.6 3.9Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className="showreel__content">
                <div className="showreel__kicker">
                    <span className="showreel__accent">
                        <LottieCharacter
                            src="/assets/lottie/sparkle.json"
                            poster="/assets/lottie/sparkle-poster.png"
                            ratio="1 / 1"
                            posterWidth={256}
                            posterHeight={256}
                        />
                    </span>
                    <p className="showreel__eyebrow">showreel — {formatTime(duration || REEL_DURATION)}</p>
                </div>

                <h2 className="showreel__title" id="showreel-heading">
                    clean code. reliable systems.
                </h2>
                <p className="showreel__subtitle">
                    Focused on code quality, system reliability, and scalable architecture.
                </p>
                <div className="showreel__sticker" aria-hidden="true">
                    <img
                        src="/assets/Footer-Sticker SVG/footer-sticker-100.svg"
                        alt=""
                        width="120"
                        height="120"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
