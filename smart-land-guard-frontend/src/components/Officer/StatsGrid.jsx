import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../common/GlassmorphicCard';
import { Waves, FileText, Lightbulb, Clock, Activity, CheckCircle2 } from 'lucide-react';

const StatItem = ({ label, value, icon: Icon, color, subtext }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} bg-opacity-10`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <h4 className="text-2xl font-bold text-white">{value}</h4>
            <p className="text-xs text-secondary text-gray-400 uppercase tracking-wider">{label}</p>
            {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
    </div>
);

export default function StatsGrid() {
    return (
        <GlassmorphicCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity size={20} className="text-cyan-400" />
                Region Statistics
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <StatItem
                    label="Total Lakes"
                    value="67"
                    icon={Waves}
                    color="bg-blue-500"
                    subtext="Hyderabad District"
                />
                <StatItem
                    label="Complaints"
                    value="24"
                    icon={FileText}
                    color="bg-orange-500"
                    subtext="12 Pending Review"
                />
                <StatItem
                    label="Suggestions"
                    value="15"
                    icon={Lightbulb}
                    color="bg-purple-500"
                    subtext="8 Actionable"
                />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Pending Review</p>
                    <p className="text-xl font-bold text-orange-400">12</p>
                </div>
                <div className="text-center border-l border-white/10">
                    <p className="text-xs text-gray-400 mb-1">In Progress</p>
                    <p className="text-xl font-bold text-blue-400">8</p>
                </div>
                <div className="text-center border-l border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Resolved</p>
                    <p className="text-xl font-bold text-green-400">89</p>
                </div>
            </div>
        </GlassmorphicCard>
    );
}
