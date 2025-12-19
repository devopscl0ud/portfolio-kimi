import { motion } from 'framer-motion'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'

function Experience() {
    const experiences = [
        {
            title: 'DevOps Engineer',
            company: 'Uncommon Design Services',
            period: 'Mar 2025 - Present',
            location: 'Hyderabad',
            mission: 'Building multi-tenant Kubernetes infrastructure for diverse client portfolios',
            metrics: [
                { value: '3+', label: 'Client Verticals', color: 'cyber-blue' },
                { value: '10+', label: 'GKE Clusters', color: 'matrix-green' },
                { value: '99.9%', label: 'Uptime', color: 'electric-purple' },
            ],
            highlights: [
                'Architecting Kubernetes infrastructure on GCP for fintech, e-commerce, and on-demand delivery clients',
                'Multi-tenant environments with secure namespace segregation',
                'Observability stack with Prometheus and Grafana',
            ],
            technologies: ['GKE', 'Terraform', 'Prometheus', 'Grafana', 'GitOps'],
            story: 'Currently leading infrastructure for multiple client projects, implementing cost optimization through rightsizing and spot instances.',
        },
        {
            title: 'DevOps Engineer',
            company: 'WFM Technologies (PrimeRx)',
            period: 'Jan 2024 - Feb 2025',
            location: 'Hyderabad',
            mission: 'Scaling healthcare SaaS platform for US pharmacy operations',
            metrics: [
                { value: '1000+', label: 'Pharmacies Served', color: 'cyber-blue' },
                { value: '99.95%', label: 'Uptime Achieved', color: 'matrix-green' },
                { value: '15+', label: 'CI/CD Pipelines', color: 'electric-purple' },
            ],
            highlights: [
                'Production-grade GKE clusters for pharmacy management SaaS',
                'Blue-green deployments with automated rollbacks',
                'DevSecOps practices for healthcare data protection',
            ],
            technologies: ['GKE', 'Docker', 'Jenkins', 'GitLab CI', 'Helm', 'DevSecOps'],
            story: 'Engineered CI/CD pipelines with vulnerability scanning and compliance checks for HIPAA-sensitive healthcare data.',
        },
        {
            title: 'Process Executive → Cloud/DevOps',
            company: 'Cognizant Technology Solutions',
            period: 'Jun 2021 - Dec 2023',
            location: 'Hyderabad',
            mission: 'Career transformation from operations to cloud engineering',
            metrics: [
                { value: 'GCP ACE', label: 'Certified (2022)', color: 'cyber-blue' },
                { value: '2.5 yrs', label: 'Learning Journey', color: 'matrix-green' },
                { value: '10+', label: 'Pipelines Built', color: 'electric-purple' },
            ],
            highlights: [
                'Started in Google Maps geospatial operations',
                'Earned GCP Associate Cloud Engineer certification',
                'Transitioned to cloud infrastructure projects on GCP',
            ],
            technologies: ['GCP', 'GKE', 'Jenkins', 'Cloud Build', 'Python', 'Linux'],
            story: 'Self-driven career pivot: from operations to cloud engineering, achieving GCP certification while working full-time.',
        },
        {
            title: 'Technical Operations Executive',
            company: 'SYKES Business Services',
            period: 'Oct 2020 - May 2021',
            location: 'Hyderabad',
            mission: 'Building foundation in IT operations and incident management',
            metrics: [
                { value: 'ITIL', label: 'Framework', color: 'cyber-blue' },
                { value: 'Linux', label: 'Fundamentals', color: 'matrix-green' },
                { value: 'SLA', label: 'Compliance', color: 'electric-purple' },
            ],
            highlights: [
                'Incident handling and SLA compliance',
                'Foundational Linux and virtualization exposure',
                'Strong communication and triage skills developed',
            ],
            technologies: ['ITIL', 'Linux', 'Ticketing Systems'],
            story: 'First step into tech: learned the importance of reliability, documentation, and user-focused support.',
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
                        <span className="purple-glow">Work</span> <span className="text-aurora-white">Experience</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From operations to DevOps engineering – a journey of continuous learning.
                    </p>
                </motion.div>

                {/* Experience Cards */}
                <div className="space-y-16">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-8 overflow-hidden relative">
                                {/* Current Role Badge */}
                                {i === 0 && (
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full text-xs bg-matrix-green/20 text-matrix-green flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
                                            Current Role
                                        </span>
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-6">
                                    <div className="flex flex-wrap items-center gap-4 mb-2">
                                        <span className="px-3 py-1 rounded-full text-sm bg-cyber-blue/20 text-cyber-blue font-semibold">
                                            {exp.period}
                                        </span>
                                        <span className="text-gray-500 text-sm">📍 {exp.location}</span>
                                    </div>
                                    <h3 className="font-orbitron font-bold text-2xl text-white">{exp.title}</h3>
                                    <p className="text-matrix-green font-semibold text-lg">{exp.company}</p>
                                </div>

                                {/* Mission */}
                                <div className="mb-6 p-4 rounded-lg bg-gray-800/50 border-l-4 border-cyber-blue">
                                    <p className="text-gray-300">🎯 <span className="font-semibold">Mission:</span> {exp.mission}</p>
                                </div>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {exp.metrics.map((metric, j) => (
                                        <div key={j} className="text-center p-4 rounded-lg bg-gray-800/30">
                                            <div className={`text-2xl font-bold font-orbitron ${metric.color === 'cyber-blue' ? 'text-cyber-blue' :
                                                    metric.color === 'matrix-green' ? 'text-matrix-green' : 'text-electric-purple'
                                                }`}>
                                                {metric.value}
                                            </div>
                                            <div className="text-gray-500 text-xs mt-1">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Highlights */}
                                <div className="mb-6">
                                    <h4 className="text-gray-400 text-sm mb-3 uppercase tracking-wider">Key Contributions</h4>
                                    <ul className="space-y-2">
                                        {exp.highlights.map((highlight, j) => (
                                            <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                                                <span className="text-cyber-blue mt-0.5">▹</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Story */}
                                <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-cyber-blue/10 to-matrix-green/10 border border-gray-800">
                                    <p className="text-gray-400 text-sm italic">💡 {exp.story}</p>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs rounded-full border border-gray-700 text-gray-400 hover:border-cyber-blue hover:text-cyber-blue transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageTransition>
    )
}

export default Experience
