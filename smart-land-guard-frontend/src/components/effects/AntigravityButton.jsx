import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AntigravityButton({
    children,
    onClick,
    variant = 'primary',
    className = '',
    icon: Icon
}) {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
        primary: 'bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.5)]',
        secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]',
        success: 'bg-gradient-to-r from-emerald-400 to-green-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
    };

    const bubbles = Array.from({ length: 6 });

    return (
        <motion.button
            className={`relative group rounded-full px-8 py-4 font-bold text-white overflow-hidden transition-all ${variants[variant]} ${className}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
                y: isHovered ? [-5, -15, -5] : 0,
            }}
            transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Pulse Ring */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0.5, scale: 1 }}
                        animate={{ opacity: 0, scale: 2 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-white/50"
                    />
                )}
            </AnimatePresence>

            {/* Rising Bubbles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <AnimatePresence>
                    {isHovered && bubbles.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 50, opacity: 0, scale: 0 }}
                            animate={{ y: -50, opacity: [0, 1, 0], scale: Math.random() * 0.5 + 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-0 w-2 h-2 bg-white/40 rounded-full blur-[1px]"
                            style={{
                                left: `${Math.random() * 80 + 10}%`
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center gap-2">
                {Icon && <Icon size={20} className="animate-pulse" />}
                <span className="tracking-wide text-shadow-sm">{children}</span>
            </div>

            {/* Shine */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
        </motion.button>
    );
}
