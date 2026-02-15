import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '../common/GlassmorphicCard';
import { CheckCircle, XCircle, FileText, Mail, User, MapPin, Building, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import AnimatedButton from '../common/AnimatedButton';

const ApprovalCard = ({ officer, onApprove, onReject }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <GlassmorphicCard className="p-0 overflow-hidden mb-4 border-l-4 border-l-amber-500">
            <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Basic Info */}
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold border border-amber-500/20">
                        {officer.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">{officer.name}</h4>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                            <span className="flex items-center gap-1"><Building size={12} /> {officer.dept}</span>
                            <span className="flex items-center gap-1"><MapPin size={12} /> {officer.region}</span>
                        </div>
                    </div>
                </div>

                {/* Status/Date */}
                <div className="text-right">
                    <p className="text-xs text-gray-500">Applied: {officer.appliedDate}</p>
                    <p className="text-xs text-amber-400 font-bold mt-1">Background Check: Partial</p>
                </div>

                {/* Toggle Actions */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 md:hidden"
                >
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => onReject(officer.id)}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold transition-colors"
                    >
                        Reject
                    </button>
                    <AnimatedButton
                        onClick={() => onApprove(officer.id)}
                        variant="primary"
                        className="px-4 py-2 text-xs font-bold bg-green-600 hover:bg-green-500 border-none"
                    >
                        Approve & Send Creds
                    </AnimatedButton>
                </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-900/50 border-t border-white/5"
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="text-xs font-bold text-gray-400 uppercase mb-3">Applicant Details</h5>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <p><span className="text-gray-500 block text-xs">Email:</span> {officer.email}</p>
                                    <p><span className="text-gray-500 block text-xs">Designation:</span> {officer.designation}</p>
                                    <p><span className="text-gray-500 block text-xs">Phone:</span> +91 98765 43210 (Verified)</p>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-xs font-bold text-gray-400 uppercase mb-3">Uploaded Documents</h5>
                                <div className="space-y-2">
                                    {officer.documents.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-400/30 transition-colors cursor-pointer group">
                                            <span className="flex items-center gap-2 text-sm text-gray-300 group-hover:text-white">
                                                <FileText size={14} className="text-cyan-400" /> {doc}
                                            </span>
                                            <span className="text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">Verified</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Actions Footer */}
            {expanded && (
                <div className="p-4 border-t border-white/5 flex gap-2 md:hidden">
                    <button
                        onClick={() => onReject(officer.id)}
                        className="flex-1 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => onApprove(officer.id)}
                        className="flex-1 py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold"
                    >
                        Approve
                    </button>
                </div>
            )}
        </GlassmorphicCard>
    );
};

export default function OfficerApprovalQueue() {
    // Mock Data
    const [officers, setOfficers] = useState([
        {
            id: 156,
            name: 'Mr. Suresh Reddy',
            email: 'suresh.reddy@revenue.gov.in',
            dept: 'Revenue Department',
            designation: 'Assistant District Officer',
            region: 'Nalgonda District',
            appliedDate: 'Jan 25, 2026',
            documents: ['Aadhaar_Suresh.pdf', 'Posting_Order.pdf', 'Dept_Letter.pdf']
        },
        {
            id: 157,
            name: 'Ms. Priya Sharma',
            email: 'priya.s@environment.gov.in',
            dept: 'Env. Protection Agency',
            designation: 'Field Inspector',
            region: 'Hyderabad District',
            appliedDate: 'Jan 26, 2026',
            documents: ['ID_Card.pdf', 'Authorization.pdf']
        }
    ]);

    const handleApprove = (id) => {
        setOfficers(officers.filter(o => o.id !== id));
        alert(`Officer #${id} Approved! Credentials sent.`);
    };

    const handleReject = (id) => {
        setOfficers(officers.filter(o => o.id !== id));
        alert(`Officer #${id} Rejected.`);
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock size={24} className="text-amber-400" /> Officer Approval Queue
                <span className="ml-2 text-xs bg-amber-500 text-black font-bold px-2 py-1 rounded-full">{officers.length} Pending</span>
            </h3>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {officers.length > 0 ? (
                    officers.map(officer => (
                        <div key={officer.id} onClick={() => { }} > {/* Wrapper for click handling if needed later */}
                            <ApprovalCard
                                officer={officer}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        </div>
                    ))
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-xl bg-white/5">
                        <CheckCircle size={40} className="mb-2 opacity-50" />
                        <p>All caught up! No pending approvals.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
