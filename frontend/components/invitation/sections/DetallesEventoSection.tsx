import Image from 'next/image';
import SectionSeparator from '@/components/ui/SectionSeparator';

export default function DetallesEventoSection() {
  return (
    <section className="relative flex flex-col items-center  bg-ivory px-6 pt-10 overflow-visible ">

      {/* ── Ornamento superior centrado con líneas ─────────── */}
      <div className="flex flex-col items-center w-full mb-8">
        
        <Image
          src="/assets/componentes/detallesdeleventoSeparador.png"
          alt=""
          width={337}
          height={70}
          className="shrink-0"
        />
        
      </div>

      {/* ── Título ─────────────────────────────────────────── */}
      <h2 className="font-cursiva text-6xl leading-none text-azul text-center w-full mb-6">
        Detalles del Evento
      </h2>

      {/* ── Subtítulo ──────────────────────────────────────── */}
      <p className="font-principal text-xl text-azul text-center leading-relaxed mb-8 px-4 pt-5">
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
        <div className="bg-white p-2 shadow-[5px_4px_4px_0px_rgba(0,0,0,0.1)]">
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
      <h3 className="font-principal text-2xl font-regular text-azul text-center tracking-wide leading-snug mb-1 px-4">
        Hacienda San Antonio Arenillas
      </h3>

      {/* ── Dirección ─────────────────────────────────────── */}
      <p className="font-principal text-lg text-azul/70 text-center mb-10 font-thin">
        Heroica Puebla de Zaragoza, Pue.
      </p>

      {/* ── Botón Ver Mapa ─────────────────────────────────── */}
      
        <a
          href="https://share.google/rEDTrJ4AWbXjHvRv2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-4 text-[26px] text-white font-cursiva-secundario border border-white rounded-full bg-[#203D21] text-center"
        >
          Ver Mapa
        </a>

      {/* ── Separador + flor4 superpuesta ─────────────────── */}
      <div className="relative w-full mt-26">
        
        {/* Flor4 centrada encima del separador */}
        <div className="absolute inset-x-0 top-0 -translate-y-1/2 flex justify-center z-10 pointer-events-none">
          <Image
            src="/assets/componentes/flor4.png"
            alt=""
            width={119}
            height={120}
            className="w-[119px] h-auto rotate-270"
          />
        </div>
      </div>

    </section>
  );
}
