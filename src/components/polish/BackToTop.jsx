import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const [isLaunching, setIsLaunching] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        setIsLaunching(true)

        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        // Reset launching state after animation
        setTimeout(() => setIsLaunching(false), 800)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full glassmorphism flex items-center justify-center group"
                    aria-label="Back to top"
                    style={{
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)',
                    }}
                >
                    <motion.div
                        animate={isLaunching ? { y: [-5, -100] } : { y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Rocket/Arrow Icon */}
                        <svg
                            className="w-5 h-5 text-cyber-blue group-hover:text-matrix-green transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </motion.div>

                    {/* Flame effect when launching */}
                    <AnimatePresence>
                        {isLaunching && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-2 flex flex-col items-center"
                            >
                                <div className="w-2 h-4 bg-gradient-to-b from-matrix-green via-yellow-500 to-orange-500 rounded-full blur-sm" />
                                <div className="w-1 h-3 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full blur-sm -mt-2" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Glow pulse */}
                    <motion.div
                        className="absolute inset-0 rounded-full border border-cyber-blue"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default BackToTop
