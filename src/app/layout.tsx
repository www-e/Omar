import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { schemas, defaultMetadata } from '@/config/metadata'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = defaultMetadata

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  url: 'https://yourdomain.com',
  image: 'https://yourdomain.com/profile.jpg',
  sameAs: [
    'https://github.com/yourusername',
    'https://linkedin.com/in/yourusername',
    'https://twitter.com/yourusername',
  ],
  jobTitle: 'Full Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Your Company',
  },
  description: 'Full Stack Developer specializing in modern web technologies.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.website) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.person) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
