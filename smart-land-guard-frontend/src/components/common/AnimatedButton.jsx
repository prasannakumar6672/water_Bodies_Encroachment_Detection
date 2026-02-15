import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function AnimatedButton({
    children,
    variant = 'primary',
    icon,
    onClick,
    className,
    ...props
}) {
    const variants = {
        primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30',
        outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
        ghost: 'text-cyan-500 hover:bg-cyan-500/10'
    };

    return (
        <motion.button
            className={cn(
                'px-6 py-3 rounded-full font-semibold',
                'transition-all duration-300',
                'flex items-center gap-2',
                variants[variant],
                className
            )}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            {...props}
        >
            {icon && <span>{icon}</span>}
            {children}
        </motion.button>
    );
}
