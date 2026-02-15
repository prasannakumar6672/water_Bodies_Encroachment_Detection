import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';

const IMPACT_DATA = [
    {
        value: "30%",
        label: "Urban lakes showing reduction over the last decade",
        icon: "💧",
        borderColor: "border-accent-danger", // Critical
        delay: 0.1
    },
    {
        value: "₹5000 Cr",
        label: "Estimated annual economic impact (approximate)",
        icon: "📉",
        borderColor: "border-accent-warning", // High
        delay: 0.2
    },
    {
        value: "3×",
        label: "Increase in flood susceptibility indicators",
        icon: "🌊",
        borderColor: "border-accent-info", // Medium
        delay: 0.3
    },
    {
        value: "1000s",
        label: "Species affected due to habitat degradation",
        icon: "🐦",
        borderColor: "border-accent-success", // Safe
        delay: 0.4
    }
];

export default function ImpactSection() {
    return (
        <section id="impact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-display font-bold mb-6"
                >
                    The Reality of <span className="text-red-600">Encroachment</span>

                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-text-secondary max-w-3xl mx-auto"
                >
                    Watter bodies are the lifeblood of our ecosystems.Their rapid disapperance in urban areas poses a critical threat to our future.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {IMPACT_DATA.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: item.delay }}
                    >
                        <GlassmorphicCard
                            size="small"
                            className={`h-full border-b-4 ${item.borderColor} flex flex-col justify-between p-8`}
                            hover3D
                        >
                            <div className="text-4xl mb-6">{item.icon}</div>
                            <div>
                                <div className="text-4xl font-display font-black mb-3 text-white">
                                    {item.value}
                                </div>
                                <p className="text-sm text-text-muted leading-relaxed">
                                    {item.label}
                                </p>
                            </div>
                        </GlassmorphicCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
