import React from 'react';
import AntigravityHero from '../components/Antigravity/AntigravityHero';
import MagneticCursor from '../components/Antigravity/MagneticCursor';

export default function AntigravityDemo() {
    return (
        <div className="relative">
            <MagneticCursor />
            <AntigravityHero />
        </div>
    );
}
