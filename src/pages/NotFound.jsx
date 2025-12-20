import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '@components/ui/PageTransition'

function NotFound() {
    return (
        <PageTransition>
            <div className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center max-w-2xl">
                    {/* Animated 404 */}
                    <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1
                            className="font-orbitron font-black text-9xl lg:text-[12rem] bg-gradient-to-r from-cyber-blue via-matrix-green to-electric-purple bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            404
                        </motion.h1>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Lost in the Cloud? ☁️
                        </h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            This page doesn't exist in our cluster. Let's get you back to a working endpoint.
                        </p>
                    </motion.div>

                    {/* Floating icons */}
                    <div className="relative h-32 mb-8">
                        {['🚀', '⚙️', '🐳', '☸️'].map((emoji, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-4xl"
                                style={{
                                    left: `${25 * i + 10}%`,
                                    top: '50%',
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 2 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            >
                                {emoji}
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/"
                            className="bg-cyber-blue text-deep-space px-8 py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300"
                            style={{ boxShadow: '0 0 20px #00F5FF' }}
                        >
                            ← Back to Home
                        </Link>
                        <Link
                            to="/projects"
                            className="border-2 border-matrix-green text-matrix-green px-8 py-4 rounded-lg font-semibold hover:bg-matrix-green hover:text-deep-space transition-all duration-300"
                        >
                            View Projects
                        </Link>
                    </motion.div>

                    {/* Error code */}
                    <motion.p
                        className="mt-12 text-gray-600 font-mono text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        ERROR_CODE: ROUTE_NOT_FOUND | STATUS: 404
                    </motion.p>
                </div>
            </div>
        </PageTransition>
    )
}

export default NotFound
