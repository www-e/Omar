import { Metadata } from 'next'
import { projects } from '@/data/projects'

interface Project {
  id: string
  title: string
  fullDescription: string
  image: string
  liveUrl: string
  githubUrl: string
  keywords: string[]
}

const siteConfig = {
  name: 'Omar Ashraf',
  title: 'Omar Ashraf | Full Stack Developer & AI Specialist',
  description: 'Full Stack Developer specializing in modern web technologies, AI integration, and user experience design. And also a Machine Learning Engineer. And responsive web developer. Building scalable applications with React, Next.js, and Python.',
  url: 'https://omarashraf.dev',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/www-e',
    linkedin: 'https://www.linkedin.com/in/omar-ashraf-176790262/',
    twitter: 'https://x.com/software58012',
  },
}

// Generate keywords from projects
const projectKeywords = projects.flatMap(project => project.keywords)
const uniqueKeywords = Array.from(new Set(projectKeywords))

// Website Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.title,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@type': 'Person',
    name: siteConfig.name,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
}

// Person Schema
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/profile.jpg`,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.twitter,
  ],
  jobTitle: 'Full Stack Developer & AI Specialist',
  knowsAbout: [
    'Web Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Software Architecture',
    'Cloud Computing',
    'Responsive Web Design',
    'React',
    'Next.js',
    'Python',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'SQLite',
    'Docker',
    'Google Cloud',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Artificial Intelligence',
    'AI',
    'Data Science',
    'Data Analysis',
    'Data Visualization',
    'Data Engineering',
    'Data Architecture',
    'Data Management',
    'Data Security',
    'Data Cleaning',
    'Data Preprocessing',
    'Data Modeling',
    'Data Warehousing',
    'Data Integration',
    'Data Transformation',
    'responsive web design',
    'responsive web developer',
    'upwork',
    'freelancer',
    'fiverr',
    'upwork freelancer',
    'freelancer upwork',
    'freelancer fiverr',
    'upwork fiverr',
    ...uniqueKeywords
  ]
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Web Development',
    'Artificial Intelligence',
    'Machine Learning',
    'Software Architecture',
    'Cloud Computing',
    'Responsive Web Design',
    'React',
    'Next.js',
    'Python',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'SQLite',
    'Docker',
    'Google Cloud',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Artificial Intelligence',
    'AI',
    'Data Science',
    'Data Analysis',
    'Data Visualization',
    'Data Engineering',
    'Data Architecture',
    'Data Management',
    'Data Security',
    'Data Cleaning',
    'Data Preprocessing',
    'Data Modeling',
    'Data Warehousing',
    'Data Integration',
    'Data Transformation',
    'responsive web design',
    'responsive web developer',
    'upwork',
    'freelancer',
    'fiverr',
    'upwork freelancer',
    'freelancer upwork',
    'freelancer fiverr',
    'upwork fiverr',
    ...uniqueKeywords,
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@software58012',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': '/en-US',
    },
  },
  category: 'technology',
  classification: 'Portfolio',
  referrer: 'origin-when-cross-origin',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  }
}

// Project Schema Generator
function generateProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.fullDescription,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    keywords: project.keywords.join(', '),
    image: `${siteConfig.url}${project.image}`,
    url: project.liveUrl,
    sameAs: [project.githubUrl]
  }
}

// Generate project-specific metadata
export function generateProjectMetadata(projectId: string): Metadata {
  const project = projects.find(p => p.id === projectId)
  if (!project) return defaultMetadata

  const projectUrl = `${siteConfig.url}/projects/${project.id}`

  return {
    ...defaultMetadata,
    title: project.title,
    description: project.fullDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: project.title,
      description: project.fullDescription,
      url: projectUrl,
      images: [
        {
          url: `${siteConfig.url}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: project.title,
      description: project.fullDescription,
      images: [`${siteConfig.url}${project.image}`],
    },
  }
}

// Export schemas for use in layout
export const schemas = {
  website: websiteSchema,
  person: personSchema,
  generateProjectSchema,
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}; 