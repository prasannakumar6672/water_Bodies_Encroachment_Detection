import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import GlassmorphicCard from '../common/GlassmorphicCard';
import { TrendingUp, Activity, Map, AlertTriangle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function AdminAnalytics() {
    // 1. Usage Statistics (Line Chart)
    const usageData = {
        labels: ['Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30', 'Jan 31'],
        datasets: [
            {
                label: 'Daily Active Users',
                data: [120, 150, 180, 220, 260, 310, 350],
                borderColor: '#06b6d4', // Cyan
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Complaints Filed',
                data: [5, 8, 12, 10, 15, 18, 25],
                borderColor: '#ef4444', // Red
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0.4,
                fill: true,
            }
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'white' } },
            title: { display: false },
        },
        scales: {
            y: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: 'gray' } },
            x: { grid: { display: false }, ticks: { color: 'gray' } },
        },
        maintainAspectRatio: false,
    };

    // 2. Alert Generation (Doughnut Chart)
    const alertData = {
        labels: ['Auto-detected', 'User-reported', 'Officer-verified'],
        datasets: [
            {
                data: [156, 89, 67],
                backgroundColor: [
                    'rgba(6, 182, 212, 0.8)', // Cyan
                    'rgba(245, 158, 11, 0.8)', // Amber
                    'rgba(16, 185, 129, 0.8)', // Emerald
                ],
                borderColor: [
                    'rgba(6, 182, 212, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(16, 185, 129, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'right', labels: { color: 'white' } },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full pb-6">
            {/* Usage Stats - Spans 2 cols */}
            <GlassmorphicCard className="p-6 md:col-span-2 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={20} className="text-cyan-400" /> Usage Statistics
                </h3>
                <div className="flex-1 min-h-[300px]">
                    <Line data={usageData} options={lineOptions} />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 border-t border-white/5 pt-4">
                    <div className="text-center">
                        <p className="text-gray-400 text-xs uppercase">Avg Response Time</p>
                        <p className="text-xl font-bold text-white">2.5 Days</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-400 text-xs uppercase">Resolution Rate</p>
                        <p className="text-xl font-bold text-green-400">87%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-400 text-xs uppercase">New Signups</p>
                        <p className="text-xl font-bold text-cyan-400">+12%</p>
                    </div>
                </div>
            </GlassmorphicCard>

            {/* Alert Breakdown */}
            <GlassmorphicCard className="p-6 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-amber-400" /> Alert Sources
                </h3>
                <div className="flex-1 relative min-h-[250px] flex items-center justify-center">
                    <Doughnut data={alertData} options={doughnutOptions} />
                </div>
                <div className="mt-4 space-y-2">
                    <p className="text-xs text-center text-gray-500">Total Alerts Month-to-Date: <span className="text-white font-bold">312</span></p>
                </div>
            </GlassmorphicCard>

            {/* Regional Performance - Spans 3 cols (Full Width at bottom) */}
            <GlassmorphicCard className="p-6 md:col-span-3">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Map size={20} className="text-blue-400" /> Regional Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white font-bold">Hyderabad</span>
                            <span className="text-green-400">95%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">High efficiency in complaint resolution.</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white font-bold">Nalgonda</span>
                            <span className="text-amber-400">88%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Moderate delay in field verifications.</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white font-bold">Warangal</span>
                            <span className="text-red-400">72%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Critical staff shortage reported.</p>
                    </div>
                </div>
            </GlassmorphicCard>
        </div>
    );
}
