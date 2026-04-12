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

interface Props {
  introFinished: boolean;
}

export default function MusicPlayer({ introFinished }: Props) {
  const audioRef      = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false); /* el usuario pausó intencionalmente */
  const [playing, setPlaying] = useState(false);
  const [notes,   setNotes]   = useState<FloatingNote[]>([]);

  /* ── Iniciar reproducción solo después de que la intro termine ── */
  useEffect(() => {
    if (!introFinished) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.loop   = true;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {/* bloqueado por el navegador — fallback en primer gesto */});

    /* Si el autoplay sigue bloqueado, arranca en el primer gesto del usuario.
       IMPORTANTE: no arranca si el usuario ya pausó intencionalmente. */
    const onFirstGesture = () => {
      document.removeEventListener('touchstart', onFirstGesture);
      document.removeEventListener('click',      onFirstGesture);
      if (userPausedRef.current) return;
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    document.addEventListener('touchstart', onFirstGesture);
    document.addEventListener('click',      onFirstGesture);

    return () => {
      document.removeEventListener('touchstart', onFirstGesture);
      document.removeEventListener('click',      onFirstGesture);
    };
  }, [introFinished]);

  /* ── Emitir notas musicales mientras suena ── */
  useEffect(() => {
    if (!playing) return;

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
  }, [playing]);

  /* ── Toggle play / pause ── */
  function handleToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      userPausedRef.current = true;
      setPlaying(false);
    } else {
      userPausedRef.current = false;
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }

  return (
    <>
      {/* Audio oculto */}
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
          aria-label={playing ? 'Pausar música' : 'Reproducir música'}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-opacity"
          style={{ backgroundColor: 'var(--azul)', opacity: playing ? 1 : 0.5 }}
        >
          {/* Icono de nota musical — gira cuando suena */}
          <span
            className="text-white text-lg leading-none select-none"
            style={{
              display:   'inline-block',
              animation: playing ? 'spinNote 3s linear infinite' : 'none',
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
