import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import GlassmorphicCard from '../../components/common/GlassmorphicCard';
import AnimatedButton from '../../components/common/AnimatedButton';
import { User, Shield, Building2, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function Auth() {
    const { login } = useAuth();
    const navigate = useNavigate();

    // State
    const [selectedRole, setSelectedRole] = useState('public'); // 'public' | 'officer' | 'admin'
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const userData = {
                name: email.split('@')[0],
                email: email,
                role: selectedRole
            };
            login(userData);
            setIsLoading(false);

            // Role-based Redirection
            if (selectedRole === 'public') navigate('/dashboard');
            else if (selectedRole === 'officer') navigate('/officer-dashboard');
            else if (selectedRole === 'admin') navigate('/admin-dashboard');
        }, 1500);
    };

    const roles = [
        { id: 'public', label: 'Public User', icon: User, color: 'cyan' },
        { id: 'officer', label: 'Govt Officer', icon: Building2, color: 'amber' },
        { id: 'admin', label: 'System Admin', icon: Shield, color: 'red' }
    ];

    return (
        <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access your dashboard</p>
                </div>

                <GlassmorphicCard className="p-8 border-t-4 border-t-cyan-500 relative overflow-hidden">
                    {/* Role Tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-900/50 p-1 rounded-xl">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className={`relative flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-all ${selectedRole === role.id
                                    ? 'text-white shadow-lg'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                {selectedRole === role.id && (
                                    <motion.div
                                        layoutId="role-tab"
                                        className={`absolute inset-0 rounded-lg ${role.color === 'cyan' ? 'bg-cyan-500' :
                                            role.color === 'amber' ? 'bg-amber-500' :
                                                'bg-red-600'
                                            }`}
                                    />
                                )}
                                <span className="relative z-10 flex flex-col items-center gap-1">
                                    <role.icon size={16} />
                                    {role.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Warnings */}
                        <AnimatePresence mode="wait">
                            {selectedRole !== 'public' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`text-xs p-3 rounded-lg border flex items-start gap-2 ${selectedRole === 'officer'
                                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-200'
                                        : 'bg-red-500/10 border-red-500/20 text-red-200'
                                        }`}
                                >
                                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                    <p>
                                        {selectedRole === 'officer'
                                            ? 'Access restricted to authorized government personnel only.'
                                            : 'Restricted area. All activities are monitored and logged.'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                {selectedRole === 'public' ? 'Email Address' : 'Official Email ID'}
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 outline-none transition-all placeholder:text-gray-600"
                                    placeholder={selectedRole === 'public' ? "name@example.com" : selectedRole === 'admin' ? "admin@sys.hov" : "officer@govt.in"}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-cyan-400 outline-none transition-all placeholder:text-gray-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                                Forgot Password?
                            </button>
                        </div>

                        <AnimatedButton
                            variant="primary"
                            className={`w-full py-4 font-bold tracking-wide flex items-center justify-center gap-2 ${selectedRole === 'admin' ? '!bg-red-600 hover:!bg-red-500' : ''
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Authenticating...' : (
                                <>
                                    Sign In <ArrowRight size={16} />
                                </>
                            )}
                        </AnimatedButton>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-white/5">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <button
                                onClick={() => alert("Registration flow would open here")}
                                className="text-cyan-400 hover:text-white font-bold transition-colors"
                            >
                                Register Now
                            </button>
                        </p>
                    </div>
                </GlassmorphicCard>
            </motion.div>
        </div>
    );
}
