import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value }) => {
    const spring = useSpring(0, { stiffness: 50, damping: 20 });
    const display = useTransform(spring, (current) => Math.round(current));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useEffect(() => {
        return display.on("change", (latest) => setDisplayValue(latest));
    }, [display]);

    return <span>{displayValue}</span>;
};

export default function LevitatingStatsCard({
    icon: Icon,
    number,
    label,
    color = '#00D9FF',
    delay = 0
}) {
    // Parse number if it contains non-numeric chars (e.g. "24k") for animation? 
    // For simplicity, we assume number is numeric for Counter, or handle string gracefully.
    const isNumeric = !isNaN(parseFloat(number));
    const numericValue = isNumeric ? parseFloat(number) : 0;
    const suffix = isNumeric ? number.toString().replace(numericValue.toString(), '') : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, type: "spring" }}
            className="relative"
        >
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 0.5
                }}
                whileHover={{ y: -25, scale: 1.05 }}
                className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden group"
            >
                {/* Background Glow */}
                <div
                    className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                    style={{ backgroundColor: color }}
                />

                {/* Floating Icon */}
                <motion.div
                    animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 relative z-10"
                >
                    <Icon size={24} style={{ color }} />
                </motion.div>

                {/* Number & Label */}
                <div className="relative z-10">
                    <h3 className="text-3xl font-display font-bold text-white mb-1">
                        {isNumeric ? <Counter value={numericValue} /> : number}
                        {suffix}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">{label}</p>
                </div>

                {/* Bottom Accent */}
                <div
                    className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
                />
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-white shadow-[0_0_10px_currentColor]"
                    style={{ width: '40%', backgroundColor: color, color }}
                    animate={{ width: ['0%', '100%', '0%'], left: ['0%', '0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Decorative Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [100, -20], opacity: [0, 0.5, 0] }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 1.5
                            }}
                            className="absolute bg-white/10 rounded-full w-1 h-1"
                            style={{ left: `${20 + i * 30}%` }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
