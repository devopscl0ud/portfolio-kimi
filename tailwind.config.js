/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-blue': '#00F5FF',
                'matrix-green': '#39FF14',
                'electric-purple': '#BC13FE',
                'deep-space': '#0A0A0A',
                'aurora-white': '#F8F8FF',
            },
            fontFamily: {
                'orbitron': ['Orbitron', 'monospace'],
                'inter': ['Inter', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'pulse-neon': 'pulse-neon 1.5s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
                'aurora-1': 'aurora-flow-1 20s linear infinite',
                'aurora-2': 'aurora-flow-2 20s linear infinite',
                'aurora-3': 'aurora-flow-3 20s linear infinite',
            },
            keyframes: {
                glow: {
                    'from': { boxShadow: '0 0 20px #00F5FF, 0 0 30px #00F5FF, 0 0 40px #00F5FF' },
                    'to': { boxShadow: '0 0 30px #00F5FF, 0 0 40px #00F5FF, 0 0 50px #00F5FF' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-neon': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'aurora-flow-1': {
                    '0%': { transform: 'translateX(-100%) translateY(0)' },
                    '50%': { transform: 'translateX(0) translateY(-10px)' },
                    '100%': { transform: 'translateX(100%) translateY(0)' },
                },
                'aurora-flow-2': {
                    '0%': { transform: 'translateX(100%) translateY(0)' },
                    '50%': { transform: 'translateX(0) translateY(10px)' },
                    '100%': { transform: 'translateX(-100%) translateY(0)' },
                },
                'aurora-flow-3': {
                    '0%': { transform: 'translateX(-100%) translateY(5px)' },
                    '50%': { transform: 'translateX(0) translateY(0)' },
                    '100%': { transform: 'translateX(100%) translateY(-5px)' },
                },
            },
        },
    },
    plugins: [],
}
