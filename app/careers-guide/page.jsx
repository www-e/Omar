'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SvgSymbols from '@/components/SvgSymbols';

import CareersHero from './components/CareersHero';
import OverviewCards from './components/OverviewCards';
import AdminSection from './components/AdminSection';
import ProfessionalSection from './components/ProfessionalSection';
import EmployerSection from './components/EmployerSection';
import SeedsSection from './components/SeedsSection';
import DatabaseDiagram from './components/DatabaseDiagram';
import QuickLinks from './components/QuickLinks';

import '../styles/careers-guide.css';

export default function CareersGuidePage() {
  return (
    <>
      <SvgSymbols />
      <SmoothScroll />
      <CursorBubble />
      <TransitionScribble />
      <header className="cg-header">
        <Navbar />
      </header>

      <main className="careers-guide-page">
        <CareersHero />
        <OverviewCards />
        <AdminSection />
        <ProfessionalSection />
        <EmployerSection />
        <SeedsSection />
        <DatabaseDiagram />
        <QuickLinks />
      </main>

      <footer className="main-footer">
        <Footer />
      </footer>
    </>
  );
}
