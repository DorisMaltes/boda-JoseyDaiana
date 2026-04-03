'use client';

import { useState } from 'react';

const NAV_ITEMS = [
  { label: 'Inicio',                   target: 'inicio'     },
  { label: 'Nosotros',                 target: 'nosotros'   },
  { label: 'Detalles del evento',      target: 'ceremonia'  },
  { label: 'Itinerario',               target: 'recepcion'  },
  { label: 'Código de vestimenta',     target: 'vestimenta' },
  { label: 'Mesa de regalos',          target: 'regalos'    },
  { label: 'Sugerencia de maquillaje', target: 'maquillaje' },
  { label: 'Sugerencia de hospedaje',  target: 'hospedaje'  },
  { label: 'Galería',                  target: 'galeria'    },
  { label: 'Cuenta regresiva',         target: 'countdown'  },
  { label: 'Confirmar asistencia',     target: 'rsvp'       },
];

export default function TopNavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Barra superior fija ─────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-ivory flex items-center justify-between px-6">

        {/* Fecha — lado izquierdo */}
        <p className="font-principal text-[0.55rem] tracking-[0.2em] uppercase text-azul">
          14 · Nov · 2026
        </p>

        {/* Botón hamburguesa — centro */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col items-center justify-center gap-[5px] w-10 h-10"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span
            className="block w-5 h-px bg-azul transition-all duration-300 origin-center"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-azul transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-azul transition-all duration-300 origin-center"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
          />
        </button>

        {/* Puebla — lado derecho */}
        <p className="font-principal text-[0.55rem] tracking-[0.2em] uppercase text-azul ">
          Puebla
        </p>
      </div>

      {/* ── Panel deslizable hacia abajo ────────────────────── */}
      <div
        className="fixed top-16 left-0 right-0 z-50 bg-ivory px-8 pt-4 pb-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: open ? 'translateY(0)' : 'translateY(-110%)' }}
      >
        <nav className="flex flex-col gap-3">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              onClick={() => {
                setOpen(false);
                const el = document.getElementById(item.target);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-left font-principal text-xl leading-none text-azul tracking-wide hover:text-mostaza transition-colors"
              style={{
                opacity:    open ? 1 : 0,
                transform:  open ? 'translateY(0)' : 'translateY(-10px)',
                transition: `opacity 0.35s ease ${open ? i * 40 : 0}ms, transform 0.35s ease ${open ? i * 40 : 0}ms, color 0.2s`,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 w-full h-px bg-beige/20" />
        <p className="mt-4 text-center font-principal text-[0.55rem] tracking-[0.25em] uppercase text-mostaza font-bold">
          José &amp; Daiana · 14 Nov 2026
        </p>
      </div>

      {/* ── Overlay oscuro ──────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />
    </>
  );
}
