import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { generateProjectMetadata } from '@/config/metadata'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaGithub, FaExternalLinkAlt, FaClock, FaCalendar, FaCode, FaLightbulb, FaCheckCircle } from 'react-icons/fa'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return generateProjectMetadata(id)
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const project = projects.find(p => p.id === id)
  
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
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                {project.category}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Project Image */}
            <div className="relative w-full max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-video">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="min-w-[160px]">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[160px]">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">

            {/* Project Overview & Stats */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <FaCode className="w-5 h-5 text-primary" />
                      Project Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.fullDescription}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FaClock className="w-4 h-4 text-primary" />
                      Development Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">{project.totalHours}h</div>
                    <p className="text-sm text-muted-foreground">Total development time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FaCheckCircle className="w-4 h-4 text-green-500" />
                      Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : project.status === 'in-progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                    }`}>
                      {project.status === 'completed' ? 'Completed' :
                       project.status === 'in-progress' ? 'In Progress' : 'Maintenance'}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FaCalendar className="w-5 h-5 text-primary" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {project.timeline.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{item.phase}</h3>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                              {item.duration}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.deliverables.map((deliverable, i) => (
                              <span key={i} className="px-2 py-1 bg-secondary/10 text-secondary text-sm rounded">
                                {deliverable}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {index < project.timeline.length - 1 && (
                        <div className="absolute left-1.5 top-6 w-px h-8 bg-border"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Implementation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FaCode className="w-5 h-5 text-primary" />
                  Technical Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {project.technicalSteps.map((step, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-6">
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {step.challenges && step.challenges.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-orange-600 dark:text-orange-400">Challenges:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {step.challenges.map((challenge, i) => (
                              <li key={i}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.solutions && step.solutions.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 text-green-600 dark:text-green-400">Solutions:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {step.solutions.map((solution, i) => (
                              <li key={i}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges & Learnings */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600 dark:text-orange-400">Challenges Overcome</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400">Key Learnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaLightbulb className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Tech Stack & Features */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technology Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
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
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <FaCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Role & Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Role & Skills Demonstrated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-2">My Role</h3>
                    <p className="text-muted-foreground">{project.role}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Skills Demonstrated</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-secondary/10 text-secondary rounded-md text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
} 