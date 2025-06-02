'use client'

import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { motion } from '@/components/motion-wrapper'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute h-32 w-32 -top-16 -right-16 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute h-32 w-32 -bottom-16 -left-16 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">Omar</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building innovative solutions with modern technologies. Focused on creating impactful digital experiences.
            </p>
          </motion.div>
          
          {/* Connect Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/www-e"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaGithub className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaLinkedin className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
              <a
                href="https://wa.me/+201154688628"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaWhatsapp className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
            </div>
          </motion.div>
          
          {/* Contact Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <a 
                href="mailto:omarasj445@gmail.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                omarasj445@gmail.com
              </a>
              <a 
                href="tel:+201154688628"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +20 1154688628
              </a>
              <p className="text-sm text-muted-foreground">
                Alternative: +20 1098073903
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t text-center"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Omar. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 