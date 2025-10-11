'use client'

import { motion } from '@/components/motion-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { FaCode, FaRocket, FaTools, FaDatabase, FaCloud, FaMobile, FaLanguage, FaLightbulb, FaUsers, FaChartLine } from 'react-icons/fa'

const capabilities = [
  {
    icon: <FaDatabase className="w-6 h-6 text-blue-500" />,
    title: 'Architecture and scalability',
    description: 'Design predictable systems with sensible boundaries, good naming, and clean handoffs so codebases stay easy to change.'
  },
  {
    icon: <FaCode className="w-6 h-6 text-green-500" />,
    title: 'Full‑stack delivery',
    description: 'Ship end‑to-end features across React/Next.js, Node, and Flutter with a product‑first mindset and strong attention to UX.'
  },
  {
    icon: <FaLightbulb className="w-6 h-6 text-yellow-500" />,
    title: 'AI enablement',
    description: 'Integrate ML features where they add real value—classification, analytics, and smart automation with maintainable APIs.'
  },
  {
    icon: <FaChartLine className="w-6 h-6 text-purple-500" />,
    title: 'Cost‑aware decisions',
    description: 'Favor efficient hosting and tooling like Vercel/Supabase, caching, and lightweight services to keep ops simple and lean.'
  },
  {
    icon: <FaTools className="w-6 h-6 text-red-500" />,
    title: 'Developer experience',
    description: 'Consistent conventions, purposeful docs, and tidy PRs that help teams move faster with less friction.'
  },
  {
    icon: <FaLanguage className="w-6 h-6 text-indigo-500" />,
    title: 'Multilingual products',
    description: 'Build for Arabic and English with RTL support and thoughtful typography for inclusive experiences.'
  }
]

const workApproach = [
  {
    title: 'Transparent updates',
    description: 'Short, friendly check‑ins and async‑ready notes so everyone stays aligned without meetings overload.'
  },
  {
    title: 'Iterative delivery',
    description: 'Break work into shippable slices, gather feedback early, and keep momentum steady and predictable.'
  },
  {
    title: 'Quality without drama',
    description: 'Tests where they matter, performance budgets, and a bias for clarity over cleverness.'
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
            About <span className="text-primary">Me</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed mb-6 text-center">
                    <strong>Hi, I&apos;m Omar</strong> — a full‑stack developer who loves building{' '}
                    <strong>clean, scalable solutions</strong> with modern technologies. I focus on{' '}
                    <strong>user experience</strong> and <strong>performance</strong> to create impactful digital products.
                  </p>

                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Availability</h3>
                    <p>
                      Based in Benha, Egypt. Open to full‑time or contract roles where thoughtful engineering matters.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <FaTools className="text-primary" />
              <span>Technical Capabilities</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 h-full group hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                          {capability.icon}
                        </div>
                        <h4 className="text-lg font-bold mb-2">
                          {capability.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {capability.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Work Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <FaUsers className="text-primary" />
              <span>How I Work</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workApproach.map((approach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 h-full group hover:-translate-y-1"
                  >
                    <CardContent className="pt-6">
                      <h4 className="font-bold mb-3 text-lg">{approach.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {approach.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}