'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { PROJECTS_DATA } from '../../lib/data';
import '../styles/projects.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(PROJECTS_DATA);
    const pageRef = useRef(null);
    const projectsRef = useRef([]);

    const categories = [
        'All',
        'AI/ML',
        'E-commerce',
        'Education',
        'Web Development',
        'Development Tools',
        'Computer Vision'
    ];

    useEffect(() => {
        // Page load animation - add null check
        if (pageRef.current) {
            gsap.fromTo(pageRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, []);

    useEffect(() => {
        // Filter projects
        if (activeFilter === 'All') {
            setFilteredProjects(PROJECTS_DATA);
        } else {
            setFilteredProjects(PROJECTS_DATA.filter(project => project.category === activeFilter));
        }
    }, [activeFilter]);

    useEffect(() => {
        // Animate projects when filtered - add null check
        if (projectsRef.current.length > 0) {
            gsap.fromTo(projectsRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                }
            );
        }
    }, [filteredProjects]);

    const handleFilterClick = (category) => {
        setActiveFilter(category);
    };

    const totalHours = PROJECTS_DATA.reduce((sum, project) => sum + project.hours, 0);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <TransitionScribble />
            <Navbar />

            <div ref={pageRef} className="projects-page">
                {/* Hero Section */}
                <section className="projects-hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="title-line">Projects</span>
                            <span className="title-line highlight">Portfolio</span>
                        </h1>
                        <p className="hero-subtitle">
                            {totalHours}+ hours across {PROJECTS_DATA.length} production-grade applications
                        </p>
                    </div>
                    <div className="hero-decoration">
                        <div className="decoration-circle decoration-circle-1"></div>
                        <div className="decoration-circle decoration-circle-2"></div>
                        <div className="decoration-circle decoration-circle-3"></div>
                    </div>
                </section>

                {/* Filter Section */}
                <section className="filter-section">
                    <div className="filter-container">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                                onClick={() => handleFilterClick(category)}
                            >
                                {category}
                                {activeFilter === category && <span className="tab-indicator"></span>}
                            </button>
                        ))}
                    </div>
                    <div className="filter-count">
                        Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="projects-section">
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                ref={(el) => (projectsRef.current[index] = el)}
                                className="project-card"
                                style={{ '--project-color': `var(--color-${project.color})` }}
                            >
                                <div className="project-image">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="project-image-img"
                                        loading="lazy"
                                    />
                                    <div className="category-badge">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="project-content">
                                    <h3 className="project-title">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Hours:</span>
                                            <span className="meta-value">{project.hours}h</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Status:</span>
                                            <span className={`meta-value status-${project.status.toLowerCase()}`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="project-tech">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                    >
                                        <span>View Live</span>
                                        <svg className="link-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>

                                {project.featured && (
                                    <div className="featured-badge">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 0L9.856 6.144L16 8L9.856 9.856L8 16L6.144 9.856L0 8L6.144 6.144L8 0Z"/>
                                        </svg>
                                        Featured
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="no-projects">
                            <div className="no-projects-icon">🔍</div>
                            <h3>No projects found</h3>
                            <p>Try selecting a different category</p>
                        </div>
                    )}
                </section>
            </div>

            <footer className="main-footer">
                <Footer />
            </footer>
        </>
    );
}
