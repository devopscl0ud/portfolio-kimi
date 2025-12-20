import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/playground', label: 'Playground' },
    { path: '/contact', label: 'Contact' },
]

function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-[1000] glassmorphism-nav"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center space-x-4">
                        <img
                            src="/resources/logo-bv.png?v=1734681442"
                            alt="BV Logo"
                            className="w-12 h-12 animate-spin-slow"
                        />
                        <div>
                            <h1 className="font-orbitron font-bold text-xl neon-text">Bandi Venkatesh</h1>
                            <p className="text-sm text-gray-400">DevOps Engineer</p>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(({ path, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `transition-colors duration-300 ${isActive ? 'text-cyber-blue' : 'hover:text-cyber-blue'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-cyber-blue"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 flex flex-col space-y-4"
                        >
                            {navLinks.map(({ path, label }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `py-2 px-4 rounded transition-colors ${isActive ? 'text-cyber-blue bg-cyber-blue/10' : 'hover:text-cyber-blue hover:bg-cyber-blue/5'
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}

export default Navigation
