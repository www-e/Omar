'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WIGGLE_CONFIG, SOCIAL_ICONS } from '@/lib/data';
import SocialIcon from '@/components/SocialIcons';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
        if (tween) tween.kill();
        gsap.set(target, { rotation: 0 });
    };
}

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
    const mobileDrawerRef = useRef(null);
    const mobileBackdropRef = useRef(null);
    const hamburgerRef = useRef(null);
    const didOpenRef = useRef(false);

    const isActivePath = (href) =>
        href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setIsMobileProjectsOpen(false);
    };

    const toggleMobileProjects = () => {
        setIsMobileProjectsOpen(prev => !prev);
    };

    useEffect(() => {
        // Handle Escape key to close mobile menu
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        // Mobile drawer animations
        const drawer = mobileDrawerRef.current;
        const backdrop = mobileBackdropRef.current;

        if (drawer && backdrop) {
            if (isMobileMenuOpen) {
                // Show backdrop
                gsap.set(backdrop, { visibility: 'visible' });
                gsap.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power2.out' });

                // Slide in drawer
                gsap.set(drawer, { visibility: 'visible' });
                gsap.fromTo(drawer,
                    { x: '100%', opacity: 0 },
                    { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
                );
            } else {
                // Hide backdrop
                gsap.to(backdrop, {
                    opacity: 0,
                    duration: 0.25,
                    ease: 'power2.in',
                    onComplete: () => gsap.set(backdrop, { visibility: 'hidden' })
                });

                // Slide out drawer
                gsap.to(drawer, {
                    x: '100%',
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => gsap.set(drawer, { visibility: 'hidden' })
                });
            }
        }

        return () => {
            if (drawer) gsap.killTweensOf(drawer);
            if (backdrop) gsap.killTweensOf(backdrop);
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        // Drawer focus management, body scroll lock and Tab focus trap
        const drawer = mobileDrawerRef.current;
        if (!drawer) return;

        if (isMobileMenuOpen) {
            didOpenRef.current = true;
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            const getFocusable = () => Array.from(
                drawer.querySelectorAll('a[href], button:not([disabled])')
            ).filter(el => !el.closest('[inert]'));

            const focusables = getFocusable();
            (focusables[0] || drawer).focus();

            const handleTabTrap = (e) => {
                if (e.key !== 'Tab') return;
                const items = getFocusable();
                if (!items.length) return;
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            };

            drawer.addEventListener('keydown', handleTabTrap);
            return () => {
                drawer.removeEventListener('keydown', handleTabTrap);
                document.body.style.overflow = previousOverflow;
            };
        }

        if (didOpenRef.current) {
            // Return focus to the hamburger only after the menu was actually opened
            didOpenRef.current = false;
            hamburgerRef.current?.focus();
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoOmar = document.querySelector('.logo-omar');
        if (logoOmar) cleanups.push(initWiggle(logoOmar, WIGGLE_CONFIG.logoOmar));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            navLeft.addEventListener('focusin', onEnterLeft);
            const onFocusOutLeft = (e) => {
                if (!navLeft.contains(e.relatedTarget)) onLeaveLeft();
            };
            navLeft.addEventListener('focusout', onFocusOutLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
                navLeft.removeEventListener('focusin', onEnterLeft);
                navLeft.removeEventListener('focusout', onFocusOutLeft);
            });
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            navRight.addEventListener('focusin', onEnterRight);
            const onFocusOutRight = (e) => {
                if (!navRight.contains(e.relatedTarget)) onLeaveRight();
            };
            navRight.addEventListener('focusout', onFocusOutRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
                navRight.removeEventListener('focusin', onEnterRight);
                navRight.removeEventListener('focusout', onFocusOutRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
                if (wiggleTween) wiggleTween.kill();
                if (badge) gsap.killTweensOf(badge);
                if (img) gsap.killTweensOf(img);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
                if (btnWiggle) btnWiggle.kill();
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) gsap.killTweensOf(btnText);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
            // Kill any in-flight popout/overlay tweens so nothing animates detached nodes
            if (overlay) gsap.killTweensOf(overlay);
            gsap.killTweensOf(
                document.querySelectorAll(
                    '.nav-popout, .nav-popout-inner > *, .nav-work-item__img, .nav-bar__work-blob-svg, .nav-bar__whatsapp-svg path'
                )
            );
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>

            {/* Mobile Hamburger Button */}
            <button
                ref={hamburgerRef}
                className="mobile-hamburger"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-drawer"
            >
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>

            {/* Mobile Drawer Backdrop */}
            <div
                ref={mobileBackdropRef}
                className="mobile-drawer-backdrop"
                onClick={closeMobileMenu}
                aria-hidden="true"
            ></div>

            {/* Mobile Drawer */}
            <div
                ref={mobileDrawerRef}
                id="mobile-drawer"
                className="mobile-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                tabIndex={-1}
                inert={!isMobileMenuOpen}
            >
                <button
                    className="mobile-drawer-close"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <nav className="mobile-nav">
                    <Link href="/" className={`mobile-nav-link ${isActivePath('/') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/') ? 'page' : undefined} onClick={closeMobileMenu}>Home</Link>
                    <Link href="/about" className={`mobile-nav-link ${isActivePath('/about') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/about') ? 'page' : undefined} onClick={closeMobileMenu}>About</Link>

                    {/* Expandable Projects Section */}
                    <div className="mobile-nav-accordion">
                        <button
                            className="mobile-nav-accordion-header"
                            onClick={toggleMobileProjects}
                            aria-expanded={isMobileProjectsOpen}
                            aria-controls="mobile-projects-panel"
                        >
                            <span>Projects</span>
                            <svg
                                className={`accordion-arrow ${isMobileProjectsOpen ? 'open' : ''}`}
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                            >
                                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div
                            id="mobile-projects-panel"
                            className={`mobile-nav-accordion-panel ${isMobileProjectsOpen ? 'open' : ''}`}
                            inert={!isMobileProjectsOpen}
                        >
                            <Link href="/projects" className="mobile-nav-sublink" onClick={closeMobileMenu}>
                                <span className="sublink-badge badge-maroon">AI/ML</span>
                                <span>Navaia Agentic</span>
                            </Link>
                            <Link href="/projects" className="mobile-nav-sublink" onClick={closeMobileMenu}>
                                <span className="sublink-badge badge-pink">E-commerce</span>
                                <span>Graphic Tablet Store</span>
                            </Link>
                            <Link href="/projects" className="mobile-nav-sublink" onClick={closeMobileMenu}>
                                <span className="sublink-badge badge-blue">Education</span>
                                <span>Sportology Academy</span>
                            </Link>
                            <Link href="/projects" className="mobile-nav-view-all" onClick={closeMobileMenu}>
                                View all projects
                            </Link>
                        </div>
                    </div>

                    <Link href="/experience" className={`mobile-nav-link ${isActivePath('/experience') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/experience') ? 'page' : undefined} onClick={closeMobileMenu}>Experience</Link>

                    <div className="mobile-nav-divider"></div>

                    {/* WhatsApp CTA */}
                    <a
                        href="https://wa.me/201154688628"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-whatsapp-cta"
                        onClick={closeMobileMenu}
                    >
                        <SocialIcon name="whatsapp" size={24} className="whatsapp-icon" />
                        <span>Chat via WhatsApp</span>
                    </a>

                    {/* Social Icons */}
                    <div className="mobile-social-links">
                        {SOCIAL_ICONS.map(({ href, label, icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto:') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="social-link"
                            >
                                <SocialIcon name={icon} size={26} />
                            </a>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Desktop Nav Links */}
            <div className="nav-links">
                <Link href="/" className={`nav-link ${isActivePath('/') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/') ? 'page' : undefined}>Home</Link>
                <Link href="/about" className={`nav-link ${isActivePath('/about') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/about') ? 'page' : undefined}>About</Link>
                <Link href="/projects" className={`nav-link ${isActivePath('/projects') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/projects') ? 'page' : undefined}>Projects</Link>
                <Link href="/experience" className={`nav-link ${isActivePath('/experience') ? 'nav-state-active' : ''}`} aria-current={isActivePath('/experience') ? 'page' : undefined}>Experience</Link>
            </div>

            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <Link href="/projects" className="logo-work-link" aria-label="Projects">
                                <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                                <span className="logo-work-text">projects</span>
                            </Link>
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" loading="eager" alt="Navaia Agentic" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-maroon">AI/ML</span>
                                        <h4 className="nav-work-title">Navaia Agentic</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" loading="eager" alt="Graphic Tablet Store" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">E-commerce</span>
                                        <h4 className="nav-work-title">Graphic Tablet Store</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80" loading="eager" alt="Sportology Academy" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-blue">Education</span>
                                        <h4 className="nav-work-title">Sportology Academy</h4>
                                    </div>
                                </div>
                                <Link href="/projects" className="nav-work-btn"><span className="nav-work-btn__text">View all projects</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="logo-omar">
                        OMAR
                    </div>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <a href="https://wa.me/201154688628" target="_blank" rel="noopener noreferrer" className="logo-whatsapp" aria-label="Chat on WhatsApp">
                            <SocialIcon name="whatsapp" size={32} className="nav-bar__whatsapp-svg" />
                        </a>

                        {/* Pop-out Box for Right Side */}
                        <div className="nav-popout nav-wa-box" role="region" aria-label="Contact options">
                            <div className="nav-popout-inner">
                                <h4 className="nav-wa-title">Let's Connect</h4>
                                <p className="nav-wa-desc">Chat with Omar about your next project.</p>
                                <a href="https://wa.me/201154688628" target="_blank" rel="noopener noreferrer" className="nav-wa-link">
                                    <span className="nav-wa-link-text">Chat via WhatsApp</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg nav-wa-link-svg">
                                        <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                        <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
