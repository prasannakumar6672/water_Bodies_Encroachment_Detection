import React, { useState } from 'react';
import GlassmorphicCard from '../common/GlassmorphicCard';
import AnimatedButton from '../common/AnimatedButton';
import { FileText, Download, Filter, Calendar } from 'lucide-react';

export default function ReportPanel() {
    const [reportType, setReportType] = useState('Executive Summary');
    const [scope, setScope] = useState('All Lakes');
    const [format, setFormat] = useState('PDF');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate generation
        setTimeout(() => {
            setIsGenerating(false);
            alert(`Report Generated: ${reportType} (${scope}) in ${format} format.`);
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col justify-center items-center p-6">
            <GlassmorphicCard className="max-w-2xl w-full p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <FileText size={120} className="text-white/5 rotate-12" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">Generate Official Reports</h2>
                    <p className="text-text-secondary mb-8">Select parameters to generate comprehensive data reports for your district.</p>

                    <div className="space-y-6">
                        {/* Scope Selection */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Report Scope</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['All Lakes', 'Specific Lake', 'Mandal-wise', 'Time Period'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setScope(opt)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${scope === opt
                                            ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Report Type */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Report Type</label>
                            <div className="space-y-2">
                                {[
                                    'Executive Summary',
                                    'Detailed Encroachment Analysis',
                                    'Water Quality Report',
                                    'Action Taken Report (ATR)'
                                ].map(type => (
                                    <label key={type} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-400/30 transition-colors">
                                        <input
                                            type="radio"
                                            name="reportType"
                                            checked={reportType === type}
                                            onChange={() => setReportType(type)}
                                            className="text-cyan-400 bg-slate-900 border-white/20 focus:ring-cyan-400"
                                        />
                                        <span className="text-sm text-white">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Format Selection */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Export Format</label>
                            <div className="flex gap-4">
                                {['PDF', 'Excel', 'PowerPoint'].map(fmt => (
                                    <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="format"
                                            checked={format === fmt}
                                            onChange={() => setFormat(fmt)}
                                            className="text-cyan-400 bg-slate-900 border-white/20 focus:ring-cyan-400"
                                        />
                                        <span className="text-sm text-gray-300">{fmt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="pt-4 border-t border-white/10">
                            <AnimatedButton
                                variant="primary"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full py-4 flex items-center justify-center gap-2 text-sm font-bold tracking-wide"
                            >
                                {isGenerating ? (
                                    <span className="animate-pulse">Generating Report...</span>
                                ) : (
                                    <>
                                        <Download size={18} /> Generate Report
                                    </>
                                )}
                            </AnimatedButton>
                        </div>
                    </div>
                </div>
            </GlassmorphicCard>
        </div>
    );
}
