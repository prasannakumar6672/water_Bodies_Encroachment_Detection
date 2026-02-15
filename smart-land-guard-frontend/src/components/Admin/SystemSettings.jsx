import React, { useState } from 'react';
import GlassmorphicCard from '../common/GlassmorphicCard';
import { ToggleLeft, ToggleRight, Save, Bell, AlertTriangle, RefreshCw } from 'lucide-react';
import AnimatedButton from '../common/AnimatedButton';

const Toggle = ({ c, active, onClick }) => (
    <button onClick={onClick} className={`transition-colors ${active ? 'text-green-400' : 'text-gray-600'}`}>
        {active ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
    </button>
);

export default function SystemSettings() {
    const [settings, setSettings] = useState({
        smsAlerts: true,
        emailAlerts: true,
        weeklyReports: false,
        autoAssign: true,
        dataRefreshRate: '5'
    });

    const toggle = (key) => setSettings(p => ({ ...p, [key]: !p[key] }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassmorphicCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-red-400" /> Alert Thresholds
                </h3>
                <div className="space-y-4">
                    {['Critical (>30% change)', 'High (15-30% change)', 'Medium (5-15% change)'].map((label, i) => (
                        <div key={i} className="flex justify-between items-center group">
                            <span className="text-gray-300 text-sm">{label}</span>
                            <input
                                type="range"
                                className="w-1/2 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-400 [&::-webkit-slider-thumb]:rounded-full"
                                defaultValue={80 - i * 20}
                            />
                        </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-4 italic">Adjusting sliders will affect global alert generation sensitivity.</p>
                </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-amber-400" /> Auto-Alert Settings
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-sm text-gray-300">Send SMS to Officers</span>
                        <Toggle active={settings.smsAlerts} onClick={() => toggle('smsAlerts')} />
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-sm text-gray-300">Send Email Notifications</span>
                        <Toggle active={settings.emailAlerts} onClick={() => toggle('emailAlerts')} />
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-sm text-gray-300">Generate Weekly Reports</span>
                        <Toggle active={settings.weeklyReports} onClick={() => toggle('weeklyReports')} />
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span className="text-sm text-gray-300">Auto-assign Region Officer</span>
                        <Toggle active={settings.autoAssign} onClick={() => toggle('autoAssign')} />
                    </div>
                </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="p-6 md:col-span-2">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <RefreshCw size={20} className="text-blue-400" /> Data Maintenance
                </h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 w-full">
                        <label className="text-xs text-gray-400 mb-2 block">Satellite Data Refresh Interval (Days)</label>
                        <select
                            value={settings.dataRefreshRate}
                            onChange={(e) => setSettings(p => ({ ...p, dataRefreshRate: e.target.value }))}
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white outline-none"
                        >
                            <option value="1">Daily</option>
                            <option value="3">Every 3 Days</option>
                            <option value="5">Every 5 Days</option>
                            <option value="7">Weekly</option>
                        </select>
                    </div>
                    <AnimatedButton variant="primary" className="px-6 py-2 flex items-center gap-2">
                        <Save size={16} /> Save Configuration
                    </AnimatedButton>
                </div>
            </GlassmorphicCard>
        </div>
    );
}
