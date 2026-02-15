import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, ArrowRight, Activity, Zap } from 'lucide-react';

const AlertCard = ({ alert, index }) => {
    // Determine styles based on severity
    const styles = {
        Critical: {
            color: '#EF4444',
            bg: 'from-red-500/10 to-transparent',
            border: 'border-l-red-500',
            shadow: 'hover:shadow-[0_20px_60px_rgba(239,68,68,0.15)]',
            icon: AlertTriangle,
            badge: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
        },
        High: {
            color: '#F97316',
            bg: 'from-orange-500/10 to-transparent',
            border: 'border-l-orange-500',
            shadow: 'hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)]',
            icon: Zap,
            badge: 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]'
        },
        Medium: {
            color: '#FFB627',
            bg: 'from-yellow-500/10 to-transparent',
            border: 'border-l-yellow-400',
            shadow: 'hover:shadow-[0_20px_60px_rgba(255,182,39,0.15)]',
            icon: Activity,
            badge: 'bg-yellow-400 shadow-[0_0_15px_rgba(255,182,39,0.5)]'
        }
    }[alert.severity];

    const Icon = styles.icon;

    return (
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
            }}
            whileHover={{
                scale: 1.02,
                y: -20,
                rotateX: 2,
                transition: { duration: 0.3 }
            }}
            className={`
                relative p-5 rounded-xl backdrop-blur-xl bg-gradient-to-r ${styles.bg}
                border-l-4 ${styles.border} border-t border-r border-b border-white/5
                ${styles.shadow} transition-shadow cursor-pointer group mb-4
            `}
        >
            <div className="flex justify-between items-start mb-3">
                <span className={`${styles.badge} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                    {alert.severity}
                </span>
                <span className="text-xs text-gray-400 font-mono">{alert.time}</span>
            </div>

            <div className="flex items-start gap-3 mb-4">
                <motion.div
                    animate={
                        alert.severity === 'Critical' ? { rotate: [-5, 5, -5] } :
                            alert.severity === 'High' ? { scale: [1, 1.1, 1] } : {}
                    }
                    transition={{ duration: alert.severity === 'Critical' ? 0.5 : 1.5, repeat: Infinity }}
                    className="mt-1"
                >
                    <Icon size={24} style={{ color: styles.color }} />
                </motion.div>
                <div>
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-cyan-400 transition-colors">
                        {alert.lakeName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <MapPin size={12} /> {alert.location}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                <span className="text-xs font-bold" style={{ color: styles.color }}>
                    {alert.change} Area Change
                </span>
                <button className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-white transition-colors">
                    View Details <ArrowRight size={12} />
                </button>
            </div>
        </motion.div>
    );
};

export default function EnhancedAlertSection() {
    const alerts = [
        { id: 1, severity: 'Critical', lakeName: 'Saroornagar Lake', location: 'Hyderabad East', change: '-12%', time: '2 mins ago' },
        { id: 2, severity: 'High', lakeName: 'Hussain Sagar', location: 'Central Zone', change: '-5%', time: '15 mins ago' },
        { id: 3, severity: 'Medium', lakeName: 'Kapra Lake', location: 'Medchal', change: '-2%', time: '1 hour ago' },
        { id: 4, severity: 'Critical', lakeName: 'Durgam Cheruvu', location: 'Hitech City', change: 'Pollution Spike', time: '3 hours ago' },
        { id: 5, severity: 'High', lakeName: 'Osman Sagar', location: 'Gandipet', change: '-4%', time: '5 hours ago' }
    ];

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pl-1">Critical Intelligence</h3>
            <div className="overflow-y-auto max-h-[600px] pr-2 -mr-2 custom-scrollbar pb-10">
                {alerts.map((alert, index) => (
                    <AlertCard key={alert.id} alert={alert} index={index} />
                ))}
            </div>
        </div>
    );
}
