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

// Production origin for absolute OG/Canonical URLs. Set via NEXT_PUBLIC_SITE_URL
// if the domain ever changes; falls back to the live apex.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.omarashraf.online';

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'Omar Ashraf — Senior Full-Stack Engineer & Tech Solution Architect',
    description: 'Senior Full-Stack Engineer with 5+ years architecting scalable web platforms. Specializing in Next.js, React, Node.js, Python, cloud infrastructure, and data-driven solutions.',
    keywords: ['Omar Ashraf', 'Full-Stack Engineer', 'Tech Solution Architect', 'Next.js', 'React', 'Portfolio'],
    authors: [{ name: 'Omar Ashraf' }],
    creator: 'Omar Ashraf',
    // No `icons` entry here on purpose: app/icon.svg is Next's file-based
    // metadata convention and is auto-served, so the old remote
    // website-files.com favicon PNG (same link-rot risk as the marquee logos)
    // is gone and nothing competes with the local asset.
    //
    // Likewise no `openGraph.images` / `twitter.images`: app/opengraph-image.tsx
    // is the file-based convention and Next injects og:image + twitter:image
    // itself. Declaring them here too would emit duplicate tags and could
    // shadow the generated asset.
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
