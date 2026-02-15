import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FilePlus, Search, FileText, Camera } from 'lucide-react';

export default function FloatingActionButton() {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        { icon: FilePlus, label: 'New Complaint', color: '#EF4444', angle: 0 },
        { icon: Camera, label: 'Add Observation', color: '#F97316', angle: -45 },
        { icon: FileText, label: 'Report', color: '#00D9FF', angle: -90 },
        { icon: Search, label: 'Quick Search', color: '#10B981', angle: -135 },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />

                        {/* Radial Menu Items */}
                        {actions.map((action, index) => {
                            const radius = 100; // Distance from center
                            const rad = (action.angle * Math.PI) / 180;
                            const x = Math.cos(rad) * radius;
                            const y = Math.sin(rad) * radius;

                            return (
                                <motion.button
                                    key={index}
                                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                    animate={{ x, y, scale: 1, opacity: 1 }}
                                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                    transition={{ delay: index * 0.05, type: 'spring' }}
                                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-50 group"
                                    style={{ background: action.color }}
                                >
                                    <action.icon size={20} />
                                    {/* Tooltip */}
                                    <span className="absolute right-full mr-3 bg-white/10 backdrop-blur px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        {action.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{
                    scale: [1, 1.05, 1],
                    rotate: isOpen ? 45 : 0
                }}
                transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { type: 'spring' }
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-50 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-pointer"
            >
                <Plus size={32} />
            </motion.button>
        </div>
    );
}
