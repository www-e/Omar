'use client'

import { motion } from '@/components/motion-wrapper'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaCode, FaRocket, FaTools, FaDatabase, FaCloud, FaMobile } from 'react-icons/fa'

const stats = [
  { 
    label: 'Years Experience', 
    value: '3+',
    icon: <FaCode className="w-6 h-6 text-blue-500" />
  },
  { 
    label: 'Projects Completed', 
    value: '20+',
    icon: <FaRocket className="w-6 h-6 text-green-500" />
  }
]

const skills = [
  {
    icon: <FaCode className="w-6 h-6 text-blue-500" />,
    title: 'Core Skills',
    items: [
      'Full-Stack Development (MERN Stack)',
      'Next.js & React Advanced Patterns',
      'System Architecture & Design',
      'Advanced Git & Version Control'
    ],
  },
  {
    icon: <FaDatabase className="w-6 h-6 text-purple-500" />,
    title: 'Backend Expertise',
    items: [
      'RESTful & GraphQL API Design',
      'MongoDB & PostgreSQL Optimization',
      'Microservices Architecture',
      'OAuth & JWT Authentication'
    ],
  },
  {
    icon: <FaMobile className="w-6 h-6 text-green-500" />,
    title: 'Frontend Mastery',
    items: [
      'Responsive & Mobile-First Design',
      'Advanced React Patterns & Hooks',
      'State Management (Redux, Context)',
      'Web Performance Optimization'
    ],
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech Profile <span className="text-primary">v3.0</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate software developer with expertise in building modern web applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="h-full bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse" />
                  <Image
                    src="/profile.jpg"
                    alt="Omar Ashraf"
                    fill
                    className="rounded-full object-cover p-1"
                  />
                </div>
                <CardTitle className="text-2xl text-center mb-2">Omar</CardTitle>
                <p className="text-center text-muted-foreground">
                  Experienced Software Developer
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Available for Work</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <FaTools className="w-4 h-4" />
                  <span>Full Stack Developer</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300"
              >
                <CardHeader className="flex flex-row items-center gap-2">
                  {skill.icon}
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 