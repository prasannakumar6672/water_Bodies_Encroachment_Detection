import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import StatsGrid from '../../components/Officer/StatsGrid';
import AlertCard from '../../components/Officer/AlertCard';
import ComplaintManagement from '../../components/Officer/ComplaintManagement';
import InteractiveMapMock from '../../components/Officer/InteractiveMapMock';
import FieldVerificationQueue from '../../components/Officer/FieldVerificationQueue';
import OfficialLakeDetails from '../../components/Officer/OfficialLakeDetails';
import ReportPanel from '../../components/Officer/ReportPanel';
import { Map, Calendar, FileText, BarChart3, Settings, LogOut, Bell, Search, ArrowRight, PieChart } from 'lucide-react';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';

// Placeholder for future components
const MockComponent = ({ title }) => (
    <div className="h-64 flex items-center justify-center border border-dashed border-white/20 rounded-xl bg-white/5">
        <p className="text-gray-400">{title} (Coming Soon)</p>
    </div>
);

export default function OfficerDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const sidebarItems = [
        { id: 'overview', icon: BarChart3, label: 'Overview' },
        { id: 'map', icon: Map, label: 'Map View' },
        { id: 'complaints', icon: FileText, label: 'Complaints' },
        { id: 'verification', icon: Calendar, label: 'Field Verification' },
        { id: 'reports', icon: PieChart, label: 'Reports' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-bg-darker flex pt-20 pb-6 px-6 gap-6">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden md:flex flex-col gap-4">
                {/* Officer Profile Card */}
                <GlassmorphicCard className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-700 border-2 border-amber-400/50 flex items-center justify-center text-2xl font-bold text-amber-400 mb-3">
                        {user?.name?.charAt(0) || 'O'}
                    </div>
                    <h3 className="text-white font-bold truncate">{user?.name || 'Officer'}</h3>
                    <p className="text-xs text-gray-400 mt-1">District Officer</p>
                    <p className="text-xs text-amber-400 mt-1">Hyderabad District</p>
                </GlassmorphicCard>

                {/* Navigation */}
                <GlassmorphicCard className="flex-1 p-4">
                    <nav className="space-y-2">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === item.id
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </GlassmorphicCard>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* Header */}
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-white">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'map' && 'Interactive Map'}
                            {activeTab === 'complaints' && 'Complaint Management'}
                            {activeTab === 'verification' && 'Verification Queue'}
                        </h1>
                        <p className="text-sm text-gray-400">Welcome back, Mr. Rajesh Kumar</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search survey no, lake..."
                                className="bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-amber-400 outline-none w-64"
                            />
                            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-white">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                    {/* Top Row: Stats & Alerts */}
                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-1">
                                    <AlertCard />
                                </div>
                                <div className="lg:col-span-2">
                                    <StatsGrid />
                                    <div className="mt-6 flex-1 bg-transparent">
                                        {/* Placeholder for Quick Actions or Recent Activity */}
                                        <GlassmorphicCard className="p-6">
                                            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                                            <div className="flex gap-4">
                                                <button className="flex-1 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 py-3 rounded-lg text-amber-400 text-sm font-bold transition-colors">
                                                    Generate Summary Report
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('details')}
                                                    className="flex-1 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 py-3 rounded-lg text-blue-400 text-sm font-bold transition-colors"
                                                >
                                                    View Lake Detail (Mock)
                                                </button>
                                            </div>
                                        </GlassmorphicCard>
                                    </div>
                                </div>
                            </div>

                            {/* Map Section (Condensed) */}
                            <GlassmorphicCard className="p-1 h-80 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                                    <div className="text-center">
                                        <Map size={40} className="mx-auto text-gray-600 mb-2" />
                                        <p className="text-gray-500">Interactive Map Preview</p>
                                    </div>
                                    <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                                        <InteractiveMapMock />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <button
                                        onClick={() => setActiveTab('map')}
                                        className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:scale-105 transition-transform"
                                    >
                                        Open Full Map
                                    </button>
                                </div>
                            </GlassmorphicCard>
                        </>
                    )}

                    {/* Map Tab */}
                    {activeTab === 'map' && (
                        <div className="h-full min-h-[600px]">
                            <InteractiveMapMock />
                        </div>
                    )}

                    {/* Complaints Tab */}
                    {activeTab === 'complaints' && (
                        <ComplaintManagement />
                    )}

                    {/* Verification Tab */}
                    {activeTab === 'verification' && (
                        <FieldVerificationQueue />
                    )}

                    {/* Lake Details (Official View) */}
                    {activeTab === 'details' && (
                        <OfficialLakeDetails onClose={() => setActiveTab('overview')} />
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <ReportPanel />
                    )}

                    {/* Pending Tabs */}
                    {activeTab !== 'overview' && activeTab !== 'map' && activeTab !== 'complaints' && activeTab !== 'verification' && activeTab !== 'details' && activeTab !== 'reports' && (
                        <MockComponent title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module`} />
                    )}
                </div>
            </main>
        </div>
    );
}
