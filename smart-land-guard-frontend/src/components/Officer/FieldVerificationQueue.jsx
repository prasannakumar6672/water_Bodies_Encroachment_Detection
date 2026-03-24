import { Calendar, Users, ClipboardCheck, Clock, MapPin, ChevronRight, Plus, Loader2 } from 'lucide-react';
import AnimatedButton from '../common/AnimatedButton';
import { verificationsAPI } from '../../services/api';
import { useState, useEffect } from 'react';


const VerificationTask = ({ task }) => (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl mb-3 hover:border-cyan-400/30 transition-all group">
        <div className="flex items-center gap-4">
            <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${task.status === 'Completed' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}
            `}>
                <ClipboardCheck size={20} />
            </div>
            <div>
                <h4 className="font-bold text-white text-sm">{task.lakeName}</h4>
                <p className="text-xs text-gray-400 flex items-center gap-2">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {task.date}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className="flex items-center gap-1"><Users size={12} /> {task.team}</span>
                </p>
                <p className="text-xs text-secondary mt-1 text-gray-400">{task.description}</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            {task.status === 'Completed' ? (
                <button className="px-3 py-1.5 text-xs font-bold text-green-400 border border-green-500/20 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors">
                    View Report
                </button>
            ) : (
                <button className="px-3 py-1.5 text-xs font-bold text-cyan-400 border border-cyan-500/20 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors">
                    Add Report
                </button>
            )}
            <ChevronRight size={16} className="text-gray-500 group-hover:text-white transition-colors" />
        </div>
    </div>
);

export default function FieldVerificationQueue() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const { data } = await verificationsAPI.list();
                const mapped = data.map(v => ({
                    id: v.id,
                    lakeName: v.lake?.name || 'Unknown Lake',
                    date: new Date(v.scheduled_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                    team: v.assigned_team || 'Unassigned',
                    description: v.description,
                    status: v.status
                }));
                setTasks(mapped);
            } catch (err) {
                console.error("Error fetching verification tasks:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);


    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Field Verification Tasks</h2>
                <AnimatedButton variant="primary" className="px-4 py-2 text-xs flex items-center gap-2">
                    <Plus size={16} /> Schedule New
                </AnimatedButton>
            </div>

            <GlassmorphicCard className="flex-1 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 opacity-50" />

                <div className="mb-6 flex gap-4">
                    <div className="flex-1 bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl text-center">
                        <h3 className="text-2xl font-bold text-orange-400">
                            {tasks.filter(t => t.status === 'Scheduled').length.toString().padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Scheduled</p>
                    </div>
                    <div className="flex-1 bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center">
                        <h3 className="text-2xl font-bold text-green-400">
                            {tasks.filter(t => t.status === 'Completed').length.toString().padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Completed</p>
                    </div>
                    <div className="flex-1 bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
                        <h3 className="text-2xl font-bold text-blue-400">
                            {[...new Set(tasks.map(t => t.team))].length.toString().padStart(2, '0')}
                        </h3>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Teams Active</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="animate-spin text-cyan-400" size={32} />
                        </div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center p-12 text-gray-400">No verification tasks found.</div>
                    ) : (
                        <>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Upcoming Tasks</h3>
                            {tasks.filter(t => t.status !== 'Completed').map(task => (
                                <VerificationTask key={task.id} task={task} />
                            ))}

                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6">Completed History</h3>
                            {tasks.filter(t => t.status === 'Completed').map(task => (
                                <VerificationTask key={task.id} task={task} />
                            ))}
                        </>
                    )}
                </div>
            </GlassmorphicCard>
        </div>
    );
}
