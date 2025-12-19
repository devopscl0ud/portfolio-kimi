import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'

function Projects() {
    const featuredProjects = [
        {
            id: 'vividp',
            name: 'VividP',
            tagline: 'Internal Developer Platform',
            description: 'A comprehensive Internal Developer Platform designed to streamline DevOps workflows, enable self-service infrastructure provisioning, and accelerate development cycles for engineering teams.',
            status: 'under-development',
            features: [
                'Self-service Kubernetes deployments',
                'GitOps-powered infrastructure',
                'Integrated observability dashboard',
                'One-click environment provisioning',
            ],
            tech: ['React', 'Kubernetes', 'GCP', 'Terraform', 'ArgoCD'],
            url: null,
            icon: '🚀',
        },
        {
            id: 'quantumkube',
            name: 'QuantumKube AI',
            tagline: 'AI-Powered Kubernetes Manifest Generator',
            description: 'An intelligent AI tool that generates production-ready Kubernetes manifests from natural language descriptions. Simplifying Kubernetes operations with the power of AI.',
            status: 'under-development',
            features: [
                'Natural language to YAML conversion',
                'Best practices built-in',
                'Multi-resource generation',
                'Helm chart generation',
            ],
            tech: ['Python', 'AI/ML', 'Kubernetes', 'React', 'FastAPI'],
            url: null,
            icon: '🤖',
        },
    ]

    const workProjects = [
        {
            title: 'Multi-Tenant GKE Platform',
            description: 'Production Kubernetes infrastructure serving multiple clients with namespace isolation and RBAC.',
            impact: '10+ clusters, 99.9% uptime',
            tech: ['GKE', 'Terraform', 'Helm'],
        },
        {
            title: 'PrimeRx DevOps Pipeline',
            description: 'End-to-end CI/CD for healthcare SaaS with security scanning and blue-green deployments.',
            impact: '1000+ pharmacies served',
            tech: ['Jenkins', 'GitLab CI', 'Docker'],
        },
        {
            title: 'Observability Stack',
            description: 'Comprehensive monitoring and alerting system for production workloads.',
            impact: '85% faster incident resolution',
            tech: ['Prometheus', 'Grafana', 'Alertmanager'],
        },
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
                        <span className="neon-text">My</span> <span className="text-aurora-white">Projects</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Building tools that make DevOps easier for everyone.
                    </p>
                </motion.div>

                {/* Featured Projects - Under Development */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {featuredProjects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <GlassCard className="p-8 h-full relative overflow-hidden">
                                {/* Animated Background */}
                                <div className="absolute inset-0 opacity-10">
                                    <motion.div
                                        className="absolute w-64 h-64 rounded-full bg-cyber-blue blur-3xl"
                                        animate={{
                                            x: [0, 100, 0],
                                            y: [0, 50, 0],
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{ top: '-50%', left: '-20%' }}
                                    />
                                    <motion.div
                                        className="absolute w-48 h-48 rounded-full bg-matrix-green blur-3xl"
                                        animate={{
                                            x: [0, -80, 0],
                                            y: [0, -40, 0],
                                        }}
                                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{ bottom: '-30%', right: '-10%' }}
                                    />
                                </div>

                                <div className="relative z-10">
                                    {/* Status Badge */}
                                    <div className="flex items-center justify-between mb-6">
                                        <motion.div
                                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-electric-purple/20 text-electric-purple text-sm"
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            >
                                                ⚙️
                                            </motion.span>
                                            Under Development
                                        </motion.div>
                                        <span className="text-4xl">{project.icon}</span>
                                    </div>

                                    {/* Project Info */}
                                    <h3 className="font-orbitron font-bold text-3xl text-white mb-2">{project.name}</h3>
                                    <p className="text-cyber-blue font-semibold mb-4">{project.tagline}</p>
                                    <p className="text-gray-400 mb-6">{project.description}</p>

                                    {/* Features */}
                                    <div className="mb-6">
                                        <h4 className="text-gray-500 text-xs uppercase tracking-wider mb-3">Features</h4>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, j) => (
                                                <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <span className="text-matrix-green">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="px-2 py-1 text-xs rounded border border-gray-700 text-gray-400">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Coming Soon Button - Opens in New Tab */}
                                    <motion.a
                                        href={`/coming-soon/${project.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyber-blue to-matrix-green flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <motion.span
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            🚀
                                        </motion.span>
                                        Preview Project
                                    </motion.a>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Work Projects */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-2xl font-bold text-center mb-8 text-gray-300">
                        Professional Work
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {workProjects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="p-6 h-full">
                                    <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                                    <p className="text-matrix-green text-sm mb-4">📈 {project.impact}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="px-2 py-0.5 text-xs rounded border border-gray-800 text-gray-500">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-gray-400 mb-6">Want to collaborate on a project?</p>
                    <Link
                        to="/contact"
                        className="inline-block bg-cyber-blue text-deep-space px-8 py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
                    >
                        Let's Connect
                    </Link>
                </motion.div>
            </div>
        </PageTransition>
    )
}

export default Projects
