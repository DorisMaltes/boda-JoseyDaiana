'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const HOTELES = [
  { nombre: 'Tru by Hilton\nPuebla Angelópolis',                    distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/TDxUSeW5xbMJoggN8', telefono: '2223030302' },
  { nombre: 'Holiday Inn Express & Suites\nPuebla Angelópolis',     distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/LoFFr93RMtGy8tXM9', telefono: '2226058000' },
  { nombre: 'Hotel Villa Florida Puebla',                           distancia: 'Entre 25 a 30 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/tKDpXjDSgsA2CJEV9', telefono: '2221234569' },
  { nombre: 'Camino Real\nPuebla Angelópolis',                      distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/cSEV58RxYqh8SKKE8', telefono: '2223031800' },
];

function HotelCard({ nombre, distancia, urlDetalles, telefono, index }: { nombre: string; distancia: string; urlDetalles: string; telefono: string; index: number }) {
  const { ref, visible } = useInView();
  const delay = index * 100;
  return (
    <div
      ref={ref}
      className="w-full bg-white rounded-2xl shadow-[4px_4px_12px_0px_rgba(0,0,0,0.08)] px-8 py-8 flex flex-col items-center gap-3"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <p className="font-principal text-lg font-bold text-azul text-center tracking-[0.08em] leading-snug whitespace-pre-line">{nombre}</p>
      <p className="font-principal text-xs text-azul/60 text-center tracking-wide">{distancia}</p>
      <div className="flex gap-3 mt-2">
        <a href={urlDetalles} target="_blank" rel="noopener noreferrer"
          className="px-6 py-2 text-[18px] text-white font-cursiva-secundario bg-verde rounded-full">
          Ver detalles
        </a>
        <a href={`tel:${telefono}`}
          className="px-6 py-2 text-[18px] text-white font-cursiva-secundario bg-verde rounded-full">
          Llamar
        </a>
      </div>
    </div>
  );
}

export default function HospedajeSectionDesktop() {
  return (
    <section id="hospedaje" className="relative bg-ivory py-24 px-20 overflow-visible">
      <div className="max-w-5xl mx-auto">

        <h2 className="font-cursiva text-7xl leading-tight text-azul text-center mb-4">
          Sugerencia de<br />Hospedaje
        </h2>

        {/* ── Disclaimer ─────────────────────────────────────── */}
        <p className="font-principal text-sm text-azul/60 text-center tracking-wide leading-relaxed max-w-xl mx-auto mb-14 italic">
          Debido a un evento importante en la ciudad durante nuestras fechas, la disponibilidad de hospedaje será limitada. Les recomendamos reservar con anticipación.
        </p>

        {/* 2x2 grid */}
        <div className="grid grid-cols-2 gap-6">
          {HOTELES.map((h, i) => (
            <HotelCard key={h.nombre} {...h} index={i} />
          ))}
        </div>

        {/* Flor7 */}
        <div className="flex justify-center relative z-10 -mb-30 mt-12">
          <img src="/assets/componentes/flor7.png" alt="" className="w-80 h-auto" />
        </div>
      </div>
    </section>
  );
}
