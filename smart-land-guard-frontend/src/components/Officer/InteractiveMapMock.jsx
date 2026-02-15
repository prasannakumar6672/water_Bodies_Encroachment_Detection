import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Layers, Ruler, PenTool, ZoomIn, ZoomOut, Filter, Info, Navigation, Maximize } from 'lucide-react';

const MapMarker = ({ x, y, type, status, name, onClick }) => (
    <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.2, zIndex: 50 }}
        onClick={onClick}
        className="absolute group"
        style={{ left: `${x}%`, top: `${y}%` }}
    >
        <div className={`
            w-6 h-6 rounded-full border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2
            ${status === 'critical' ? 'bg-red-500 border-white animate-pulse' :
                status === 'warning' ? 'bg-orange-500 border-white' : 'bg-green-500 border-white'}
        `}>
            <div className="w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap z-50">
            <div className="bg-slate-900 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white shadow-xl flex flex-col items-center">
                <span className="font-bold">{name}</span>
                <span className={`text-[10px] uppercase ${status === 'critical' ? 'text-red-400' : 'text-green-400'
                    }`}>{status}</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
            </div>
        </div>
    </motion.button>
);

export default function InteractiveMapMock() {
    const [activeTool, setActiveTool] = useState(null);
    const [selectedLayer, setSelectedLayer] = useState('Satellite');

    const tools = [
        { id: 'measure', icon: Ruler, label: 'Measure' },
        { id: 'draw', icon: PenTool, label: 'Draw' },
        { id: 'layers', icon: Layers, label: 'Layers' },
        { id: 'filter', icon: Filter, label: 'Filter' },
    ];

    return (
        <div className="relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-[#020617] group">
            {/* Map Background (Styled Pattern) */}
            <div className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px), radial-gradient(#1e293b 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px',
                    backgroundColor: '#0f172a'
                }}
            />

            {/* Simulated Geographic Shapes/Water Bodies */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M20,30 Q30,10 50,30 T80,30" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                <path d="M10,80 Q40,60 70,80 T90,50" fill="none" stroke="#0ea5e9" strokeWidth="0.5" />
                {/* Simulated Lake Shapes */}
                <path d="M45,45 C40,40 35,50 40,55 C45,60 55,55 50,45" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="0.5" />
                <path d="M70,20 C65,15 60,25 65,30 C70,35 80,30 75,20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="0.5" />
            </svg>

            {/* Markers */}
            <MapMarker x={43} y={50} status="warning" name="Hussain Sagar" />
            <MapMarker x={72} y={25} status="critical" name="Kapra Lake" />
            <MapMarker x={25} y={65} status="safe" name="Durgam Cheruvu" />
            <MapMarker x={60} y={70} status="critical" name="Saroornagar Lake" />
            <MapMarker x={85} y={45} status="safe" name="Osman Sagar" />

            {/* UI Controls - Top Left */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="bg-slate-900/90 backdrop-blur-md border border-white/20 rounded-lg p-2 shadow-xl">
                    <div className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider px-1">Map View</div>
                    {['Satellite', 'Terrain', 'Street'].map(layer => (
                        <button
                            key={layer}
                            onClick={() => setSelectedLayer(layer)}
                            className={`block w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${selectedLayer === layer ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-white/5'
                                }`}
                        >
                            {layer}
                        </button>
                    ))}
                </div>
            </div>

            {/* UI Controls - Top Right (Tools) */}
            <div className="absolute top-4 right-4 flex gap-2">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                        className={`p-3 rounded-lg backdrop-blur-md border transition-all shadow-lg ${activeTool === tool.id
                                ? 'bg-cyan-500 text-black border-cyan-400'
                                : 'bg-slate-900/80 border-white/20 text-white hover:bg-slate-800'
                            }`}
                        title={tool.label}
                    >
                        <tool.icon size={20} />
                    </button>
                ))}
            </div>

            {/* UI Controls - Bottom Right (Zoom) */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <div className="bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-lg flex flex-col shadow-xl overflow-hidden">
                    <button className="p-3 hover:bg-white/10 text-white border-b border-white/10"><ZoomIn size={20} /></button>
                    <button className="p-3 hover:bg-white/10 text-white"><ZoomOut size={20} /></button>
                </div>
                <button className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/10 shadow-xl">
                    <Navigation size={20} />
                </button>
            </div>

            {/* UI Controls - Bottom Left (Scale/Coords) */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono shadow-xl">
                17° 22' 31" N, 78° 28' 27" E | Zoom: 14z
            </div>

            {/* Action Tooltip (Simulated) */}
            {activeTool === 'measure' && (
                <div className="absolute top-20 right-4 bg-slate-900/90 backdrop-blur border border-white/20 rounded-lg p-3 w-48 shadow-2xl animate-in slide-in-from-right-5">
                    <p className="text-xs text-secondary mb-2">Click points to measure distance</p>
                    <div className="flex items-center justify-between text-sm font-bold text-white bg-white/5 rounded px-2 py-1">
                        <span>Total:</span>
                        <span>0.00 km</span>
                    </div>
                </div>
            )}
        </div>
    );
}
