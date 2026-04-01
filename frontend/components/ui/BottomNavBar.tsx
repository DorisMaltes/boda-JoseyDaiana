'use client';

import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Inicio' },
  { label: 'Ceremonia' },
  { label: 'Recepción' },
  { label: 'Galería' },
  { label: 'Confirmar asistencia' },
];

export default function BottomNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Overlay oscuro ──────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* ── Panel deslizable ────────────────────────────────── */}
      <div
        className="fixed bottom-[64px] left-0 right-0 z-50 bg-azul rounded-t-3xl px-8 pt-8 pb-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: open ? 'translateY(0)' : 'translateY(110%)' }}
      >
        {/* Línea decorativa */}
        <div className="w-10 h-px bg-beige/40 mx-auto mb-8" />

        <nav className="flex flex-col gap-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setOpen(false)}
              className="text-left font-cursiva text-[1.8rem] leading-none text-ivory/90 tracking-wide hover:text-beige transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 w-full h-px bg-beige/20" />
        <p className="mt-4 text-center font-principal text-[0.55rem] tracking-[0.25em] uppercase text-ivory/30">
          José &amp; Daiana · 14 Nov 2026
        </p>
      </div>

      {/* ── Barra inferior fija ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-azul flex items-center justify-between px-6">

        {/* Fecha — lado izquierdo */}
        <p className="font-principal text-[0.55rem] tracking-[0.2em] uppercase text-ivory/50">
          14 · Nov · 2026
        </p>

        {/* Botón hamburguesa — centro */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col items-center justify-center gap-[5px] w-10 h-10 rounded-full"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span
            className="block w-5 h-px bg-ivory transition-all duration-300 origin-center"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-ivory transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-ivory transition-all duration-300 origin-center"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>

        {/* Puebla — lado derecho */}
        <p className="font-principal text-[0.55rem] tracking-[0.2em] uppercase text-ivory/50">
          Puebla
        </p>
      </div>
    </>
  );
}
