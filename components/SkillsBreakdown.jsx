'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DATA } from '@/lib/data';

export default function SkillsBreakdown() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline SVG on scroll
        gsap.to('.skills-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.skills-breakdown',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate skill cards with staggered fade-in
        gsap.from('.skill-detail-card', {
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    }, []);

    return (
        <section className="skills-breakdown">
            {/* Section Heading */}
            <div className="section-heading">
                <h2 className="section-title">
                    Technical <span className="italic-text">Expertise</span>
                </h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="160"
                    viewBox="0 0 159 17"
                    fill="none"
                    className="skills-underline-svg"
                >
                    <path
                        d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
                {SKILLS_DATA.map((skill) => (
                    <div
                        key={skill.category}
                        className={`skill-detail-card skill-card-${skill.color}`}
                    >
                        {/* Category Badge */}
                        <div className={`skill-badge badge-${skill.color}`}>
                            <span className="badge-text">{skill.category}</span>
                        </div>

                        {/* Category Title */}
                        <h3 className="skill-card-title">{skill.category}</h3>

                        {/* Skills List */}
                        <ul className="skill-list">
                            {skill.skills.map((skillItem) => (
                                <li key={skillItem} className="skill-item">
                                    <span className="skill-dot"></span>
                                    {skillItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
