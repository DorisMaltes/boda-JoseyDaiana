import Image from 'next/image';
import SectionSeparator from '@/components/ui/SectionSeparator';

export default function NosotrosSection() {
  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Título ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-cursiva text-[2.6rem] leading-none text-azul">
          Nosotros
        </h2>
        <Image
          src="/assets/componentes/hojita.svg"
          alt=""
          width={28}
          height={28}
        />
      </div>

      {/* ── Nombres completos ──────────────────────────────── */}
      <p className="font-principal text-[0.85rem] tracking-wide text-azul text-center leading-snug">
        José Antonio Maltes Cuevas
      </p>
      <p className="font-cursiva-secundario text-[1.4rem] text-mostaza leading-none my-1">
        &amp;
      </p>
      <p className="font-principal text-[0.85rem] tracking-wide text-azul text-center leading-snug mb-8">
        Yelantzi Daiana Mendoza López
      </p>

      {/* ── Talavera superior ──────────────────────────────── */}
      <div className="w-[27.5rem] max-w-full mb-4">
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
      <div className="w-[27.5rem] max-w-full mt-4 mb-8">
        <Image
          src="/assets/componentes/talaveraAzul.png"
          alt=""
          width={440}
          height={48}
          className="w-full h-auto"
        />
      </div>

      {/* ── Bendición ─────────────────────────────────────── */}
      <p className="font-principal font-bold text-[0.75rem] tracking-[0.15em] uppercase text-azul text-center leading-relaxed mb-8">
        Con la bendición de<br />Dios y nuestros<br />padres
      </p>

      {/* ── Padres ────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-5 mb-8 w-full">

        {/* Madre de la Novia */}
        <div className="text-center">
          <p className="font-principal text-[0.85rem] text-azul tracking-wide">
            Laura Mendoza López
          </p>
          <p className="font-principal text-[0.6rem] tracking-[0.15em] uppercase text-azul/50 mt-0.5">
            Madre de la Novia
          </p>
        </div>

        {/* Padres del Novio */}
        <div className="text-center">
          <p className="font-principal text-[0.85rem] text-azul tracking-wide leading-snug">
            José Antonio Maltes García<br />Doris Elena Cuevas Tejeda
          </p>
          <p className="font-principal text-[0.6rem] tracking-[0.15em] uppercase text-azul/50 mt-0.5">
            Padres del Novio
          </p>
        </div>
      </div>

      {/* ── Flor3 encima del separador inferior ────────────── */}
      <div className="relative z-10 -mb-10">
        <Image
          src="/assets/componentes/flor3.png"
          alt=""
          width={220}
          height={120}
          className="w-[220px] h-auto"
        />
      </div>

      {/* ── Separador inferior ────────────────────────────── */}
      <div className="w-full">
        <SectionSeparator />
      </div>

    </section>
  );
}
