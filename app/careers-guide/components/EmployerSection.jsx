'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function EmployerSection() {
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
    { username: 'alahlam.sports', name: 'نادي الأحلام الرياضي', type: 'نادي رياضي', tier: 'Pro' },
    { username: 'alahly_sc', name: 'النادي الأهلي', type: 'نادي رياضي', tier: 'Pro' },
    { username: 'saudisports_academy', name: 'أكاديمية الرياضة السعودية', type: 'أكاديمية', tier: 'Pro' },
    { username: 'dubaisc', name: 'مجلس دبي الرياضي', type: 'جهة حكومية', tier: 'Basic' },
  ];

  const flowSteps = [
    { label: 'الرئيسية', icon: '🏠' },
    { label: 'تسجيل الشركة', icon: '🏢' },
    { label: 'لوحة التحكم', icon: '📊' },
  ];

  const subSteps = [
    { label: 'تصفح السير الذاتية', icon: '🔍' },
    { label: 'نشر وظيفة', icon: '📢' },
    { label: 'وظائفي', icon: '📋' },
    { label: 'المتقدمون', icon: '👥' },
    { label: 'الملف الشخصي', icon: '🏛️' },
    { label: 'الترقية', icon: '⭐' },
  ];

  const comparison = [
    { feature: 'عدد الوظائف المنشورة', basic: 'محدود', pro: 'غير محدود' },
    { feature: 'مشاهدة السير الذاتية', basic: 'محدود', pro: 'غير محدود' },
    { feature: 'فيديو تعريفي للشركة', basic: '✕', pro: '✓' },
    { feature: 'شارة "شريك معتمد"', basic: '✕', pro: '✓' },
  ];

  return (
    <section ref={sectionRef} dir="rtl" className="cg-section employer-section">
      <div className="section-header cg-fade-in">
        <span className="section-tag">🏢 دليل أصحاب العمل</span>
        <h2 className="section-title">
          <span className="text-emerald-400">أصحاب العمل</span> — وظّف أفضل الكفاءات الرياضية
        </h2>
        <p className="section-subtitle">
          دليل شامل لاستخدام النظام كجهة توظيف في قطاع الرياضة
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
                <th>النوع</th>
                <th>الباقة</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => (
                <tr key={idx} className="table-row-animate">
                  <td>
                    <code className="username-code">{acc.username}</code>
                  </td>
                  <td className="font-semibold">{acc.name}</td>
                  <td>{acc.type}</td>
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
