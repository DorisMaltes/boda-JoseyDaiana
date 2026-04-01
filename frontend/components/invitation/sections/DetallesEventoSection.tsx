import Image from 'next/image';
import SectionSeparator from '@/components/ui/SectionSeparator';

export default function DetallesEventoSection() {
  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Ornamento superior centrado con líneas ─────────── */}
      <div className="flex items-center gap-3 w-full mb-8">
        <div className="flex-1 h-px bg-azul/30" />
        <Image
          src="/assets/componentes/detallesdeleventoSeparador.png"
          alt=""
          width={337}
          height={70}
          className="shrink-0"
        />
        <div className="flex-1 h-px bg-azul/30" />
      </div>

      {/* ── Título ─────────────────────────────────────────── */}
      <h2 className="font-cursiva text-[3.2rem] leading-none text-azul text-left w-full mb-6">
        Detalles del Evento
      </h2>

      {/* ── Subtítulo ──────────────────────────────────────── */}
      <p className="font-principal text-[0.95rem] text-azul text-center leading-relaxed mb-8 px-4">
        Todos los momentos de nuestra<br />boda se llevarán a cabo en:
      </p>

      {/* ── Postcard: sello + foto ─────────────────────────── */}
      <div className="relative w-full px-2 mb-6">

        {/* Sello encima de la foto (superpuesto en el borde superior) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 w-[52px] h-[52px]">
          <Image
            src="/assets/componentes/monogramaSello.png"
            alt="Monograma"
            fill
            className="object-contain"
          />
        </div>

        {/* Marco postcard blanco */}
        <div className="bg-white p-2 shadow-sm">
          <div className="relative w-full h-[230px]">
            <Image
              src="/assets/photos/fotoHacienda.jpg"
              alt="Hacienda San Antonio Arenillas"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Nombre del lugar ───────────────────────────────── */}
      <h3 className="font-principal text-[1.1rem] font-bold text-azul text-center tracking-wide leading-snug mb-1 px-4">
        Hacienda San Antonio Arenillas
      </h3>

      {/* ── Dirección ─────────────────────────────────────── */}
      <p className="font-principal text-[0.8rem] text-azul/70 text-center mb-10">
        Heroica Puebla de Zaragoza, Pue.
      </p>

      {/* ── Botón Ver Mapa ─────────────────────────────────── */}
      <a
        href="https://maps.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-cursiva text-[1.4rem] text-white px-10 py-3 mb-12"
        style={{
          backgroundColor: '#203D21',
          borderRadius: '30px',
          border: '1px solid #FFF',
        }}
      >
        Ver Mapa
      </a>

      {/* ── Flor4 encima del separador ─────────────────────── */}
      <div className="relative z-10 -mb-10">
        <Image
          src="/assets/componentes/flor4.png"
          alt=""
          width={260}
          height={140}
          className="w-[260px] h-auto"
        />
      </div>

      {/* ── Separador inferior ────────────────────────────── */}
      <div className="w-full">
        <SectionSeparator />
      </div>

    </section>
  );
}
