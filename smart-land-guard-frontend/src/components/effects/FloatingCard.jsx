import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function FloatingCard({ children, className = '', floatIntensity = 20, glowColor = '#00D9FF' }) {
    const ref = useRef(null);

    // Mouse Tracking State
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring Physics for Tilt
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="relative perspective-1000"
            style={{ perspective: 1000 }}
            animate={{ y: [0, -floatIntensity, 0] }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
            }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                whileHover={{ scale: 1.05, y: -30, z: 50 }}
                transition={{ duration: 0.3 }}
                className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden group ${className}`}
            >
                {/* Glow Overlay */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${glowColor}20 0%, transparent 70%)`
                    }}
                />

                {/* Content */}
                <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                    {children}
                </div>

                {/* Glass Shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </motion.div>
        </motion.div>
    );
}
