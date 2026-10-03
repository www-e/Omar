import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
    // 'latin' is required: --font-cairo is used as the Latin fallback tier in
    // --font-body / --font-display (app/styles/base.css). With only the arabic
    // subset the family carried no Latin glyphs and was never consumed at all.
    subsets: ['arabic', 'latin'],
    variable: '--font-cairo',
    display: 'swap',
});

const SITE_URL = 'https://truus.co'; // TODO(orchestrator): confirm production origin before relying on absolute OG URLs

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'Omar Ashraf — Senior Full-Stack Engineer & Tech Solution Architect',
    description: 'Senior Full-Stack Engineer with 5+ years architecting scalable web platforms. Specializing in Next.js, React, Node.js, Python, cloud infrastructure, and data-driven solutions.',
    keywords: ['Omar Ashraf', 'Full-Stack Engineer', 'Tech Solution Architect', 'Next.js', 'React', 'Portfolio'],
    authors: [{ name: 'Omar Ashraf' }],
    creator: 'Omar Ashraf',
    openGraph: {
        type: 'website',
        siteName: 'Omar Ashraf',
        title: 'Omar Ashraf — Senior Full-Stack Engineer & Tech Solution Architect',
        description: 'Senior Full-Stack Engineer with 5+ years architecting scalable web platforms. Specializing in Next.js, React, Node.js, Python, cloud infrastructure, and data-driven solutions.',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Omar Ashraf — Senior Full-Stack Engineer & Tech Solution Architect',
        description: 'Senior Full-Stack Engineer with 5+ years architecting scalable web platforms. Specializing in Next.js, React, Node.js, Python, cloud infrastructure, and data-driven solutions.',
    },
    icons: {
        icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    },
};

// Separate `viewport` export: Next 16 ignores viewport keys inside `metadata`.
// Deliberately no user-scalable=no / maximum-scale so pinch-zoom stays available (WCAG 1.4.4).
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#f0ebe6',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={cairo.variable}>
                <a href="#main-content" className="skip-link">
                    Skip to content
                </a>
                {children}
            </body>
        </html>
    );
}
