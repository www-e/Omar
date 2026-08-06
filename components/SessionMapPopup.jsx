'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

import '../app/styles/session-map-popup.css';

export default function SessionMapPopup() {
    const pathname = usePathname();
    const popupRef = useRef(null);
    const [hidden, setHidden] = useState(false);

    // Appear on EVERY visit and EVERY route change — intentionally no
    // localStorage/sessionStorage persistence (per project requirements).
    useEffect(() => {
        setHidden(pathname === '/os-session-map');
    }, [pathname]);

    useEffect(() => {
        const el = popupRef.current;
        if (hidden || !el) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            gsap.set(el, { opacity: 1, visibility: 'visible', clearProps: 'all' });
            return;
        }

        const entrance = gsap.fromTo(
            el,
            { opacity: 0, scale: 0.85, y: 40, visibility: 'hidden' },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                visibility: 'visible',
                duration: 0.9,
                delay: 1.2,
                ease: 'elastic.out(1, 0.4)',
            }
        );

        const onEnter = () => {
            gsap.to(el, { rotation: -1.2, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
        };
        const onLeave = () => {
            gsap.killTweensOf(el, 'rotation');
            gsap.to(el, { rotation: 0, duration: 0.4, ease: 'power2.out' });
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);

        return () => {
            entrance.kill();
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
            gsap.killTweensOf(el);
        };
    }, [hidden, pathname]);

    if (hidden) return null;

    return (
        <div
            ref={popupRef}
            className="session-map-popup"
            role="complementary"
            aria-label="خريطة حصة البرمجة — منصة عمر أشرف"
        >
            <Link href="/os-session-map" className="session-map-popup__link">
                <span className="session-map-popup__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </span>
                <span className="session-map-popup__text">
                    <span className="session-map-popup__title">جيت عشان منصة البرمجة؟ اضغط هنا</span>
                    <span className="session-map-popup__sub">خلّيك معايا خطوة بخطوة</span>
                </span>
                <span className="session-map-popup__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </span>
            </Link>
            <button
                type="button"
                className="session-map-popup__close"
                aria-label="إغلاق"
                onClick={() => setHidden(true)}
            >
                ×
            </button>
        </div>
    );
}
