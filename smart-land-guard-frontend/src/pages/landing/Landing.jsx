import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import FloatingGlobe from '../../components/effects/FloatingGlobe';
import AnimatedButton from '../../components/common/AnimatedButton';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import ImpactSection from './ImpactSection';
import HeroStats from './HeroStats';
import CheckYourLake from './CheckYourLake';
import { Waves, MapPin, Target, Clock, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="relative w-full overflow-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
                <div className="absolute inset-0 z-0">
                    <FloatingGlobe />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto mt-[-50px]">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-display font-black leading-tight mb-6"
                    >
                        Protecting Water Bodies with
                        <span className="block text-gradient"> AI Vision</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
                    >
                        Real-time monitoring and analysis of lakes, ponds, and water resources
                        using satellite imagery and geospatial AI.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/dashboard">
                            <AnimatedButton variant="primary" className="w-full sm:w-auto px-10 py-4 text-lg">
                                Check your Lake
                            </AnimatedButton>
                        </Link>
                        <AnimatedButton variant="outline" className="w-full sm:w-auto px-10 py-4 text-lg">
                            View Case Study
                        </AnimatedButton>
                    </motion.div>

                    <HeroStats />
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
                >
                    <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
                </motion.div>
            </section>

            <ImpactSection />

            {/* Features Section - Advanced Capabilities */}
            <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl font-display font-bold mb-6 relative inline-block"
                    >
                        Advanced Features
                        <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_20px_rgba(0,217,255,0.5)]"></div>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: Large Glassmorphic Card - Satellite Analysis Engine */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <GlassmorphicCard hover3D className="h-full min-h-[500px] flex flex-col justify-between p-8 md:p-10 bg-gradient-to-br from-cyan-500/5 to-blue-600/5">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 ring-2 ring-cyan-400/30">
                                    <Shield className="w-9 h-9 text-cyan-400" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-cyan-400 mb-3 block">Core Technology</span>
                                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Satellite Analysis Engine</h3>
                                <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                    Multi-spectral analysis using Sentinel-2 and Landsat data with centimeter precision. Our advanced algorithms process decades of satellite imagery to detect even the smallest changes in water body boundaries.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="flex items-center gap-2 text-sm text-cyan-400">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                    <span className="font-medium">Real-time Processing Active</span>
                                </div>
                            </div>
                        </GlassmorphicCard>
                    </motion.div>

                    {/* RIGHT: Vertical Stack of Feature Rows */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        {/* Feature Row 1: AI Detection */}
                        <div className="glassmorphic p-6 rounded-2xl border border-white/5 hover:border-cyan-400/20 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0 ring-1 ring-emerald-400/30 group-hover:ring-emerald-400/50 transition-all">
                                    <Target className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-display font-bold mb-2 text-white">AI Detection</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        Deep learning models trained on millions of water body signatures for accurate encroachment detection.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        {/* Feature Row 2: Temporal Change */}
                        <div className="glassmorphic p-6 rounded-2xl border border-white/5 hover:border-amber-400/20 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-400/30 group-hover:ring-amber-400/50 transition-all">
                                    <Clock className="w-6 h-6 text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-display font-bold mb-2 text-white">Temporal Change Analysis</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        Automated detection of encroachment and erosion patterns over decades of historical data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        {/* Feature Row 3: Lightning Fast */}
                        <div className="glassmorphic p-6 rounded-2xl border border-white/5 hover:border-purple-400/20 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center flex-shrink-0 ring-1 ring-purple-400/30 group-hover:ring-purple-400/50 transition-all">
                                    <Zap className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-display font-bold mb-2 text-white">Lightning Fast Processing</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        Optimized cloud infrastructure delivers analysis results in seconds, not hours.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        {/* Feature Row 4: Geo-Tagged */}
                        <div className="glassmorphic p-6 rounded-2xl border border-white/5 hover:border-blue-400/20 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center flex-shrink-0 ring-1 ring-blue-400/30 group-hover:ring-blue-400/50 transition-all">
                                    <MapPin className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-display font-bold mb-2 text-white">Geo-Tagged Precision</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">
                                        Every data point is precisely geo-referenced for accurate mapping and spatial analysis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <CheckYourLake />

            <footer className="py-12 border-t border-white/5 text-center text-text-muted uppercase text-[10px] tracking-[0.2em]">
                © 2026 Smart Land Guard • GeoAI Environmental Solutions
            </footer>
        </div>
    );
}
