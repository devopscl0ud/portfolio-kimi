import { motion } from 'framer-motion'

function GlassCard({ children, className = '', hover3d = true, ...props }) {
    const baseClasses = 'glassmorphism rounded-lg'
    const hoverClasses = hover3d ? 'hover-3d' : ''

    return (
        <motion.div
            className={`${baseClasses} ${hoverClasses} ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default GlassCard
