import { Cairo } from 'next/font/google';
import './globals.css';
import SessionMapPopup from '@/components/SessionMapPopup';

const cairo = Cairo({
    subsets: ['arabic'],
    variable: '--font-cairo',
    display: 'swap',
});

export const metadata = {
    title: 'Omar Ashraf — Senior Full-Stack Engineer & Tech Solution Architect',
    description: 'Senior Full-Stack Engineer with 5+ years architecting scalable web platforms. Specializing in Next.js, React, Node.js, Python, cloud infrastructure, and data-driven solutions.',
    icons: {
        icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={cairo.variable}>
                {children}
                <SessionMapPopup />
            </body>
        </html>
    );
}
