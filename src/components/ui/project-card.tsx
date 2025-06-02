'use client'

import { motion } from '@/components/motion-wrapper'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/types/project'
import { Button } from './button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { techIcons } from '@/utils/tech-icons'

// Category-specific styling
const categoryStyles: { [key: string]: { bg: string; text: string; border: string } } = {
  'AI/ML': {
    bg: 'bg-purple-500/20 dark:bg-purple-500/30',
    text: 'text-purple-500 dark:text-purple-400',
    border: 'border-purple-500/20 dark:border-purple-500/30'
  },
  'Web Development': {
    bg: 'bg-blue-500/20 dark:bg-blue-500/30',
    text: 'text-blue-500 dark:text-blue-400',
    border: 'border-blue-500/20 dark:border-blue-500/30'
  },
  'Computer Vision': {
    bg: 'bg-green-500/20 dark:bg-green-500/30',
    text: 'text-green-500 dark:text-green-400',
    border: 'border-green-500/20 dark:border-green-500/30'
  },
  'Development Tools': {
    bg: 'bg-orange-500/20 dark:bg-orange-500/30',
    text: 'text-orange-500 dark:text-orange-400',
    border: 'border-orange-500/20 dark:border-orange-500/30'
  },
  'Education': {
    bg: 'bg-pink-500/20 dark:bg-pink-500/30',
    text: 'text-pink-500 dark:text-pink-400',
    border: 'border-pink-500/20 dark:border-pink-500/30'
  }
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const categoryStyle = categoryStyles[project.category] || {
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/20'
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-video overflow-hidden group">
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {project.shortDescription}
            </p>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-xl line-clamp-1">{project.title}</CardTitle>
            <span 
              className={`text-xs px-3 py-1.5 rounded-full border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-sm`}
            >
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{project.role}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => {
                  const Icon = techIcons[tech]
                  return (
                    <div
                      key={tech}
                      className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-md text-sm group transition-colors duration-300 hover:bg-primary/20"
                    >
                      {Icon && (
                        <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                      )}
                      <span className="text-xs">{tech}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm">Key Features</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {project.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="line-clamp-1">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 p-6">
          <Button 
            asChild 
            variant="default"
            className="flex-1 transition-transform duration-300 hover:scale-105"
          >
            <Link 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span>Live Demo</span>
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline"
            className="flex-1 transition-transform duration-300 hover:scale-105"
          >
            <Link 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <FaGithub className="w-4 h-4" />
              <span>View Code</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 