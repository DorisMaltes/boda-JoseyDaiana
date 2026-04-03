import Image from 'next/image';

import SectionSeparator from '@/components/ui/SectionSeparator';

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Título ─────────────────────────────────────────── */}
      <div className="relative mb-6">
        <h2 className="font-cursiva text-6xl leading-none text-azul ">
          Nosotros
        </h2>
        <Image
          src="/assets/componentes/hojitaNosotros.png"
          alt=""
          width={50}
          height={50}
          className="absolute right-[-25px] translate-x-1/2 -translate-y-1/4"
        />
      </div>

      {/* ── Nombres completos ──────────────────────────────── */}
      <div className='flex flex-col items-center pt-8 '>
        <p className="font-principal text-2xl tracking-wide text-azul text-center leading-snug font-regular">
          José Antonio Maltes Cuevas
        </p>
        <p className="font-principal text-2xl text-mostaza leading-none my-1 text-center">
          &amp;
        </p>
        <p className="font-principal text-2xl tracking-wide text-azul text-center leading-snug mb-8">
          Yelantzi Daiana Mendoza López
        </p>
      </div>
      

      {/* ── Talavera superior ──────────────────────────────── */}
      <div className="w-[125px] max-w-full mb-4 pt-8">
        <Image
          src="/assets/componentes/talaveraAzul.png"
          alt=""
          width={440}
          height={48}
          className="w-full h-auto"
        />
      </div>

      {/* ── Foto oval ─────────────────────────────────────── */}
      <div
        className="overflow-hidden shrink-0"
        style={{
          width: '238px',
          height: '332px',
          borderRadius: '50%',
        }}
      >
        <Image
          src="/assets/photos/fotoNosotrosSection.jpg"
          alt="José y Daiana"
          width={238}
          height={332}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* ── Talavera inferior ──────────────────────────────── */}
      <div className="w-[125px] max-w-full mt-4 mb-8 rotate-180">
        <Image
          src="/assets/componentes/talaveraAzul.png"
          alt=""
          width={440}
          height={48}
          className="w-full h-auto"
        />
      </div>

      {/* ── Bendición ─────────────────────────────────────── */}
      <p className="font-principal font-bold text-2xl tracking-[0.15em] uppercase text-azul text-center leading-relaxed mb-8 font-regular px-7">
        Con la bendición de Dios y nuestros padres
      </p>

      {/* ── Padres ────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-5 mb-8 w-full">

        {/* Madre de la Novia */}
        <div className="text-center pt-1">
          <p className="font-principal text-lg text-azul tracking-wide">
            Laura Mendoza López
          </p>
          <p className="font-principal text-base tracking-[0.15em] uppercase text-azul mt-0.5 font-thin">
            Madre de la Novia
          </p>
        </div>

        {/* Padres del Novio */}
        <div className="text-center pt-8">
          <p className="font-principal text-lg text-azul tracking-wide">
            José Antonio Maltes García<br />Doris Elena Cuevas Tejeda
          </p>
          <p className="font-principal text-base tracking-[0.15em] uppercase text-azul mt-0.5 font-thin">
            Padres del Novio
          </p>
        </div>
      </div>

      {/* ── Flor3 encima del separador inferior ────────────── */}
      <div className="relative z-10 -mb-10">
        <Image
          src="/assets/componentes/flor3.png"
          alt=""
          width={230}
          height={120}
          className="w-[220px] h-auto  pb-8"
        />
      </div>

      {/* ── Separador inferior ────────────────────────────── */}
      

    </section>
  );
}
