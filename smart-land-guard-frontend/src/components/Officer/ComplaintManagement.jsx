import { X, Send, Menu, Loader2 } from 'lucide-react';
import AnimatedButton from '../common/AnimatedButton';
import { motion, AnimatePresence } from 'framer-motion';
import { complaintsAPI, verificationsAPI } from '../../services/api';
import { useEffect, useState } from 'react';


export default function ComplaintManagement() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [responseTemplate, setResponseTemplate] = useState('Standard Acknowledgment');
    const [responseMessage, setResponseMessage] = useState('');
    const [updateStatus, setUpdateStatus] = useState(true);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        setIsLoading(true);
        try {
            const { data } = await complaintsAPI.list();
            // Map backend data to frontend structure
            const mapped = data.map(c => ({
                id: c.id,
                lakeName: c.lake?.name || 'Unknown Lake',
                filedBy: c.reporter_name || 'Anonymous',
                date: new Date(c.created_at).toLocaleDateString(),
                priority: c.priority.toUpperCase(),
                issue: c.description,
                photos_count: c.photos_count || 0,
                status: c.status,
                photos: c.photos || []
            }));
            setComplaints(mapped);
        } catch (err) {
            console.error("Error fetching complaints:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRespond = (complaint) => {
        setSelectedComplaint(complaint);
        setResponseMessage(`Dear ${complaint.filedBy},

Thank you for bringing this matter to our attention regarding ${complaint.lakeName}. We have reviewed the details provided in Complaint #${complaint.id}.

Our team has initiated a preliminary assessment of the reported ${complaint.issue.toLowerCase()}.

You will receive further updates within 48 hours.

Regards,
District Officer
Hyderabad Region`);
    };

    const handleSendResponse = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await complaintsAPI.respond(selectedComplaint.id, {
                message: responseMessage,
                update_status: updateStatus ? "Under Review" : null
            });
            alert(`Response sent for Complaint #${selectedComplaint.id}`);
            setSelectedComplaint(null);
            fetchComplaints();
        } catch (err) {
            alert("Error sending response. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="animate-spin text-cyan-400" size={32} />
                    </div>
                ) : complaints.length === 0 ? (
                    <div className="text-center p-12 text-gray-400">No complaints found.</div>
                ) : (
                    complaints.map(complaint => (
                        <ComplaintCard
                            key={complaint.id}
                            complaint={complaint}
                            onRespond={handleRespond}
                        />
                    ))
                )}
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
                                            value={responseMessage}
                                            onChange={(e) => setResponseMessage(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                                                <input 
                                                    type="checkbox" 
                                                    checked={updateStatus} 
                                                    onChange={(e) => setUpdateStatus(e.target.checked)}
                                                    className="rounded border-white/20 bg-white/5 text-cyan-400" 
                                                />
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
