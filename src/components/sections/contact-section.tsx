'use client'

import { useState } from 'react'
import { motion } from '@/components/motion-wrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormTextArea } from '@/components/ui/form'
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'

const socialLinks = [
  {
    icon: <FaLinkedin className="w-6 h-6 text-[#0077B5]" />,
    label: 'Connect on LinkedIn',
    url: 'https://www.linkedin.com/in/omar-ashraf-176790262/'
  },
  {
    icon: <SiUpwork className="w-6 h-6 text-[#6fda44]" />,
    label: 'Find me on Upwork',
    url: 'https://www.upwork.com/freelancers/~016247fec408960a4d'
  },
  {
    icon: <FaGithub className="w-6 h-6 text-foreground" />,
    label: 'Follow on GitHub',
    url: 'https://github.com/www-e'
  },
  {
    icon: <FaWhatsapp className="w-6 h-6 text-[#25D366]" />,
    label: 'Chat on WhatsApp',
    url: 'https://wa.me/+201154688628'
  },
  {
    icon: <FaFacebook className="w-6 h-6 text-[#1877F2]" />,
    label: 'Follow on Facebook',
    url: 'https://facebook.com/your-profile'
  },
  {
    icon: <FaTwitter className="w-6 h-6 text-[#1DA1F2]" />,
    label: 'Follow on Twitter',
    url: 'https://twitter.com/your-profile'
  },
  {
    icon: <FaEnvelope className="w-6 h-6 text-red-500" />,
    label: 'Send an Email',
    url: 'mailto:omarasj445@gmail.com'
  }
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (data: { [key: string]: string }) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Implement form submission
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      console.log('Form submitted:', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      })
      setSubmitStatus('success')
    } catch (err) {
      console.error('Form submission error:', err)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl animate-pulse" />
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
            Let&apos;s <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-background/30 to-background/10 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all duration-500">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-background/50 hover:bg-background/80 border border-primary/10 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="p-3 rounded-lg bg-background/50 group-hover:bg-background transition-colors duration-300">
                      {link.icon}
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 