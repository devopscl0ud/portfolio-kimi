import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'

function ComingSoon() {
    const { project } = useParams()

    const projects = {
        vividp: {
            name: 'VividP',
            tagline: 'Internal Developer Platform',
            description: 'Streamlining DevOps workflows with self-service infrastructure',
            color: 'cyber-blue',
            gradient: 'from-cyan-500 via-blue-500 to-purple-600',
            icon: '🚀',
            features: ['One-Click Deployments', 'GitOps Automation', 'Real-time Monitoring'],
        },
        quantumkube: {
            name: 'QuantumKube AI',
            tagline: 'AI-Powered Kubernetes Manifest Generator',
            description: 'Generate production-ready K8s manifests from natural language',
            color: 'matrix-green',
            gradient: 'from-green-400 via-emerald-500 to-cyan-500',
            icon: '🤖',
            features: ['Natural Language Input', 'Best Practices Built-in', 'Helm Chart Generation'],
        },
    }

    const data = projects[project] || projects.vividp

    // Floating particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
    }))

    return (
        <div className="min-h-screen bg-deep-space relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,245,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,245,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${data.color === 'cyber-blue' ? 'bg-cyber-blue' : 'bg-matrix-green'}`}
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        opacity: 0.3,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Orbiting Rings */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full border border-gray-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                <motion.div
                    className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${data.gradient} shadow-lg`}
                    style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full border border-gray-700"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                <motion.div
                    className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${data.gradient}`}
                    style={{ top: 0, left: '50%', transform: 'translateX(-50%)' }}
                />
            </motion.div>

            {/* Central Content */}
            <div className="relative z-10 text-center px-6 max-w-2xl">
                {/* Animated Icon */}
                <motion.div
                    className="text-8xl mb-8"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    {data.icon}
                </motion.div>

                {/* Project Name */}
                <motion.h1
                    className={`font-orbitron font-black text-5xl lg:text-7xl mb-4 bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {data.name}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    className="text-xl lg:text-2xl text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {data.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                    className="text-gray-400 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {data.description}
                </motion.p>

                {/* Under Development Badge */}
                <motion.div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700 mb-10"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${data.gradient}`}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-gray-300 font-semibold">Under Active Development</span>
                </motion.div>

                {/* Features Preview */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    {data.features.map((feature, i) => (
                        <motion.span
                            key={feature}
                            className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                        >
                            {feature}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Countdown/Progress Indicator */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-gray-500 text-sm mb-3">Development Progress</p>
                    <div className="w-64 mx-auto h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full bg-gradient-to-r ${data.gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            transition={{ duration: 2, delay: 1.2 }}
                        />
                    </div>
                    <p className="text-gray-600 text-xs mt-2">45% Complete</p>
                </motion.div>

                {/* Back Link */}
                <motion.a
                    href="/projects"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span>←</span> Back to Portfolio
                </motion.a>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cyber-blue/10 to-transparent blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-matrix-green/10 to-transparent blur-3xl" />
        </div>
    )
}

export default ComingSoon
