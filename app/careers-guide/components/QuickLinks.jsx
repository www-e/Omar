'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const quickLinks = [
  { role: 'المسؤول', main: '/admin/careers', register: '-' },
  { role: 'باحث عن عمل', main: '/careers/dashboard', register: '/careers/register' },
  { role: 'شركة توظيف', main: '/careers/employers/dashboard', register: '/careers/employers/(auth)/register' },
];

const scenarios = [
  {
    title: 'سيناريو ١: المسؤول يوافق على وظيفة',
    color: '#a855f7',
    steps: [
      'ادخل بـ admin / Password123!',
      'روح لـ /admin/careers/jobs',
      'اضغط على الوظيفة ← اضغط "موافقة"',
      'الوظيفة تظهر للباحثين في /careers/jobs',
    ],
  },
  {
    title: 'سيناريو ٢: باحث يتقدم على وظيفة',
    color: '#3b82f6',
    steps: [
      'ادخل بـ ahmed_coach / Password123!',
      'روح لـ /careers/jobs',
      'اختر وظيفة ← اضغط "تقديم"',
      'شوف طلبك في /careers/my-applications',
    ],
  },
  {
    title: 'سيناريو ٣: شركة تنشر وظيفة',
    color: '#22c55e',
    steps: [
      'ادخل بـ alahlam.sports / Password123!',
      'روح لـ /careers/employers/post-job',
      'املأ بيانات الوظيفة ← اضغط "نشر"',
      'المسؤول لازم يوافق عشان تظهر للجميع',
    ],
  },
];

export default function QuickLinks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cg-fade', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="cg-section cg-quicklinks">
      <div className="cg-container">
        <h2 className="cg-title cg-fade">روابط سريعة وسيناريوهات الاختبار</h2>
        <p className="cg-subtitle cg-fade">
          روابط مباشرة لكل دور، وسيناريوهات عملية لاختبار النظام خطوة بخطوة.
        </p>

        <div className="cg-card cg-fade">
          <h3 className="cg-card-title">🔗 روابط سريعة للاختبار</h3>
          <div className="cg-table-wrap">
            <table className="cg-table">
              <thead>
                <tr>
                  <th>الدور</th>
                  <th>الرابط الرئيسي</th>
                  <th>رابط التسجيل</th>
                </tr>
              </thead>
              <tbody>
                {quickLinks.map((link, i) => (
                  <tr key={i}>
                    <td className="font-semibold">{link.role}</td>
                    <td>
                      <code className="cg-code">{link.main}</code>
                    </td>
                    <td>
                      {link.register === '-' ? (
                        <span className="cg-muted">—</span>
                      ) : (
                        <code className="cg-code">{link.register}</code>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cg-scenarios-grid">
          {scenarios.map((scenario, i) => (
            <div
              key={i}
              className="cg-card cg-scenario-card cg-fade"
              style={{ borderTop: `4px solid ${scenario.color}` }}
            >
              <div className="cg-scenario-header">
                <span
                  className="cg-scenario-dot"
                  style={{ background: scenario.color }}
                />
                <h4 className="cg-scenario-title">{scenario.title}</h4>
              </div>
              <ol className="cg-scenario-steps">
                {scenario.steps.map((step, j) => (
                  <li key={j} className="cg-scenario-step">
                    <span className="cg-step-num" style={{ color: scenario.color }}>
                      {j + 1}
                    </span>
                    <span className="cg-step-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div className="cg-master-password cg-fade">
          <span className="cg-password-label">🔐 كلمة المرور الموحدة لجميع الحسابات:</span>
          <span className="cg-password-value">Password123!</span>
        </div>
      </div>
    </section>
  );
}
