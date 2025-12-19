import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
    }

    const contactInfo = [
        { icon: '📧', label: 'Email', value: 'bandivenky2222@gmail.com', href: 'mailto:bandivenky2222@gmail.com' },
        { icon: '📱', label: 'Phone', value: '+91-8555012224', href: 'tel:+918555012224' },
        { icon: '📍', label: 'Location', value: 'Hyderabad, India', href: null },
    ]

    const socialLinks = [
        { name: 'LinkedIn', url: '#linkedin', icon: '💼', placeholder: true },
        { name: 'GitHub', url: '#github', icon: '🐙', placeholder: true },
        { name: 'Email', url: 'mailto:bandivenky2222@gmail.com', icon: '📧', placeholder: false },
    ]

    return (
        <PageTransition>
            <div className="container mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="font-orbitron font-black text-5xl lg:text-6xl mb-4">
                        <span className="neon-text">Get In</span> <span className="text-aurora-white">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Let's discuss Kubernetes, cloud infrastructure, or your next DevOps challenge.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-8">
                            <h2 className="font-orbitron text-xl font-bold mb-6 text-cyber-blue">Send a Message</h2>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="text-5xl mb-4">✅</div>
                                    <h3 className="text-xl font-semibold text-matrix-green mb-2">Message Sent!</h3>
                                    <p className="text-gray-400">I'll get back to you soon.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-6 text-cyber-blue hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyber-blue transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyber-blue transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyber-blue transition-colors resize-none"
                                            placeholder="Tell me about your project or opportunity..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-cyber-blue text-deep-space py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⚙️</motion.span>
                                                Sending...
                                            </span>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            )}
                        </GlassCard>
                    </motion.div>

                    {/* Contact Info & Social */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Direct Contact */}
                        <GlassCard className="p-8">
                            <h2 className="font-orbitron text-xl font-bold mb-6 text-matrix-green">Contact Info</h2>
                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <span className="text-2xl">{item.icon}</span>
                                        <div>
                                            <p className="text-gray-500 text-sm">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} className="text-white hover:text-cyber-blue transition-colors">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-white">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Resume Download */}
                        <GlassCard className="p-8">
                            <h2 className="font-orbitron text-xl font-bold mb-4 text-electric-purple">Resume</h2>
                            <p className="text-gray-400 text-sm mb-4">Download my resume for a detailed overview of my experience and skills.</p>
                            <a
                                href="/Bandi_Venkatesh_Resume.pdf"
                                download
                                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-electric-purple to-cyber-blue text-white font-semibold hover:opacity-90 transition-opacity"
                            >
                                <span>📄</span>
                                Download Resume
                            </a>
                        </GlassCard>

                        {/* Social Links */}
                        <GlassCard className="p-8">
                            <h2 className="font-orbitron text-xl font-bold mb-6 text-cyber-blue">Connect</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target={link.placeholder ? '_self' : '_blank'}
                                        rel="noopener noreferrer"
                                        className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${link.placeholder ? 'bg-gray-800/30 cursor-not-allowed' : 'bg-gray-800/50 hover:bg-gray-800'
                                            }`}
                                    >
                                        <span className="text-2xl">{link.icon}</span>
                                        <span className={`text-sm ${link.placeholder ? 'text-gray-600' : 'text-gray-400 group-hover:text-cyber-blue'} transition-colors`}>
                                            {link.name}
                                        </span>
                                        {link.placeholder && (
                                            <span className="text-xs text-gray-600">Soon</span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </GlassCard>

                        {/* Availability */}
                        <GlassCard className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-3 h-3 rounded-full bg-matrix-green animate-pulse" />
                                <span className="text-matrix-green font-semibold">Open to Opportunities</span>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Interested in DevOps, Platform Engineering, and Cloud Infrastructure roles.
                            </p>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Contact
