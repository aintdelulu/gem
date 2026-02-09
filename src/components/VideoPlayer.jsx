import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import bloomVideo from '../assets/bloom-video.mp4';

const VideoPlayer = ({ onEnded }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(containerRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const handleEnded = () => {
    // Exit animation before calling onEnded
    gsap.to(containerRef.current, {
      scale: 0.9,
      opacity: 0.5,
      filter: "grayscale(100%)",
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: onEnded
    });
  };

  return (
    <div className="video-viewport" ref={containerRef}>
      <div className="video-glass-frame">
        <video
          ref={videoRef}
          className="main-video"
          src={bloomVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
        />

        <button className="unmute-icon" onClick={toggleMute}>
          {muted ? <VolumeX size={24} color="#D4AF37" /> : <Volume2 size={24} color="#D4AF37" />}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
