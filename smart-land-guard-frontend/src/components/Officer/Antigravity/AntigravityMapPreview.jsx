import React from 'react';
import { motion } from 'framer-motion';
import { Map, ExternalLink } from 'lucide-react';

const MapPin = ({ x, y, size, color, name, status }) => (
    <motion.div
        className="absolute group"
        style={{ top: y, left: x }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [0, -10, 0] }}
        transition={{
            scale: { duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
    >
        {/* Pulse Ring */}
        <div className="absolute -inset-4 rounded-full border border-current opacity-30 animate-ping" style={{ color }} />

        {/* Main Pin */}
        <div
            className="rounded-full shadow-lg relative z-10 cursor-pointer hover:scale-125 transition-transform duration-300"
            style={{
                width: size,
                height: size,
                background: color,
                boxShadow: `0 0 15px ${color}`
            }}
        />

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-32 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform translate-y-2 group-hover:translate-y-0 duration-200 z-20">
            <h5 className="text-[10px] font-bold text-white">{name}</h5>
            <p className="text-[10px] text-gray-400">{status}</p>
        </div>
    </motion.div>
);

export default function AntigravityMapPreview() {
    return (
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(1.5)'
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0A0E1A]" />

            {/* Pins */}
            <MapPin x="20%" y="40%" size={16} color="#EF4444" name="Saroornagar" status="Critical (-12%)" />
            <MapPin x="50%" y="30%" size={12} color="#F97316" name="Hussain Sagar" status="High Alert" />
            <MapPin x="70%" y="60%" size={12} color="#FFB627" name="Kapra Lake" status="Monitoring" />
            <MapPin x="35%" y="70%" size={16} color="#EF4444" name="Durgam Cheruvu" status="Encroachment" />
            <MapPin x="80%" y="25%" size={8} color="#10B981" name="Osman Sagar" status="Stable" />

            {/* Open Map Button */}
            <button className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform group-hover:shadow-orange-500/20">
                <Map size={14} /> Open Full Map
            </button>
        </div>
    );
}
