'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const jobs = [
  { title: 'Head Football Coach - Youth Academy', company: 'نادي الأحلام الرياضي', city: 'القاهرة' },
  { title: 'Strength and Conditioning Coach - Multi-Sport', company: 'نادي الأحلام الرياضي', city: 'القاهرة' },
  { title: 'Sports Nutritionist', company: 'نادي الأحلام الرياضي', city: 'القاهرة' },
  { title: 'Senior Football Academy Coach', company: 'النادي الأهلي', city: 'القاهرة' },
  { title: 'Head Strength & Conditioning Coach', company: 'أكاديمية الرياضة السعودية', city: 'الرياض' },
  { title: 'Sports Nutrition Manager', company: 'مجلس دبي الرياضي', city: 'دبي' },
  { title: 'Sports Psychologist - Football Department', company: 'النادي الأهلي', city: 'القاهرة' },
];

const professionals = [
  { name: 'أحمد حسن', role: 'مدرب رئيسي', sport: 'كرة قدم', exp: 10, level: 'محترف' },
  { name: 'سارة آل سعود', role: 'أخصائية تغذية', sport: 'ألعاب قوى / سباحة', exp: 7, level: 'خبير' },
  { name: 'محمد عمر', role: 'مدرب إعداد بدني', sport: 'كرة سلة / طائرة', exp: 8, level: 'محترف' },
  { name: 'فاطمة الكواري', role: 'أخصائية علم نفس', sport: 'تنس / جولف', exp: 6, level: 'متوسط' },
  { name: 'عبدالله المطيري', role: 'معالج طبيعي', sport: 'كرة قدم / يد', exp: 5, level: 'متوسط' },
];

const stats = [
  { label: 'المحترفين', value: 5, color: 'cg-stat-orange' },
  { label: 'أصحاب العمل', value: 4, color: 'cg-stat-amber' },
  { label: 'الوظائف النشطة', value: 7, color: 'cg-stat-gold' },
];

export default function SeedsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cg-fade', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} dir="rtl" className="cg-section cg-seeds">
      <div className="cg-container">
        <h2 className="cg-title cg-fade">البيانات الأولية — Database Seeds</h2>
        <p className="cg-subtitle cg-fade">
          ملخص لما يتم إنشاؤه تلقائياً عند تشغيل سكريبت البذور في النظام.
        </p>

        <div className="cg-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className={`cg-card cg-fade ${stat.color}`}>
              <div className="cg-stat-value">{stat.value}</div>
              <div className="cg-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="cg-card cg-fade">
          <h3 className="cg-card-title">
            <span className="cg-badge cg-badge-orange">7</span>
            الوظائف المتاحة
          </h3>
          <div className="cg-table-wrap">
            <table className="cg-table cg-jobs-table">
              <thead>
                <tr>
                  <th>اسم الوظيفة</th>
                  <th>الشركة</th>
                  <th>المدينة</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => (
                  <tr key={i}>
                    <td className="cg-job-title">{job.title}</td>
                    <td>{job.company}</td>
                    <td>
                      <span className="cg-badge cg-badge-amber">{job.city}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cg-card cg-fade">
          <h3 className="cg-card-title">
            <span className="cg-badge cg-badge-amber">5</span>
            المحترفين المسجلين
          </h3>
          <div className="cg-table-wrap">
            <table className="cg-table cg-pros-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الدور</th>
                  <th>الرياضة</th>
                  <th>سنين الخبرة</th>
                  <th>المستوى</th>
                </tr>
              </thead>
              <tbody>
                {professionals.map((pro, i) => (
                  <tr key={i}>
                    <td className="cg-pro-name">{pro.name}</td>
                    <td>{pro.role}</td>
                    <td>
                      <span className="cg-badge cg-badge-outline">{pro.sport}</span>
                    </td>
                    <td className="cg-exp-cell">{pro.exp}</td>
                    <td>
                      <span
                        className={`cg-badge ${
                          pro.level === 'خبير'
                            ? 'cg-badge-gold'
                            : pro.level === 'محترف'
                            ? 'cg-badge-orange'
                            : 'cg-badge-amber'
                        }`}
                      >
                        {pro.level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cg-callout cg-callout-warning cg-fade">
          <div className="cg-callout-icon">⚠️</div>
          <div className="cg-callout-body">
            <h4>ما لا يتم تخزينه في البذور</h4>
            <p>
              العناصر التالية <strong>لا يتم إنشاؤها</strong> تلقائياً وتحتاج إلى إنشاء يدوي
              لأغراض الاختبار:
            </p>
            <ul className="cg-callout-list">
              <li>اشتراكات التنبيهات — <code>CareersSubscription</code></li>
              <li>الوظائف المحفوظة — <code>JobBookmark</code></li>
              <li>التنبيهات الوظيفية — <code>JobAlert</code></li>
              <li>عمليات البحث المحفوظة — <code>SavedSearch</code></li>
              <li>مشاهدات الملف الشخصي — <code>ProfileView</code></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
