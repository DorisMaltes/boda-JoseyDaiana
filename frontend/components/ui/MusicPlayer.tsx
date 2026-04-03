'use client';

import { useEffect, useRef, useState } from 'react';

/* Notas musicales que flotan hacia arriba */
const NOTES = ['♩', '♪', '♫', '♬'];

interface FloatingNote {
  id: number;
  note: string;
  x: number;       /* offset horizontal px */
  duration: number; /* animación ms */
}

let noteId = 0;

export default function MusicPlayer() {
  const audioRef  = useRef<HTMLAudioElement>(null);
  const [muted,   setMuted]   = useState(false);
  const [playing, setPlaying] = useState(false);
  const [notes,   setNotes]   = useState<FloatingNote[]>([]);

  /* ── Iniciar reproducción — intento autoplay, fallback en primer clic ── */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.loop   = true;

    const tryPlay = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {/* blocked by browser — se activa con primer toque */});
    };

    tryPlay();

    /* Si el autoplay fue bloqueado, arranca en el primer gesto del usuario */
    const onFirstGesture = () => {
      if (!playing) {
        audio.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      } 
      document.removeEventListener('touchstart', onFirstGesture);
      document.removeEventListener('click',      onFirstGesture);
    };

    document.addEventListener('touchstart', onFirstGesture, { once: true });
    document.addEventListener('click',      onFirstGesture, { once: true });

    return () => {
      document.removeEventListener('touchstart', onFirstGesture);
      document.removeEventListener('click',      onFirstGesture);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Emitir notas musicales mientras suena ── */
  useEffect(() => {
    if (!playing || muted) return;

    const interval = setInterval(() => {
      const newNote: FloatingNote = {
        id:       ++noteId,
        note:     NOTES[Math.floor(Math.random() * NOTES.length)],
        x:        Math.random() * 32 - 16, /* -16px a +16px */
        duration: 1400 + Math.random() * 600,
      };
      setNotes((prev) => [...prev, newNote]);

      /* Limpiar la nota después de su animación */
      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== newNote.id));
      }, newNote.duration + 100);
    }, 600);

    return () => clearInterval(interval);
  }, [playing, muted]);

  /* ── Toggle mute ── */
  function handleToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  }

  return (
    <>
      {/* Audio oculto — reemplaza /assets/music/cancion.mp3 con la canción real */}
      <audio ref={audioRef} src="/assets/music/music.mp3" preload="auto" />

      {/* ── Botón fijo inferior izquierdo ── */}
      <div className="fixed bottom-6 left-5 z-50 flex flex-col items-center">

        {/* Notas flotantes */}
        <div className="relative w-10 h-10 pointer-events-none">
          {notes.map((n) => (
            <span
              key={n.id}
              className="absolute bottom-full text-mostaza text-sm font-bold select-none"
              style={{
                left:      `calc(50% + ${n.x}px)`,
                transform: 'translateX(-50%)',
                animation: `floatNote ${n.duration}ms ease-out forwards`,
              }}
            >
              {n.note}
            </span>
          ))}
        </div>

        {/* Botón circular */}
        <button
          onClick={handleToggle}
          aria-label={muted ? 'Activar música' : 'Silenciar música'}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-opacity"
          style={{ backgroundColor: 'var(--azul)', opacity: muted ? 0.5 : 1 }}
        >
          {/* Icono de nota musical — gira cuando suena */}
          <span
            className="text-white text-lg leading-none select-none"
            style={{
              display:   'inline-block',
              animation: playing && !muted ? 'spinNote 3s linear infinite' : 'none',
            }}
          >
            ♪
          </span>
        </button>

      </div>

      {/* ── Keyframes en <style> global ── */}
      <style>{`
        @keyframes floatNote {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0)   scale(1);    }
          100% { opacity: 0; transform: translateX(-50%) translateY(-60px) scale(0.7); }
        }
        @keyframes spinNote {
          0%   { transform: rotate(0deg);   }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
