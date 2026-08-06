'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '../app/styles/session-map-teaser.css';

const ICON_PROPS = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

const STEPS = [
    {
        num: '٠١',
        title: 'عنوان الحصة',
        time: '١ دقيقة',
        color: 'var(--color-lightblue)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="M6 3h12v18l-6-4.5L6 21V3z" />
            </svg>
        ),
    },
    {
        num: '٠٢',
        title: 'فحص الواجب',
        time: '٥ دقائق',
        color: 'var(--color-darkblue)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <rect x="8" y="2" width="8" height="4" rx="1" />
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="m9 14 2 2 4-4" />
            </svg>
        ),
    },
    {
        num: '٠٣',
        title: 'تشييك سريع',
        time: '٣ دقائق',
        color: 'var(--color-green)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
        ),
    },
    {
        num: '٠٤',
        title: 'خريطة اليوم',
        time: '٢ دقيقة',
        color: 'var(--color-orange)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
                <path d="M9 3v15M15 6v15" />
            </svg>
        ),
    },
];

export default function SessionMapTeaser() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set('.session-map-teaser__card, .session-map-teaser__ghost, .session-map-teaser__head', {
                opacity: 1,
                clearProps: 'all',
            });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.session-map-teaser__head',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.session-map-teaser', start: 'top 80%' },
                }
            );
            gsap.fromTo(
                '.session-map-teaser__card, .session-map-teaser__ghost',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: { trigger: '.session-map-teaser__grid', start: 'top 82%' },
                }
            );
            gsap.fromTo(
                '.session-map-teaser__cta',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: { trigger: '.session-map-teaser__grid', start: 'top 75%' },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="session-map-teaser" dir="rtl" lang="ar" aria-labelledby="session-map-teaser-title">
            <div className="session-map-teaser__inner">
                <div className="session-map-teaser__head">
                    <span className="session-map-teaser__badge">نظام تعليمي حصري</span>
                    <h2 id="session-map-teaser-title" className="session-map-teaser__title">
                        كل حصة ليها خريطة… بتتكتب قبل ما تبدأ
                    </h2>
                    <p className="session-map-teaser__sub">٨ خطوات ثابتة — كل حصة — كل طالب — بدون استثناء</p>
                </div>

                <div className="session-map-teaser__grid">
                    {STEPS.map((step) => (
                        <div
                            className="session-map-teaser__card"
                            key={step.num}
                            style={{ '--st-color': step.color }}
                        >
                            <span className="session-map-teaser__card-num">{step.num}</span>
                            <span className="session-map-teaser__card-icon" aria-hidden="true">
                                {step.icon}
                            </span>
                            <h3 className="session-map-teaser__card-title">{step.title}</h3>
                            <span className="session-map-teaser__card-time">{step.time}</span>
                        </div>
                    ))}

                    <div className="session-map-teaser__ghost" aria-hidden="true">
                        <span>٥</span>
                        <span>٦</span>
                        <span>٧</span>
                        <span>٨</span>
                    </div>
                </div>

                <div className="session-map-teaser__cta">
                    <Link href="/os-session-map" className="session-map-teaser__button">
                        شوف الخريطة كاملة
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
