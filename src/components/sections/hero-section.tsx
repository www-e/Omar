'use client'

import { motion } from '@/components/motion-wrapper'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary blur-2xl opacity-20 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary relative">
              Omar Ashraf
            </h1>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl md:text-4xl font-semibold mb-4 text-foreground/90"
          >
            Full Stack Developer & Cloud Expert
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming ideas into scalable web solutions with modern technologies and cloud-native architecture
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-6 justify-center mb-12"
          >
            <Link href="#projects">
              <Button size="lg" variant="default" className="min-w-[160px] text-lg group">
                View Projects
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Link>
            <a
              href="https://www.upwork.com/freelancers/~016247fec408960a4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="default"
                className="min-w-[200px] text-lg bg-[#6fda44] hover:bg-[#5cb536] text-white flex items-center gap-2 group relative"
              >
                <SiUpwork className="w-5 h-5" />
                Hire me on Upwork
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                <div className="absolute -top-3 -right-3 bg-primary/90 dark:bg-green-500/90 text-white text-xs px-2 py-1 rounded-full font-medium animate-bounce dark:shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:text-green-50">
                  2 projects in progress
                </div>
              </Button>
            </a>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="min-w-[160px] text-lg group">
                Contact Me
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex justify-center gap-8"
          >
            <a
              href="https://github.com/www-e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <FaGithub className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/omar-ashraf-176790262/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="mailto:omarasj445@gmail.com"
              className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <FaEnvelope className="w-7 h-7" />
            </a>
            <a
              href="https://wa.me/+201154688628"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <FaWhatsapp className="w-7 h-7" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 