import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function EasterEggs() {
    const [showMatrix, setShowMatrix] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [rainbowMode, setRainbowMode] = useState(false)
    const [logoClicks, setLogoClicks] = useState(0)

    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
    const [konamiIndex, setKonamiIndex] = useState(0)

    const triggerMatrixRain = useCallback(() => {
        setShowMatrix(true)
        setTimeout(() => setShowMatrix(false), 5000)
    }, [])

    const triggerConfetti = useCallback(() => {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
    }, [])

    const triggerRainbow = useCallback(() => {
        setRainbowMode(true)
        setTimeout(() => setRainbowMode(false), 10000)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                const nextIndex = konamiIndex + 1
                if (nextIndex === konamiCode.length) {
                    triggerMatrixRain()
                    setKonamiIndex(0)
                } else {
                    setKonamiIndex(nextIndex)
                }
            } else {
                setKonamiIndex(0)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [konamiIndex, triggerMatrixRain])

    // Logo click easter egg
    useEffect(() => {
        const handleLogoClick = (e) => {
            if (e.target.closest('a[href="/"]') || e.target.alt === 'BV Logo') {
                setLogoClicks(prev => {
                    const newCount = prev + 1
                    if (newCount >= 5) {
                        triggerRainbow()
                        return 0
                    }
                    return newCount
                })
            }
        }

        document.addEventListener('click', handleLogoClick)
        return () => document.removeEventListener('click', handleLogoClick)
    }, [triggerRainbow])

    // Expose easter egg triggers globally for terminal commands
    useEffect(() => {
        window.easterEggs = {
            triggerMatrixRain,
            triggerConfetti,
            triggerRainbow,
        }
        return () => { delete window.easterEggs }
    }, [triggerMatrixRain, triggerConfetti, triggerRainbow])

    return (
        <>
            {/* Matrix Rain Effect */}
            <AnimatePresence>
                {showMatrix && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
                    >
                        <MatrixRain />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confetti Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] pointer-events-none"
                    >
                        <Confetti />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rainbow Mode Overlay */}
            <AnimatePresence>
                {rainbowMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] pointer-events-none"
                        style={{
                            background: 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)',
                            backgroundSize: '1800% 1800%',
                            animation: 'rainbow 5s ease infinite',
                        }}
                    />
                )}
            </AnimatePresence>

            <style>{`
        @keyframes rainbow {
          0% { background-position: 0% 82% }
          50% { background-position: 100% 19% }
          100% { background-position: 0% 82% }
        }
      `}</style>
        </>
    )
}

// Matrix Rain Component
function MatrixRain() {
    const columns = Math.floor(window.innerWidth / 20)

    return (
        <div className="relative w-full h-full bg-black/90">
            {Array.from({ length: columns }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute top-0 text-matrix-green font-mono text-sm"
                    style={{
                        left: i * 20,
                        textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14',
                    }}
                    initial={{ y: -500 }}
                    animate={{ y: window.innerHeight + 500 }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: 2,
                        delay: Math.random() * 2,
                        ease: 'linear',
                    }}
                >
                    {Array.from({ length: 30 }).map((_, j) => (
                        <div key={j} style={{ opacity: 1 - j * 0.03 }}>
                            {String.fromCharCode(0x30A0 + Math.random() * 96)}
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    )
}

// Confetti Component
function Confetti() {
    const pieces = 50
    const colors = ['#00F5FF', '#39FF14', '#BC13FE', '#FFD700', '#FF69B4']

    return (
        <div className="relative w-full h-full">
            {Array.from({ length: pieces }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{
                        left: Math.random() * 100 + '%',
                        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                        borderRadius: Math.random() > 0.5 ? '50%' : '0',
                    }}
                    initial={{ y: -20, rotate: 0, opacity: 1 }}
                    animate={{
                        y: window.innerHeight + 20,
                        rotate: Math.random() * 720 - 360,
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 2 + 2,
                        delay: Math.random() * 0.5,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    )
}

export default EasterEggs
