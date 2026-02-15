import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import AnimatedButton from '../../components/common/AnimatedButton';
import {
    MapPin, Building2, FileText, Lightbulb, Download, Share2, Mail,
    Play, Upload, AlertCircle, TrendingDown, Map, Eye, EyeOff,
    ChevronRight, CheckCircle, Clock, Search
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Title,
    Tooltip,
    Legend
);

import satellite2019 from '../../assets/dashboard/satellite_2019.png';
import satellite2024 from '../../assets/dashboard/satellite_2024.png';
import changeMap from '../../assets/dashboard/change_map.png';
import { districts } from '../../data/districts';
import { mandals } from '../../data/mandals';
import { lakes } from '../../data/lakes';
import { DASHBOARD_YEARS, DASHBOARD_AREA_DATA, DASHBOARD_CHANGE_ZONES, DASHBOARD_CHART_OPTIONS } from '../../utils/constants';

export default function UserDashboard() {
    const { user } = useAuth();
    const location = useLocation();

    // Lake selection state
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedMandal, setSelectedMandal] = useState('');
    const [selectedLake, setSelectedLake] = useState('');
    const [showAnalysis, setShowAnalysis] = useState(false);

    // Overlay toggles
    const [showChangeRegion, setShowChangeRegion] = useState(true);
    const [showWaterBoundary, setShowWaterBoundary] = useState(true);
    const [showBufferZone, setShowBufferZone] = useState(false);

    // Timeline state
    const [selectedYear, setSelectedYear] = useState(2024);
    const [isPlaying, setIsPlaying] = useState(false);

    // Form states
    const [showObservationForm, setShowObservationForm] = useState(false);
    const [showSuggestionForm, setShowSuggestionForm] = useState(false);

    // Observation form
    const [observationForm, setObservationForm] = useState({
        concernType: '',
        description: '',
        photos: [],
        location: '',
        priority: 'Medium',
        emailUpdates: true,
        smsAlerts: false
    });

    // Suggestion form
    const [suggestionForm, setSuggestionForm] = useState({
        category: '',
        suggestion: '',
        images: [],
        budget: '',
        timeline: '',
        volunteer: false,
        makePublic: false
    });

    // Sample data


    const years = DASHBOARD_YEARS;
    const areaData = DASHBOARD_AREA_DATA;

    // Effect to handle navigation from Landing Page
    useEffect(() => {
        if (location.state) {
            const { district, mandal, lake } = location.state;
            if (district) setSelectedDistrict(district);
            if (mandal) setSelectedMandal(mandal);
            if (lake) {
                setSelectedLake(lake);
                // Auto-analyze if complete
                setShowAnalysis(true);
            }

            // Scroll to the Check Lake section
            setTimeout(() => {
                const element = document.getElementById('check-lake-status');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500); // Small delay to ensure render
        }
    }, [location.state]);

    const changeZones = DASHBOARD_CHANGE_ZONES;

    const handleAnalyzeLake = () => {
        if (selectedDistrict && selectedLake) {
            setShowAnalysis(true);
            window.scrollTo({ top: 600, behavior: 'smooth' });
        }
    };

    const handlePlayTimeline = () => {
        setIsPlaying(true);
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < years.length - 1) {
                currentIndex++;
                setSelectedYear(years[currentIndex]);
            } else {
                setIsPlaying(false);
                clearInterval(interval);
            }
        }, 1000);
    };

    const handleSubmitObservation = (e) => {
        e.preventDefault();
        console.log('Observation submitted:', observationForm);
        alert('Your observation has been submitted for review. You will receive updates via email.');
        setShowObservationForm(false);
        setObservationForm({
            concernType: '',
            description: '',
            photos: [],
            location: '',
            priority: 'Medium',
            emailUpdates: true,
            smsAlerts: false
        });
    };

    const handleSubmitSuggestion = (e) => {
        e.preventDefault();
        console.log('Suggestion submitted:', suggestionForm);
        alert('Your suggestion has been submitted successfully. Thank you for your contribution!');
        setShowSuggestionForm(false);
        setSuggestionForm({
            category: '',
            suggestion: '',
            images: [],
            budget: '',
            timeline: '',
            volunteer: false,
            makePublic: false
        });
    };

    // Chart data
    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Lake Area (hectares)',
                data: years.map(year => areaData[year]),
                borderColor: 'rgb(6, 182, 212)',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
            }
        ]
    };

    const chartOptions = DASHBOARD_CHART_OPTIONS;

    return (
        <div className="min-h-screen bg-bg-darker">
            <Navbar />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                {/* DASHBOARD HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                        Welcome back, {user?.name || 'User'}! 👋
                    </h1>
                    <p className="text-text-secondary uppercase tracking-[0.2em] text-xs font-bold">
                        YOUR DASHBOARD
                    </p>
                </motion.div>

                {/* QUICK STATS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <GlassmorphicCard className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">🏞️</div>
                                <div className="flex-1">
                                    <div className="text-3xl font-display font-bold text-white mb-1">45</div>
                                    <div className="text-sm font-medium text-text-primary mb-1">Lakes in Your District</div>
                                    <div className="text-xs text-text-muted">Hyderabad region</div>
                                </div>
                            </div>
                        </GlassmorphicCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassmorphicCard className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">📝</div>
                                <div className="flex-1">
                                    <div className="text-3xl font-display font-bold text-white mb-1">2</div>
                                    <div className="text-sm font-medium text-text-primary mb-1">Your Observations</div>
                                    <div className="mt-1">
                                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">
                                            1 Reviewed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </GlassmorphicCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassmorphicCard className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="text-4xl">💡</div>
                                <div className="flex-1">
                                    <div className="text-3xl font-display font-bold text-white mb-1">1</div>
                                    <div className="text-sm font-medium text-text-primary mb-1">Your Suggestions</div>
                                    <div className="text-xs text-text-muted">Under Consideration</div>
                                </div>
                            </div>
                        </GlassmorphicCard>
                    </motion.div>
                </div>

                {/* MAIN SECTION: CHECK LAKE STATUS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                    id="check-lake-status"
                >
                    <GlassmorphicCard className="p-8">
                        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                            🔍 CHECK LAKE STATUS
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-medium text-text-secondary mb-4">Step 1: Select Location</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium mb-2 text-text-secondary flex items-center gap-2">
                                            <MapPin size={14} /> District *
                                        </label>
                                        <select
                                            value={selectedDistrict}
                                            onChange={(e) => {
                                                setSelectedDistrict(e.target.value);
                                                setSelectedMandal('');
                                                setSelectedLake('');
                                            }}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 transition-colors [&>option]:bg-slate-900 [&>option]:text-white"
                                        >
                                            <option value="" className="bg-slate-900 text-gray-400">Select District</option>
                                            {districts.map(district => (
                                                <option key={district} value={district} className="bg-slate-900 text-white">{district}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium mb-2 text-text-secondary flex items-center gap-2">
                                            <MapPin size={14} /> Mandal
                                        </label>
                                        <select
                                            value={selectedMandal}
                                            onChange={(e) => {
                                                setSelectedMandal(e.target.value);
                                                setSelectedLake('');
                                            }}
                                            disabled={!selectedDistrict}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 transition-colors disabled:opacity-50 [&>option]:bg-slate-900 [&>option]:text-white"
                                        >
                                            <option value="" className="bg-slate-900 text-gray-400">Select Mandal</option>
                                            {selectedDistrict && mandals[selectedDistrict]?.map(mandal => (
                                                <option key={mandal} value={mandal} className="bg-slate-900 text-white">{mandal}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium mb-2 text-text-secondary flex items-center gap-2">
                                            <Search size={14} /> Lake Name *
                                        </label>
                                        <select
                                            value={selectedLake}
                                            onChange={(e) => setSelectedLake(e.target.value)}
                                            disabled={!selectedMandal}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 transition-colors disabled:opacity-50 [&>option]:bg-slate-900 [&>option]:text-white"
                                        >
                                            <option value="" className="bg-slate-900 text-gray-400">Select Lake</option>
                                            {selectedMandal && lakes[selectedMandal]?.map(lake => (
                                                <option key={lake} value={lake} className="bg-slate-900 text-white">{lake}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <AnimatedButton
                                variant="primary"
                                onClick={handleAnalyzeLake}
                                disabled={!selectedDistrict || !selectedLake}
                                className="px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Analyze Lake
                            </AnimatedButton>
                        </div>
                    </GlassmorphicCard>
                </motion.div>

                {/* LAKE ANALYSIS VIEW */}
                <AnimatePresence>
                    {showAnalysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="space-y-8"
                        >
                            {/* TITLE */}
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                                    HUSSAIN SAGAR LAKE – DETAILED ANALYSIS
                                </h2>
                                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto rounded-full"></div>
                            </div>

                            {/* HEADER INFO CARD */}
                            <GlassmorphicCard className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">🏞️</span>
                                            <span className="text-xl font-bold">Hussain Sagar Lake</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-text-secondary">
                                            <MapPin size={16} />
                                            <span>Hyderabad, Telangana</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                                            <Clock size={14} />
                                            <span>Last Updated: 2 days ago</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">📏 Original Area:</span>
                                            <span className="font-bold text-white">545 hectares</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">📏 Current Area:</span>
                                            <span className="font-bold text-white">498 hectares</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-text-secondary">📉 Observed Area Change:</span>
                                            <span className="font-bold text-red-400">~47 hectares (8.6%)</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-text-secondary">⚠️ Change Indicator:</span>
                                            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">
                                                MEDIUM (Analytical)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                    <p className="text-xs text-cyan-400 flex items-start gap-2">
                                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                        <span>Derived from satellite imagery; requires field verification.</span>
                                    </p>
                                </div>
                            </GlassmorphicCard>

                            {/* VISUAL ANALYSIS SECTION */}
                            <GlassmorphicCard className="p-8">
                                <h3 className="text-xl font-display font-bold mb-6">📊 VISUAL ANALYSIS</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* LEFT: 2019 */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-text-secondary">2019 - Original</span>
                                            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">545 ha</span>
                                        </div>
                                        <div className="aspect-video bg-black rounded-lg border border-white/10 overflow-hidden relative group">
                                            <img
                                                src={satellite2019}
                                                alt="Satellite View 2019"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                            <span className="absolute bottom-3 left-3 text-white text-xs font-medium px-2 py-1 bg-black/40 backdrop-blur-sm rounded">
                                                October 14, 2019
                                            </span>
                                        </div>
                                    </div>

                                    {/* RIGHT: 2024 */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-text-secondary">2024 - Current</span>
                                            <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded">498 ha</span>
                                        </div>
                                        <div className="aspect-video bg-black rounded-lg border border-white/10 overflow-hidden relative group">
                                            <img
                                                src={satellite2024}
                                                alt="Satellite View 2024"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                                            {/* LAYERS */}
                                            {showChangeRegion && (
                                                <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay animate-pulse pointer-events-none">
                                                    <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 border-2 border-red-500/50 bg-red-500/20 rounded-full blur-[2px]"></div>
                                                </div>
                                            )}
                                            {showWaterBoundary && (
                                                <div className="absolute inset-0 pointer-events-none">
                                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                                        <path d="M20,50 Q50,20 80,50 Q50,80 20,50" fill="none" stroke="#00D9FF" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-80" />
                                                    </svg>
                                                </div>
                                            )}
                                            {showBufferZone && (
                                                <div className="absolute inset-4 border border-amber-400/40 border-dashed rounded-lg pointer-events-none bg-amber-400/5"></div>
                                            )}

                                            <span className="absolute bottom-3 left-3 text-white text-xs font-medium px-2 py-1 bg-black/40 backdrop-blur-sm rounded">
                                                January 29, 2024
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* OVERLAY TOGGLES */}
                                <div className="space-y-3 p-4 bg-white/5 rounded-lg">
                                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">Overlay Options</p>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={showChangeRegion}
                                            onChange={(e) => setShowChangeRegion(e.target.checked)}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-red-500 focus:ring-red-400"
                                        />
                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                            Show Change-Detected Region (Red highlight)
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={showWaterBoundary}
                                            onChange={(e) => setShowWaterBoundary(e.target.checked)}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                                        />
                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                            Show Water Boundary
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={showBufferZone}
                                            onChange={(e) => setShowBufferZone(e.target.checked)}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-amber-400 focus:ring-amber-400"
                                        />
                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                            Show Buffer Zone (Reference)
                                        </span>
                                    </label>
                                </div>
                            </GlassmorphicCard>

                            {/* HISTORICAL TIMELINE */}
                            <GlassmorphicCard className="p-8">
                                <h3 className="text-xl font-display font-bold mb-6">⏱️ HISTORICAL TIMELINE (2019–2024)</h3>

                                <div className="space-y-6">
                                    {/* Timeline Slider Visual */}
                                    <div className="relative">
                                        <div className="flex justify-between items-center mb-4">
                                            {years.map((year, index) => (
                                                <div key={year} className="flex flex-col items-center">
                                                    <div className={`w-3 h-3 rounded-full ${selectedYear === year ? 'bg-cyan-400 ring-4 ring-cyan-400/30' : 'bg-white/20'} transition-all`}></div>
                                                    <span className="text-xs text-text-secondary mt-2">{year}</span>
                                                    <span className="text-xs font-bold text-cyan-400 mt-1">{areaData[year]}ha</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="h-0.5 bg-white/10 absolute top-1.5 left-0 right-0"></div>
                                    </div>

                                    <p className="text-xs text-text-muted text-center">
                                        👆 Drag to see change over time
                                    </p>

                                    {/* Year Selection Buttons */}
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {years.map(year => (
                                            <button
                                                key={year}
                                                onClick={() => setSelectedYear(year)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedYear === year
                                                    ? 'bg-cyan-400 text-black'
                                                    : 'bg-white/5 text-text-secondary hover:bg-white/10'
                                                    }`}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Play Animation */}
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handlePlayTimeline}
                                            disabled={isPlaying}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            <Play size={16} />
                                            <span className="text-sm font-medium">
                                                {isPlaying ? 'Playing...' : 'Play Animation'}
                                            </span>
                                        </button>
                                    </div>

                                    <p className="text-xs text-text-muted text-center italic">
                                        Area values are approximate and resolution-dependent.
                                    </p>
                                </div>
                            </GlassmorphicCard>

                            {/* CHANGE ANALYSIS CHART */}
                            <GlassmorphicCard className="p-8">
                                <h3 className="text-xl font-display font-bold mb-6">📈 CHANGE ANALYSIS CHART</h3>
                                <div className="h-80">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                                <p className="text-xs text-text-muted text-center mt-4 italic">
                                    Satellite-derived analytical trend
                                </p>
                            </GlassmorphicCard>

                            {/* CHANGE ZONES MAP */}
                            <GlassmorphicCard className="p-8">
                                <h3 className="text-xl font-display font-bold mb-6">📍 CHANGE DETAILS</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Map Placeholder */}
                                    <div className="aspect-square bg-black rounded-lg border border-white/10 overflow-hidden relative group">
                                        <img
                                            src={changeMap}
                                            alt="Change Zones Map"
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                        {changeZones.map((zone, index) => (
                                            <motion.div
                                                key={zone.id}
                                                whileHover={{ scale: 1.2 }}
                                                className={`absolute w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow-lg backdrop-blur-sm border-2 ${zone.color === 'red' ? 'bg-red-500/40 border-red-500' :
                                                    zone.color === 'yellow' ? 'bg-amber-500/40 border-amber-500' :
                                                        'bg-green-500/40 border-green-500'
                                                    }`}
                                                style={{
                                                    top: `${30 + index * 12}%`,
                                                    left: `${25 + index * 18}%`
                                                }}
                                                onClick={() => {
                                                    // Interactive feedback could go here
                                                }}
                                            >
                                                <span className="text-xs font-bold text-white">{zone.id}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Zone Details */}
                                    <div className="space-y-3">
                                        {changeZones.map(zone => (
                                            <div
                                                key={zone.id}
                                                className={`p-4 rounded-lg border cursor-pointer hover:bg-white/5 transition-all ${zone.color === 'red' ? 'border-red-500/30 bg-red-500/5' :
                                                    zone.color === 'yellow' ? 'border-amber-500/30 bg-amber-500/5' :
                                                        'border-green-500/30 bg-green-500/5'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <span className={`text-2xl ${zone.color === 'red' ? '🔴' :
                                                        zone.color === 'yellow' ? '🟡' : '🟢'
                                                        }`}>
                                                        {zone.color === 'red' ? '🔴' :
                                                            zone.color === 'yellow' ? '🟡' : '🟢'}
                                                    </span>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-white mb-1">
                                                            Zone {zone.id}
                                                            {zone.area > 0 && (
                                                                <span className="ml-2 text-xs text-text-secondary">
                                                                    (~{zone.area} ha)
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-text-secondary">
                                                            {zone.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </GlassmorphicCard>

                            {/* DISCLAIMER */}
                            <GlassmorphicCard className="p-6 border-l-4 border-amber-500">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="font-bold text-amber-500 mb-2">⚠️ DISCLAIMER</h4>
                                        <p className="text-sm text-text-secondary mb-3">
                                            This analysis is for informational purposes only. Results require field verification before any action.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-text-muted">
                                            <span>Generated: Jan 29, 2026</span>
                                            <span>|</span>
                                            <span>Report ID: #HS2024-001</span>
                                        </div>
                                    </div>
                                </div>
                            </GlassmorphicCard>

                            {/* ACTIONS SECTION */}
                            <GlassmorphicCard className="p-8">
                                <h3 className="text-xl font-display font-bold mb-6">💾 ACTIONS</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <button className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-lg transition-all group">
                                        <Download className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">Download Full Report</div>
                                            <div className="text-xs text-text-muted">PDF with all data</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setShowObservationForm(true)}
                                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-lg transition-all group"
                                    >
                                        <FileText className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">Submit Observation</div>
                                            <div className="text-xs text-text-muted">For review</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setShowSuggestionForm(true)}
                                        className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-lg transition-all group"
                                    >
                                        <Lightbulb className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">Submit Suggestion</div>
                                            <div className="text-xs text-text-muted">Improvement ideas</div>
                                        </div>
                                    </button>

                                    <button className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-lg transition-all group">
                                        <Share2 className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">Share Analysis</div>
                                            <div className="text-xs text-text-muted">Generate link</div>
                                        </div>
                                    </button>

                                    <button className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 rounded-lg transition-all group">
                                        <Mail className="text-cyan-400 group-hover:scale-110 transition-transform" size={20} />
                                        <div className="text-left">
                                            <div className="text-sm font-medium text-white">Email Report</div>
                                            <div className="text-xs text-text-muted">Send to me</div>
                                        </div>
                                    </button>
                                </div>
                            </GlassmorphicCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* OBSERVATION SUBMISSION FORM */}
                <AnimatePresence>
                    {showObservationForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 overflow-y-auto"
                            onClick={() => setShowObservationForm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-2xl my-8"
                            >
                                <GlassmorphicCard className="p-8">
                                    <h3 className="text-2xl font-display font-bold mb-6">📬 SUBMIT OBSERVATION FOR REVIEW</h3>

                                    <form onSubmit={handleSubmitObservation} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Lake</label>
                                            <input
                                                type="text"
                                                value="Hussain Sagar Lake"
                                                disabled
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none opacity-70"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-3 text-text-secondary">Concern Type *</label>
                                            <div className="space-y-2">
                                                {['Suspected Land-Use Change', 'Pollution / Dumping', 'Boundary Irregularity', 'Other'].map(type => (
                                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="concernType"
                                                            value={type}
                                                            checked={observationForm.concernType === type}
                                                            onChange={(e) => setObservationForm({ ...observationForm, concernType: e.target.value })}
                                                            className="w-4 h-4 text-cyan-400 focus:ring-cyan-400"
                                                        />
                                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{type}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Describe Observation *</label>
                                            <textarea
                                                required
                                                value={observationForm.description}
                                                onChange={(e) => setObservationForm({ ...observationForm, description: e.target.value })}
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-colors resize-none"
                                                placeholder="Describe what you observed..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Upload Photos (Optional)</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-colors cursor-pointer">
                                                <Upload className="mx-auto mb-2 text-text-muted" size={24} />
                                                <p className="text-sm text-text-muted">Click to upload up to 5 images</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-3 text-text-secondary">Priority</label>
                                            <div className="flex gap-4">
                                                {['Low', 'Medium', 'High'].map(priority => (
                                                    <label key={priority} className="flex items-center gap-2 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="priority"
                                                            value={priority}
                                                            checked={observationForm.priority === priority}
                                                            onChange={(e) => setObservationForm({ ...observationForm, priority: e.target.value })}
                                                            className="w-4 h-4 text-cyan-400 focus:ring-cyan-400"
                                                        />
                                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{priority}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Location (Optional)</label>
                                            <div className="h-32 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center cursor-crosshair hover:border-cyan-400/50 transition-colors relative group">
                                                <img src={changeMap} alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-lg" />
                                                <span className="relative text-text-muted text-sm flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all">
                                                    <MapPin size={16} /> Click to pin location
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={observationForm.emailUpdates}
                                                    onChange={(e) => setObservationForm({ ...observationForm, emailUpdates: e.target.checked })}
                                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                                                />
                                                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                                    Send me updates via email
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={observationForm.smsAlerts}
                                                    onChange={(e) => setObservationForm({ ...observationForm, smsAlerts: e.target.checked })}
                                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                                                />
                                                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                                    Send me SMS alerts
                                                </span>
                                            </label>
                                        </div>

                                        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                            <p className="text-xs text-cyan-400">
                                                Your submission will be reviewed by the appropriate authority.
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            <AnimatedButton variant="primary" className="flex-1 py-3">
                                                Submit Observation
                                            </AnimatedButton>
                                            <button
                                                type="button"
                                                onClick={() => setShowObservationForm(false)}
                                                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </GlassmorphicCard>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SUGGESTION SUBMISSION FORM */}
                <AnimatePresence>
                    {showSuggestionForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 overflow-y-auto"
                            onClick={() => setShowSuggestionForm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-2xl my-8"
                            >
                                <GlassmorphicCard className="p-8">
                                    <h3 className="text-2xl font-display font-bold mb-6">💡 SUGGEST LAKE IMPROVEMENT</h3>

                                    <form onSubmit={handleSubmitSuggestion} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Lake</label>
                                            <input
                                                type="text"
                                                value="Hussain Sagar Lake"
                                                disabled
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none opacity-70"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-3 text-text-secondary">Suggestion Category *</label>
                                            <div className="space-y-2">
                                                {['Restoration Project', 'Beautification', 'Community Access', 'Biodiversity Enhancement', 'Waste Management', 'Other'].map(category => (
                                                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            name="category"
                                                            value={category}
                                                            checked={suggestionForm.category === category}
                                                            onChange={(e) => setSuggestionForm({ ...suggestionForm, category: e.target.value })}
                                                            className="w-4 h-4 text-cyan-400 focus:ring-cyan-400"
                                                        />
                                                        <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{category}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Your Suggestion *</label>
                                            <textarea
                                                required
                                                value={suggestionForm.suggestion}
                                                onChange={(e) => setSuggestionForm({ ...suggestionForm, suggestion: e.target.value })}
                                                rows={5}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-colors resize-none"
                                                placeholder="Describe your suggestion in detail..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-text-secondary">Upload Reference Images</label>
                                            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-colors cursor-pointer group">
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-500/20 transition-colors">
                                                    <Upload className="text-text-muted group-hover:text-cyan-400" size={24} />
                                                </div>
                                                <p className="text-sm text-text-muted">Click to upload images</p>
                                                <p className="text-xs text-text-muted/60 mt-1">PNG, JPG up to 5MB</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-text-secondary">Estimated Budget (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={suggestionForm.budget}
                                                    onChange={(e) => setSuggestionForm({ ...suggestionForm, budget: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-colors"
                                                    placeholder="₹ 10,00,000"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-3 text-text-secondary">Implementation Timeline</label>
                                                <select
                                                    value={suggestionForm.timeline}
                                                    onChange={(e) => setSuggestionForm({ ...suggestionForm, timeline: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan-400 transition-colors"
                                                >
                                                    <option value="">Select timeline</option>
                                                    <option value="Short-term">Short-term (0–6 months)</option>
                                                    <option value="Medium-term">Medium-term (6–12 months)</option>
                                                    <option value="Long-term">Long-term (1–2 years)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={suggestionForm.volunteer}
                                                    onChange={(e) => setSuggestionForm({ ...suggestionForm, volunteer: e.target.checked })}
                                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                                                />
                                                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                                    I volunteer to help implement this
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={suggestionForm.makePublic}
                                                    onChange={(e) => setSuggestionForm({ ...suggestionForm, makePublic: e.target.checked })}
                                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                                                />
                                                <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                                    Make suggestion visible to registered users
                                                </span>
                                            </label>
                                        </div>

                                        <div className="flex gap-4">
                                            <AnimatedButton variant="primary" className="flex-1 py-3">
                                                Submit Suggestion
                                            </AnimatedButton>
                                            <button
                                                type="button"
                                                onClick={() => setShowSuggestionForm(false)}
                                                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </GlassmorphicCard>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
