'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const sections = [
  {
    id: 'admin',
    title: 'المسؤول',
    description: 'إدارة النظام بالكامل — الوظائف، الملفات الشخصية، أصحاب العمل، والاشتراكات.',
    icon: '&#9874;',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    shadowColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 'professional',
    title: 'المحترف',
    description: 'إنشاء ملفك الشخصي، رفع السيرة الذاتية، والتقديم على الوظائف المناسبة.',
    icon: '&#9733;',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    shadowColor: 'rgba(59, 130, 246, 0.15)',
  },
  {
    id: 'employer',
    title: 'صاحب العمل',
    description: 'نشر فرص العمل، إدارة الطلبات، والتواصل مع المرشحين المؤهلين.',
    icon: '&#9733;',
    color: '#22c55e',
    bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    shadowColor: 'rgba(34, 197, 94, 0.15)',
  },
  {
    id: 'seeds',
    title: 'البيانات الأساسية',
    description: 'فهم البيانات الأولية والفئات المُعدة مسبقاً في النظام.',
    icon: '&#9733;',
    color: '#f97316',
    bgGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%)',
    borderColor: 'rgba(249, 115, 22, 0.3)',
    shadowColor: 'rgba(249, 115, 22, 0.15)',
  },
];

export default function OverviewCards() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: 0.2 + i * 0.12,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="cg-section"
      dir="rtl"
      style={{
        padding: '5rem 2rem',
        background: '#0f172a',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              marginBottom: '1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.8rem',
            }}
          >
            <span>&#9734;</span>
            <span>أقسام الدليل</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '1rem',
              lineHeight: 1.3,
            }}
          >
            استكشف أقسام دليل التوظيف
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.72)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            اختر القسم المناسب لك لتبدأ رحلتك في استخدام النظام
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {sections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="cg-card"
              onClick={() => handleScroll(section.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleScroll(section.id); }}
              style={{
                position: 'relative',
                padding: '2rem',
                borderRadius: '1.25rem',
                border: `1px solid ${section.borderColor}`,
                background: section.bgGradient,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                boxShadow: `0 4px 24px ${section.shadowColor}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${section.shadowColor}`;
                e.currentTarget.style.borderColor = section.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 24px ${section.shadowColor}`;
                e.currentTarget.style.borderColor = section.borderColor;
              }}
            >
              {/* Icon */}
              <div
                className="cg-icon"
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  background: `rgba(255, 255, 255, 0.05)`,
                  border: `1px solid ${section.borderColor}`,
                  color: section.color,
                  marginBottom: '1.25rem',
                }}
                dangerouslySetInnerHTML={{ __html: section.icon }}
              />

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3,
                }}
              >
                {section.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                }}
              >
                {section.description}
              </p>

              {/* CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: section.color,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                <span>انتقل إلى القسم</span>
                <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>&#8592;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
