import Image from 'next/image';

export default function DetallesEventoSectionDesktop() {
  return (
    <section id="ceremonia" className="relative bg-ivory py-24 px-20 overflow-visible">
      <div className="max-w-6xl mx-auto">

        {/* ── Ornamento + título centrado ──────────────────────── */}
        <div className="flex flex-col items-center mb-16">
          <Image
            src="/assets/componentes/detallesdeleventoSeparador.png"
            alt=""
            width={337}
            height={70}
            className="mb-6"
          />
          <h2 className="font-cursiva text-7xl leading-none text-azul text-center">
            Detalles del Evento
          </h2>
          <p className="font-principal text-xl text-azul text-center leading-relaxed mt-6 max-w-md">
            Todos los momentos de nuestra boda<br />se llevarán a cabo en:
          </p>
        </div>

        {/* ── Contenido 2 columnas ─────────────────────────────── */}
        <div className="grid grid-cols-2 gap-16 items-center">

          {/* Columna izquierda: postcard */}
          <div className="relative">
            {/* Sello superpuesto */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 w-[64px] h-[64px]">
              <Image src="/assets/componentes/monogramaSello.png" alt="Monograma" fill className="object-contain" />
            </div>
            <div className="bg-white p-3 shadow-[5px_4px_4px_0px_rgba(0,0,0,0.1)]">
              <div className="relative w-full h-[320px]">
                <Image
                  src="/assets/photos/fotoHacienda.jpg"
                  alt="Hacienda San Antonio Arenillas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Columna derecha: detalles */}
          <div className="flex flex-col items-start gap-4">
            <h3 className="font-principal text-3xl text-azul tracking-wide leading-snug">
              Hacienda San Antonio Arenillas
            </h3>
            <p className="font-principal text-xl text-azul/70 font-thin">
              Heroica Puebla de Zaragoza, Pue.
            </p>

            <div className="w-12 h-px bg-azul/20 my-2" />

            <p className="font-principal text-base text-azul/70 leading-relaxed">
              Acompáñanos a vivir este día tan especial en uno de los lugares más hermosos de Puebla.
              Todos los momentos de la celebración se llevarán a cabo en el mismo recinto.
            </p>

            <a
              href="https://share.google/rEDTrJ4AWbXjHvRv2"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-10 py-4 text-[26px] text-white font-cursiva-secundario border border-white rounded-full bg-verde"
            >
              Ver Mapa
            </a>
          </div>
        </div>

        {/* Flor4 al fondo */}
        <div className="relative w-full mt-24">
          <div className="absolute inset-x-0 top-0 -translate-y-1/2 flex justify-center z-10 pointer-events-none">
            <Image src="/assets/componentes/flor4.png" alt="" width={119} height={120} className="w-[119px] h-auto rotate-270" />
          </div>
        </div>

      </div>
    </section>
  );
}
