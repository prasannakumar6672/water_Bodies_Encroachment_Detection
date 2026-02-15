import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function MagneticCursor() {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse Position Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring Physics for Smooth Following
    const cursorSpringConfig = { stiffness: 500, damping: 28 };
    const ringSpringConfig = { stiffness: 150, damping: 15 };

    const cursorX = useSpring(mouseX, cursorSpringConfig);
    const cursorY = useSpring(mouseY, cursorSpringConfig);
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check if hovering over magnetic element
            const target = e.target;
            if (target.closest('[data-magnetic="true"]')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            document.body.style.cursor = 'auto'; // Restore on unmount
        };
    }, []);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[99] mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    opacity: isHovered ? 0.8 : 0.4,
                    backgroundColor: isHovered ? 'rgba(6,182,212,0.1)' : 'transparent',
                    borderWidth: isHovered ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
}
