'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const steps = [
  {
    number: '01',
    title: 'لوحة التحكم',
    description: 'عرض إحصائيات شاملة عن الوظائف، الطلبات، المستخدمين، والنشاطات الأخيرة.',
    icon: '&#9874;',
  },
  {
    number: '02',
    title: 'إدارة الملفات الشخصية',
    description: 'مراجعة وإدارة ملفات المحترفين، التحقق من البيانات، وتحديث الحالات.',
    icon: '&#9733;',
  },
  {
    number: '03',
    title: 'إدارة الوظائف',
    description: 'الموافقة على الوظائف المنشورة، تعديلها، أو حذفها عند الضرورة.',
    icon: '&#9874;',
  },
  {
    number: '04',
    title: 'إدارة أصحاب العمل',
    description: 'إدارة حسابات أصحاب العمل، مراجعة شركاتهم، ومتابعة نشاطاتهم.',
    icon: '&#9733;',
  },
  {
    number: '05',
    title: 'الاشتراكات',
    description: 'إدارة خطط الاشتراك، الترقيات، والمدفوعات لأصحاب العمل.',
    icon: '&#9874;',
  },
];

export default function AdminSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tableRef = useRef(null);
  const stepsRef = useRef([]);
  const calloutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 }
      );

      stepsRef.current.forEach((step, i) => {
        if (step) {
          gsap.fromTo(
            step,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: 'power3.out',
              delay: 0.3 + i * 0.1,
            }
          );
        }
      });

      gsap.fromTo(
        calloutRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.9 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="admin"
      ref={sectionRef}
      className="cg-section"
      dir="rtl"
      style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(180deg, #0f172a 0%, #1a0a2e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <div ref={headerRef} style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              marginBottom: '1rem',
              color: '#c084fc',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            <span>&#9733;</span>
            <span>قسم المسؤول</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '0.75rem',
              lineHeight: 1.3,
            }}
          >
            دليل المسؤول
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.72)',
              maxWidth: '600px',
              lineHeight: 1.7,
            }}
          >
            كل ما يحتاجه المسؤول لإدارة نظام التوظيف بكفاءة وسلاسة
          </p>
        </div>

        {/* Login Credentials Table */}
        <div
          ref={tableRef}
          style={{
            marginBottom: '3rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '1rem',
            border: '1px solid rgba(168, 85, 247, 0.15)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(168, 85, 247, 0.08)',
          }}
        >
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(168, 85, 247, 0.08)',
              borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#c084fc',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            <span style={{ fontSize: '1.1em' }}>&#128273;</span>
            <span>بيانات تسجيل الدخول</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table
              className="cg-table"
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.95rem',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'right',
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    البيان
                  </th>
                  <th
                    style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'right',
                      color: 'rgba(255, 255, 255, 0.72)',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    القيمة
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ transition: 'background 0.2s' }}>
                  <td
                    style={{
                      padding: '1rem 1.5rem',
                      color: 'rgba(255, 255, 255, 0.88)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      fontWeight: 500,
                    }}
                  >
                    اسم المستخدم
                  </td>
                  <td
                    style={{
                      padding: '1rem 1.5rem',
                      color: '#f8fafc',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      fontFamily: 'monospace',
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    admin
                  </td>
                </tr>
                <tr style={{ transition: 'background 0.2s' }}>
                  <td
                    style={{
                      padding: '1rem 1.5rem',
                      color: 'rgba(255, 255, 255, 0.88)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      fontWeight: 500,
                    }}
                  >
                    كلمة المرور
                  </td>
                  <td
                    style={{
                      padding: '1rem 1.5rem',
                      color: '#fbbf24',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    Password123!
                  </td>
                </tr>
                <tr style={{ transition: 'background 0.2s' }}>
                  <td
                    style={{
                      padding: '1rem 1.5rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 500,
                    }}
                  >
                    رابط الدخول
                  </td>
                  <td
                    style={{
                      padding: '1rem 1.5rem',
                      color: '#a855f7',
                      fontWeight: 600,
                      direction: 'ltr',
                      textAlign: 'right',
                    }}
                  >
                    /admin/careers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[index] = el; }}
              className="cg-step"
              style={{
                position: 'relative',
                padding: '1.75rem',
                borderRadius: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(168, 85, 247, 0.12)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Step number */}
              <div
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'rgba(168, 85, 247, 0.12)',
                  lineHeight: 1,
                  fontFamily: 'monospace',
                  direction: 'ltr',
                  userSelect: 'none',
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className="cg-icon"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  background: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  color: '#c084fc',
                  marginBottom: '1rem',
                }}
                dangerouslySetInnerHTML={{ __html: step.icon }}
              />

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#f8fafc',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.78)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Important Callout */}
        <div
          ref={calloutRef}
          className="cg-callout"
          style={{
            position: 'relative',
            padding: '1.75rem 2rem',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(251, 191, 36, 0.03) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            boxShadow: '0 4px 24px rgba(251, 191, 36, 0.06)',
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)',
              borderRadius: '0 1rem 1rem 0',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingRight: '1rem' }}>
            {/* Warning Icon */}
            <div
              style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(251, 191, 36, 0.12)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                color: '#fbbf24',
                fontSize: '1.2rem',
              }}
            >
              &#9888;
            </div>

            <div>
              <h4
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#fbbf24',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3,
                }}
              >
                ملاحظة مهمة: موافقة الوظائف
              </h4>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                كل وظيفة يقوم صاحب العمل بنشرها تتطلب موافقة المسؤول قبل أن تصبح
                مرئية للمحترفين. تأكد من مراجعة الوظائف الجديدة بانتظام في لوحة
                التحكم واتخاذ قرار الموافقة أو الرفض بناءً على جودة المحتوى.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
