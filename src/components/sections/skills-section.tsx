'use client'

import { motion } from '@/components/motion-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiSocketdotio,
  SiAmazon,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPython,
  SiFlask,
  SiReact,
  SiTensorflow,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiFirebase,
  SiRedux,
  SiGraphql,
  SiKubernetes,
  SiJenkins,
  SiLinux,
  SiPostman,
  SiJira,
  SiConfluence
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss3 },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Redux', icon: SiRedux },
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Python', icon: SiPython },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Flask', icon: SiFlask },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'GraphQL', icon: SiGraphql },
      { name: 'WebSocket', icon: SiSocketdotio },
    ]
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Jenkins', icon: SiJenkins },
      { name: 'AWS', icon: SiAmazon },
      { name: 'Linux', icon: SiLinux },
    ]
  },
  {
    title: 'Development Tools',
    skills: [
      { name: 'Postman', icon: SiPostman },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Jira', icon: SiJira },
      { name: 'Confluence', icon: SiConfluence },
    ]
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency in modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-background/30 to-background/10 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 group overflow-hidden">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent group-hover:from-primary/10 transition-all duration-500" />
                  <CardTitle className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 group-hover:to-primary transition-all duration-500">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center justify-center gap-3 group/skill relative p-4"
                      >
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/skill:opacity-100 rounded-xl transition-all duration-500" />
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover/skill:opacity-100 transition-all duration-500" />
                          <skill.icon
                            className="w-8 h-8 text-muted-foreground group-hover/skill:text-primary relative transition-all duration-500 transform group-hover/skill:scale-110"
                          />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover/skill:text-foreground transition-colors duration-500 relative text-center">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 