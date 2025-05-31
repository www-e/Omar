'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import { Button } from './button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card'
import { FaGithub } from 'react-icons/fa'
import { techIcons } from '@/utils/tech-icons'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:border-primary/50">
        <div className="relative aspect-video h-48 overflow-hidden group relative">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <p className="text-muted-foreground">{project.shortDescription}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Role</h3>
              <p className="text-sm text-muted-foreground">{project.role}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => {
                  const Icon = techIcons[tech]
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md text-sm"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      <span>{tech}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Features</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button 
            asChild 
            variant="default"
            className="transition-transform hover:scale-105"
          >
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline"
            className="transition-transform hover:scale-105"
          >
            <Link 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              <span>View Code</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 