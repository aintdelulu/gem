import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GardenBackground = ({ stage, onBloomComplete }) => {
    const flowerRef = useRef(null);
    const vinesRef = useRef(null);
    const dustRef = useRef(null);

    useEffect(() => {
        if (stage === 'blooming') {
            const tl = gsap.timeline({
                onComplete: onBloomComplete
            });

            // Flower Bloom Animation
            tl.to(".flower-petal", {
                scale: 1,
                opacity: 1,
                rotation: (i) => i * 45,
                stagger: 0.1,
                duration: 1.5,
                ease: "back.out(1.7)"
            });

            // Vine Growth
            tl.to(".vine-path", {
                strokeDashoffset: 0,
                duration: 2,
                stagger: 0.2,
                ease: "power2.inOut"
            }, "-=1");

            // Gold Dust Fade In
            tl.to(".dust-particle", {
                opacity: 0.6,
                duration: 1,
                stagger: 0.05
            }, "-=1.5");
        }
    }, [stage]);

    // Parallax Effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to(".parallax-element", {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power1.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="garden-bg">
            {/* VINES (Corner elements) */}
            <div className="vines-container" ref={vinesRef}>
                {[...Array(4)].map((_, i) => (
                    <svg key={i} className={`vine vine-${i} parallax-element`} viewBox="0 0 200 200">
                        <path
                            className="vine-path"
                            d="M0,200 Q50,150 20,100 T80,50"
                            stroke="#2D4F3E"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="400"
                            strokeDashoffset="400"
                        />
                    </svg>
                ))}
            </div>

            {/* GOLD DUST */}
            <div className="dust-container" ref={dustRef}>
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="dust-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4}px`,
                            height: `${Math.random() * 4}px`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* THE FLOWER */}
            <div className="flower-center" ref={flowerRef}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                    {[...Array(8)].map((_, i) => (
                        <path
                            key={i}
                            className="flower-petal"
                            d="M100 100 Q100 50 130 50 T100 100"
                            fill="url(#petalGradient)"
                            opacity="0"
                            style={{ transformOrigin: '100px 100px', transform: 'scale(0)' }}
                        />
                    ))}
                    <defs>
                        <radialGradient id="petalGradient">
                            <stop offset="0%" stopColor="#A3B18A" />
                            <stop offset="100%" stopColor="#1B2624" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <style jsx>{`
        .garden-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .vines-container {
          position: absolute;
          inset: 0;
        }
        .vine {
          position: absolute;
          width: 300px;
          height: 300px;
        }
        .vine-0 { top: -50px; left: -50px; transform: rotate(0deg); }
        .vine-1 { top: -50px; right: -50px; transform: rotate(90deg); }
        .vine-2 { bottom: -50px; right: -50px; transform: rotate(180deg); }
        .vine-3 { bottom: -50px; left: -50px; transform: rotate(270deg); }
        
        .dust-particle {
          position: absolute;
          background: var(--rose-gold);
          border-radius: 50%;
          opacity: 0;
          filter: blur(1px);
          animation: float 10s infinite ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        .flower-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
        </div>
    );
};

export default GardenBackground;
