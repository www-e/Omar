export interface TimelineItem {
  phase: string
  duration: string
  description: string
  deliverables: string[]
}

export interface TechnicalStep {
  title: string
  description: string
  technologies: string[]
  challenges?: string[]
  solutions?: string[]
}

export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  techStack: string[]
  role: string
  skills: string[]
  features: string[]
  image: string
  githubUrl: string
  liveUrl: string
  category: string
  keywords: string[]
  // New fields for detailed project information
  totalHours: number
  timeline: TimelineItem[]
  technicalSteps: TechnicalStep[]
  challenges: string[]
  learnings: string[]
  status: 'completed' | 'in-progress' | 'maintenance'
}