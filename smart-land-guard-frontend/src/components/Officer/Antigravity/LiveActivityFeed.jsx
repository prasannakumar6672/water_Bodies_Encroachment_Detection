import React from 'react';
import { motion } from 'framer-motion';
import { Radio, AlertCircle, CheckCircle, FileText, MessageSquare } from 'lucide-react';

const ActivityItem = ({ icon: Icon, text, time, priority, delay }) => (
    <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, duration: 0.4 }}
        className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0"
    >
        <div className={`mt-1 ${priority ? 'text-red-400 relative' : 'text-cyan-400'}`}>
            <Icon size={16} />
            {priority && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            )}
        </div>
        <div className="flex-1">
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">
                {text}
            </p>
            <span className="text-[10px] text-gray-500 font-mono mt-1 block">{time}</span>
        </div>
    </motion.div>
);

export default function LiveActivityFeed() {
    const activities = [
        { icon: AlertCircle, text: "New complaint filed for Hussain Sagar Lake", time: "2 mins ago", priority: true },
        { icon: CheckCircle, text: "Field verification completed: Kapra Lake", time: "15 mins ago", priority: false },
        { icon: FileText, text: "Weekly environmental report generated", time: "1 hour ago", priority: false },
        { icon: AlertCircle, text: "Critical alert: Saroornagar Lake pollution", time: "3 hours ago", priority: true },
        { icon: MessageSquare, text: "User feedback received on ticket #458", time: "5 hours ago", priority: false },
    ];

    return (
        <div className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[300px]">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio size={16} className="text-green-400" /> Live Activity Feed
                </h3>
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                {activities.map((item, index) => (
                    <ActivityItem
                        key={index}
                        {...item}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </div>
    );
}
