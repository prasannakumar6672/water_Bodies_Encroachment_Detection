import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Server, User, Cloud } from 'lucide-react';

export default function FloatingIconOrbit() {
    const icons = [Shield, Lock, Globe, Server, User, Cloud];
    const radius = 120; // Radius of orbit

    return (
        <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Orbit Path */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite]" />

            {/* Central Element */}
            <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(6,182,212,0.4)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                <Globe size={40} className="text-white" />
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20" />
            </motion.div>

            {/* Orbiting Icons */}
            {icons.map((Icon, index) => {
                const angle = (index / icons.length) * 360; // Spread evenly
                const x = radius * Math.cos(angle * Math.PI / 180);
                const y = radius * Math.sin(angle * Math.PI / 180);

                return (
                    <motion.div
                        key={index}
                        className="absolute w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg text-cyan-400"
                        animate={{
                            x: [
                                radius * Math.cos(angle * Math.PI / 180),
                                radius * Math.cos((angle + 360) * Math.PI / 180)
                            ],
                            y: [
                                radius * Math.sin(angle * Math.PI / 180),
                                radius * Math.sin((angle + 360) * Math.PI / 180)
                            ],
                            rotate: -360 // Counter-rotate to keep icon upright if desired, or let it spin
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                            delay: -index * (20 / icons.length) // Stagger start positions
                        }}
                        whileHover={{ scale: 1.2, zIndex: 20, textShadow: "0 0 8px cyan" }}
                    >
                        <Icon size={20} />
                    </motion.div>
                );
            })}
        </div>
    );
}
