'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SmoothScroll from '@/components/SmoothScroll';
import CursorBubble from '@/components/CursorBubble';

import '../styles/os-session-map.css';

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
        desc: 'الطالب يعرف اسم الحصة وهدفها من أول لحظة. وبنفس العنوان اللي وعدناه في الخريطة.',
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
        desc: 'بنشوف الواجب اللي اتعمل في البيت خطوة خطوة. اللي فاهم يفضل واقف، واللي محتاج دعم بنقف جنبه.',
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
        desc: '٣ أسئلة على الماضي. مش امتحان — بس تأكيد إن محدش واقف في أرض ماشي.',
        time: '٣ دقائق',
        color: 'var(--color-lightgreen)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
        ),
    },
    {
        num: '٠٤',
        title: 'خريطة اليوم',
        desc: 'بنقول الطالب رايحين فين بالظبط اليوم. وبنربط الخريطة الجديدة باللي فات.',
        time: '٢ دقيقة',
        color: 'var(--color-orange)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
                <path d="M9 3v15M15 6v15" />
            </svg>
        ),
    },
    {
        num: '٠٥',
        title: 'الشرح النظري',
        desc: 'شرح كود حقيقي — مش بوربوينت. كل مفهوم له مثال في الكود قدامه.',
        time: '١٥ دقيقة',
        color: 'var(--color-pink)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        ),
    },
    {
        num: '٠٦',
        title: 'التطبيق العملي',
        desc: 'الطالب يكتب الكود بنفسه وأنا معاه. الأخطاء هنا محفورة في الذاكرة مش في الدفتر.',
        time: '٢٠ دقيقة',
        color: 'var(--color-green)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="m16 18 6-6-6-6" />
                <path d="m8 6-6 6 6 6" />
            </svg>
        ),
    },
    {
        num: '٠٧',
        title: 'أسئلة التأكد',
        desc: 'أسئلة سريعة نتأكد إن المعلومة خدت طريقها. لو مفيش فهم — بنرجع ونوضح تاني.',
        time: '٥ دقائق',
        color: 'var(--color-maroon)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
    {
        num: '٠٨',
        title: 'واجب التحدي',
        desc: 'واجب واحد بس — صعب شوية — يحلّه لوحده. وده اللي بيصنع الفرق فعلاً.',
        time: '٢ دقيقة',
        color: 'var(--color-lightblue)',
        icon: (
            <svg viewBox="0 0 24 24" {...ICON_PROPS} aria-hidden="true">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
            </svg>
        ),
    },
];

export default function SessionMapContent() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            gsap.set(
                '.os-hero__badge, .os-hero__title, .os-hero__sub, .os-timeline__line, .os-step, .os-cta__inner',
                { opacity: 1, clearProps: 'all' }
            );
            return;
        }

        const ctx = gsap.context(() => {
            // Hero entrance
            gsap.fromTo(
                '.os-hero__badge',
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
            );
            gsap.fromTo(
                '.os-hero__title',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.25 }
            );
            gsap.fromTo(
                '.os-hero__sub',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 }
            );
            gsap.fromTo(
                '.os-hero__scroll',
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.7 }
            );

            // Timeline gradient line draw
            gsap.fromTo(
                '.os-timeline__line',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.4,
                    ease: 'power3.inOut',
                    scrollTrigger: { trigger: '.os-timeline', start: 'top 80%' },
                }
            );

            // Staggered step reveals
            gsap.utils.toArray('.os-step').forEach((step) => {
                gsap.fromTo(
                    step,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: step, start: 'top 85%' },
                    }
                );
            });

            // CTA reveal
            gsap.fromTo(
                '.os-cta__inner',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.os-cta', start: 'top 80%' },
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="os-session-map-page" dir="rtl" lang="ar">
            <SmoothScroll />
            <CursorBubble />

            {/* Custom Arabic top bar — standalone from the English navbar */}
            <header className="os-topbar">
                <Link href="/" className="os-topbar__logo">
                    omar ashraf.
                </Link>
                <Link href="/" className="os-topbar__back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    العودة للرئيسية
                </Link>
            </header>

            <main>
                {/* Hero */}
                <section className="os-hero">
                    <div className="os-container os-hero__inner">
                        <span className="os-hero__badge">نظام تعليمي حصري</span>
                        <h1 className="os-hero__title">
                            خريطة كل حصة…
                            <br />
                            <span className="os-hero__title-accent">من أولها لآخرها</span>
                        </h1>
                        <p className="os-hero__sub">٨ خطوات ثابتة — كل حصة — كل طالب — بدون استثناء</p>
                        <a className="os-hero__scroll" href="#os-timeline" aria-label="اكتشف الخريطة">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </a>
                    </div>
                </section>

                {/* Timeline */}
                <section className="os-timeline-section" id="os-timeline">
                    <div className="os-container">
                        <h2 className="os-section__title">إيه اللي بيحصل في كل حصة؟</h2>
                        <p className="os-section__sub">٨ خطوات — ٥٣ دقيقة من التركيز الكامل في كل حصة</p>

                        <div className="os-timeline">
                            <span className="os-timeline__line" aria-hidden="true" />
                            {STEPS.map((step, i) => (
                                <article
                                    className={`os-step${i % 2 === 1 ? ' os-step--alt' : ''}`}
                                    key={step.num}
                                    style={{ '--os-step-color': step.color }}
                                >
                                    <span className="os-step__node" aria-hidden="true">
                                        {step.num}
                                    </span>
                                    <div className="os-step__card">
                                        <div className="os-step__head">
                                            <span className="os-step__icon" aria-hidden="true">
                                                {step.icon}
                                            </span>
                                            <h3 className="os-step__title">{step.title}</h3>
                                            <span className="os-step__time">{step.time}</span>
                                        </div>
                                        <p className="os-step__desc">{step.desc}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="os-cta">
                    <div className="os-container">
                        <div className="os-cta__inner">
                            <h2 className="os-cta__title">ده اللي بيكتب في كل حصة</h2>
                            <p className="os-cta__sub">لأن البرمجة ما تتعلمش بلا خريطة</p>
                            <a
                                className="os-cta__button"
                                href="https://wa.me/20115468628"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                احجز مكانك مجاناً
                            </a>
                            <p className="os-cta__note">الحجز مجاني — بدون أي رسوم — عبر المنصة</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Custom Arabic footer */}
            <footer className="os-footer">
                <div className="os-container os-footer__inner">
                    <span className="os-footer__brand">omarashraf.online</span>
                    <span className="os-footer__tag">البرمجة للصف الثاني الثانوي — نظام البكالوريا</span>
                </div>
            </footer>
        </div>
    );
}
