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

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative w-full overflow-hidden" style={{ height: '520px' }}>

      {/* ── Foto de fondo ───────────────────────────────────── */}
      <Image
        src="/assets/photos/fotoCountdown_opt.jpg"
        alt="José y Daiana"
        fill
        className="object-cover object-center "
      />

      {/* ── Overlay oscuro ──────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/30" />

      {/* ── Contenido centrado ──────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 px-6">

        {/* Título */}
        <h2 className="font-cursiva text-8xl text-white leading-none text-center mb-10 drop-shadow-md">
          Solo Falta
        </h2>

        {/* Contador */}
        <div className="flex items-start gap-2">

          <div className="flex flex-col items-center ">
            <span className="font-principal text-4xl text-white font-bold tracking-widest leading-none">
              {pad(time.dias)}
            </span>
            <span className="font-principal text-[8px] text-white tracking-[0.2em] uppercase mt-1 font-bold">
              Días
            </span>
          </div>

          <span className="font-principal text-4xl text-white/60 leading-none mt-1">:</span>

          <div className="flex flex-col items-center">
            <span className="font-principal text-4xl text-white font-bold tracking-widest leading-none">
              {pad(time.horas)}
            </span>
            <span className="font-principal text-[8px] font-bold text-white/70 tracking-[0.2em] uppercase mt-1">
              Horas
            </span>
          </div>

          <span className="font-principal text-4xl text-white/60 leading-none mt-1">:</span>

          <div className="flex flex-col items-center">
            <span className="font-principal text-4xl text-white font-bold tracking-widest leading-none">
              {pad(time.minutos)}
            </span>
            <span className="font-principal text-[8px] font-bold text-white tracking-[0.2em] uppercase mt-1">
              Minutos
            </span>
          </div>

          <span className="font-principal text-4xl text-white/60 leading-none mt-1">:</span>

          <div className="flex flex-col items-center">
            <span className="font-principal text-4xl text-white font-bold tracking-widest leading-none">
              {pad(time.segundos)}
            </span>
            <span className="font-principal text-[8px] font-bold text-white tracking-[0.2em] uppercase mt-1">
              Segundos
            </span>
          </div>

        </div>
      </div>

    </section>
  );
}
