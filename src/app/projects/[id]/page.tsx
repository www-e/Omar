import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { generateProjectMetadata } from '@/config/metadata'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaGithub } from 'react-icons/fa'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps) {
  return generateProjectMetadata(params.id)
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.id)
  
  if (!project) {
    notFound()
  }

  // Generate structured data for the project
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.fullDescription,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Person',
      name: 'Your Name',
      url: 'https://yourdomain.com'
    },
    keywords: project.keywords.join(', '),
    image: project.image,
    url: project.liveUrl,
    sameAs: [project.githubUrl]
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.shortDescription}</p>
          </div>

          <div className="flex gap-4">
            <Button asChild variant="default">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub className="mr-2 h-4 w-4" />
                View Code
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {project.fullDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role & Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.role}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Demonstrated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 