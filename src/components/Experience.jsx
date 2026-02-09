import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Landing from './Landing';
import GardenBackground from './GardenBackground';
import VideoPlayer from './VideoPlayer';
import ScrollMessage from './ScrollMessage';

const Experience = () => {
    const [stage, setStage] = useState('landing'); // landing, blooming, video, message
    const [showInk, setShowInk] = useState(false);
    const containerRef = useRef(null);

    const startBloom = () => {
        setShowInk(true);

        // Ink bleed timing
        setTimeout(() => {
            setStage('blooming');
            // Hide ink bleed after transition
            setTimeout(() => setShowInk(false), 1500);
        }, 800);
    };

    const onBloomComplete = () => {
        setStage('video');
    };

    const onVideoEnd = () => {
        setStage('message');
    };

    const handleRestart = () => {
        setStage('landing');
    };

    return (
        <div ref={containerRef} className="experience-wrapper" style={{ width: '100%', height: '100%' }}>
            {/* Ink Bleed Overlay */}
            {showInk && <div className="ink-bleed-overlay" />}

            {stage === 'landing' && <Landing onStart={startBloom} />}

            {(stage === 'blooming' || stage === 'video' || stage === 'message') && (
                <GardenBackground stage={stage} onBloomComplete={onBloomComplete} />
            )}

            {stage === 'video' && (
                <VideoPlayer onEnded={onVideoEnd} />
            )}

            {stage === 'message' && (
                <ScrollMessage onRestart={handleRestart} />
            )}
        </div>
    );
};

export default Experience;
