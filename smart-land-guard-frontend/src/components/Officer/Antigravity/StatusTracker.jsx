import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Loader, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

const StatusCard = ({ label, count, total, color, icon: Icon, trend }) => {
    const percentage = (count / total) * 100;
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(percentage), 500);
        return () => clearTimeout(timer);
    }, [percentage]);

    return (
        <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ y: -15, scale: 1.02 }}
            className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl relative overflow-hidden group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                    <Icon size={16} style={{ color }} />
                    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    12%
                </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">{count}</h3>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full relative"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default function StatusTracker() {
    const total = 12 + 8 + 89;

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <StatusCard
                label="Pending Review"
                count={12}
                total={total}
                color="#EF4444"
                icon={Clock}
                trend="down"
            />
            <StatusCard
                label="In Progress"
                count={8}
                total={total}
                color="#F97316"
                icon={Loader}
                trend="up"
            />
            <StatusCard
                label="Resolved Cases"
                count={89}
                total={total}
                color="#10B981"
                icon={CheckCircle}
                trend="up"
            />
        </div>
    );
}
