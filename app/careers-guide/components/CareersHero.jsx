'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CareersHero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.8 }
      );
      gsap.fromTo(
        decorRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cg-section"
      dir="rtl"
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #1e1b4b 70%, #0f172a 100%)',
      }}
    >
      {/* Decorative Background Elements */}
      <div
        ref={decorRef}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '800px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '9999px',
            padding: '0.5rem 1.25rem',
            marginBottom: '2rem',
            color: '#c084fc',
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          <span style={{ fontSize: '1.1em' }}>&#9733;</span>
          <span>دليل استخدام شامل</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #e9d5ff 0%, #fbbf24 50%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          دليل التوظيف
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.75)',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          دليلك الشامل لإدارة نظام التوظيف — مصمم للمسؤولين، والمحترفين، وأصحاب العمل. تعلم كيفية استخدام المنصة بخطوات واضحة وبسيطة.
        </p>

        {/* Master Key Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '1rem',
            padding: '1.5rem 2.5rem',
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#fbbf24',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ fontSize: '1.2em' }}>&#128273;</span>
            <span>المفتاح الرئيسي</span>
          </div>
          <div
            className="cg-badge"
            style={{
              fontFamily: 'monospace',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fbbf24',
              letterSpacing: '0.1em',
              direction: 'ltr',
              padding: '0.5rem 1.5rem',
              background: 'rgba(251, 191, 36, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            Password123!
          </div>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
            }}
          >
            كلمة المرور هذه مطلوبة لدخول لوحة التحكم
          </p>
        </div>
      </div>
    </section>
  );
}
