import Navigation from './Navigation'
import Footer from './Footer'
import AuroraBackground from './AuroraBackground'
import ScrollProgress from './polish/ScrollProgress'
import BackToTop from './polish/BackToTop'
import Chatbot from './Chatbot'

function Layout({ children }) {
    return (
        <div className="min-h-screen text-white relative">
            <AuroraBackground />
            <div className="relative z-10">
                <Navigation />
                <main id="main-content" className="pt-20">
                    {children}
                </main>
                <Footer />
            </div>
            <ScrollProgress />
            <BackToTop />
            <Chatbot />
        </div>
    )
}

export default Layout
