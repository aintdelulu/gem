import React, { useState, useEffect, useRef } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import bgMusic from '../assets/Happy w u.mp3';

const ScrollMessage = ({ onRestart }) => {
  const [displayText, setDisplayText] = useState('');
  const message = "I’ve been meaning to say this, but today feels like a good time. Thank you for being real with me for being, consistently, quietly, and without expectations.\n\nI appreciate the way you support without pressure, listen without judgment, and show up in ways that feel sincere. Your intentions are always clear, and that makes your presence easy and safe. I’m really grateful to have you as a friend, and I don’t take that lightly.\n\nWishing you a Valentine’s Day filled with warmth, peace, and the kind of love that feels calm, steady, and true. You deserve that and more.";

  const containerRef = useRef(null);
  const parchmentRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Audio initialization
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Play with error handling (browsers often require interaction, which we have from the Blossom button)
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log("Audio playback delayed or blocked", err);
      }
    };

    playAudio();

    // Entrance animation
    gsap.fromTo(parchmentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(message.slice(0, i));
      i++;

      // Auto-scroll to bottom of parchment
      if (parchmentRef.current) {
        parchmentRef.current.scrollTop = parchmentRef.current.scrollHeight;
      }

      if (i > message.length) clearInterval(interval);
    }, 40);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const saveAsPDF = async () => {
    const element = parchmentRef.current;

    // For PDF, we temporarily override styles to capture full content
    const originalHeight = element.style.height;
    const originalOverflow = element.style.overflowY;
    const originalPadding = element.style.padding;

    element.style.height = 'auto';
    element.style.overflowY = 'visible';
    element.style.padding = '40px'; // Consistent padding for PDF

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#0A1412',
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, 290));
      pdf.save('the-secret-bloom.pdf');
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      // Restore original styles
      element.style.height = originalHeight;
      element.style.overflowY = originalOverflow;
      element.style.padding = originalPadding;
    }
  };

  return (
    <div className="message-viewport" ref={containerRef}>
      <div className="parchment" ref={parchmentRef}>
        <div className="typewriter-text">
          {displayText.split('\n').map((line, i) => (
            <p key={i}>{line || '\u00A0'}</p>
          ))}
          <span className="cursor" />
        </div>
      </div>

      <div className="controls">
        <button className="control-btn" onClick={saveAsPDF}>
          <Download size={20} /> Save as PDF
        </button>
        <button className="control-btn" onClick={onRestart}>
          <RefreshCw size={20} /> Restart
        </button>
      </div>
    </div>
  );
};

export default ScrollMessage;
