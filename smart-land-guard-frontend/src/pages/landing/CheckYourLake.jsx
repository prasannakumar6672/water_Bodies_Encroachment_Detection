import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Building, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { districts } from '../../data/districts';
import { mandals } from '../../data/mandals';
import { lakes } from '../../data/lakes';

export default function CheckYourLake() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedMandal, setSelectedMandal] = useState('');
    const [selectedLake, setSelectedLake] = useState('');

    // Sample data (mirrored from UserDashboard for consistency)


    const handleSearch = (e) => {
        e.preventDefault();

        if (!user) {
            // Not logged in: Redirect to auth
            navigate('/auth');
        } else {
            // Logged in: Redirect to dashboard with state
            navigate('/dashboard', {
                state: {
                    district: selectedDistrict,
                    mandal: selectedMandal,
                    lake: selectedLake
                }
            });
        }
    };

    return (
        <section className="relative w-full flex flex-col items-center justify-center py-16 px-6 overflow-hidden bg-gradient-to-b from-[#020617] via-[#020617] to-[#030B1F]">
            {/* Background Dotted Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-[1000px] w-full flex flex-col items-center">

                {/* Heading Section */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight text-white"
                    >
                        Is Your Lake <span className="text-[#00D9FF]">Safe?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#94A3B8] text-base md:text-lg max-w-[550px] mx-auto leading-relaxed"
                    >
                        Discover the encroachment status of water bodies in your local community using our AI-driven historical analysis.
                    </motion.p>
                </div>

                {/* Selection Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">

                    {/* Districts Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="group relative bg-[#0F172A]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 flex flex-col items-start transition-all duration-500 hover:bg-[#0F172A]/80 hover:border-cyan-400/30 hover:shadow-[0_20px_50px_rgba(0,217,255,0.1)]"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] mb-8 ring-1 ring-[#00D9FF]/30">
                            <MapPin size={20} />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.25em] font-black text-[#64748B] mb-3">Districts</span>
                        <select
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setSelectedMandal('');
                                setSelectedLake('');
                            }}
                            className="w-full bg-transparent text-xl font-bold text-white border-none outline-none cursor-pointer appearance-none p-0 focus:ring-0 [&>option]:bg-slate-900 [&>option]:text-white"
                            style={{ backgroundImage: 'none' }}
                        >
                            <option value="" className="bg-slate-900 text-gray-400">Select District</option>
                            {districts.map(d => (
                                <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
                            ))}
                        </select>
                        <div className="mt-auto pt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="h-0.5 w-10 bg-cyan-400 rounded-full" />
                        </div>
                    </motion.div>

                    {/* Mandal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className={`relative bg-[#0F172A]/60 backdrop-blur-md border border-white/5 rounded-[32px] p-8 flex flex-col items-start transition-all duration-300 ${!selectedDistrict ? 'opacity-40 cursor-not-allowed grayscale-[0.3]' : 'hover:border-cyan-400/30'}`}
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#64748B] mb-8 border border-white/5">
                            <Building size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#64748B] mb-3">Mandal</span>
                        <select
                            value={selectedMandal}
                            onChange={(e) => {
                                setSelectedMandal(e.target.value);
                                setSelectedLake('');
                            }}
                            disabled={!selectedDistrict}
                            className="w-full bg-transparent text-xl font-bold text-white border-none outline-none cursor-pointer appearance-none p-0 focus:ring-0 disabled:cursor-not-allowed [&>option]:bg-slate-900 [&>option]:text-white"
                            style={{ backgroundImage: 'none' }}
                        >
                            <option value="" className="bg-slate-900 text-gray-400">Select Mandal</option>
                            {selectedDistrict && mandals[selectedDistrict]?.map(m => (
                                <option key={m} value={m} className="bg-slate-900 text-white">{m}</option>
                            ))}
                        </select>
                    </motion.div>

                    {/* Water Body Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className={`relative bg-[#0F172A]/60 backdrop-blur-md border border-white/5 rounded-[32px] p-8 flex flex-col items-start transition-all duration-300 ${!selectedMandal ? 'opacity-40 cursor-not-allowed grayscale-[0.3]' : 'hover:border-cyan-400/30'}`}
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#64748B] mb-8 border border-white/5">
                            <Waves size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#64748B] mb-3">Water Body</span>
                        <select
                            value={selectedLake}
                            onChange={(e) => setSelectedLake(e.target.value)}
                            disabled={!selectedMandal}
                            className="w-full bg-transparent text-xl font-bold text-white border-none outline-none cursor-pointer appearance-none p-0 focus:ring-0 disabled:cursor-not-allowed [&>option]:bg-slate-900 [&>option]:text-white"
                            style={{ backgroundImage: 'none' }}
                        >
                            <option value="" className="bg-slate-900 text-gray-400">Select Lake</option>
                            {selectedMandal && lakes[selectedMandal]?.map(l => (
                                <option key={l} value={l} className="bg-slate-900 text-white">{l}</option>
                            ))}
                        </select>
                    </motion.div>
                </div>

                {/* CTA Button Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <button
                        onClick={handleSearch}
                        className="px-10 py-5 bg-gradient-to-r from-[#00D9FF] to-[#00C9A7] text-[#0A1931] font-black rounded-full flex items-center gap-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] transition-all duration-300 shadow-xl"
                    >
                        <Search size={22} strokeWidth={3} />
                        <span className="text-lg uppercase tracking-widest font-display">Check Lake Status</span>
                    </button>

                    {/* Footnote Indicator */}
                    <div className="mt-10 flex items-center gap-2.5 text-[#64748B] text-[10px] font-medium tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                        </span>
                        Login required to view detailed historical imagery and GIS data
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
