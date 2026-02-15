import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from '../common/AnimatedButton';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    const handleNavScroll = (sectionId) => {
        // If not on home page, navigate to home first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Already on home page, just scroll
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleHome = () => {
        // If not on home page, navigate to home first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll to top
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        } else {
            // Already on home page, just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex items-center justify-between">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
            >
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                        S
                    </div>
                    <span className="text-2xl font-display font-semibold tracking-tight hidden sm:block text-white">
                        SMART LAND <span className="text-cyan-400 font-semibold">GUARD</span>
                    </span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphic hidden md:flex items-center gap-8 px-8 py-2 border border-white/10 rounded-full dark:bg-white/5 bg-slate-100/50"
            >
                <button onClick={handleHome} className="text-sm font-medium hover:text-cyan-400 transition-colors">Home</button>
                <button onClick={() => handleNavScroll('impact')} className="text-sm font-medium hover:text-cyan-400 transition-colors">Impact</button>
                <button onClick={() => handleNavScroll('features')} className="text-sm font-medium hover:text-cyan-400 transition-colors">Features</button>
                <Link to="/about" className="text-sm font-medium hover:text-cyan-400 transition-colors">About</Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
            >
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors dark:text-text-secondary text-slate-600"
                    aria-label="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Auth Actions */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 p-1 pl-3 pr-2 rounded-full border border-white/10 hover:border-cyan-400/50 transition-all dark:bg-white/5 bg-slate-200/50 text-sm"
                        >
                            <span className="font-medium hidden md:block">{user.name}</span>
                            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                                <User size={16} />
                            </div>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/20 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl"
                                >
                                    <Link
                                        to="/dashboard"
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                    >
                                        <User size={16} className="text-cyan-400" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* MARK: Launch Platform removed here, replaced by Sign In / Get Started */
                    <Link to="/auth">
                        <AnimatedButton variant="primary" className="px-6 py-2 text-sm">
                            Sign In / Get Started
                        </AnimatedButton>
                    </Link>
                )}
            </motion.div>
        </nav >
    );
}
