'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FaCode, FaRocket, FaTools } from 'react-icons/fa'

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Programming Languages', value: '6+' },
]

const skills = [
  {
    icon: <FaCode className="w-6 h-6" />,
    title: 'Core Skills',
    items: ['Full-Stack Development', 'Modern Web Technologies', 'Database Management', 'Version Control'],
  },
  {
    icon: <FaRocket className="w-6 h-6" />,
    title: 'Expertise',
    items: ['Scalable Applications', 'Clean Architecture', 'Performance Optimization', 'UI/UX Design'],
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" className="h-full">
              <CardHeader>
                <div className="relative w-32 h-32 mx-auto mb-4 relative">
                  <Image
                    src="/profile.jpg"
                    alt="Omar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <CardTitle className="text-center">Omar</CardTitle>
                <p className="text-center text-muted-foreground">
                Experienced Software Developer
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Available for Work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTools className="w-4 h-4" />
                    <span>Full Stack Developer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {skills.map((skill, index) => (
              <Card key={index} variant="gradient">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {skill.icon}
                    <CardTitle>{skill.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} variant="glass">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 