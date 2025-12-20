import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Layout
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { ScrollToTop } from './components/ScrollToTop'

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
import NotFound from './pages/NotFound'

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
            <ErrorBoundary>
                <ScrollToTop />
                <Layout>
                    <AnimatePresence mode="wait" initial={false}>
                        <Routes location={location} key={location.key}>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/skills" element={<Skills />} />
                            <Route path="/experience" element={<Experience />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/playground" element={<Playground />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/coming-soon/:project" element={<ComingSoon />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AnimatePresence>
                </Layout>
            </ErrorBoundary>
        </>
    )
}

export default App
