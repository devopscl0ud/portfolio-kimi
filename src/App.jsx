import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Layout
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Playground from './pages/Playground'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'

// Premium Polish
import LoadingScreen from './components/polish/LoadingScreen'
import CustomCursor from './components/polish/CustomCursor'
import EasterEggs from './components/polish/EasterEggs'

function App() {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Show loading screen for 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <>
            <CustomCursor />
            <EasterEggs />
            <Layout>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/playground" element={<Playground />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/coming-soon/:project" element={<ComingSoon />} />
                    </Routes>
                </AnimatePresence>
            </Layout>
        </>
    )
}

export default App
