import { Component } from 'react'
import { motion } from 'framer-motion'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        })

        // Log to error reporting service (optional)
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-deep-space flex items-center justify-center px-6">
                    <motion.div
                        className="text-center max-w-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {/* Error Icon */}
                        <motion.div
                            className="text-8xl mb-6"
                            animate={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            ⚠️
                        </motion.div>

                        {/* Error Message */}
                        <h1 className="font-orbitron font-bold text-4xl text-white mb-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-400 mb-8">
                            An unexpected error occurred. Don't worry, it's not your fault!
                        </p>

                        {/* Error Details (Development only) */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mb-8 text-left bg-gray-900 p-4 rounded-lg">
                                <summary className="text-red-400 cursor-pointer font-mono text-sm mb-2">
                                    Error Details (Dev Only)
                                </summary>
                                <pre className="text-xs text-gray-500 overflow-auto">
                                    {this.state.error.toString()}
                                    {'\n\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-cyber-blue text-deep-space px-8 py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all"
                                style={{ boxShadow: '0 0 20px #00F5FF' }}
                            >
                                Go Home
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="border-2 border-matrix-green text-matrix-green px-8 py-4 rounded-lg font-semibold hover:bg-matrix-green hover:text-deep-space transition-all"
                            >
                                Reload Page
                            </button>
                        </div>

                        <p className="mt-8 text-gray-600 text-sm">
                            If this problem persists, please contact support.
                        </p>
                    </motion.div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
