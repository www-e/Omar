'use client';

import { useEffect, useRef } from 'react';
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
        company: 'iSchool',
        role: 'English Coding Instructor',
        location: 'Cairo, Egypt (Hybrid)',
        period: 'Feb 2026 – Present',
        type: 'Full-time',
        achievements: [
            'Delivering live coding education entirely in English to diverse student cohorts',
            'Conducted 500+ live coding sessions covering web development, programming logic, and modern frameworks',
            'Designed adaptive hands-on projects and exercises tailored to varying student skill levels',
            'Tracked individual progress through structured assessments and code reviews with targeted feedback',
            'Collaborated with education team to refine curriculum structure and instructional materials'
        ],
        tech: ['JavaScript', 'React', 'Web Development', 'Mentoring', 'Curriculum Design', 'English Instruction']
    },
    {
        id: 2,
        company: 'Navaia.sa',
        role: 'Full-Stack Engineer & Tech Solution Consultant',
        location: 'KSA (Remote)',
        period: 'Jun 2025 – Present',
        type: 'Full-time',
        achievements: [
            'Architected and maintained scalable QA platform and reporting systems across frontend, backend, and AI teams',
            'Designed optimized PostgreSQL schemas and integrated MongoDB for high-volume data processing',
            'Led end-to-end CI/CD deployments on AWS with automated testing pipelines and staging environments',
            'Built Playwright-based E2E test suites ensuring reliability across multiple environments',
            'Developed secure REST APIs and tRPC/ORPC endpoints with proper authentication, authorization, and error handling',
            'Mentored junior developers on clean code principles, design patterns, and full-stack best practices',
            'Troubleshot production issues with CloudWatch monitoring and optimized system performance'
        ],
        tech: ['PostgreSQL', 'MongoDB', 'AWS', 'Playwright', 'tRPC', 'ORPC', 'CI/CD', 'Node.js', 'Python', 'CloudWatch']
    },
    {
        id: 3,
        company: 'Suplift',
        role: 'Full-Stack Developer',
        location: 'Riyadh, KSA (Remote)',
        period: 'Jan 2025 – Mar 2025',
        type: 'Full-time',
        achievements: [
            'Developed and maintained features for "Yallanrooh", Suplift\'s flagship entertainment platform',
            'Built responsive UI components using React and integrated APIs for real-time data delivery',
            'Collaborated with product and design teams to implement interactive user experiences',
            'Optimized rendering performance and contributed to CI/CD pipeline improvements'
        ],
        tech: ['React', 'Node.js', 'API Integration', 'CI/CD', 'UI/UX', 'Performance Optimization']
    },
    {
        id: 4,
        company: 'Freelance (Upwork)',
        role: 'Freelance Full-Stack Developer',
        location: 'Remote (KSA, Hungary, Egypt, Indonesia)',
        period: '2024 – Present',
        type: 'Freelance',
        achievements: [
            'Designed and delivered production-grade LMS, e-commerce platforms, and analytics systems for international clients',
            'Owned full delivery lifecycle: requirements gathering, architecture, development, testing, deployment',
            'Built scalable backend systems using Node.js and Python (FastAPI) with Prisma ORM and robust authentication',
            'Implemented comprehensive E2E test suites with Playwright and unit tests for code reliability',
            'Set up CI/CD pipelines on Vercel and AWS for automated deployments and continuous integration',
            'Designed normalized PostgreSQL schemas and optimized queries for high-performance data retrieval',
            'Managed client relationships, milestone tracking, and async workflows for long-term partnerships',
            'Deployed applications to AWS (EC2, S3, RDS) and Vercel with proper monitoring and fallback strategies'
        ],
        tech: ['Next.js', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Playwright', 'AWS', 'Vercel', 'Prisma']
    },
    {
        id: 5,
        company: 'Outlier',
        role: 'AI/ML Specialist',
        location: 'Remote (Part-time)',
        period: 'Mar 2023 – Sep 2025',
        type: 'Part-time',
        achievements: [
            'Contributed to AI-driven evaluation tasks and data-driven web tool development',
            'Worked with prompt engineering and large language models (LLMs) for benchmarking tasks',
            'Enhanced system performance through schema optimization, caching strategies, and API improvements',
            'Implemented automated testing frameworks to validate feature deliveries across environments',
            'Collaborated with cross-functional teams to ensure reliable E2E deliveries and code quality'
        ],
        tech: ['Python', 'LLMs', 'Prompt Engineering', 'API Optimization', 'Testing', 'Performance']
    },
    {
        id: 6,
        company: 'Sportologyplus (Alostaz EDU)',
        role: 'Software Developer & Data Analyst',
        location: 'Benha, Egypt (On-site)',
        period: 'Jan 2023 – Sep 2024',
        type: 'Full-time',
        achievements: [
            'Led the development of a cutting-edge Learning Management System, enhancing user engagement and retention',
            'Optimized PostgreSQL schema and implemented advanced Prisma ORM models for SQL analytics reporting',
            'Developed interactive Power BI dashboards to monitor KPIs, improving leadership decision-making',
            'Established continuous deployment pipelines on Vercel, boosting site performance and reliability'
        ],
        tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Power BI', 'CI/CD', 'Vercel', 'LMS']
    },
    {
        id: 7,
        company: 'INTELCIA',
        role: 'Data Analyst',
        location: 'El Sheikh Zaid, Egypt (On-site)',
        period: 'May 2024 – Sep 2024',
        type: 'Full-time',
        achievements: [
            'Analyzed customer interaction data using SQL to identify trends and actionable opportunities',
            'Created interactive Power BI dashboards visualizing response times, resolution rates, and CSAT scores',
            'Collaborated with team leads to optimize support workflows through data-driven improvements',
            'Resolved customer inquiries with high quality, ensuring satisfaction through clear communication'
        ],
        tech: ['SQL', 'Power BI', 'Data Analysis', 'KPI Tracking', 'Customer Support']
    },
    {
        id: 8,
        company: 'Google Developer Student Club (GDSC)',
        role: 'Web Development Instructor',
        location: 'Benha University (On-site)',
        period: 'Jan 2022 – Jul 2022',
        type: 'Part-time',
        achievements: [
            'Delivered engaging web development workshops on modern web technologies',
            'Guided students in React, TypeScript, and Flutter best practices',
            'Authored tutorials on state management, clean architecture, and backend API integration',
            'Collaborated to create a supportive learning environment, resulting in 30% increase in student engagement'
        ],
        tech: ['React', 'TypeScript', 'Flutter', 'Teaching', 'Workshops', 'Mentoring']
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

          <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <section className="experience-hero" ref={heroRef} aria-labelledby="experience-heading">
            <h1 className="hero-title" id="experience-heading">Experience Journey</h1>
            <p className="hero-subtitle">5+ years architecting scalable platforms across LMS, e-commerce, QA, analytics, and entertainment</p>
          </section>

          {/* Timeline Section */}
          <section className="experience-timeline-section" ref={timelineRef} aria-label="Career timeline">
            <div className="timeline-container">
              <div className="timeline-vertical-line" aria-hidden="true">
                <div className="timeline-line-fill"></div>
              </div>

              <ul className="timeline-list">
                {EXPERIENCE_DATA.map((exp, index) => (
                  <li
                    key={exp.id}
                    ref={el => itemsRef.current[index] = el}
                    className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                  >
                    <div className="timeline-dot" aria-hidden="true">
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Education Section */}
          <section className="education-section" aria-labelledby="experience-education-title">
            <div className="education-container">
              <h2 className="education-title" id="experience-education-title">Education</h2>
              <div className="education-card">
                <div className="education-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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
          </main>

          <footer className="main-footer">
            <Footer />
          </footer>
        </>
    );
}
