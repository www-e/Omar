'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Page load animation - using ref for reliable targeting
    // Skip entrance animation for users who prefer reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (heroRef.current && !prefersReduced) {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }, []);

  return (
    <>
      <SvgSymbols />
      <SmoothScroll />
      <CursorBubble />
      <TransitionScribble />
      <Navbar />

      <main className="about-page" id="main-content" tabIndex={-1}>
        <section className="about-hero" ref={heroRef} aria-labelledby="about-heading">
          <div className="about-hero-content">
            <h1 className="about-hero-text" id="about-heading">
              About Me
            </h1>
            <div className="sticker-container">
              <img
                src="/stickers/about-sticker.svg"
                alt=""
                role="presentation"
                className="about-sticker"
              />
            </div>

            <div className="about-hero__text">
              <p>
                Senior Full-Stack Engineer with a B.Sc. in Computer Science & Artificial Intelligence from Benha University and 5+ years architecting and delivering scalable end-to-end web platforms. Currently engineering production-grade systems at Navaia.sa while serving as a Coding Instructor at iSchool.
              </p>
              <p>
                Deep technical proficiency across React, Next.js, Node.js, and Python, with extensive experience building REST APIs, integrating complex systems, and designing optimized database architectures on PostgreSQL and SQL Server. Skilled in developing executive dashboards and interactive reporting systems powered by Power BI and Tableau, with strong capabilities in data integration, processing, and transformation pipelines.
              </p>
              <p>
                Hands-on experience with machine learning concepts leveraging Pandas, NumPy, and Scikit-learn to build and integrate ML models into production applications. Domain experience spans LMS, e-commerce, QA, analytics, and entertainment platforms. Consistently driven by clean architecture, system reliability, and measurable business impact.
              </p>
            </div>

            <ul className="about-hero__stats">
              <li className="stat-item">
                <span className="stat-number">2040+</span>
                <span className="stat-label">Hours</span>
              </li>
              <li className="stat-item">
                <span className="stat-number">13+</span>
                <span className="stat-label">Projects</span>
              </li>
              <li className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Education and Languages Section */}
        <section className="education-section" aria-label="Education and languages">
          <div className="education-container">
            {/* Education Block */}
            <div className="education-block">
              <div className="education-content">
                <span className="education-badge">Education</span>
                <h2>B.Sc. Computer Science & Artificial Intelligence</h2>
                <p className="institution">Benha University, Egypt</p>
              </div>
            </div>

            {/* Languages Block */}
            <div className="education-block">
              <div className="education-content">
                <span className="education-badge">Languages</span>
                <h2>Arabic & English</h2>
                <ul className="language-list">
                  <li className="language-item">
                    <span className="language-name">Arabic</span>
                    <span className="language-level">Native/Bilingual</span>
                  </li>
                  <li className="language-item">
                    <span className="language-name">English</span>
                    <span className="language-level">Fluent</span>
                  </li>
                </ul>
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
