'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import '../styles/experience.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';

// Experience data from Omar's portfolio
const EXPERIENCE_DATA = [
    {
        id: 1,
        company: 'Navaia.sa',
        role: 'Mid-Senior Full-Stack & Tech Solution Engineer',
        location: 'KSA',
        period: '2025 – Present',
        type: 'Full-time',
        achievements: [
            'Architected and maintained scalable QA platform and reporting systems',
            'Designed optimized PostgreSQL schemas and integrated MongoDB for high-volume data',
            'Led end-to-end CI/CD deployments on AWS with automated testing pipelines',
            'Implemented Playwright-based E2E test suites for multi-environment reliability',
            'Developed secure REST APIs and tRPC/ORPC endpoints with authentication',
            'Mentored junior developers on clean code principles and design patterns',
            'Troubleshot production issues and optimized system performance via CloudWatch'
        ],
        tech: ['PostgreSQL', 'MongoDB', 'AWS', 'Playwright', 'tRPC', 'CI/CD', 'Node.js', 'Python']
    },
    {
        id: 2,
        company: 'Outlier',
        role: 'Tech Solution Engineer',
        location: 'Remote',
        period: '2024 – 2025',
        type: 'Full-time',
        achievements: [
            'Supported development and integration of data-driven web tools',
            'Enhanced system performance through schema optimization and caching strategies',
            'Implemented automated testing frameworks for feature validation',
            'Collaborated with cross-functional teams for reliable E2E deliveries',
            'Maintained code quality standards across staging and production'
        ],
        tech: ['API Optimization', 'Testing', 'Performance', 'CI/CD']
    },
    {
        id: 3,
        company: 'Freelance (Upwork)',
        role: 'Full-Stack Developer',
        location: 'Remote (KSA, Hungary, Egypt, Indonesia)',
        period: '2024 – Present',
        type: 'Freelance',
        achievements: [
            'Designed and delivered LMS, e-commerce platforms, and analytics systems',
            'Owned full delivery lifecycle: requirements, architecture, development, deployment',
            'Built scalable backend systems using Node.js and Python (FastAPI)',
            'Implemented comprehensive E2E test suites with Playwright',
            'Set up CI/CD pipelines on Vercel and AWS for automated deployments',
            'Designed normalized PostgreSQL schemas and optimized queries',
            'Managed client relationships and milestone tracking for long-term partnerships',
            'Deployed applications to AWS (EC2, S3, RDS) and Vercel with monitoring'
        ],
        tech: ['Next.js', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Playwright', 'AWS', 'Vercel', 'Stripe']
    },
    {
        id: 4,
        company: 'Google Developer Student Club',
        role: 'Frontend Web Tutor (React & Flutter)',
        location: 'Benha University',
        period: '2021 – 2022',
        type: 'Part-time',
        achievements: [
            'Delivered workshops on frontend and mobile development',
            'Guided students in building production-like applications',
            'Authored tutorials on state management and clean architecture',
            'Mentored students in React, TypeScript, and Flutter best practices'
        ],
        tech: ['React', 'TypeScript', 'Flutter', 'Teaching', 'Workshops']
    }
];

const EDUCATION_DATA = {
    degree: 'B.Sc. Computer Science & Artificial Intelligence',
    university: 'Benha University',
    location: 'Egypt',
    focus: 'CS & AI, Full-Stack Development, Software Architecture'
};

export default function ExperiencePage() {
    const heroRef = useRef(null);
    const timelineRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        // Hero animation
        if (heroRef.current) {
            const title = heroRef.current.querySelector('.hero-title');
            const subtitle = heroRef.current.querySelector('.hero-subtitle');

            if (title) title.style.opacity = '1';
            if (subtitle) {
                setTimeout(() => {
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                }, 200);
            }
        }

        // Timeline animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const dot = item.querySelector('.timeline-dot');
                    const content = item.querySelector('.timeline-content');
                    const line = item.querySelector('.timeline-line-fill');

                    if (dot) {
                        dot.classList.add('visible');
                    }
                    if (content) {
                        content.classList.add('visible');
                    }
                    if (line) {
                        line.style.height = '100%';
                    }

                    observer.unobserve(item);
                }
            });
        }, observerOptions);

        itemsRef.current.forEach(item => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
          <SvgSymbols />
          <SmoothScroll />
          <CursorBubble />
          <TransitionScribble />
          <Navbar />

          {/* Hero Section */}
          <section className="experience-hero" ref={heroRef}>
            <h1 className="hero-title">Experience Journey</h1>
            <p className="hero-subtitle">4+ years building scalable solutions across LMS, e-commerce, QA, and analytics platforms</p>
          </section>

          {/* Timeline Section */}
          <section className="experience-timeline-section" ref={timelineRef}>
            <div className="timeline-container">
              <div className="timeline-vertical-line">
                <div className="timeline-line-fill"></div>
              </div>

              {EXPERIENCE_DATA.map((exp, index) => (
                <div
                  key={exp.id}
                  ref={el => itemsRef.current[index] = el}
                  className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                >
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner"></div>
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-content-header">
                      <span className="timeline-period">{exp.period}</span>
                      <span className={`timeline-type ${exp.type === 'Freelance' ? 'type-freelance' : 'type-fulltime'}`}>
                        {exp.type}
                      </span>
                    </div>

                    <h2 className="timeline-company">{exp.company}</h2>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <p className="timeline-location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      {exp.location}
                    </p>

                    <ul className="timeline-achievements">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>

                    <div className="timeline-tech">
                      {exp.tech.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="education-section">
            <div className="education-container">
              <h2 className="education-title">Education</h2>
              <div className="education-card">
                <div className="education-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="education-content">
                  <h3 className="education-degree">{EDUCATION_DATA.degree}</h3>
                  <p className="education-university">{EDUCATION_DATA.university}</p>
                  <p className="education-location">{EDUCATION_DATA.location}</p>
                  <p className="education-focus">{EDUCATION_DATA.focus}</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="main-footer">
            <Footer />
          </footer>
        </>
    );
}
