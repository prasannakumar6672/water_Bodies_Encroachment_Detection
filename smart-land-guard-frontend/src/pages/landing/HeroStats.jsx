import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
    { value: '2,547+', label: 'Lakes Monitored' },
    { value: '30+', label: 'Districts Covered' },
    { value: '98.7%', label: 'Analytical Accuracy (Indicative)' },
];

export default function HeroStats() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12 md:mt-16"
        >
            {STATS.map((stat, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                        className="text-center"
                    >
                        <div className="text-3xl md:text-4xl font-display font-bold text-cyan-400 dark:text-cyan-400 mb-1">
                            {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-medium">
                            {stat.label}
                        </div>
                    </motion.div>
                    {index < STATS.length - 1 && (
                        <div className="hidden md:block w-px h-8 bg-white/10" />
                    )}
                </React.Fragment>
            ))}
        </motion.div>
    );
}
