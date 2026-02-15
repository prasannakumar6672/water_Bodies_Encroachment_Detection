import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, User, Power, Edit } from 'lucide-react';
import GlassmorphicCard from '../common/GlassmorphicCard';

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([
        { id: 1, name: 'Ramesh Kumar', email: 'ramesh@email.com', role: 'Public', region: 'Hyderabad', status: 'Active' },
        { id: 2, name: 'Rajesh Kumar', email: 'rajesh@gov.in', role: 'Officer', region: 'Hyderabad', status: 'Active' },
        { id: 3, name: 'Sarah Wilson', email: 'sarah.w@admin.com', role: 'Admin', region: 'All', status: 'Active' },
        { id: 4, name: 'Inactive User', email: 'user@test.com', role: 'Public', region: 'Warangal', status: 'Suspended' },
    ]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col gap-6">
            <GlassmorphicCard className="p-4 flex gap-4 items-center">
                <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-cyan-400 outline-none"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                    <Filter size={16} /> Filters
                </button>
            </GlassmorphicCard>

            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Region</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div>
                                        <p className="font-bold text-white text-sm">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'Admin' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                        user.role === 'Officer' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                            'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                        }`}>
                                        {user.role === 'Admin' ? <Shield size={10} /> : user.role === 'Officer' ? <User size={10} /> : <User size={10} />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-300">
                                    {user.region}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="Edit">
                                            <Edit size={14} />
                                        </button>
                                        <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400" title="Suspend">
                                            <Power size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
