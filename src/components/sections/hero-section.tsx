'use client'

import { motion } from '@/components/motion-wrapper'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaDownload } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'
import Link from 'next/link'
import Image from 'next/image'

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
      
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Image Column - Simplified placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0"
          >
            {/* Simplified image placeholder - you can add your image here */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
              <Image
                src="/profile.jpg"
                alt="Omar Ashraf"
                fill
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
          </motion.div>
          
          {/* Text Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center lg:text-left space-y-6 sm:space-y-8 flex-1 w-full"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-secondary blur-2xl opacity-20 animate-pulse" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary relative">
                Omar Ashraf
              </h1>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-foreground/90"
            >
              Full Stack Developer & Cloud Expert
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
            >
              Transforming ideas into scalable web solutions with modern technologies and cloud-native architecture
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center"
            >
              <Link href="#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto min-w-[180px] h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                >
                  View My Work
                </Button>
              </Link>
              <a
                href="/omar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="default"
                  variant="outline"
                  className="w-full sm:w-auto min-w-[160px] h-11 text-base border-2 hover:bg-accent/50 transition-all duration-200"
                >
                  <FaDownload className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </a>
              <a
                href="https://www.upwork.com/freelancers/~016247fec408960a4d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full sm:w-auto min-w-[140px] h-10 text-sm hover:bg-accent/30 transition-all duration-200 relative"
                >
                  <SiUpwork className="w-4 h-4 mr-2" />
                  Available for Work
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    2
                  </div>
                </Button>
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center lg:justify-start gap-6 sm:gap-8"
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
      </div>
    </section>
  )
}