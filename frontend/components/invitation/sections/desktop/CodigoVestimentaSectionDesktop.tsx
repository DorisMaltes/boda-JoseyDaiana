import Image from 'next/image';

export default function CodigoVestimentaSectionDesktop() {
  return (
    <section id="vestimenta" className="relative bg-ivory py-24 px-20 overflow-visible">
      <div className="max-w-4xl mx-auto">

        {/* Título */}
        <h2 className="font-cursiva text-7xl leading-tight text-azul text-center mb-16">
          Código de Vestimenta
        </h2>

        {/* Postcard con sello */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 w-[72px] h-[72px]">
            <Image src="/assets/componentes/monogramaSello.png" alt="Monograma" fill className="object-contain" />
          </div>

          <div className="relative bg-white shadow-[5px_4px_4px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Textura */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/assets/textures/esta-textura.png')",
                backgroundSize: 'cover',
                opacity: 0.12,
              }}
            />

            {/* Contenido 2 columnas */}
            <div className="relative z-10 grid grid-cols-2 gap-0 items-center">

              {/* Columna izquierda: icono */}
              <div className="flex justify-center items-center py-16 px-12 border-r border-azul/10">
                <Image
                  src="/assets/icons/FORMAL-SVG.svg"
                  alt="Vestimenta formal"
                  width={220}
                  height={235}
                  className="object-contain"
                />
              </div>

              {/* Columna derecha: texto */}
              <div className="flex flex-col items-center justify-center py-16 px-12 gap-6">
                <p className="font-principal font-bold text-3xl tracking-[0.3em] uppercase text-azul text-center">
                  Formal
                </p>
                <div className="w-16 h-px bg-azul/30" />
                <p className="font-principal text-base tracking-[0.2em] uppercase text-azul/70 text-center">
                  Evitar blanco,<br />beige y nude
                </p>
                <p className="font-principal text-base tracking-[0.2em] uppercase text-azul font-bold text-center">
                  Llevar abrigo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
