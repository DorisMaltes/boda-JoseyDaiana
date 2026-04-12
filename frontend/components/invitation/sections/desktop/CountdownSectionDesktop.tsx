'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const WEDDING_DATE = new Date('2026-11-14T17:00:00');

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  return {
    dias:     Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:    Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos:  Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function CountdownSectionDesktop() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative w-full overflow-hidden" style={{ height: '650px' }}>

      <Image
        src="/assets/photos/fotoCountdown_opt.jpg"
        alt="José y Daiana"
        fill
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        <p className="font-cursiva text-8xl text-white leading-none">Solo Falta</p>

        {/* Números */}
        <div className="flex items-end gap-10">
          {[
            { valor: time.dias,     label: 'días'     },
            { valor: time.horas,    label: 'horas'    },
            { valor: time.minutos,  label: 'minutos'  },
            { valor: time.segundos, label: 'segundos' },
          ].map(({ valor, label }, i) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-cursiva text-[7rem] leading-none text-white">{pad(valor)}</span>
              <span className="font-principal text-sm tracking-[0.2em] uppercase text-white/70 mt-1">{label}</span>
              {i < 3 && (
                <span className="absolute font-cursiva text-[5rem] text-white/60 translate-x-[calc(100%+2.5rem)]">:</span>
              )}
            </div>
          ))}
        </div>

        <p className="font-principal text-sm tracking-[0.35em] uppercase text-white/60 mt-2">
          14 · Nov · 2026
        </p>
      </div>
    </section>
  );
}
