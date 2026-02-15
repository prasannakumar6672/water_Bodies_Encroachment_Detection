import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import SystemMetrics from '../../components/Admin/SystemMetrics';
import OfficerApprovalQueue from '../../components/Admin/OfficerApprovalQueue';
import UserManagement from '../../components/Admin/UserManagement';
import LakeDatabaseManagement from '../../components/Admin/LakeDatabaseManagement';
import SystemSettings from '../../components/Admin/SystemSettings';
import AdminAnalytics from '../../components/Admin/AdminAnalytics';
import ReportPanel from '../../components/Officer/ReportPanel'; // Reusing ReportPanel
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import {
    LayoutDashboard,
    Users,
    Database,
    Settings,
    FileText,
    BarChart2,
    Bell,
    Search,
    LogOut,
    ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Placeholders
const MockModule = ({ title }) => (
    <div className="h-full flex items-center justify-center border border-dashed border-white/20 rounded-xl bg-white/5">
        <p className="text-gray-400">{title} (Pending Implementation)</p>
    </div>
);

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const sidebarItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Control Panel' },
        { id: 'users', icon: Users, label: 'User Management' },
        { id: 'lakes', icon: Database, label: 'Lake Database' },
        { id: 'analytics', icon: BarChart2, label: 'System Analytics' },
        { id: 'reports', icon: FileText, label: 'System Reports' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-[#0B1121] flex pt-20 pb-6 px-6 gap-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden md:flex flex-col gap-4 z-10">
                <GlassmorphicCard className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/20">
                            A
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Admin Console</h3>
                            <p className="text-xs text-gray-400">Super User Access</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative overflow-hidden group ${activeTab === item.id
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {activeTab === item.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                                )}
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </GlassmorphicCard>

                <GlassmorphicCard className="mt-auto p-4 bg-red-900/10 border-red-500/20">
                    <div className="flex items-start gap-3">
                        <ShieldAlert size={20} className="text-red-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-red-200">System Alert</p>
                            <p className="text-[10px] text-red-300/70 mt-1">High database load detected in Hyderabad region.</p>
                        </div>
                    </div>
                </GlassmorphicCard>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-6 z-10 w-full max-w-[1600px] mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-white">
                            {activeTab === 'overview' && 'System Overview'}
                            {activeTab === 'users' && 'User Management'}
                            {activeTab === 'lakes' && 'Lake Database'}
                            {activeTab === 'reports' && 'Analytics & Reports'}
                            {activeTab === 'settings' && 'System Configuration'}
                        </h1>
                        <p className="text-sm text-gray-400">Last login: Today, 10:42 AM</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Global Search..."
                                className="bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-red-400 outline-none w-64"
                            />
                            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-white">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <SystemMetrics />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
                                    <OfficerApprovalQueue />
                                    <GlassmorphicCard className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-4">Real-time Activity Log</h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="flex gap-3 text-sm py-2 border-b border-white/5 last:border-0">
                                                    <span className="text-gray-500 font-mono text-xs w-16">10:{40 - i} AM</span>
                                                    <div>
                                                        <p className="text-gray-300">New complaint registered in <span className="text-cyan-400">Hyderabad</span></p>
                                                        <p className="text-xs text-gray-500">ID: #124{i} • User: Anonymous</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </GlassmorphicCard>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && <UserManagement />}
                        {activeTab === 'lakes' && <LakeDatabaseManagement />}
                        {activeTab === 'analytics' && <AdminAnalytics />}
                        {activeTab === 'reports' && <ReportPanel />}
                        {activeTab === 'settings' && <SystemSettings />}

                        {activeTab !== 'overview' && activeTab !== 'users' && activeTab !== 'lakes' && activeTab !== 'analytics' && activeTab !== 'reports' && activeTab !== 'settings' && (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <MockModule title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
