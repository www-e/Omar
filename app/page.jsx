'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServiceCards from '@/components/ServiceCards';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
                <div className="header-content">
                    <h1>Header Section</h1>
                </div>
            </header>
            <main className="content-section">
                <HeroSection />
                <ServiceCards />
            </main>
            <section className="Double-marquee">
                <DoubleMarquee />
            </section>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
