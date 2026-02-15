import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../common/GlassmorphicCard';
import { AlertTriangle, AlertCircle, TrendingDown, ArrowRight } from 'lucide-react';

const AlertRow = ({ name, issue, level }) => {
    const colors = {
        critical: 'text-red-400 bg-red-400/10 border-red-400/20',
        high: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
        medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    };

    const icons = {
        critical: AlertTriangle,
        high: AlertCircle,
        medium: TrendingDown
    };

    const Icon = icons[level] || AlertCircle;

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border ${colors[level]} mb-3 transition-colors hover:bg-white/5`}>
            <div className="flex items-center gap-3">
                <Icon size={18} className={level === 'critical' ? 'text-red-500' : level === 'high' ? 'text-orange-500' : 'text-yellow-500'} />
                <div>
                    <h5 className="text-sm font-bold text-white">{name}</h5>
                    <p className="text-xs text-gray-400">{issue}</p>
                </div>
            </div>
            <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">
                <ArrowRight size={16} />
            </button>
        </div>
    );
};

export default function AlertCard() {
    return (
        <GlassmorphicCard className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <AlertTriangle size={20} className="text-red-400" />
                    Critical Alerts
                </h3>
                <span className="bg-red-500/20 text-red-300 text-xs font-bold px-2 py-1 rounded-full border border-red-500/20 animate-pulse">
                    3 Active
                </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <AlertRow
                    name="Kapra Lake"
                    issue="25% area lost in 6 months"
                    level="critical"
                />
                <AlertRow
                    name="Saroornagar Lake"
                    issue="Rapid encroachment detected"
                    level="critical"
                />
                <AlertRow
                    name="Mir Alam Lake"
                    issue="Boundary breach reported"
                    level="critical"
                />
                <AlertRow
                    name="Durgam Cheruvu"
                    issue="Unauthorized construction"
                    level="high"
                />
                <AlertRow
                    name="Ameenpur Lake"
                    issue="Water quality degradation"
                    level="high"
                />
            </div>

            <button className="w-full mt-4 py-2 text-xs font-bold text-center text-text-secondary hover:text-white transition-colors border-t border-white/10 pt-4">
                VIEW ALL ALERTS
            </button>
        </GlassmorphicCard>
    );
}
