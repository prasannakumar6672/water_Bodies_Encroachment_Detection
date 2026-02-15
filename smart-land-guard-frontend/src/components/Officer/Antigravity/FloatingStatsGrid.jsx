import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, FileText, Lightbulb } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, delay }) => {
    const [count, setCount] = useState(0);

    // Count-up animation
    useEffect(() => {
        let start = 0;
        const end = parseInt(value, 10);
        if (start === end) return;

        let timer = setInterval(() => {
            start += Math.ceil(end / 50);
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [value]);

    return (
        <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10 group"
        >
            {/* Background Bubbles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        background: color,
                        width: Math.random() * 6 + 2,
                        height: Math.random() * 6 + 2,
                        opacity: 0.2,
                        left: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [100, -100],
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                    animate={{
                        y: [0, -6, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4"
                >
                    <Icon size={48} style={{ color, filter: `drop-shadow(0 0 10px ${color}50)` }} />
                </motion.div>

                <h4
                    className="text-4xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
                    style={{ textShadow: `0 0 20px ${color}40` }}
                >
                    {count}
                </h4>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{label}</p>
            </div>
        </motion.div>
    );
};

export default function FloatingStatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                label="Lakes Monitored"
                value={67}
                icon={Waves}
                color="#00D9FF"
                delay={0}
            />
            <StatCard
                label="Complaints Filed"
                value={24}
                icon={FileText}
                color="#F97316"
                delay={0.3}
            />
            <StatCard
                label="Suggestions"
                value={15}
                icon={Lightbulb}
                color="#10B981"
                delay={0.6}
            />
        </div>
    );
}
