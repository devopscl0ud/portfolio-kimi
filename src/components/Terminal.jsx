import { useState } from 'react'
import { motion } from 'framer-motion'
import terminalCommands from '@utils/terminalCommands'

function Terminal() {
    const [history, setHistory] = useState([])
    const [currentInput, setCurrentInput] = useState('')

    const runCommand = (command) => {
        const output = terminalCommands[command]
            ? terminalCommands[command]()
            : `bash: ${command}: command not found\nType 'help' for available commands.`

        if (command === 'clear') {
            setHistory([])
            return
        }

        setHistory(prev => [...prev, { command, output }])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!currentInput.trim()) return
        runCommand(currentInput.trim())
        setCurrentInput('')
    }

    const quickCommands = [
        { cmd: 'kubectl get nodes', label: 'kubectl get nodes' },
        { cmd: 'terraform plan', label: 'terraform plan' },
        { cmd: 'helm ls', label: 'helm ls' },
        { cmd: 'sudo hire-me', label: '🎉 sudo hire-me', special: true },
    ]

    return (
        <motion.div
            className="glassmorphism rounded-lg p-6 hover-3d"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="text-sm text-gray-400 font-mono">venkatesh@devops:~</div>
            </div>

            {/* Terminal Output */}
            <div className="command-output max-h-64 overflow-y-auto mb-4 space-y-2">
                {history.length === 0 && (
                    <div className="text-gray-500 text-sm">
                        Welcome! Try the quick commands below or type your own.
                    </div>
                )}
                {history.map((entry, i) => (
                    <div key={i}>
                        <div className="text-cyber-blue font-mono">$ {entry.command}</div>
                        <div className="text-gray-300 ml-4 whitespace-pre-wrap font-mono text-sm">{entry.output}</div>
                    </div>
                ))}
                <div className="text-green-400 flex font-mono">
                    <span>$ </span>
                    <span className="terminal-cursor">█</span>
                </div>
            </div>

            {/* Quick Commands */}
            <div className="flex flex-wrap gap-2 mb-4">
                {quickCommands.map((item) => (
                    <motion.button
                        key={item.cmd}
                        onClick={() => runCommand(item.cmd)}
                        className={`px-3 py-1 rounded text-xs transition-all ${item.special
                                ? 'bg-gradient-to-r from-cyber-blue to-matrix-green text-deep-space font-semibold hover:shadow-[0_0_15px_#00F5FF]'
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {item.label}
                    </motion.button>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm font-mono text-white placeholder-gray-500 focus:border-cyber-blue"
                />
                <button
                    type="submit"
                    className="bg-cyber-blue text-deep-space px-4 py-2 rounded font-semibold hover:bg-opacity-80"
                >
                    Run
                </button>
            </form>
        </motion.div>
    )
}

export default Terminal
