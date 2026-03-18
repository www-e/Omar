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
    if (heroRef.current) {
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

      <main className="about-page">
        <section className="about-hero" ref={heroRef}>
          <div className="about-hero-content">
            <h1 className="about-hero-text">
              About Me
            </h1>
            <div className="sticker-container">
              <img
                src="/stickers/about-sticker.svg"
                alt="About Sticker"
                className="about-sticker"
              />
            </div>

            <div className="about-hero__text">
              <p>
                Mid-senior full-stack engineer and B.Sc. in Computer Science & Artificial Intelligence from Benha University with 4+ years architecting and delivering scalable end-to-end web platforms.
              </p>
              <p>
                Proven expertise as Tech Solution Engineer at Navaia.sa, designing optimized database systems, implementing production CI/CD pipelines, and leading E2E testing strategies. Specialized in building high-performance solutions across LMS, e-commerce, QA, and analytics platforms with a focus on code quality, system reliability, and clean architecture.
              </p>
              <p>
                From AI-powered market platforms to luxury real estate investment systems, I transform complex requirements into elegant, production-grade applications that scale.
              </p>
            </div>

            <div className="about-hero__stats">
              <div className="stat-item">
                <div className="stat-number">2040+</div>
                <div className="stat-label">Hours</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">13+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">4+</div>
                <div className="stat-label">Years</div>
              </div>
            </div>
          </div>
        </section>

        {/* Education and Languages Section */}
        <section className="education-section">
          <div className="education-container">
            {/* Education Block */}
            <div className="education-block">
              <div className="education-content">
                <span className="education-badge">Education</span>
                <h3>B.Sc. Computer Science & Artificial Intelligence</h3>
                <p className="institution">Benha University, Egypt</p>
              </div>
            </div>

            {/* Languages Block */}
            <div className="education-block">
              <div className="education-content">
                <span className="education-badge">Languages</span>
                <h3>Arabic & English</h3>
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
