'use client';

import { useRef, useState, useCallback } from 'react';

type Status = 'waiting' | 'playing' | 'done';

interface Props {
  onFinished: () => void;
}

export default function IntroVideo({ onFinished }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>('waiting');

  const handleClick = useCallback(() => {
    if (status !== 'waiting') return;
    const video = videoRef.current;
    if (!video) return;

    setStatus('playing');
    video.playbackRate = 1.25;
    video.play();
    document.body.style.overflow = 'hidden';
  }, [status]);

  const handleEnded = useCallback(() => {
    setStatus('done');
    document.body.style.overflow = '';
    // Pequeño delay para que el fade-out se complete antes de mostrar la invitación
    setTimeout(onFinished, 600);
  }, [onFinished]);

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0a0804',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: status === 'waiting' ? 'pointer' : 'default',
        zIndex: 50,
        opacity: status === 'done' ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/assets/video/envelopeVideo.mov"
        playsInline
        muted={false}
        preload="auto"
        onEnded={handleEnded}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay oscuro encima del video — desaparece al dar click */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(10, 8, 4, 0.55)',
          opacity: status === 'waiting' ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Botón / prompt — solo visible en estado waiting */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.2rem',
          opacity: status === 'waiting' ? 1 : 0,
          transform: status === 'waiting' ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Ícono de sobre / sello */}
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 2.4s ease-in-out infinite',
        }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A96E"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Texto */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(249,241,231,0.85)',
        }}>
          toca para abrir tu invitación
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1);    opacity: 0.7; }
          50%       { transform: scale(1.08); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
