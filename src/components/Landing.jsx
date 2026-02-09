import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Landing = ({ onStart }) => {
  const budRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Pulse animation for the button
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px 5px var(--gold-glow)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });

    // Subtle breathing for the bud
    gsap.to(budRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="landing-screen">
      <div className="bud-container" ref={budRef}>
        <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10C30 10 10 50 10 90C10 130 30 170 60 170C90 170 110 130 110 90C110 50 90 10 60 10Z" fill="#2D4F3E" />
          <path d="M60 20C40 20 25 50 25 90C25 130 40 160 60 160C80 160 95 130 95 90C95 50 80 20 60 20Z" fill="#1B2624" opacity="0.6" />
        </svg>
      </div>

      <div className="prompt-text">A bloom for you.</div>

      <button
        ref={buttonRef}
        className="blossom-button"
        onClick={onStart}
      >
        Let it Blossom
      </button>
    </div>
  );
};

export default Landing;
