'use client'

import { FaGithub, FaLinkedin, FaWhatsapp, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { motion } from '@/components/motion-wrapper'
import { SiUpwork } from 'react-icons/si'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t bg-gradient-to-br from-background to-background/50 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:col-span-1"
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">Omar</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building innovative solutions with modern technologies. Focused on creating impactful digital experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/www-e"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaGithub className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
              <a
                href="https://www.linkedin.com/in/omar-ashraf-176790262/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaLinkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
              <a
                href="https://wa.me/+201154688628"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <FaWhatsapp className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
              <a
                href="https://www.upwork.com/freelancers/~016247fec408960a4d"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <SiUpwork className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors relative z-10" />
              </a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  About Me
                </a>
              </li>
              <li>
                <a 
                  href="#projects"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#skills"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="/cv.pdf"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Download CV
                </a>
              </li>
            </ul>
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
            <div className="space-y-3">
              <a 
                href="mailto:omarasj445@gmail.com"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <FaEnvelope className="w-4 h-4 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                <span>omarasj445@gmail.com</span>
              </a>
              <a 
                href="tel:+201154688628"
                className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <FaPhone className="w-4 h-4 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                <span>+20 1154688628</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground group">
                <FaMapMarkerAlt className="w-4 h-4 mt-0.5 text-primary group-hover:scale-110 transition-transform" />
                <span>Benha, Egypt</span>
              </div>
            </div>
          </motion.div>
          
          {/* Newsletter / CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Let&apos;s Connect</h3>
            <p className="text-sm text-muted-foreground">
              Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
            </p>
            <a
              href="mailto:omarasj445@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg text-sm font-medium hover:from-primary/90 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <FaEnvelope className="w-4 h-4" />
              Get In Touch
            </a>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/50 text-center"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Omar Ashraf. All rights reserved. Built with Next.js and TypeScript.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 