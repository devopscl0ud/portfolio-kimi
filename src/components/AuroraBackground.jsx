function AuroraBackground() {
    return (
        <div className="aurora-bg fixed inset-0 -z-10">
            <div className="aurora-ribbon aurora-blue absolute w-[200%] h-[300%] opacity-[0.12] blur-[40px] mix-blend-screen bg-gradient-to-r from-transparent via-cyber-blue to-transparent top-[20%] animate-aurora-1" />
            <div className="aurora-ribbon aurora-green absolute w-[200%] h-[300%] opacity-[0.12] blur-[40px] mix-blend-screen bg-gradient-to-r from-transparent via-matrix-green to-transparent top-[50%] animate-aurora-2" style={{ animationDelay: '2s' }} />
            <div className="aurora-ribbon aurora-purple absolute w-[200%] h-[300%] opacity-[0.12] blur-[40px] mix-blend-screen bg-gradient-to-r from-transparent via-electric-purple to-transparent top-[75%] animate-aurora-3" style={{ animationDelay: '4s' }} />
        </div>
    )
}

export default AuroraBackground
