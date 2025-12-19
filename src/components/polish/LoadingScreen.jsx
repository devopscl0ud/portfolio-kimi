import { motion } from 'framer-motion'

function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-space">
            {/* Animated Orb */}
            <div className="relative">
                {/* Outer pulsing ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyber-blue"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    style={{ width: 120, height: 120, margin: -20 }}
                />

                {/* Middle rotating ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-matrix-green"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ width: 100, height: 100, margin: -10 }}
                />

                {/* Inner rotating ring (opposite direction) */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-electric-purple"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ width: 90, height: 90, margin: -5 }}
                />

                {/* Core orb */}
                <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-cyber-blue via-matrix-green to-electric-purple"
                    animate={{
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            '0 0 20px #00F5FF, 0 0 40px #00F5FF',
                            '0 0 40px #39FF14, 0 0 60px #39FF14',
                            '0 0 20px #00F5FF, 0 0 40px #00F5FF'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Loading text */}
            <motion.div
                className="absolute bottom-1/3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <p className="font-orbitron text-cyber-blue text-sm tracking-widest">
                    INITIALIZING
                </p>
                <motion.div
                    className="mt-4 flex justify-center gap-1"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-matrix-green"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default LoadingScreen
