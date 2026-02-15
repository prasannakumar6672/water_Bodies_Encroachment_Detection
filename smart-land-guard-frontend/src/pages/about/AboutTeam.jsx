import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import { User } from 'lucide-react';

const TEAM_MEMBERS = [
    {
        name: "Prasanna Kumar Chirragoni",
        role: "Full-Stack Developer",
        description: "Led system design, architecture, frontend-backend integration, and overall project direction.",
        delay: 0.1
    },
    {
        name: "Anudeep Masura",
        role: "Backend Developer",
        description: "Assisted with data validation, testing, and documentation support.",
        delay: 0.2
    },
    {
        name: "Mustafa Rafi Mohammed",
        role: "Frontend Developer",
        description: "Contributed to frontend UI, feature development, and satellite data research support.",
        delay: 0.3
    }
];

export default function About() {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <Navbar />

            <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-display font-bold mb-6 relative inline-block"
                    >
                        About the Team
                        <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-[0_0_20px_rgba(0,217,255,0.5)]"></div>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-text-secondary mt-8"
                    >
                        Meet the dedicated team behind Smart Land Guard, working to protect water bodies through innovative geospatial AI technology.
                    </motion.p>
                </div>

                {/* Team Members Grid */}
                <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: member.delay }}
                        >
                            <GlassmorphicCard hover3D className="h-full flex flex-col items-center text-center p-8 border border-white/10">
                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center mb-6 ring-2 ring-cyan-400/30">
                                    <User className="w-10 h-10 text-cyan-400" />
                                </div>

                                {/* Name */}
                                <h3 className="text-xl font-display font-bold text-white mb-2">
                                    {member.name}
                                </h3>

                                {/* Role */}
                                <div className="text-xs uppercase tracking-[0.15em] font-bold text-cyan-400 mb-4">
                                    {member.role}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {member.description}
                                </p>
                            </GlassmorphicCard>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-text-muted max-w-2xl mx-auto">
                        This project represents our commitment to leveraging cutting-edge technology for environmental conservation and sustainable urban development.
                    </p>
                </motion.div>
            </section>
        </div>
    );
}
