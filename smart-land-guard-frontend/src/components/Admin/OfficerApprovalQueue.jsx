import { CheckCircle, XCircle, FileText, Mail, User, MapPin, Building, ChevronDown, ChevronUp, Clock, Loader2 } from 'lucide-react';
import AnimatedButton from '../common/AnimatedButton';
import { adminAPI } from '../../services/api';
import { useEffect } from 'react';


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
    const [officers, setOfficers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchOfficers();
    }, []);

    const fetchOfficers = async () => {
        setIsLoading(true);
        try {
            const { data } = await adminAPI.approvals();
            const mapped = data.map(o => ({

                id: o.id,
                name: o.full_name,
                email: o.email,
                dept: o.department,
                designation: o.designation,
                region: o.region,
                appliedDate: new Date(o.created_at).toLocaleDateString(),
                documents: o.identity_proof_url ? [o.identity_proof_url.split('/').pop()] : []
            }));
            setOfficers(mapped);
        } catch (err) {
            console.error("Error fetching officer registrations:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async (id) => {
        setIsLoading(true);
        try {
            await adminAPI.approveOfficer(id);
            alert(`Officer #${id} Approved!`);
            fetchOfficers();
        } catch (err) {
            alert("Error approving officer.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async (id) => {
        setIsLoading(true);
        try {
            await adminAPI.rejectOfficer(id);
            alert(`Officer #${id} Rejected.`);
            fetchOfficers();
        } catch (err) {
            alert("Error rejecting officer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock size={24} className="text-amber-400" /> Officer Approval Queue
                <span className="ml-2 text-xs bg-amber-500 text-black font-bold px-2 py-1 rounded-full">{officers.length} Pending</span>
            </h3>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="animate-spin text-amber-400" size={32} />
                    </div>
                ) : officers.length > 0 ? (
                    officers.map(officer => (
                        <div key={officer.id}>
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
