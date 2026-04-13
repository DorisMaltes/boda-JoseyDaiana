'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const HOTELES = [
  { nombre: 'MM Grand Hotel Puebla, Tapestry Collection by Hilton', distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/4Uwgz3LFNF9446Uw7', telefono: '2227949999', urlWhatsapp: 'https://wa.link/73gjb0' },
  { nombre: 'Fiesta Inn Puebla Las Ánimas',     distancia: 'Entre 20 a 25 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/9zCGdmp1jwVCDUu29', telefono: '2226058000' },
  { nombre: 'Holiday Inn Puebla la Noria',      distancia: 'Entre 20 a 35 minutos del evento', urlDetalles: 'https://maps.app.goo.gl/VN3sevfgpTJXCanb6', telefono: '2222119000' },
];

function HotelCard({ nombre, distancia, urlDetalles, telefono, index, urlWhatsapp }: { nombre: string; distancia: string; urlDetalles: string; telefono: string; index: number; urlWhatsapp?: string }) {
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
        {urlWhatsapp ? (
          <a href={urlWhatsapp} target="_blank" rel="noopener noreferrer"
            className="px-6 py-2 text-[18px] text-white font-cursiva-secundario bg-verde rounded-full flex items-center gap-2">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        ) : (
          <a href={`tel:${telefono}`}
            className="px-6 py-2 text-[18px] text-white font-cursiva-secundario bg-verde rounded-full">
            Llamar
          </a>
        )}
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

        <div className="flex flex-col gap-6 max-w-xl mx-auto">
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
