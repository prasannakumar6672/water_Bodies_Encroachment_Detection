import React from 'react';

export default function LoadingAnimation() {
    return (
        <div className="flex items-center justify-center h-screen w-full bg-[#020617]"> {/* bg-darker */}
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-4 border-[#00D9FF] opacity-30 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-4 border-t-[#00D9FF] border-r-transparent border-b-[#00C9A7] border-l-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#00D9FF] text-xs font-mono animate-pulse">LOADING</span>
                </div>
            </div>
        </div>
    );
}
