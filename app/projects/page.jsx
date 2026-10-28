'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
    PROJECTS_DATA,
    ARCHIVE_REPOS,
    PRIVATE_WORK,
    GITHUB_PROFILE,
    PUBLIC_REPO_TOTAL
} from '../../lib/data';
import '../styles/projects.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';
import LottieCharacter from '@/components/LottieCharacter';

const repoUrl = (repo) => `https://github.com/www-e/${repo}`;

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(PROJECTS_DATA);
    const [filteredArchive, setFilteredArchive] = useState(ARCHIVE_REPOS);
    const pageRef = useRef(null);
    const projectsRef = useRef([]);

    const categories = [
        'All',
        ...new Set(PROJECTS_DATA.map((project) => project.category))
    ];

    // How many curated cards each tab will show — rendered on the tab itself so
    // the active state always tells the visitor what is coming.
    const categoryCounts = categories.reduce((acc, category) => {
        acc[category] = category === 'All'
            ? PROJECTS_DATA.length
            : PROJECTS_DATA.filter((project) => project.category === category).length;
        return acc;
    }, {});

    const totalHours = PROJECTS_DATA.reduce((sum, project) => sum + (project.hours || 0), 0);
    const repoCount = PROJECTS_DATA.filter((project) => project.repo).length + ARCHIVE_REPOS.length;

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (pageRef.current) {
            gsap.fromTo(pageRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, []);

    useEffect(() => {
        const matches = (item) => activeFilter === 'All' || item.category === activeFilter;
        setFilteredProjects(PROJECTS_DATA.filter(matches));
        setFilteredArchive(ARCHIVE_REPOS.filter(matches));
    }, [activeFilter]);

    // The mascot reacts to a filter change — skipped on the first render and
    // whenever the visitor asked for reduced motion.
    const isFirstFilterRender = useRef(true);
    useEffect(() => {
        if (isFirstFilterRender.current) {
            isFirstFilterRender.current = false;
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const character = document.querySelector('.lottie-character__inner');
        if (!character) return;
        gsap.fromTo(
            character,
            { y: 0, scale: 1 },
            {
                y: -14,
                scale: 1.05,
                duration: 0.18,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
                overwrite: true
            }
        );
    }, [activeFilter]);

    useEffect(() => {
        projectsRef.current = projectsRef.current.slice(0, filteredProjects.length);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

    const handleFilterClick = (category) => setActiveFilter(category);

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <Navbar />

            <main ref={pageRef} className="projects-page" id="main-content" tabIndex={-1}>
                {/* Hero Section */}
                <section className="projects-hero">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <span className="title-line">Projects</span>
                            <span className="title-line highlight">Portfolio</span>
                        </h1>
                        <p className="hero-subtitle">
                            {PROJECTS_DATA.length} selected builds · {repoCount} public repositories · {totalHours.toLocaleString()}+ client hours
                        </p>
                    </div>
                    <LottieCharacter className="hero-character" replayKey={activeFilter} />
                </section>

                {/* Filter Section */}
                <section className="filter-section" aria-labelledby="filter-heading">
                    <h2 id="filter-heading" className="sr-only">Filter projects by category</h2>
                    <div className="filter-container" role="group" aria-label="Project categories">
                        {categories.map((category) => {
                            const isActive = activeFilter === category;
                            const count = categoryCounts[category];
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    aria-pressed={isActive}
                                    className={`filter-tab ${isActive ? 'is-active' : ''}`}
                                    onClick={() => handleFilterClick(category)}
                                >
                                    <span className="filter-tab__label">{category}</span>
                                    <span className="filter-tab__count" aria-hidden="true">{count}</span>
                                    <span className="sr-only">
                                        , {count} project{count === 1 ? '' : 's'}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="filter-count" role="status" aria-live="polite">
                        Showing <strong>{filteredProjects.length}</strong> of {PROJECTS_DATA.length} projects
                        {filteredArchive.length > 0 && (
                            <>
                                {' · '}
                                <strong>{filteredArchive.length}</strong> of {ARCHIVE_REPOS.length} repositories
                            </>
                        )}
                        {filteredArchive.length === 0 && ` · no archived repositories in ${activeFilter}`}
                    </p>
                </section>

                {/* Projects Grid */}
                <section className="projects-section" aria-labelledby="projects-heading">
                    <h2 id="projects-heading" className="sr-only">Selected projects</h2>
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <article
                                key={project.id}
                                ref={(el) => { projectsRef.current[index] = el; }}
                                className="project-card"
                                aria-label={`${project.name}, ${project.category} project`}
                                style={{ '--project-color': `var(--color-${project.color})` }}
                            >
                                <div className="project-image">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={`${project.name} — ${project.category} project cover`}
                                            className="project-image-img"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="project-image-placeholder" aria-hidden="true">
                                            <span className="placeholder-mark">{project.name.charAt(0)}</span>
                                            <span className="placeholder-name">{project.name}</span>
                                        </div>
                                    )}
                                    <div className="category-badge">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="project-content">
                                    <h3 className="project-title">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>

                                    <div className="project-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">{project.hours ? 'Hours:' : 'Year:'}</span>
                                            <span className="meta-value">
                                                {project.hours ? `${project.hours}h` : project.year}
                                            </span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Status:</span>
                                            <span className={`meta-value status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
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

                                    <div className="project-links">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                <span>Live demo <span className="sr-only">of {project.name} (opens in a new tab)</span></span>
                                                <svg className="link-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </a>
                                        )}
                                        {project.repo && (
                                            <a
                                                href={repoUrl(project.repo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`project-link ${project.live ? 'project-link--ghost' : ''}`}
                                            >
                                                <span>{project.live ? 'Source' : 'View on GitHub'} <span className="sr-only">for {project.name} (opens in a new tab)</span></span>
                                                <svg className="link-arrow" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {project.featured && (
                                    <div className="featured-badge">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                            <path d="M8 0L9.856 6.144L16 8L9.856 9.856L8 16L6.144 9.856L0 8L6.144 6.144L8 0Z"/>
                                        </svg>
                                        Featured
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="no-projects">
                            <div className="no-projects-icon" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="M20 20l-3.5-3.5" />
                                </svg>
                            </div>
                            <h3>No projects found</h3>
                            <p>Try selecting a different category</p>
                        </div>
                    )}
                </section>

                {/* GitHub Archive */}
                {filteredArchive.length > 0 && (
                    <section className="repo-archive" aria-labelledby="repo-archive-heading">
                        <div className="repo-archive__header">
                            <div>
                                <h2 id="repo-archive-heading" className="repo-archive__title">More from GitHub</h2>
                                <p className="repo-archive__lead">
                                    Smaller builds, earlier versions and experiments — {filteredArchive.length} of the {ARCHIVE_REPOS.length} repositories in the archive.
                                </p>
                            </div>
                            <a
                                href={GITHUB_PROFILE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="repo-archive__cta"
                            >
                                All {PUBLIC_REPO_TOTAL} repositories
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </div>

                        <ul className="repo-list">
                            {filteredArchive.map((repo) => (
                                <li key={repo.repo}>
                                    <a
                                        className="repo-item"
                                        href={repoUrl(repo.repo)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="repo-item__top">
                                            <span className="repo-item__name">{repo.name}</span>
                                            <span className="repo-item__lang">
                                                <span className={`lang-dot lang-${repo.language.toLowerCase()}`} aria-hidden="true"></span>
                                                {repo.language}
                                            </span>
                                        </span>
                                        <span className="repo-item__desc">{repo.description}</span>
                                        <span className="repo-item__foot">
                                            <span>{repo.category}</span>
                                            {repo.live && <span className="repo-item__live">Live demo</span>}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Private client work */}
                <section className="private-work" aria-labelledby="private-work-heading">
                    <div className="private-work__header">
                        <h2 id="private-work-heading" className="private-work__title">Private client work</h2>
                        <p className="private-work__lead">
                            Production builds that live in private repositories — walkthroughs available on request.
                        </p>
                    </div>
                    <ul className="private-work__list">
                        {PRIVATE_WORK.map((item) => (
                            <li key={item.name} className="private-work__item">
                                <span className="private-work__name">{item.name}</span>
                                <span className="private-work__scope">{item.scope}</span>
                                <span className="private-work__stack">{item.stack}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
        </>
    );
}
