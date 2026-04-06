'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const EVENTOS = [
  { hora: '17:00', nombre: 'Ceremonia', icono: '/assets/iconosItinerario/1lol.png' },
  { hora: '18:00', nombre: 'Coctel',    icono: '/assets/iconosItinerario/3lol.png' },
  { hora: '19:00', nombre: 'Recepción', icono: '/assets/iconosItinerario/2lol.png' },
  { hora: '19:30', nombre: 'Banquete',  icono: '/assets/iconosItinerario/4lol.png' },
  { hora: '20:30', nombre: 'Fiesta',    icono: '/assets/iconosItinerario/5lol.png' },
];

interface ItemProps { hora: string; nombre: string; icono: string; index: number; }

function ItinerarioItem({ hora, nombre, icono, index }: ItemProps) {
  const { ref, visible } = useInView();
  const delay = index * 150;
  return (
    <div
      ref={ref}
      className="relative flex items-center w-full"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Icono izquierda */}
      <div className="flex-1 flex justify-end pr-10">
        <div className="w-24 h-24 relative">
          <Image src={icono} alt={nombre} fill className="object-contain" />
        </div>
      </div>

      {/* Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-terracota border-2 border-ivory z-10 shrink-0" />

      {/* Texto derecha */}
      <div className="flex-1 flex flex-col items-start pl-10">
        <p className="font-principal text-lg text-mostaza font-bold">{hora}</p>
        <p className="font-principal text-xl font-bold text-azul tracking-wide leading-tight uppercase">{nombre}</p>
      </div>
    </div>
  );
}

export default function ItinerarioSectionDesktop() {
  return (
    <section id="recepcion" className="relative bg-ivory py-24 px-20 overflow-visible">
      <div className="max-w-3xl mx-auto">

        {/* Título */}
        <div className="relative flex justify-center mb-16">
          <h2 className="font-cursiva text-7xl leading-none text-azul">Itinerario</h2>
          <Image
            src="/assets/componentes/hojitaNosotros.png"
            alt=""
            width={54}
            height={54}
            className="absolute right-1/4 translate-y-1/2 "
          />
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-14 pb-12">
          {/* Línea central */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-azul" />

          {EVENTOS.map((e, i) => (
            <ItinerarioItem key={e.nombre} hora={e.hora} nombre={e.nombre} icono={e.icono} index={i} />
          ))}
        </div>

        {/* Flor5 */}
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <img src="/assets/componentes/flor5.png" className="w-50 h-auto" />
          </div>

          <div className="absolute bottom-0 right-0 pointer-events-none">
            <img src="/assets/componentes/flor5.png" className="w-50 h-auto -scale-x-100" />
          </div>
          
        </div>
      
    </section>
  );
}
