'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormTextArea } from '@/components/ui/form'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  {
    icon: <FaGithub className="w-6 h-6" />,
    label: 'GitHub',
    url: 'https://github.com/yourusername',
  },
  {
    icon: <FaLinkedin className="w-6 h-6" />,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
  },
  {
    icon: <FaEnvelope className="w-6 h-6" />,
    label: 'Email',
    url: 'mailto:your.email@example.com',
  },
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
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let&apos;s talk!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass">
              <CardContent className="pt-6">
                <Form onSubmit={handleSubmit}>
                  <FormField
                    name="name"
                    label="Name"
                    placeholder="Your name"
                    required
                  />
                  <FormField
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="your.email@example.com"
                    required
                  />
                  <FormField
                    name="subject"
                    label="Subject"
                    placeholder="What's this about?"
                    required
                  />
                  <FormTextArea
                    name="message"
                    label="Message"
                    placeholder="Your message here..."
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  {submitStatus === 'success' && (
                    <p className="text-sm text-green-500 text-center">
                      Message sent successfully!
                    </p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-500 text-center">
                      Failed to send message. Please try again.
                    </p>
                  )}
                </Form>
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
            <Card variant="gradient">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-muted-foreground">
                  Based in Your City, Country
                </p>
                <p className="text-muted-foreground">
                  Available for remote work and local opportunities
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 