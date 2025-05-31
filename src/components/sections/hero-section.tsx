'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Omar
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-8">
          Experienced Software Developer
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experienced in building scalable web applications with modern technologies
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button size="lg" variant="default">
              View Projects
            </Button>
            <Button size="lg" variant="outline">
              Contact Me
            </Button>
          </div>
          
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 