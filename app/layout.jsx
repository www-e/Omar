import './globals.css';

export const metadata = {
    title: 'Omar Ashraf — Full Stack Engineer & Tech Solution Architect',
    description: 'Mid-senior full-stack engineer specializing in AI-powered platforms, e-commerce solutions, and education technology. Building production applications with Next.js, React, Python, and cloud infrastructure.',
    icons: {
        icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
