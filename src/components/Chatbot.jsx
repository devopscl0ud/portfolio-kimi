import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm Kimi, Venkatesh's AI assistant. Ask me about his Kubernetes expertise, experience, or skills!" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const responses = {
                kubernetes: "Venkatesh has strong Kubernetes expertise including GKE, Deployments, StatefulSets, RBAC, Network Policies, and Resource Quotas. He's skilled at troubleshooting pod scheduling, CNI issues, and cluster optimization.",
                experience: "Venkatesh is a DevOps Engineer with experience at Uncommon Design (current), WFM Technologies (PrimeRx), and Cognizant. He's built multi-tenant GKE environments across fintech, healthcare, and e-commerce.",
                skills: "Core skills: Kubernetes, GKE, Docker, Helm, Terraform, Jenkins, GitLab CI, Prometheus, Grafana. He's GCP ACE certified and working toward CKA.",
                contact: "You can reach Venkatesh at bandivenky2222@gmail.com or +91-8555012224. He's based in Hyderabad, India and open to opportunities!",
                current: "Currently at Uncommon Design Services (Mar 2025 - Present), Venkatesh manages Kubernetes infrastructure on GCP for fintech, e-commerce, and on-demand delivery clients.",
                gcp: "Venkatesh is GCP certified (Associate Cloud Engineer, May 2022). He works with GKE, Compute Engine, Cloud SQL, Cloud Storage, and Cloud Build.",
                default: "I can tell you about Venkatesh's Kubernetes expertise, work experience, technical skills, certifications, or how to contact him. What would you like to know?"
            }

            const lowerMessage = userMessage.toLowerCase()
            let response = responses.default
            if (lowerMessage.includes('kubernetes') || lowerMessage.includes('k8s') || lowerMessage.includes('gke')) response = responses.kubernetes
            else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) response = responses.experience
            else if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('tool')) response = responses.skills
            else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire') || lowerMessage.includes('email')) response = responses.contact
            else if (lowerMessage.includes('current') || lowerMessage.includes('now') || lowerMessage.includes('today')) response = responses.current
            else if (lowerMessage.includes('gcp') || lowerMessage.includes('google') || lowerMessage.includes('cloud') || lowerMessage.includes('certif')) response = responses.gcp

            setMessages(prev => [...prev, { role: 'assistant', content: response }])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again!" }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-40">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)] glassmorphism rounded-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
                                <span className="font-semibold text-cyber-blue">Kimi - AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user'
                                                ? 'bg-cyber-blue/20 text-cyber-blue'
                                                : 'bg-gray-800 text-gray-300'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-800 p-3 rounded-lg">
                                        <div className="flex gap-1">
                                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-cyber-blue rounded-full" />
                                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-cyber-blue rounded-full" />
                                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-cyber-blue rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about Venkatesh..."
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-cyber-blue"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="bg-cyber-blue text-deep-space px-4 py-2 rounded-lg font-semibold hover:bg-opacity-80 disabled:opacity-50"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                style={{
                    background: 'linear-gradient(135deg, #00F5FF, #39FF14)',
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
                }}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                <span className="text-2xl">{isOpen ? '✕' : '💬'}</span>
            </motion.button>
        </div>
    )
}

export default Chatbot
