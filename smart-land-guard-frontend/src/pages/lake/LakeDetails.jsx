import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import ComparisonSlider from '../../components/Visualization/ComparisonSlider';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import AnimatedButton from '../../components/common/AnimatedButton';
import {
    Waves,
    Map as MapIcon,
    AlertTriangle,
    TrendingDown,
    Info,
    Calendar,
    ArrowLeft,
    Share2,
    Download,
    ShieldCheck
} from 'lucide-react';

export default function WaterBodyDetails() {
    const { id } = useParams();

    const waterBody = {
        name: "Pedda Cheruvu",
        district: "Rangareddy",
        mandal: "Uppal",
        village: "Peerzadiguda",
        currentArea: "42.5",
        originalArea: "58.2",
        areaLost: "15.7",
        percentageChange: "-26.9%",
        status: "Priority Monitoring",
        lastUpdated: "24 Jan 2026"
    };

    return (
        <div className="min-h-screen bg-bg-darker text-text-primary pb-20">
            <Navbar />

            <div className="pt-24 max-w-7xl mx-auto px-6">
                {/* Breadcrumbs & Back */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/dashboard" className="glassmorphic p-2 hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-display font-black text-white">{waterBody.name}</h1>
                        <p className="text-text-muted text-sm font-mono uppercase tracking-widest">
                            {waterBody.district} • {waterBody.mandal} • {waterBody.village}
                        </p>
                    </div>

                    <div className="ml-auto flex gap-3">
                        <div className="glassmorphic px-4 py-1.5 rounded-full flex items-center gap-2 border border-amber-500/30 text-amber-400 text-xs font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" /> {waterBody.status}
                        </div>
                        <AnimatedButton variant="outline" className="px-4 py-1.5 text-xs">
                            <Share2 className="w-3.5 h-3.5" /> Share
                        </AnimatedButton>
                        <AnimatedButton variant="primary" className="px-4 py-1.5 text-xs">
                            <Download className="w-3.5 h-3.5" /> Export Data
                        </AnimatedButton>
                    </div>
                </div>

                {/* Hero Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                    {/* Detailed Image Comparison */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-display font-bold flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-cyan-400" /> Historical Comparison
                            </h2>
                            <div className="flex gap-2">
                                <button className="text-[10px] font-mono text-cyan-400 underline uppercase">View Timeline</button>
                            </div>
                        </div>

                        <ComparisonSlider
                            labels={{ before: 'Satellite-LANDSAT (2010)', after: 'Satellite-SENTINEL (2026)' }}
                        />

                        <GlassmorphicCard className="p-6">
                            <h3 className="text-sm font-display font-bold mb-4 flex items-center gap-2">
                                <Info className="w-4 h-4 text-cyan-400" /> Analyst Observations
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start pb-4 border-b border-white/5">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">AV</div>
                                    <div>
                                        <div className="text-xs font-bold mb-1 font-display">AI Vision Bot <span className="text-[10px] text-text-muted font-normal ml-2">2 hours ago</span></div>
                                        <p className="text-xs text-text-secondary leading-relaxed">
                                            Automated detection identified a 12% decrease in surface water extent over the last 3 months. Potential encroachment detected on the North-Eastern boundary.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">RS</div>
                                    <div>
                                        <div className="text-xs font-bold mb-1 font-display">Ravi Shankar <span className="text-[10px] text-text-muted font-normal ml-2">Admin Analyst • 1 day ago</span></div>
                                        <p className="text-xs text-text-secondary leading-relaxed">
                                            Ground validation scheduled for next week. Satellite data confirms illegal construction activity within the catchment area buffer zone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </GlassmorphicCard>
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-display font-bold flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Key Metrics
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            <MetricCard
                                label="Original Area (Ha)"
                                value={waterBody.originalArea}
                                icon={<MapIcon className="w-4 h-4" />}
                                color="text-white"
                            />
                            <MetricCard
                                label="Current Area (Ha)"
                                value={waterBody.currentArea}
                                icon={<Waves className="w-4 h-4" />}
                                color="text-cyan-400"
                            />
                            <MetricCard
                                label="Area Lost (Ha)"
                                value={waterBody.areaLost}
                                icon={<AlertTriangle className="w-4 h-4" />}
                                color="text-red-400"
                                highlight={true}
                            />
                            <MetricCard
                                label="Change Rate"
                                value={waterBody.percentageChange}
                                icon={<TrendingDown className="w-4 h-4" />}
                                color="text-amber-400"
                            />
                        </div>

                        <GlassmorphicCard className="p-5 flex flex-col items-center text-center gap-4 bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20">
                            <div className="w-16 h-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
                            <div>
                                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Protection Score</div>
                                <div className="text-4xl font-display font-black">68/100</div>
                            </div>
                            <p className="text-[10px] text-text-muted leading-relaxed">
                                Based on historical preservation, current encroachment threats, and water quality index.
                            </p>
                        </GlassmorphicCard>
                    </div>

                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, icon, color, highlight = false }) {
    return (
        <GlassmorphicCard className={`p-4 ${highlight ? 'bg-red-500/5 border-red-500/20' : ''}`}>
            <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${highlight ? 'text-red-400' : 'text-text-muted'}`}>{label}</span>
                <div className={color}>{icon}</div>
            </div>
            <div className={`text-2xl font-display font-black ${color}`}>{value}</div>
        </GlassmorphicCard>
    );
}
