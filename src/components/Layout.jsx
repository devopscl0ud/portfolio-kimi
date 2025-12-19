import Navigation from './Navigation'
import Footer from './Footer'
import AuroraBackground from './AuroraBackground'
import ScrollProgress from './polish/ScrollProgress'
import BackToTop from './polish/BackToTop'
import Chatbot from './Chatbot'

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-deep-space text-aurora-white font-inter">
            {/* Skip to main content link */}
            <a href="#main" className="skip-link">Skip to main content</a>

            {/* Background */}
            <AuroraBackground />

            {/* Scroll Progress */}
            <ScrollProgress />

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main id="main" className="pt-20">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Elements */}
            <BackToTop />
            <Chatbot />
        </div>
    )
}

export default Layout
