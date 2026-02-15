import React, { useState } from 'react';
import GlassmorphicCard from '../common/GlassmorphicCard';
import AnimatedButton from '../common/AnimatedButton';
import { Plus, Upload, Database, Satellite, MapPin, RefreshCw, CheckCircle } from 'lucide-react';

export default function LakeDatabaseManagement() {
    const [view, setView] = useState('list'); // 'list', 'add', 'import'

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex gap-4">
                <GlassmorphicCard
                    className={`flex-1 p-6 cursor-pointer hover:border-cyan-400/50 transition-colors ${view === 'add' ? 'border-cyan-400/50 bg-cyan-500/5' : ''}`}
                    onClick={() => setView('add')}
                >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                        <Plus size={24} />
                    </div>
                    <h3 className="font-bold text-white">Add New Lake</h3>
                    <p className="text-xs text-gray-400">Register new water body manually</p>
                </GlassmorphicCard>

                <GlassmorphicCard
                    className={`flex-1 p-6 cursor-pointer hover:border-amber-400/50 transition-colors ${view === 'import' ? 'border-amber-400/50 bg-amber-500/5' : ''}`}
                    onClick={() => setView('import')}
                >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                        <Satellite size={24} />
                    </div>
                    <h3 className="font-bold text-white">Import Satellite Data</h3>
                    <p className="text-xs text-gray-400">Process Sentinel/Landsat imagery</p>
                </GlassmorphicCard>

                <GlassmorphicCard
                    className="flex-1 p-6 cursor-pointer hover:border-blue-400/50 transition-colors"
                >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                        <Upload size={24} />
                    </div>
                    <h3 className="font-bold text-white">Bulk Upload</h3>
                    <p className="text-xs text-gray-400">Import via CSV/GeoJSON</p>
                </GlassmorphicCard>
            </div>

            <GlassmorphicCard className="flex-1 p-6">
                {view === 'add' && (
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-2">Add New Lake Entry</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400">Lake Name</label>
                                <input className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-cyan-400 outline-none" placeholder="e.g. Durgam Cheruvu" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400">Original Area (Hectares)</label>
                                <input type="number" className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-cyan-400 outline-none" placeholder="10.5" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400">District</label>
                                <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-cyan-400 outline-none">
                                    <option>Hyderabad</option>
                                    <option>Rangareddy</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400">Mandal</label>
                                <select className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-cyan-400 outline-none">
                                    <option>Serilingampally</option>
                                    <option>Shaikpet</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400">Geo-Coordinates (Center)</label>
                            <div className="flex gap-2">
                                <input className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-cyan-400 outline-none" placeholder="Latitude" />
                                <input className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-cyan-400 outline-none" placeholder="Longitude" />
                                <button className="p-2 bg-slate-800 border border-white/10 rounded-lg text-cyan-400 hover:text-white" title="Pick on Map">
                                    <MapPin size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button onClick={() => setView('list')} className="px-6 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <AnimatedButton variant="primary" className="px-8 py-2 font-bold">Save Lake</AnimatedButton>
                        </div>
                    </div>
                )}

                {view === 'import' && (
                    <div className="max-w-2xl mx-auto space-y-6 text-center py-8">
                        <Satellite size={64} className="mx-auto text-amber-500 opacity-80" />
                        <h3 className="text-2xl font-bold text-white">Satellite Data Import</h3>
                        <p className="text-gray-400">Select source and date range to fetch latest imagery for analysis.</p>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 text-left max-w-lg mx-auto space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Source Satellite</label>
                                <select className="w-full bg-slate-800 rounded px-3 py-2 text-white outline-none border border-white/10">
                                    <option>Sentinel-2 (10m Resolution)</option>
                                    <option>Landsat 8 (30m Resolution)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Date Range</label>
                                <input type="date" className="w-full bg-slate-800 rounded px-3 py-2 text-white outline-none border border-white/10" />
                            </div>
                            <AnimatedButton variant="primary" className="w-full py-3 font-bold flex items-center justify-center gap-2">
                                <RefreshCw size={18} /> Start Processing Job
                            </AnimatedButton>
                        </div>
                    </div>
                )}

                {view === 'list' && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <Database size={48} className="mb-4 opacity-50" />
                        <p>Select an action from the top cards to manage lake data.</p>
                    </div>
                )}
            </GlassmorphicCard>
        </div>
    );
}
