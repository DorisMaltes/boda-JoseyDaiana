'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

/* ── Datos de hospedaje ───────────────────────────────────── */
const HOTELES = [
  { nombre: 'MM Grand Hotel Puebla, Tapestry Collection by Hilton', distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/4Uwgz3LFNF9446Uw7', telefono: '2227949999' },
  { nombre: 'Fiesta Inn Puebla Las Ánimas',     distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/9zCGdmp1jwVCDUu29', telefono: '2226058000' },
  { nombre: 'Holiday Inn Puebla la Noria',     distancia: 'Entre 20 a 35 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/VN3sevfgpTJXCanb6', telefono: '2222119000' },
  
];

/* ── Tarjeta reutilizable ─────────────────────────────────── */
interface HotelCardProps {
  nombre: string;
  distancia: string;
  urlDetalles: string;
  telefono: string;
  index: number;
}

function HotelCard({ nombre, distancia, urlDetalles, telefono, index }: HotelCardProps) {
  const { ref, visible } = useInView();
  const delay = index * 120;

  return (
    <div
      ref={ref}
      className="w-full bg-white rounded-2xl shadow-[4px_4px_12px_0px_rgba(0,0,0,0.08)] px-6 py-6 flex flex-col items-center gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Nombre del hotel */}
      <p className="font-principal text-lg font-bold text-azul text-center tracking-[0.08em] leading-snug whitespace-pre-line">
        {nombre}
      </p>

      {/* Distancia */}
      <p className="font-principal text-xs text-azul/60 text-center tracking-wide">
        {distancia}
      </p>

      {/* Botones */}
      <div className="flex gap-3 mt-1">
        <a
          href={urlDetalles}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 text-[18px] text-white font-cursiva-secundario bg-verde rounded-full text-center"
        >
          Ver detalles
        </a>
        <a
          href={`tel:${telefono}`}
          className="px-5 py-2 text-[18px] text-white font-cursiva-secundario bg-verde rounded-full text-center"
        >
          Llamar
        </a>
      </div>
    </div>
  );
}

/* ── Sección principal ────────────────────────────────────── */
export default function HospedajeSection() {
  return (
    <section id="hospedaje" className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Título ─────────────────────────────────────────── */}
      <h2 className="font-cursiva text-6xl leading-tight text-azul text-center mb-4">
        Sugerencia de<br />Hospedaje
      </h2>

      {/* ── Disclaimer ─────────────────────────────────────── */}
      <p className="font-principal text-xs text-azul/60 text-center tracking-wide leading-relaxed max-w-sm mb-10 italic">
        Debido a un evento importante en la ciudad durante nuestras fechas, la disponibilidad de hospedaje será limitada. Les recomendamos reservar con anticipación.
      </p>

      {/* ── Tarjetas ───────────────────────────────────────── */}
      <div className="flex flex-col gap-6 w-full">
        {HOTELES.map((hotel, i) => (
          <HotelCard
            key={hotel.nombre}
            nombre={hotel.nombre}
            distancia={hotel.distancia}
            urlDetalles={hotel.urlDetalles}
            telefono={hotel.telefono}
            index={i}
          />
        ))}
      </div>

      {/* ── Flor7 — igual que flor3 en NosotrosSection ─────── */}
      <div className="relative z-10 -mb-10 mt-10">
        <Image
          src="/assets/componentes/flor7.png"
          alt=""
          width={230}
          height={120}
          className="w-[220px] h-auto pb-8"
        />
      </div>

    </section>
  );
}
