import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 2,
            backgroundColor: 'rgba(0, 217, 255, 0.2)',
            border: '1px solid rgba(0, 217, 255, 0.5)'
        }
    };

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
            <motion.div
                className="w-6 h-6 border border-cyan-500/50 rounded-full fixed top-0 left-0"
                variants={variants}
                animate={cursorVariant}
                transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
            />
            <motion.div
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full fixed top-0 left-0"
                animate={{
                    x: mousePosition.x - 3,
                    y: mousePosition.y - 3
                }}
                transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.1 }}
            />
        </div>
    );
}
