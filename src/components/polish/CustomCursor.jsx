import { useState, useEffect, useRef } from 'react'

function CustomCursor() {
    const cursorRef = useRef(null)
    const trailRef = useRef(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Check if device has fine pointer (mouse)
        const hasPointer = window.matchMedia('(pointer: fine)').matches
        if (!hasPointer) {
            setIsVisible(false)
            return
        }

        let trailX = 0
        let trailY = 0
        let animationId = null

        const updatePosition = (e) => {
            // Main cursor - instant position update using transform
            if (cursorRef.current) {
                const offset = isHovering ? 16 : 4
                cursorRef.current.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`
            }

            // Trail cursor - smooth follow
            trailX = e.clientX
            trailY = e.clientY
        }

        // Smooth trail animation using requestAnimationFrame
        let currentTrailX = 0
        let currentTrailY = 0

        const animateTrail = () => {
            currentTrailX += (trailX - currentTrailX) * 0.15
            currentTrailY += (trailY - currentTrailY) * 0.15

            if (trailRef.current) {
                trailRef.current.style.transform = `translate(${currentTrailX - 2}px, ${currentTrailY - 2}px)`
            }

            animationId = requestAnimationFrame(animateTrail)
        }

        animateTrail()

        const handleMouseEnter = (e) => {
            const target = e.target
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hover-3d') ||
                target.classList.contains('clickable')
            ) {
                setIsHovering(true)
            }
        }

        const handleMouseLeave = () => {
            setIsHovering(false)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        const handleMouseOut = () => setIsVisible(false)
        const handleMouseOver = () => setIsVisible(true)

        window.addEventListener('mousemove', updatePosition)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseover', handleMouseEnter)
        document.addEventListener('mouseout', handleMouseLeave)
        document.documentElement.addEventListener('mouseleave', handleMouseOut)
        document.documentElement.addEventListener('mouseenter', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseover', handleMouseEnter)
            document.removeEventListener('mouseout', handleMouseLeave)
            document.documentElement.removeEventListener('mouseleave', handleMouseOut)
            document.documentElement.removeEventListener('mouseenter', handleMouseOver)
            if (animationId) cancelAnimationFrame(animationId)
        }
    }, [isHovering])

    if (!isVisible) return null

    return (
        <>
            {/* Main cursor dot - instant movement */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{ willChange: 'transform' }}
            >
                <div
                    className="rounded-full transition-all duration-100"
                    style={{
                        width: isHovering ? 32 : 8,
                        height: isHovering ? 32 : 8,
                        backgroundColor: isHovering ? 'transparent' : '#00F5FF',
                        border: isHovering ? '2px solid #00F5FF' : 'none',
                        boxShadow: isHovering
                            ? '0 0 20px #00F5FF, 0 0 40px #00F5FF'
                            : '0 0 10px #00F5FF',
                        transform: isClicking ? 'scale(0.8)' : 'scale(1)',
                    }}
                />
            </div>

            {/* Trailing dot - smooth follow */}
            <div
                ref={trailRef}
                className="fixed top-0 left-0 w-1 h-1 rounded-full bg-matrix-green pointer-events-none z-[9998] opacity-50"
                style={{ willChange: 'transform' }}
            />
        </>
    )
}

export default CustomCursor
