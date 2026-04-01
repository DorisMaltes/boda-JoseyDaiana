import Image from 'next/image';

interface HeroSectionProps {
  nombreFamilia: string;
  pasesAsignados: number;
}

export default function HeroSection({ nombreFamilia, pasesAsignados }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col overflow-hidden min-h-svh bg-ivory">

      {/* ── Flores (solo esquinas, sin altura fija) ─────────── */}
      <div className="relative w-full h-[200px] shrink-0">

        {/* Flor izquierda */}
        <div
          className="animate-fade-in delay-200 absolute -top-6 -left-6 rotate-90"
          style={{ width: '16.3125rem', height: '14.4375rem', aspectRatio: '116/103' }}
        >
          <Image
            src="/assets/componentes/flor1.png"
            alt=""
            fill
            className="object-contain object-top-left"
            priority
          />
        </div>

        {/* Flor derecha */}
        <div
          className="animate-fade-in delay-200 absolute -top-6 -right-6"
          style={{ width: '15.0625rem', height: '13.375rem', aspectRatio: '87/77', transformOrigin: 'top right' }}
        >
          <Image
            src="/assets/componentes/flor2.png"
            alt=""
            fill
            className="object-contain object-right-top"
            priority
          />
        </div>
      </div>

      {/* ── Monograma + Texto + Hojita + Fecha*/}
      <div className="relative z-10 flex flex-col items-center -mt-16 pb-6">

        {/* Sello / Monograma */}
        <div className="animate-fade-up delay-400 w-[76px] h-[76px] mb-4">
          <Image
            src="/assets/componentes/monogramaSello.png"
            alt="Monograma"
            width={76}
            height={76}
            className="object-contain"
            priority
          />
        </div>

        {/* "NUESTRA BODA" */}
        <p className="animate-fade-up delay-500 font-principal text-[0.6rem] tracking-[0.35em] uppercase text-azul opacity-60 mb-2">
          nuestra boda
        </p>

        {/* José */}
        <h1 className="animate-fade-up delay-500 font-cursiva text-[clamp(3.8rem,17vw,6rem)] leading-[1.05] text-azul m-0">
          José
        </h1>

        {/* & */}
        <p className="animate-fade-up delay-600 font-cursiva-secundario text-[clamp(1.6rem,7vw,2.4rem)] leading-none text-mostaza my-0.5">
          &amp;
        </p>

        {/* Daiana */}
        <h1 className="animate-fade-up delay-600 font-cursiva text-[clamp(3.8rem,17vw,6rem)] leading-[1.05] text-azul m-0">
          Daiana
        </h1>

        {/* Hojita */}
        <div className="animate-fade-in delay-700 my-3">
          <Image src="/assets/componentes/hojita.svg" alt="" width={34} height={34} />
        </div>

        {/* Fecha */}
        <p className="animate-fade-up delay-700 font-principal text-[0.62rem] tracking-[0.28em] uppercase text-mostaza font-bold">
          14 de noviembre 2026
        </p>
      </div>

      {/* ── Foto de los novios ─────────────────────────────── */}
      <div className="animate-fade-in delay-800 relative w-full flex-1 min-h-[320px]">
        <Image
          src="/assets/photos/fotoHeroSection.png"
          alt="José y Daiana"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

    </section>
  );
}
