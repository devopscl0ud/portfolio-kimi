import { motion } from 'framer-motion'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'

function Skills() {
    const skillCategories = [
        {
            title: 'Kubernetes & Containers',
            color: 'cyber-blue',
            skills: [
                { name: 'Kubernetes', level: 90 },
                { name: 'Docker', level: 88 },
                { name: 'Helm', level: 85 },
                { name: 'GKE (Google Kubernetes Engine)', level: 90 },
                { name: 'Kustomize', level: 80 },
            ]
        },
        {
            title: 'Cloud & Infrastructure',
            color: 'matrix-green',
            skills: [
                { name: 'Google Cloud Platform (GCP)', level: 88 },
                { name: 'Terraform (IaC)', level: 82 },
                { name: 'Compute Engine', level: 85 },
                { name: 'Cloud SQL', level: 80 },
                { name: 'Ansible', level: 70 },
            ]
        },
        {
            title: 'CI/CD & Automation',
            color: 'electric-purple',
            skills: [
                { name: 'Jenkins', level: 85 },
                { name: 'GitLab CI/CD', level: 82 },
                { name: 'Google Cloud Build', level: 80 },
                { name: 'Git/GitHub', level: 88 },
                { name: 'DevSecOps', level: 78 },
            ]
        },
        {
            title: 'Observability',
            color: 'cyber-blue',
            skills: [
                { name: 'Prometheus', level: 85 },
                { name: 'Grafana', level: 85 },
                { name: 'Datadog', level: 75 },
                { name: 'Kubernetes Metrics Server', level: 80 },
            ]
        },
        {
            title: 'Scripting & OS',
            color: 'matrix-green',
            skills: [
                { name: 'Bash/Shell Scripting', level: 85 },
                { name: 'Linux Administration', level: 88 },
                { name: 'YAML', level: 90 },
                { name: 'Python', level: 70 },
            ]
        },
        {
            title: 'Kubernetes Deep Skills',
            color: 'electric-purple',
            skills: [
                { name: 'Deployments & StatefulSets', level: 88 },
                { name: 'RBAC & Security', level: 82 },
                { name: 'Network Policies', level: 80 },
                { name: 'Resource Quotas', level: 85 },
                { name: 'Troubleshooting', level: 88 },
            ]
        },
    ]

    const certifications = [
        { name: 'Google Cloud Associate Cloud Engineer', issuer: 'Google Cloud', year: 'May 2022', status: 'completed' },
        { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', year: '2025', status: 'in-progress' },
    ]

    const colorMap = {
        'cyber-blue': { bar: 'from-cyber-blue to-cyan-400', text: 'text-cyber-blue' },
        'matrix-green': { bar: 'from-matrix-green to-green-400', text: 'text-matrix-green' },
        'electric-purple': { bar: 'from-electric-purple to-purple-400', text: 'text-electric-purple' },
    }

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
                        <span className="matrix-text">Technical</span> <span className="text-aurora-white">Skills</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Core competencies in Kubernetes, cloud infrastructure, and DevOps automation.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            <GlassCard className="p-6 h-full">
                                <h3 className={`font-orbitron font-bold text-lg mb-6 ${colorMap[category.color].text}`}>
                                    {category.title}
                                </h3>
                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-300 text-sm">{skill.name}</span>
                                                <span className="text-gray-500 text-xs">{skill.level}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className={`h-full rounded-full bg-gradient-to-r ${colorMap[category.color].bar}`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-3xl font-bold text-center mb-8">
                        <span className="neon-text">Certifications</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        {certifications.map((cert, i) => (
                            <GlassCard key={i} className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${cert.status === 'completed'
                                            ? 'bg-gradient-to-br from-cyber-blue to-matrix-green'
                                            : 'bg-gradient-to-br from-electric-purple to-pink-500'
                                        }`}>
                                        <span className="text-2xl">{cert.status === 'completed' ? '✓' : '⏳'}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                                        <p className="text-cyber-blue text-sm">{cert.issuer}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-gray-500 text-xs">{cert.year}</span>
                                            {cert.status === 'in-progress' && (
                                                <span className="px-2 py-0.5 rounded-full text-xs bg-electric-purple/20 text-electric-purple">
                                                    In Progress
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    )
}

export default Skills
