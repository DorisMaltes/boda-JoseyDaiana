
import Image from 'next/image';


interface Props {
  nombreFamilia: string;
  pasesAsignados: number;
  esFamilia?: boolean;
  ApellidosFamilia?: string;

}

export default function HeroSectionDesktop({ nombreFamilia, pasesAsignados ,esFamilia, ApellidosFamilia }: Props) {
  return (
    <section id="inicio" className="relative flex min-h-screen bg-ivory overflow-hidden">

      {/* ── Panel centrado — texto ───────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center w-full px-16 py-20 z-10">

        {/* Flor1 — esquina superior izquierda */}
        <div className="animate-fade-in delay-200 absolute -top-4 -left-6 rotate-90 pointer-events-none"
          style={{ width: '17rem', height: '15rem' }}>
          <Image src="/assets/componentes/flor1.png" alt="" fill className="object-contain object-top-left" priority />
        </div>

        {/* Flor2 — esquina superior derecha */}
        <div className="animate-fade-in delay-200 absolute -top-4 -right-6 pointer-events-none"
          style={{ width: '15rem', height: '13rem' }}>
          <Image src="/assets/componentes/flor2.png" alt="" fill className="object-contain object-right-top" priority />
        </div>

        {/* Monograma */}
        <div className="animate-fade-up delay-400 w-[90px] h-[90px] mb-5">
          <Image src="/assets/componentes/monogramaSello.png" alt="Monograma" width={90} height={90} className="object-contain" priority />
        </div>

        {/* NUESTRA BODA */}
        <p className="animate-fade-up delay-500 font-principal text-[0.6rem] tracking-[0.4em] uppercase text-azul opacity-60 mb-3">
          nuestra boda
        </p>

        {/* José */}
        <h1 className="animate-fade-up delay-500 font-cursiva text-[6rem] leading-[1.0] text-azul m-0">
          José
        </h1>

        {/* & */}
        <p className="animate-fade-up delay-600 font-cursiva-secundario text-[2.6rem] leading-none text-mostaza my-1">
          &amp;
        </p>

        {/* Daiana */}
        <h1 className="animate-fade-up delay-600 font-cursiva text-[6rem] leading-[1.0] text-azul m-0">
          Daiana
        </h1>

        {/* Hojita */}
        <div className="animate-fade-in delay-700 my-4">
          <Image src="/assets/componentes/hojita.svg" alt="" width={36} height={36} />
        </div>

        {/* Fecha */}
        <p className="animate-fade-up delay-700 font-principal text-[0.68rem] tracking-[0.32em] uppercase text-mostaza font-bold mb-8">
          14 de noviembre 2026
        </p>

        {/* Separador */}
        <div className="animate-fade-in delay-800 w-24 h-px bg-azul/20 mb-8" />

        {/* Bienvenida */}
        <p className="animate-fade-up delay-800 font-principal text-sm tracking-[0.18em] uppercase text-azul/60 text-center">
          Bienvenido
        </p>

        {/* Flor1 — esquina inferior izquierda */}
        <div className="animate-fade-in delay-200 absolute -bottom-4 -left-6  pointer-events-none"
          style={{ width: '15rem', height: '13rem' }}>
          <Image src="/assets/componentes/flor1.png" alt="" fill className="object-contain" />
        </div>

        {/* Flor2 — esquina inferior derecha */}
        <div className="animate-fade-in delay-200 absolute -bottom-4 -right-6 rotate-90 pointer-events-none"
          style={{ width: '13rem', height: '11rem' }}>
          <Image src="/assets/componentes/flor2.png" alt="" fill className="object-contain" />
        </div>
      </div>

    </section>
  );
}
