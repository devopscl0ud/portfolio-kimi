import { motion } from 'framer-motion'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'
import Terminal from '@components/Terminal'

function Playground() {
    const demos = [
        { title: 'Kubernetes Simulator', description: 'Try kubectl commands in a simulated cluster', icon: '☸️' },
        { title: 'Terraform Planner', description: 'See infrastructure as code in action', icon: '🏗️' },
        { title: 'CI/CD Visualizer', description: 'Watch a deployment pipeline execute', icon: '🔄' },
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
                        <span className="matrix-text">Interactive</span> <span className="text-aurora-white">Playground</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Explore DevOps tools and concepts in an interactive environment.
                    </p>
                </motion.div>

                {/* Terminal Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="font-orbitron text-2xl font-bold mb-6 text-center neon-text">
                        Interactive Terminal
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <Terminal />
                    </div>
                    <p className="text-center text-gray-500 text-sm mt-4">
                        💡 Try: <code className="text-cyber-blue">kubectl get nodes</code>, <code className="text-matrix-green">terraform plan</code>, or <code className="text-electric-purple">help</code>
                    </p>
                </motion.div>

                {/* Demo Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-orbitron text-2xl font-bold mb-8 text-center text-gray-300">
                        More Demos Coming Soon
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 opacity-60">
                        {demos.map((demo, i) => (
                            <GlassCard key={i} className="p-6 text-center" hover3d={false}>
                                <div className="text-4xl mb-4">{demo.icon}</div>
                                <h3 className="font-semibold text-white mb-2">{demo.title}</h3>
                                <p className="text-gray-500 text-sm">{demo.description}</p>
                                <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-500">
                                    Coming Soon
                                </span>
                            </GlassCard>
                        ))}
                    </div>
                </motion.div>

                {/* Easter Egg Hint */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <p className="text-gray-600 text-sm">
                        🥚 Psst... try the Konami code (↑↑↓↓←→←→BA) anywhere on the site!
                    </p>
                </motion.div>
            </div>
        </PageTransition>
    )
}

export default Playground
