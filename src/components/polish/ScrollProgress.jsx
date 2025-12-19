import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function ScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setProgress(scrollPercent)
        }

        window.addEventListener('scroll', updateProgress, { passive: true })
        updateProgress()

        return () => window.removeEventListener('scroll', updateProgress)
    }, [])

    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-deep-space/50">
            <motion.div
                className="h-full origin-left"
                style={{
                    background: 'linear-gradient(90deg, #00F5FF 0%, #39FF14 50%, #BC13FE 100%)',
                    boxShadow: '0 0 10px #00F5FF, 0 0 20px #39FF14',
                    width: `${progress}%`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.1 }}
            />
        </div>
    )
}

export default ScrollProgress
