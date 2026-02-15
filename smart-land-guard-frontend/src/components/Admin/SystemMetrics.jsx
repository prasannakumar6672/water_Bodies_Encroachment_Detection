import React from 'react';
import { Users, Shield, Clock, Waves, AlertTriangle, Activity } from 'lucide-react';
import GlassmorphicCard from '../common/GlassmorphicCard';

const MetricCard = ({ label, value, icon: Icon, color, trend }) => (
    <GlassmorphicCard className="p-4 flex items-center gap-4 relative overflow-hidden group">
        {/* Background Glow */}
        <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-500`} style={{ backgroundColor: color }} />

        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 border border-white/5`}>
            <Icon size={24} style={{ color }} />
        </div>
        <div>
            <h4 className="text-2xl font-bold text-white">{value}</h4>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
        {trend && (
            <div className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">
                {trend}
            </div>
        )}
    </GlassmorphicCard>
);

export default function SystemMetrics() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity size={20} className="text-cyan-400" /> System Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <MetricCard
                    label="Total Users"
                    value="12,547"
                    icon={Users}
                    color="#06b6d4"
                    trend="+12%"
                />
                <MetricCard
                    label="Active Officers"
                    value="156"
                    icon={Shield}
                    color="#8b5cf6"
                />
                <MetricCard
                    label="Pending Approvals"
                    value="8"
                    icon={Clock}
                    color="#f59e0b"
                />
                <MetricCard
                    label="Lakes Monitored"
                    value="2,547"
                    icon={Waves}
                    color="#3b82f6"
                />
                <MetricCard
                    label="Active Alerts"
                    value="47"
                    icon={AlertTriangle}
                    color="#ef4444"
                />
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                    <p className="text-xs text-green-300 font-bold uppercase mb-1">System Health</p>
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-green-500" />)}
                    </div>
                    <p className="text-xl font-bold text-white">98%</p>
                </div>
            </div>
        </div>
    );
}
