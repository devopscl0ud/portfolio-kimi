const variants = {
    cyber: 'neon-text',
    matrix: 'matrix-text',
    purple: 'purple-glow',
}

function NeonText({ children, variant = 'cyber', as: Component = 'span', className = '', ...props }) {
    return (
        <Component className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </Component>
    )
}

export default NeonText
