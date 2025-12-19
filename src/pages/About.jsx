import { motion } from 'framer-motion'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'

function About() {
    const careerHighlights = [
        { year: '2025', title: 'DevOps Engineer', company: 'Uncommon Design Services', description: 'Managing Kubernetes infrastructure on GCP for fintech, e-commerce, and on-demand delivery clients.' },
        { year: '2024', title: 'DevOps Engineer', company: 'WFM Technologies (PrimeRx)', description: 'Production-grade GKE clusters for US-based pharmacy SaaS platform serving thousands of pharmacies.' },
        { year: '2021', title: 'Process Executive → Cloud/DevOps', company: 'Cognizant', description: 'Career transition from operations to cloud engineering. Earned GCP ACE certification.' },
        { year: '2020', title: 'Technical Operations Executive', company: 'SYKES', description: 'IT operations, incident handling, and foundational Linux/virtualization exposure.' },
    ]

    const philosophy = [
        { icon: '☸️', title: 'Kubernetes-First', description: 'Deep expertise in container orchestration, from deployments to troubleshooting complex cluster issues.' },
        { icon: '🔄', title: 'GitOps Practices', description: 'Infrastructure as code, automated pipelines, and version-controlled deployments for reliability.' },
        { icon: '📊', title: 'Observability', description: 'Prometheus, Grafana, Datadog – you cannot improve what you do not measure.' },
        { icon: '🔒', title: 'DevSecOps', description: 'Security baked into CI/CD: vulnerability scanning, compliance checks, and hardened infrastructure.' },
    ]

    const technicalHighlights = [
        'Multi-tenant GKE clusters with RBAC, Network Policies, and Resource Quotas',
        'CI/CD pipelines with Jenkins, GitLab CI, and Google Cloud Build',
        'Infrastructure as Code using Terraform for GCP',
        'Helm charts and Kustomize for standardized deployments',
        'Expert Kubernetes troubleshooting: pod scheduling, CNI, resource optimization',
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
                        <span className="neon-text">About</span> <span className="text-aurora-white">Me</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From operations to cloud engineering – a journey of continuous learning and infrastructure excellence.
                    </p>
                </motion.div>

                {/* Bio Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <GlassCard className="p-8 lg:p-12">
                        <div className="grid lg:grid-cols-3 gap-8 items-center">
                            <div className="lg:col-span-1 flex justify-center">
                                <motion.div
                                    className="w-48 h-48 rounded-full bg-gradient-to-br from-cyber-blue via-matrix-green to-electric-purple p-1"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                >
                                    <div className="w-full h-full rounded-full bg-deep-space flex items-center justify-center">
                                        <span className="text-6xl">👨‍💻</span>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <h2 className="font-orbitron text-2xl font-bold neon-text">Bandi Venkatesh</h2>
                                <p className="text-cyber-blue">DevOps Engineer | Hyderabad, India</p>
                                <p className="text-gray-300 leading-relaxed">
                                    DevOps Engineer with strong expertise in Kubernetes, cloud infrastructure, CI/CD automation,
                                    and GitOps practices. Proven experience in designing, deploying, and operating production-grade
                                    Kubernetes platforms on Google Cloud Platform.
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    Skilled in Infrastructure as Code using Terraform, container orchestration, system observability,
                                    and DevSecOps implementation. Known for deep Kubernetes troubleshooting, performance optimization,
                                    and reliability-driven engineering.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-4">
                                    {['Kubernetes', 'GKE', 'Terraform', 'Docker', 'Jenkins', 'Prometheus'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 rounded-full text-sm border border-cyber-blue text-cyber-blue">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Philosophy */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-3xl font-bold text-center mb-8">
                        <span className="matrix-text">My Approach</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {philosophy.map((item, i) => (
                            <GlassCard key={i} className="p-6 text-center">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-semibold text-lg mb-2 text-cyber-blue">{item.title}</h3>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                            </GlassCard>
                        ))}
                    </div>
                </motion.div>

                {/* Technical Highlights */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-3xl font-bold text-center mb-8">
                        <span className="purple-glow">Technical Highlights</span>
                    </h2>
                    <GlassCard className="p-8">
                        <ul className="space-y-4">
                            {technicalHighlights.map((item, i) => (
                                <motion.li
                                    key={i}
                                    className="flex items-start gap-3 text-gray-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className="text-matrix-green mt-1">▹</span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </GlassCard>
                </motion.div>

                {/* Career Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-3xl font-bold text-center mb-8">
                        <span className="neon-text">Career Journey</span>
                    </h2>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-matrix-green to-electric-purple" />

                        <div className="space-y-8">
                            {careerHighlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="flex gap-8"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center font-orbitron font-bold text-cyber-blue border border-cyber-blue">
                                            {item.year}
                                        </div>
                                    </div>
                                    <GlassCard className="flex-1 p-6">
                                        <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                                        <p className="text-matrix-green text-sm">{item.company}</p>
                                        <p className="text-gray-400 mt-2">{item.description}</p>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Education */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-3xl font-bold text-center mb-8">
                        <span className="text-gray-300">Education</span>
                    </h2>
                    <GlassCard className="p-8 text-center max-w-2xl mx-auto">
                        <div className="text-4xl mb-4">🎓</div>
                        <h3 className="font-semibold text-xl text-white">Diploma in Mechanical Engineering</h3>
                        <p className="text-cyber-blue">Aurora's Polytech Academy, Hyderabad</p>
                        <p className="text-gray-500 mt-2">2014 - 2018</p>
                    </GlassCard>
                </motion.div>
            </div>
        </PageTransition>
    )
}

export default About
