import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function MetricCounter({ target, suffix = '', className = '', duration = 2 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true)
                    animateCount()
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [hasAnimated, target])

    const animateCount = () => {
        const startTime = Date.now()
        const isDecimal = target % 1 !== 0

        const update = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = eased * target

            setCount(isDecimal ? current.toFixed(2) : Math.floor(current))

            if (progress < 1) {
                requestAnimationFrame(update)
            } else {
                setCount(isDecimal ? target.toFixed(2) : target)
            }
        }

        requestAnimationFrame(update)
    }

    return (
        <motion.div
            ref={ref}
            className={`metric-counter ${className}`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
            {count}{suffix}
        </motion.div>
    )
}

export default MetricCounter
