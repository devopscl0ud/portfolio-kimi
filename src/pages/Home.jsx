import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'
import MetricCounter from '@components/ui/MetricCounter'
import Terminal from '@components/Terminal'

function Home() {
    const [taglineIndex, setTaglineIndex] = useState(0)
    const taglines = [
        'Building Reliable Infrastructure',
        'Kubernetes Expert',
        'Cloud Native Engineer',
        'DevOps Enthusiast',
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % taglines.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const metrics = [
        { target: 10, suffix: '+', label: 'GKE Clusters Managed', color: 'neon-text' },
        { target: 15, suffix: '+', label: 'Environments Deployed', color: 'matrix-text' },
        { target: 20, suffix: '+', label: 'CI/CD Pipelines Built', color: 'purple-glow' },
        { target: 99.9, suffix: '%', label: 'Uptime Achieved', color: 'neon-text' },
    ]

    const quickStats = [
        { label: 'Multi-Tenant GKE', value: '✓', color: 'neon-text' },
        { label: 'GitOps Workflows', value: '✓', color: 'matrix-text' },
        { label: 'DevSecOps', value: '✓', color: 'purple-glow' },
        { label: 'IaC with Terraform', value: '✓', color: 'neon-text' },
    ]

    const techStack = ['Kubernetes', 'GCP', 'Terraform', 'Docker', 'Helm', 'Jenkins', 'Prometheus', 'Grafana']

    return (
        <PageTransition>
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Text Content */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div>
                                {/* Typing Animation Tagline */}
                                <div className="min-h-[120px] lg:min-h-[160px] mb-6">
                                    <motion.h2
                                        key={taglineIndex}
                                        className="font-orbitron font-black text-3xl lg:text-5xl xl:text-6xl leading-tight"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <span className="neon-text">{taglines[taglineIndex].split(' ')[0]}</span>
                                        <br />
                                        <span className="matrix-text">
                                            {taglines[taglineIndex].split(' ').slice(1).join(' ')}
                                        </span>
                                    </motion.h2>
                                </div>

                                <p className="text-lg lg:text-xl text-gray-300 mb-4">
                                    One Cluster at a Time
                                </p>

                                <div className="space-y-2">
                                    <p className="neon-text font-semibold text-base lg:text-lg">DevOps Engineer | Kubernetes | Cloud Infrastructure</p>
                                    <p className="text-gray-400">📍 Hyderabad, India</p>
                                </div>

                                <p className="text-gray-300 mt-4 max-w-lg text-sm lg:text-base">
                                    Expertise in Kubernetes, GCP, CI/CD automation, and GitOps practices.
                                    Building production-grade platforms across fintech, healthcare, and e-commerce.
                                </p>
                            </div>

                            {/* Metrics Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                {metrics.map((metric, i) => (
                                    <GlassCard key={i} className="p-4">
                                        <div className="flex items-baseline gap-1">
                                            <MetricCounter
                                                target={metric.target}
                                                className={`text-2xl font-bold ${metric.color}`}
                                            />
                                            <span className={`text-lg font-bold ${metric.color}`}>{metric.suffix}</span>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
                                    </GlassCard>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    to="/projects"
                                    className="bg-cyber-blue text-deep-space px-8 py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300 hover:scale-105 text-center"
                                    style={{ boxShadow: '0 0 20px #00F5FF' }}
                                >
                                    View Projects
                                </Link>
                                <Link
                                    to="/contact"
                                    className="border-2 border-matrix-green text-matrix-green px-8 py-4 rounded-lg font-semibold hover:bg-matrix-green hover:text-deep-space transition-all duration-300 text-center"
                                >
                                    Get In Touch
                                </Link>
                                <Link
                                    to="/experience"
                                    className="border-2 border-electric-purple text-electric-purple px-8 py-4 rounded-lg font-semibold hover:bg-electric-purple hover:text-deep-space transition-all duration-300 text-center"
                                >
                                    Experience
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Terminal */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Terminal />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Tech Stack Marquee */}
            <section className="py-16 overflow-hidden">
                <h3 className="text-center text-2xl font-orbitron font-bold neon-text mb-8">
                    Technology Stack
                </h3>
                <div className="marquee">
                    <div className="marquee-content">
                        {[...techStack, ...techStack].map((tech, i) => (
                            <span
                                key={i}
                                className={`text-4xl font-bold mx-8 ${i % 3 === 0 ? 'text-cyber-blue' : i % 3 === 1 ? 'text-matrix-green' : 'text-electric-purple'
                                    }`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-center text-2xl font-orbitron font-bold mb-8 text-gray-300">
                        Core Competencies
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="p-6">
                                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}

export default Home
