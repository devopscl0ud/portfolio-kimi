import { motion } from 'framer-motion'
import PageTransition from '@components/ui/PageTransition'
import GlassCard from '@components/ui/GlassCard'
import MetricCounter from '@components/ui/MetricCounter'

function Dashboard() {
    const systemMetrics = [
        { label: 'Clusters Active', value: 48, max: 50, color: 'cyber-blue' },
        { label: 'Pods Running', value: 1876, max: 2000, color: 'matrix-green' },
        { label: 'Deployments Today', value: 42, max: 50, color: 'electric-purple' },
        { label: 'Pipeline Success Rate', value: 98.5, max: 100, suffix: '%', color: 'cyber-blue' },
    ]

    const recentDeployments = [
        { service: 'api-gateway', status: 'success', time: '2 min ago', version: 'v2.4.1' },
        { service: 'auth-service', status: 'success', time: '15 min ago', version: 'v1.8.0' },
        { service: 'user-service', status: 'running', time: '18 min ago', version: 'v3.1.2' },
        { service: 'payment-api', status: 'success', time: '1 hour ago', version: 'v2.0.5' },
        { service: 'notification-svc', status: 'failed', time: '2 hours ago', version: 'v1.2.0' },
    ]

    const statusColors = {
        success: 'text-matrix-green',
        running: 'text-yellow-400',
        failed: 'text-red-400',
    }

    const statusIcons = {
        success: '✓',
        running: '⟳',
        failed: '✗',
    }

    return (
        <PageTransition>
            <div className="container mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="font-orbitron font-black text-5xl lg:text-6xl mb-4">
                        <span className="neon-text">Infrastructure</span> <span className="text-aurora-white">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Real-time overview of managed infrastructure</p>
                </motion.div>

                {/* Status Banner */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <GlassCard className="p-4 flex items-center justify-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-matrix-green animate-pulse" />
                        <span className="text-matrix-green font-semibold">All Systems Operational</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-400 text-sm">Last updated: Just now</span>
                    </GlassCard>
                </motion.div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {systemMetrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="p-6">
                                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                                <MetricCounter
                                    target={metric.value}
                                    suffix={metric.suffix || ''}
                                    className={`text-3xl font-bold ${metric.color === 'cyber-blue' ? 'neon-text' : metric.color === 'matrix-green' ? 'matrix-text' : 'purple-glow'}`}
                                />
                                <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full rounded-full ${metric.color === 'cyber-blue' ? 'bg-cyber-blue' :
                                                metric.color === 'matrix-green' ? 'bg-matrix-green' : 'bg-electric-purple'
                                            }`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Deployments */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <GlassCard className="p-6">
                        <h2 className="font-orbitron text-lg font-bold mb-6 text-cyber-blue">Recent Deployments</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-gray-500 text-sm border-b border-gray-800">
                                        <th className="pb-3">Service</th>
                                        <th className="pb-3">Version</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentDeployments.map((deploy, i) => (
                                        <motion.tr
                                            key={i}
                                            className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + i * 0.1 }}
                                        >
                                            <td className="py-4 font-mono text-white">{deploy.service}</td>
                                            <td className="py-4 text-gray-400 font-mono text-sm">{deploy.version}</td>
                                            <td className="py-4">
                                                <span className={`flex items-center gap-2 ${statusColors[deploy.status]}`}>
                                                    <span className={deploy.status === 'running' ? 'animate-spin' : ''}>{statusIcons[deploy.status]}</span>
                                                    {deploy.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-gray-500 text-sm">{deploy.time}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Note */}
                <motion.p
                    className="text-center text-gray-600 text-sm mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    📊 This is a demo dashboard showcasing infrastructure monitoring capabilities
                </motion.p>
            </div>
        </PageTransition>
    )
}

export default Dashboard
