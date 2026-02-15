import React from 'react';
import ReactCompareImage from 'react-compare-image';

export default function ComparisonSlider({ before, after, labels }) {
    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden glassmorphic border border-white/10">
            <div className="absolute top-4 left-4 z-10 glassmorphic-dark px-3 py-1 text-[10px] font-mono text-white border border-white/10 rounded">
                {labels?.before || '2010'}
            </div>
            <div className="absolute top-4 right-4 z-10 glassmorphic-dark px-3 py-1 text-[10px] font-mono text-cyan-400 border border-cyan-500/20 rounded">
                {labels?.after || '2024'}
            </div>

            <ReactCompareImage
                leftImage={before || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000'}
                rightImage={after || 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1000'}
                sliderLineColor="#00D9FF"
                sliderLineWidth={2}
                handleSize={40}
                hover={true}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white opacity-50 shrink-0"></div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Slide to compare change</span>
                <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></div>
            </div>
        </div>
    );
}
