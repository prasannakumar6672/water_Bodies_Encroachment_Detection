import React, { useState } from 'react';
import GlassmorphicCard from '../common/GlassmorphicCard';
import AnimatedButton from '../common/AnimatedButton';
import { ShieldAlert, CheckCircle, FileText, Calendar, TrendingUp, AlertTriangle, Upload, User, Clock, ChevronDown } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function OfficialLakeDetails({ lakeName = "Hussain Sagar", onClose }) {
    const [status, setStatus] = useState('Under Investigation');

    // Mock Chart Data for Predictive Analytics
    const chartData = {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027 (Pred)', '2028 (Pred)'],
        datasets: [
            {
                label: 'Water Surface Area (Hectares)',
                data: [450, 448, 442, 438, 435, 432, 430, 425, 418],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4,
                borderDash: [0, 0, 0, 0, 0, 0, 0, 5, 5] // Dash prediction
            },
            {
                label: 'Safe Threshold',
                data: [400, 400, 400, 400, 400, 400, 400, 400, 400],
                borderColor: '#22c55e',
                borderDash: [5, 5],
                pointRadius: 0
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: '#fff' } },
            title: { display: false }
        },
        scales: {
            y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.1)' } }
        }
    };

    return (
        <div className="h-full overflow-y-auto custom-scrollbar p-2">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                        {lakeName}
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/20 uppercase">
                            {status}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                        <User size={14} /> Officer-in-Charge: Rajesh Kumar
                    </p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white underline text-sm"
                    >
                        Back to Dashboard
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Visuals Column */}
                <div className="space-y-6">
                    <GlassmorphicCard className="p-0 overflow-hidden h-64 relative group">
                        <img src="https://images.unsplash.com/photo-1565620958197-24d108d81373?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Lake" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                            <p className="text-white font-bold">Latest Satellite Imagery</p>
                            <p className="text-xs text-gray-400">Captured: Jan 28, 2026</p>
                        </div>
                    </GlassmorphicCard>

                    <GlassmorphicCard className="p-4 space-y-4">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider border-b border-white/10 pb-2">Status Actions</h3>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 block mb-1">Update Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-cyan-400 outline-none"
                            >
                                <option>Verified Safe</option>
                                <option>Under Investigation</option>
                                <option>Field Verification Scheduled</option>
                                <option>Action Required</option>
                                <option>Resolved</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 block mb-1">Assign Team</label>
                            <select className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-cyan-400 outline-none">
                                <option>Select Field Team</option>
                                <option>Team Alpha</option>
                                <option>Team Beta</option>
                                <option>Legal Team</option>
                            </select>
                        </div>

                        <AnimatedButton variant="primary" className="w-full text-xs font-bold py-2">
                            UPDATE OFFICIAL RECORD
                        </AnimatedButton>
                    </GlassmorphicCard>
                </div>

                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Predictive Analytics */}
                    <GlassmorphicCard className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <TrendingUp size={20} className="text-red-400" />
                                Predictive Analytics (AI)
                            </h3>
                            <span className="text-xs text-gray-400">Projection for next 2 years</span>
                        </div>

                        <div className="h-64 w-full bg-slate-900/50 rounded-xl p-2 border border-white/5 mb-4">
                            <Line options={chartOptions} data={chartData} />
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-4 items-start">
                            <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-red-100 font-bold mb-1">Critical Prediction Alert</p>
                                <p className="text-xs text-red-200/70">
                                    Based on current encroachment trends, this lake is projected to lose an additional 12 hectares by 2028 if no immediate intervention is taken.
                                </p>
                            </div>
                        </div>
                    </GlassmorphicCard>

                    {/* Report & History */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <GlassmorphicCard className="p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-cyan-400" /> Documents
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-sm text-gray-300">
                                    <span className="flex items-center gap-2"><FileText size={14} /> Survey_Report_2025.pdf</span>
                                    <button className="text-x text-cyan-400 hover:text-white">View</button>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-sm text-gray-300">
                                    <span className="flex items-center gap-2"><Upload size={14} /> Field_Photos.zip</span>
                                    <button className="text-x text-cyan-400 hover:text-white">Download</button>
                                </div>
                                <button className="w-full py-2 border border-dashed border-white/20 rounded-lg text-xs text-gray-400 hover:text-white hover:border-white/50 transition-colors mt-2 flex items-center justify-center gap-2">
                                    <Upload size={12} /> Upload New Document
                                </button>
                            </div>
                        </GlassmorphicCard>

                        <GlassmorphicCard className="p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Clock size={18} className="text-amber-400" /> History Log
                            </h3>
                            <div className="space-y-4 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                <div className="flex gap-3 relative">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 z-10" />
                                    <div className="absolute top-2 left-1 w-0.5 h-full bg-white/10" />
                                    <div>
                                        <p className="text-xs text-gray-400">Jan 29, 2026</p>
                                        <p className="text-sm text-white">Field verification scheduled for team Alpha</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 relative">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full mt-1.5 z-10" />
                                    <div className="absolute top-2 left-1 w-0.5 h-full bg-white/10" />
                                    <div>
                                        <p className="text-xs text-gray-400">Jan 27, 2026</p>
                                        <p className="text-sm text-white">Complaint #1247 Received</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 relative">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full mt-1.5 z-10" />
                                    <div>
                                        <p className="text-xs text-gray-400">Jan 27, 2026</p>
                                        <p className="text-sm text-white">Officer Rajesh Kumar assigned to review</p>
                                    </div>
                                </div>
                            </div>
                        </GlassmorphicCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
