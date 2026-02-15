import React, { useState } from 'react';
import GlassmorphicCard from '../common/GlassmorphicCard';
import ComplaintCard from './ComplaintCard';
import { X, Send, Menu } from 'lucide-react';
import AnimatedButton from '../common/AnimatedButton';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComplaintManagement() {
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseTemplate, setResponseTemplate] = useState('Standard Acknowledgment');

    // Mock Data
    const complaints = [
        {
            id: '1247',
            lakeName: 'Hussain Sagar',
            filedBy: 'Ramesh Kumar',
            date: 'Jan 27, 2026',
            priority: 'HIGH',
            issue: 'Construction activity detected near the east boundary buffer zone.',
            photosCount: 3,
            status: 'Pending',
            image: null // Placeholder
        },
        {
            id: '1248',
            lakeName: 'Kapra Lake',
            filedBy: 'Anonymous',
            date: 'Jan 26, 2026',
            priority: 'MEDIUM',
            issue: 'Sewage inlet overflow reported during recent rains.',
            photosCount: 1,
            status: 'Pending',
            image: null
        }
    ];

    const handleRespond = (complaint) => {
        setSelectedComplaint(complaint);
    };

    const handleSendResponse = (e) => {
        e.preventDefault();
        // Here you would implement the actual email sending logic
        alert(`Response sent for Complaint #${selectedComplaint.id}`);
        setSelectedComplaint(null);
    };

    return (
        <div className="relative h-full">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Incoming Complaints</h2>
                <div className="flex gap-2">
                    <select className="bg-slate-900/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                        <option>All Priorities</option>
                        <option>High Priority</option>
                        <option>Medium Priority</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4 pb-20">
                {complaints.map(complaint => (
                    <ComplaintCard
                        key={complaint.id}
                        complaint={complaint}
                        onRespond={handleRespond}
                    />
                ))}
            </div>

            {/* Response Modal */}
            <AnimatePresence>
                {selectedComplaint && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-2xl"
                        >
                            <GlassmorphicCard className="p-0 overflow-hidden shadow-2xl border border-cyan-500/30">
                                {/* Header */}
                                <div className="bg-slate-900/50 p-4 border-b border-white/10 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Respond to Complaint #{selectedComplaint.id}</h3>
                                        <p className="text-xs text-gray-400">To: {selectedComplaint.filedBy}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedComplaint(null)}
                                        className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Body */}
                                <form onSubmit={handleSendResponse} className="p-6 space-y-4 bg-[#0F172A]">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Response Template</label>
                                        <select
                                            value={responseTemplate}
                                            onChange={(e) => setResponseTemplate(e.target.value)}
                                            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-cyan-400 outline-none"
                                        >
                                            <option>Standard Acknowledgment</option>
                                            <option>Field Verification Scheduled</option>
                                            <option>Action Taken Report</option>
                                            <option>Request More Information</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message Body</label>
                                        <textarea
                                            rows="8"
                                            className="w-full bg-slate-800 border border-white/10 rounded-lg p-4 text-sm text-white resize-none focus:border-cyan-400 outline-none leading-relaxed"
                                            defaultValue={`Dear ${selectedComplaint.filedBy},

Thank you for bringing this matter to our attention regarding ${selectedComplaint.lakeName}. We have reviewed the details provided in Complaint #${selectedComplaint.id}.

Our team has initiated a preliminary assessment of the reported ${selectedComplaint.issue.toLowerCase()}

You will receive further updates within 48 hours.

Regards,
District Officer
Hyderabad Region`}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                                                <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-cyan-400" />
                                                Update Status to "Under Review"
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                                                <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-cyan-400" />
                                                Send SMS Notification
                                            </label>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedComplaint(null)}
                                                className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Save Draft
                                            </button>
                                            <AnimatedButton type="submit" variant="primary" className="px-6 py-2 flex items-center gap-2">
                                                <Send size={16} /> Send Response
                                            </AnimatedButton>
                                        </div>
                                    </div>
                                </form>
                            </GlassmorphicCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
