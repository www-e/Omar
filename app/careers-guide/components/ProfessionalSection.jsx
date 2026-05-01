'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ProfessionalSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cg-fade-in',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const accounts = [
    { username: 'ahmed_coach', name: 'أحمد حسن', role: 'مدرب كرة قدم', tier: 'Pro' },
    { username: 'sara_nutrition', name: 'سارة آل سعود', role: 'أخصائية تغذية رياضية', tier: 'Pro' },
    { username: 'mohamed_sc', name: 'محمد عمر', role: 'مدرب إعداد بدني', tier: 'Pro' },
    { username: 'fatima_psych', name: 'فاطمة الكواري', role: 'أخصائية علم نفس رياضي', tier: 'Basic' },
    { username: 'abdullah_trainer', name: 'عبدالله المطيري', role: 'معالج طبيعي', tier: 'Basic' },
  ];

  const flowSteps = [
    { label: 'الرئيسية', icon: '🏠' },
    { label: 'إنشاء الملف', icon: '📝' },
    { label: 'لوحة التحكم', icon: '📊' },
  ];

  const subSteps = [
    { label: 'الوظائف', icon: '💼' },
    { label: 'طلباتي', icon: '📨' },
    { label: 'الملف الشخصي', icon: '👤' },
    { label: 'الترقية', icon: '⭐' },
    { label: 'المحفوظات', icon: '🔖' },
    { label: 'التنبيهات', icon: '🔔' },
  ];

  const comparison = [
    { feature: 'عدد التقديمات', basic: '3 في الشهر', pro: 'غير محدود' },
    { feature: 'فيديو تعريفي', basic: '✕', pro: '✓' },
    { feature: 'روابط سوشيال ميديا', basic: '✕', pro: '✓' },
    { feature: 'رفع السيرة الذاتية', basic: '✓', pro: '✓' },
  ];

  return (
    <section ref={sectionRef} dir="rtl" className="cg-section professional-section">
      <div className="section-header cg-fade-in">
        <span className="section-tag">👤 دليل الباحثين عن عمل</span>
        <h2 className="section-title">
          <span className="text-cyan-400">المحترفين</span> — رحلتك نحو الوظيفة المثالية
        </h2>
        <p className="section-subtitle">
          دليل شامل لاستخدام النظام كباحث عن عمل في قطاع الرياضة
        </p>
      </div>

      <div className="cg-card cg-fade-in">
        <div className="card-header">
          <h3>🔐 بيانات تسجيل الدخول</h3>
          <span className="cg-badge cg-badge-demo">حسابات تجريبية</span>
        </div>
        <div className="table-wrapper">
          <table className="cg-table">
            <thead>
              <tr>
                <th>اسم المستخدم</th>
                <th>الاسم</th>
                <th>المهنة</th>
                <th>النوع</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => (
                <tr key={idx} className="table-row-animate">
                  <td>
                    <code className="username-code">{acc.username}</code>
                  </td>
                  <td className="font-semibold">{acc.name}</td>
                  <td>{acc.role}</td>
                  <td>
                    <span className={acc.tier === 'Pro' ? 'cg-badge cg-badge-pro' : 'cg-badge cg-badge-basic'}>
                      {acc.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note">🔑 كلمة المرور الموحدة: <strong>Password123!</strong></p>
      </div>

      <div className="cg-card cg-fade-in">
        <div className="card-header">
          <h3>🗺️ رحلتك في النظام</h3>
          <span className="cg-badge cg-badge-info">خطوات بسيطة</span>
        </div>
        <div className="cg-flow">
          <div className="flow-main">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="cg-step">
                  <span className="step-icon">{step.icon}</span>
                  <span className="step-label">{step.label}</span>
                </div>
                {idx < flowSteps.length - 1 && (
                  <span className="flow-arrow" aria-hidden="true">←</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flow-connector">
            <div className="connector-line" />
            <div className="connector-arrow">⬇</div>
          </div>
          <div className="flow-sub">
            {subSteps.map((step, idx) => (
              <div className="cg-step step-sub" key={idx}>
                <span className="step-icon">{step.icon}</span>
                <span className="step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cg-card cg-fade-in">
        <div className="card-header">
          <h3>⚖️ مقارنة الباقات</h3>
          <span className="cg-badge cg-badge-info">اختر ما يناسبك</span>
        </div>
        <div className="table-wrapper">
          <table className="cg-table cg-compare">
            <thead>
              <tr>
                <th>الميزة</th>
                <th className="col-basic">Basic</th>
                <th className="col-pro">Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, idx) => (
                <tr key={idx}>
                  <td className="feature-name">{row.feature}</td>
                  <td className="col-basic">
                    {row.basic === '✕' ? (
                      <span className="x-mark">✕</span>
                    ) : row.basic === '✓' ? (
                      <span className="check-mark">✓</span>
                    ) : (
                      row.basic
                    )}
                  </td>
                  <td className="col-pro">
                    {row.pro === '✕' ? (
                      <span className="x-mark">✕</span>
                    ) : row.pro === '✓' ? (
                      <span className="check-mark">✓</span>
                    ) : (
                      row.pro
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
