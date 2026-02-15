import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, MapPin, User, Camera, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import GlassmorphicCard from '../common/GlassmorphicCard';

const PriorityBadge = ({ level }) => {
    const styles = {
        HIGH: 'bg-red-500/20 text-red-400 border-red-500/20',
        MEDIUM: 'bg-orange-500/20 text-orange-400 border-orange-500/20',
        LOW: 'bg-green-500/20 text-green-400 border-green-500/20',
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[level] || styles.LOW}`}>
            {level} PRIORITY
        </span>
    );
};

export default function ComplaintCard({ complaint, onRespond }) {
    return (
        <GlassmorphicCard className="p-0 overflow-hidden mb-4 group hover:border-cyan-400/30 transition-colors">
            <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">

                {/* Image Section */}
                <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0 rounded-lg bg-gray-600/20 relative overflow-hidden">
                    {complaint.image ? (
                        <img src={complaint.image} alt="Evidence" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-500">
                            <Camera size={24} />
                        </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white">
                        {complaint.photosCount} Photos
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-lg font-bold text-white">Complaint #{complaint.id}</h4>
                                <PriorityBadge level={complaint.priority} />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><MapPin size={12} /> {complaint.lakeName}</span>
                                <span className="flex items-center gap-1"><Calendar size={12} /> {complaint.date}</span>
                            </div>
                        </div>
                        {/* Status Icon */}
                        {complaint.status === 'Resolved' ? (
                            <div className="text-green-400 flex flex-col items-center">
                                <CheckCircle size={20} />
                                <span className="text-[10px] font-bold mt-1">RESOLVED</span>
                            </div>
                        ) : (
                            <div className="text-orange-400 flex flex-col items-center">
                                <Clock size={20} />
                                <span className="text-[10px] font-bold mt-1">PENDING</span>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 mb-4">
                        <span className="text-gray-500 font-bold mr-1">Issue:</span>
                        "{complaint.issue}"
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs">
                                <User size={12} />
                            </div>
                            <span className="text-xs text-text-secondary">Filed by <span className="text-white font-medium">{complaint.filedBy}</span></span>
                        </div>

                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition-colors border border-blue-500/20">
                                Assign Team
                            </button>
                            <button
                                onClick={() => onRespond(complaint)}
                                className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold transition-colors border border-cyan-400/20 flex items-center gap-2"
                            >
                                <MessageSquare size={14} /> Respond
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </GlassmorphicCard>
    );
}
