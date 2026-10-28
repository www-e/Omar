'use client';

import { useEffect, useRef, useState } from 'react';
import MagneticCTA from '@/components/MagneticCTA';

export default function VimeoHero() {
    const playerRef = useRef(null);

    const [isFullscreen, setIsFullscreen] = useState(false);

    /* ── Fullscreen state stays in sync when the user exits with ESC ── */
    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    /* ── Controls ── */
    const toggleFullscreen = (e) => {
        if (e) e.stopPropagation();
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen?.().catch(() => { /* user denied */ });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <>
            {/* ── Main hero container ── */}
            <div
                className="vimeo-hero"
                ref={playerRef}
            >
                {/* Responsive Hero Image: wideBanner for PC, studio1 for mobile.
                    WebP first with a PNG fallback for legacy browsers; srcset lets
                    the phone and laptop each pull only the width they need. */}
                <picture className="vimeo-hero__picture">
                    <source
                        media="(min-width: 769px)"
                        type="image/webp"
                        srcSet="/assets/omar/wideBanner-960.webp 960w, /assets/omar/wideBanner-1440.webp 1440w, /assets/omar/wideBanner-1920.webp 1920w"
                        sizes="calc(100vw - 24px)"
                    />
                    <source
                        media="(min-width: 769px)"
                        srcSet="/assets/omar/wideBanner.png"
                    />
                    <source
                        type="image/webp"
                        srcSet="/assets/omar/studio1-480.webp 480w, /assets/omar/studio1-720.webp 720w, /assets/omar/studio1-937.webp 937w"
                        sizes="100vw"
                    />
                    <img
                        src="/assets/omar/studio1.png"
                        width="937"
                        height="1678"
                        alt="Omar Ashraf - Full Stack Engineer"
                        className="vimeo-hero__iframe"
                        loading="eager"
                        // The loading splash waits for this image to decode
                        // before it stands down.
                        data-loader-signal=""
                        // LCP surface: hint the browser to prioritize this fetch
                        fetchPriority="high"
                    />
                </picture>

                {/* Gradient fade */}
                <div className="vimeo-hero__fade" />

                {/* ① Headline — bottom left, word-by-word layout */}
                <div className="home-header__title">
                    <h1 className="vimeo-hero__title">

                        {/* "Omar" */}
                        <span className="vimeo-hero__word">Omar </span>

                        {/* "Ashraf" + ⑤ smiley (tinted with hue-rotate) */}
                        <span className="vimeo-hero__word is--relative">
                            <span>Ashraf </span>
                            <div className="home-header__smiley">
                                <img
                                    src="/assets/VimeoHero SVG/smiley-face.svg"
                                    alt=""
                                    className="home-header__smiley-svg"
                                    style={{ filter: 'hue-rotate(45deg)' }}
                                />
                            </div>
                        </span>

                        {/* "Full-Stack Engineer" italic */}
                        <span className="vimeo-hero__word"><em>Full-Stack Engineer </em></span>

                        {/* "&" */}
                        <span className="vimeo-hero__word">& </span>

                        <div style={{ flexBasis: '100%', height: 0 }} />

                        <span className="vimeo-hero__word">Tech </span>
                        <span className="vimeo-hero__word">Solution </span>

                        {/* "Architect" + ⑤ pink star (no spin) + oval underline */}
                        <span className="vimeo-hero__word is--relative">
                            <div className="home-header__star">
                                <div className="home-header__star-inner">
                                    <img
                                        src="/assets/VimeoHero SVG/pink-star.svg"
                                        alt=""
                                        className="home-header__star-svg"
                                    />
                                </div>
                            </div>
                            {/* Oval underline */}
                            <img
                                src="/assets/VimeoHero SVG/oval-underline.svg"
                                alt=""
                                className="home-header__title-line-svg"
                            />
                            <span>Architect</span>
                        </span>

                    </h1>
                </div>

                {/* CV Download Button */}
                <div className="vimeo-hero__cv">
                    <MagneticCTA
                        href="/omar-cv.pdf"
                        download
                        label="Download CV"
                        variant="ghost"
                        icon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                        }
                    />
                </div>

                {/* ① Controls — bottom LEFT: fullscreen */}
                <div className="vimeo-hero__controls" onClick={(e) => e.stopPropagation()}>
                    {/* Fullscreen */}
                    <button className="vimeo-hero__btn" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} aria-pressed={isFullscreen}>
                        {!isFullscreen ? (
                            <svg viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.5 3.95833C2.5 3.15292 3.15292 2.5 3.95833 2.5H6.875C7.22017 2.5 7.5 2.77983 7.5 3.125C7.5 3.47017 7.22017 3.75 6.875 3.75H3.95833C3.84327 3.75 3.75 3.84327 3.75 3.95833V6.875C3.75 7.22017 3.47017 7.5 3.125 7.5C2.77983 7.5 2.5 6.875 2.5 6.875V3.95833ZM12.5 3.125C12.5 2.77983 12.7798 2.5 13.125 2.5H16.0417C16.8471 2.5 17.5 3.15292 17.5 3.95833V6.875C17.5 7.22017 16.8471 7.5 16.875 7.5C16.5298 7.5 16.25 7.22017 16.25 6.875V3.95833C16.25 3.84327 16.1567 3.75 16.0417 3.75H13.125C12.7798 3.75 12.5 3.47017 12.5 3.125ZM3.125 12.5C3.47017 12.5 3.75 12.7798 3.75 13.125V16.0417C3.75 16.1567 3.84327 16.25 3.95833 16.25H6.875C7.22017 16.25 7.5 16.5298 7.5 16.875C7.5 17.2202 6.875 17.5 6.875 17.5H3.95833C3.15292 17.5 2.5 16.8471 2.5 16.0417V13.125C2.5 12.7798 2.77983 12.5 3.125 12.5ZM16.875 12.5C17.2202 12.5 17.5 12.7798 17.5 13.125V16.0417C17.5 16.1567 16.8471 16.25 16.875 16.25H13.125C12.7798 16.25 12.5 16.5298 12.5 16.875C12.5 17.2202 13.125 17.5 13.125 17.5H16.875C17.5 17.5 17.5 16.8471 17.5 16.0417V13.125C17.5 12.7798 16.8471 12.5 16.875 12.5Z" fill="currentColor" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 20 20" fill="none">
                                <path d="M6.04167 7.5C6.84708 7.5 7.5 6.84708 7.5 6.04167L7.5 3.125C7.5 2.77983 7.22017 2.5 6.875 2.5C6.52982 2.5 6.25 2.77983 6.25 3.125L6.25 6.04167C6.25 6.15673 6.15672 6.25 6.04167 6.25L3.125 6.25C2.77983 6.25 2.5 6.52983 2.5 6.875C2.5 7.22018 2.77983 7.5 3.125 7.5L6.04167 7.5Z" fill="currentColor" />
                                <path d="M16.875 7.5C17.2202 7.5 17.5 6.875 17.5 6.04167L17.5 3.125C17.5 2.77983 16.8471 2.5 16.875 2.5C16.5298 2.5 16.25 2.77983 16.25 3.125L16.25 6.04167C16.25 6.15673 16.1567 6.25 16.0417 6.25L13.9583 6.25C13.8433 6.25 13.75 6.15673 13.75 6.04167L13.75 3.125C13.75 2.77983 13.4702 2.5 13.125 2.5C12.7798 2.5 12.5 2.77983 12.5 3.125L12.5 6.04167C12.5 6.84708 13.1529 7.5 13.9583 7.5L16.875 7.5Z" fill="currentColor" />
                                <path d="M12.5 16.875C12.5 17.2202 12.7798 17.5 13.125 17.5C13.4702 17.5 13.75 16.8471 13.75 16.875L13.75 13.9583C13.75 13.8433 13.8433 13.75 13.9583 13.75L16.875 13.75C17.2202 13.75 17.5 13.4702 17.5 13.125C17.5 12.7798 16.8471 12.5 16.875 12.5L13.125 12.5C12.7798 12.5 12.5 12.7798 12.5 13.125L12.5 16.875Z" fill="currentColor" />
                                <path d="M6.25 16.875C6.25 17.2202 6.52982 17.5 6.875 17.5C7.22017 17.5 7.5 17.2202 7.5 16.875L7.5 13.9583C7.5 13.8433 7.22017 13.75 7.375 13.75L3.125 13.75C2.77983 13.75 2.5 13.4702 2.5 13.125C2.5 12.7798 2.77983 12.5 3.125 12.5H6.875C7.22017 12.5 7.5 12.7798 7.5 13.125L7.5 16.875Z" fill="currentColor" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
