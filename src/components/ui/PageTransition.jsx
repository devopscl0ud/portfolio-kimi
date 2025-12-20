import { motion } from 'framer-motion'

function PageTransition({ children }) {
    return (
        <motion.div
            className="relative z-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition
