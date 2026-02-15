import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function GlassmorphicCard({
    children,
    size = 'medium',
    hover3D = false,
    className,
    ...props
}) {
    const sizeClasses = {
        small: 'col-span-1 row-span-1',
        medium: 'col-span-2 row-span-1',
        large: 'col-span-2 row-span-2'
    };

    return (
        <motion.div
            className={cn(
                'glassmorphic p-6 rounded-2xl',
                sizeClasses[size],
                className
            )}
            whileHover={hover3D ? {
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                boxShadow: '0 20px 60px rgba(0, 217, 255, 0.3)'
            } : {}}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
