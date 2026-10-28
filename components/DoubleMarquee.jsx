'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brands, colors } from '@/lib/data';

// ─── Shuffle helpers ─────────────────────────────────────────────────────────
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function shuffleNoAdjacentSrc(array) {
    const arr = shuffleArray([...array]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].src === arr[i - 1].src) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j].src !== arr[i - 1].src) { [arr[i], arr[j]] = [arr[j], arr[i]]; break; }
            }
        }
    }
    if (arr[arr.length - 1].src === arr[0].src) {
        for (let j = 1; j < arr.length - 1; j++) {
            if (arr[j].src !== arr[0].src && arr[j].src !== arr[arr.length - 2].src) {
                [arr[arr.length - 1], arr[j]] = [arr[j], arr[arr.length - 1]]; break;
            }
        }
    }
    return arr;
}

function assignColorsNoAdjacent(count, colorPool) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const prev = i > 0 ? result[i - 1] : null;
        const seamColor = i === count - 1 ? result[0] : null;
        const available = colorPool.filter(c => c !== prev && c !== seamColor);
        const pool = available.length > 0 ? available : colorPool.filter(c => c !== prev);
        result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return result;
}

function buildMarqueeItems(isMobile) {
    const tracks = [[], []];
    for (let t = 0; t < 2; t++) {
        const shuffledBrands = shuffleNoAdjacentSrc(brands);
        const assignedColors = assignColorsNoAdjacent(shuffledBrands.length, colors);
        const items = shuffledBrands.map((brand, i) => ({ brand, color: assignedColors[i] }));
        // Duplicate for seamless loop — copies are hidden from assistive tech so each brand is announced once per visual group
        tracks[t] = isMobile ? items : [...items, ...items.map((it) => ({ ...it, isDuplicate: true }))];
    }
    return tracks;
}

export default function DoubleMarquee() {
    const [tracks, setTracks] = useState([[], []]);
    const [isMobile, setIsMobile] = useState(false);
    // Motion state of the two infinite CSS loops.
    // 'auto'    — the tracks follow the pointer: hovering the section, or moving
    //              the keyboard focus into it, pauses them.
    // 'paused'  — the visitor pressed pause, the tracks stay still.
    // 'running' — the visitor pressed play, the tracks keep moving.
    // The two explicit states are written to .marquee-right as classes and
    // outrank the hover rule in marquee.css, so a click always has a visible
    // effect even while the pointer rests on the section.
    const [pauseMode, setPauseMode] = useState('auto');

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mobile = window.matchMedia('(max-width: 768px)').matches;
        setIsMobile(mobile);
        setTracks(buildMarqueeItems(mobile));

        // Respect prefers-reduced-motion: skip GSAP entirely; marquee.css reveals final static styles
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        // Arrow path animation
        gsap.set('.marquee-left .marquee-svg-item:nth-child(2) path', { strokeDashoffset: 1000 });

        const marqueeTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.Double-marquee',
                start: 'top 70%',
                toggleActions: 'play none none reverse' // Allow replaying on scroll out/in
            }
        });

        marqueeTl
            .to('.marquee-underline', { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' })
            .to('.marquee-left .marquee-svg-item:nth-child(1)', { scale: 1, opacity: 1, rotation: -10, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
            .to('.marquee-left .marquee-svg-item:nth-child(2) path', { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' }, '-=0.3');

        return () => {
            marqueeTl.scrollTrigger?.kill();
            marqueeTl.kill();
        };
    }, []);

    // Pause / play toggle. The control drives the infinite CSS loops only —
    // the GSAP intro timeline is a one-shot scroll reveal and has to keep
    // playing even after the visitor stops the marquee.
    const togglePause = () => {
        setPauseMode((current) => (current === 'paused' ? 'running' : 'paused'));
    };

    const isPaused = pauseMode === 'paused';

    // The state classes are read by marquee.css to set animation-play-state on
    // both logo tracks.
    const marqueeRightClass = `marquee-right${pauseMode === 'paused' ? ' is-paused' : ''}${pauseMode === 'running' ? ' is-running' : ''}`;

    return (
        <>
            {/* Pause / play control. It is absolutely positioned against the
                section (see .Double-marquee in marquee.css), so it lands in the
                empty gutter above the logo columns and never covers a logo. */}
            <button
                type="button"
                className="marquee-pause-btn"
                onClick={togglePause}
                aria-pressed={isPaused}
                aria-label={isPaused ? 'Play partner logos' : 'Pause partner logos'}
                title={isPaused ? 'Play partner logos' : 'Pause partner logos'}
            >
                {isPaused ? (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                        <path d="M6 12V5.20128C6 4.37664 6.89256 3.86113 7.60685 4.27322L19.3914 11.072C20.1061 11.4843 20.1061 12.5158 19.3914 12.9281L7.60685 19.7269C6.89256 20.139 6 19.6234 6 18.7988V12Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                        <path d="M5.5 5.125H8.5C8.70711 5.125 8.875 5.29289 8.875 5.5V18.5C8.875 18.7071 8.70711 18.875 8.5 18.875H5.5C5.29289 18.875 5.125 18.7071 5.125 18.5V5.5C5.125 5.29289 5.29289 5.125 5.5 5.125Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                        <path d="M15.5 5.125H18.5C18.7071 5.125 18.875 5.29289 18.875 5.5V18.5C18.875 18.7071 18.70711 18.875 18.5 18.875H15.5C15.2929 18.875 15.125 18.7071 15.125 18.5V5.5C15.125 5.29289 15.2929 5.125 15.5 5.125Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                )}
            </button>

            {/* Left: Text + Blob */}
            <div className="marquee-left">
                <div className="marquee-text-container">
                    <h2>proud to have<br />worked <span className="text-with">with:</span></h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="marquee-underline" viewBox="0 0 132 5" fill="none">
                        <path d="M1 2.08377C44.3458 3.90451 87.9791 5.71442 131 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="marquee-blob-container">
                    <img src="/assets/Marquee-blob SVG/marquee-blob.svg" className="marquee-blob" alt="" aria-hidden="true" />
                    <div className="marquee-svg-container">
                        <div className="marquee-svg-item">
                            <img src="/assets/Marquee-blob SVG/marquee-hand.svg" width="100%" alt="" aria-hidden="true" />
                        </div>
                        <div className="marquee-svg-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none">
                                <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Two scrolling columns */}
            <div className={marqueeRightClass}>
                {tracks.map((trackItems, colIndex) => (
                    <div key={colIndex} className="marquee-column">
                        <div className="marquee-track">
                            {trackItems.map((item, i) => (
                                <div key={i} className="marquee-item" data-brand={item.brand.name} style={{ backgroundColor: item.color }} aria-hidden={item.isDuplicate || undefined}>
                                    <div className="marquee-logo">
                                        <div className="marquee-logo__before"></div>
                                        <img src={item.brand.src} loading="lazy" alt={item.brand.name} className="cover-image" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
