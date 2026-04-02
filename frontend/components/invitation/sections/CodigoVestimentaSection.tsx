import Image from 'next/image';

export default function CodigoVestimentaSection() {
  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 pb-16 overflow-visible">

      {/* ── Título ─────────────────────────────────────────── */}
      <h2 className="font-cursiva text-6xl leading-tight text-azul text-center mb-10">
        Código de<br />Vestimenta
      </h2>

      {/* ── Postcard con sello encima ───────────────────────── */}
      <div className="relative w-full">

        {/* Sello superpuesto en el borde superior */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 w-[58px] h-[58px]">
          <Image
            src="/assets/componentes/monogramaSello.png"
            alt="Monograma"
            fill
            className="object-contain"
          />
        </div>

        {/* Recuadro blanco con textura */}
        <div
          className="relative w-full px-8 pt-16 pb-12 overflow-hidden bg-white shadow-[5px_4px_4px_0px_rgba(0,0,0,0.1)]" 
        >
          {/* Textura de fondo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/assets/textures/esta-textura.png')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: 0.12,
            }}
          />

          {/* Icono ropa formal */}
          <div className="relative z-10 flex justify-center mb-10">
            <Image
              src="/assets/icons/FORMAL-SVG.svg"
              alt="Vestimenta formal"
              width={165}
              height={176}
              className="object-contain"
              style={{ width: '164.715px', height: '176px' }}
            />
          </div>

          {/* Texto */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <p className="font-principal font-bold text-2xl tracking-[0.25em] uppercase text-azul text-center">
              Formal
            </p>

            <div className="w-12 h-px bg-azul/30" />

            <p className="font-principal text-sm tracking-[0.18em] uppercase text-azul font-thin text-center">
              Evitar blanco, beige y nude
            </p>

            <p className="font-principal text-sm tracking-[0.18em] uppercase text-azul font-bold text-center">
              Llevar abrigo
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
