import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import FloatingCard from './FloatingCard';
import AntigravityButton from './AntigravityButton';
import LevitatingStatsCard from './LevitatingStatsCard';
import FloatingIconOrbit from './FloatingIconOrbit';

export default function AntigravityHero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#020617] via-[#0A2342] to-[#1E3A8A] pt-20">
            {/* Background Layer */}
            <FloatingParticles />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text & Actions */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl font-black text-white leading-tight mb-2"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 block">
                                DEFY
                            </span>
                            GRAVITY
                        </motion.h1>

                        <motion.p
                            className="text-xl text-cyan-100/80 max-w-lg leading-relaxed backdrop-blur-sm"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            Experience the future of interface design.
                            Floating elements, physics-based interactions, and deep space aesthetics.
                        </motion.p>
                    </motion.div>

                    <div className="flex gap-6">
                        <AntigravityButton variant="primary" icon={Zap} data-magnetic="true">
                            LAUNCH DEMO
                        </AntigravityButton>
                        <AntigravityButton variant="secondary" icon={ArrowRight} data-magnetic="true">
                            DOCUMENTATION
                        </AntigravityButton>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-12">
                        <LevitatingStatsCard
                            icon={BarChart3}
                            number="98%"
                            label="Performance"
                            color="#22d3ee"
                            delay={0}
                        />
                        <LevitatingStatsCard
                            icon={ShieldCheck}
                            number="24/7"
                            label="Protection"
                            color="#a855f7"
                            delay={0.2}
                        />
                        <LevitatingStatsCard
                            icon={Zap}
                            number="15ms"
                            label="Latency"
                            color="#34d399"
                            delay={0.4}
                        />
                    </div>
                </div>

                {/* Right Column: Visual Showcase */}
                <div className="relative h-[600px] flex items-center justify-center">
                    {/* Floating Cards Layer */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="absolute top-10 left-10">
                            <FloatingCard floatIntensity={30} glowColor="#F472B6" className="w-48 p-4">
                                <div className="h-2 w-12 bg-pink-500 rounded mb-2" />
                                <div className="h-2 w-24 bg-white/20 rounded" />
                            </FloatingCard>
                        </div>
                        <div className="absolute bottom-20 right-10">
                            <FloatingCard floatIntensity={25} glowColor="#34D399" className="w-56 p-4">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20" />
                                    <div>
                                        <div className="h-2 w-20 bg-emerald-500 rounded mb-2" />
                                        <div className="h-2 w-12 bg-white/20 rounded" />
                                    </div>
                                </div>
                            </FloatingCard>
                        </div>
                    </div>

                    {/* Central Orbit */}
                    <div className="scale-125 transform transition-transform hover:scale-150 duration-700 pointer-events-auto">
                        <FloatingIconOrbit />
                    </div>
                </div>
            </div>

            {/* Decorative Floating Bubbles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-cyan-400/10 backdrop-blur-xl border border-white/5"
                        style={{
                            width: Math.random() * 60 + 20,
                            height: Math.random() * 60 + 20,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0],
                            scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
