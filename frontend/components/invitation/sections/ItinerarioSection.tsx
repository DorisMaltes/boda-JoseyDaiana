'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

/* ── Datos del itinerario ─────────────────────────────────── */
const EVENTOS = [
  { hora: '17:00', nombre: 'Ceremonia',  icono: '/assets/iconosItinerario/1lol.png' },
  { hora: '18:00', nombre: 'Coctel',     icono: '/assets/iconosItinerario/3lol.png' },
  { hora: '19:00', nombre: 'Recepción',  icono: '/assets/iconosItinerario/2lol.png' },
  { hora: '19:30', nombre: 'Banquete',   icono: '/assets/iconosItinerario/4lol.png' },
  { hora: '20:30', nombre: 'Fiesta',     icono: '/assets/iconosItinerario/5lol.png' },
];

/* ── Ítem reutilizable ────────────────────────────────────── */
interface ItinerarioItemProps {
  hora: string;
  nombre: string;
  icono: string;
  index: number;
}

function ItinerarioItem({ hora, nombre, icono, index }: ItinerarioItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delay = index * 180;

  return (
    <div
      ref={ref}
      className="relative flex items-center w-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Icono — lado izquierdo */}
      <div className="flex-1 flex justify-end pr-6">
        <div className="w-20 h-20 relative">
          <Image src={icono} alt={nombre} fill className="object-contain" />
        </div>
      </div>

      {/* Dot sobre la línea */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-terracota border-2 border-ivory z-10 shrink-0" />

      {/* Texto — lado derecho */}
      <div className="flex-1 flex flex-col items-start pl-6">
        <p className="font-principal text-base text-mostaza font-bold">
          {hora}
        </p>

        <p className="font-principal text-base font-bold text-azul tracking-wide leading-tight uppercase">
          {nombre}
        </p>

      </div>
    </div>
  );
}

/* ── Sección principal ────────────────────────────────────── */
export default function ItinerarioSection() {
  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Título ─────────────────────────────────────────── */}
      <div className="relative mb-2 pt-6">
        <h2 className="font-cursiva text-6xl leading-none text-azul">
          Itinerario
        </h2>
        <Image
          src="/assets/componentes/hojitaNosotros.png"
          alt=""
          width={50}
          height={50}
          className="absolute right-[-25px] translate-x-1/2 -translate-y-1/4"
        />
      </div>



      {/* ── Timeline ───────────────────────────────────────── */}
      <div className="relative w-full flex flex-col gap-12 pb-12 mt-10">

        {/* Línea vertical central */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-azul" />

        {EVENTOS.map((evento, i) => (
          <ItinerarioItem
            key={evento.nombre}
            hora={evento.hora}
            nombre={evento.nombre}
            icono={evento.icono}
            index={i}
          />
        ))}
      </div>

      {/* ── flor5 esquina inferior izquierda (dentro de la sección) */}
      <div className="w-full relative h-[100px]">
        <div className="absolute bottom-0 left-0 pointer-events-none">
          <Image
            src="/assets/componentes/flor5.png"
            alt=""
            width={200}
            height={342}
            className="w-[150px] h-auto pb-3"
          />
        </div>
      </div>

    </section>
  );
}
