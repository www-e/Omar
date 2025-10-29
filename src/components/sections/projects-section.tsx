'use client'

import { useState } from 'react'
import { motion } from '@/components/motion-wrapper'
import { ProjectCard } from '@/components/ui/project-card'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'

// Get unique categories from projects and sort them alphabetically
const categories = Array.from(new Set(projects.map(project => project.category))).sort()

// Category-specific styling
const categoryStyles: { [key: string]: { bg: string; text: string; border: string } } = {
  'AI/ML': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    border: 'border-purple-500/20'
  },
  'Web Development': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500/20'
  },
  'Computer Vision': {
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    border: 'border-green-500/20'
  },
  'Development Tools': {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    border: 'border-orange-500/20'
  },
  'Education': {
    bg: 'bg-pink-500/10',
    text: 'text-pink-500',
    border: 'border-pink-500/20'
  },
  'Investment/Real Estate': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/20'
  }
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section 
      id="projects" 
      className="py-20 bg-background"
      aria-label="Projects showcase"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of innovative projects, showcasing expertise in web development,
            AI integration, computer vision, and performance optimization.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            aria-pressed={selectedCategory === 'all'}
            className={`transition-all duration-300 hover:scale-105 ${
              selectedCategory === 'all' 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'hover:bg-primary/10 hover:text-primary hover:border-primary/20'
            }`}
          >
            All Projects
          </Button>
          {categories.map(category => {
            const style = categoryStyles[category] || {
              bg: 'bg-primary/10',
              text: 'text-primary',
              border: 'border-primary/20'
            }
            return (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? `${style.bg} ${style.text} ${style.border}`
                    : 'hover:bg-primary/10 hover:text-primary hover:border-primary/20'
                }`}
              >
                {category}
              </Button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <input
            type="search"
            placeholder="Search by title, tech stack, or keywords..."
            className="w-full px-4 py-2 rounded-lg border border-input bg-background transition-colors duration-300 focus:border-primary focus:ring-1 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No projects found matching your criteria. Try adjusting your search or category filter.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
} 