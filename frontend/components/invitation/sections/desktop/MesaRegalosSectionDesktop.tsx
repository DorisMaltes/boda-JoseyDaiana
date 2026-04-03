import Image from 'next/image';

export default function MesaRegalosSectionDesktop() {
  return (
    <section id="regalos" className="relative bg-ivory py-24 px-20 overflow-visible">

      {/* Flor6 */}
      <div className="absolute top-0 left-0 pointer-events-none z-10">
        <Image src="/assets/componentes/flor6.png" alt="" width={200} height={200} />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Título + icono */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-cursiva text-7xl leading-tight text-azul text-center mb-6">
            Mesa de Regalos
          </h2>
          <Image src="/assets/icons/REGALOS-AZUL.png" alt="Regalos" width={93} height={93} />
        </div>

        {/* Texto descriptivo */}
        <p className="font-principal text-base text-azul text-center leading-relaxed mb-16 max-w-2xl mx-auto font-thin">
          Sabemos el esfuerzo que requiere una boda destino, por lo que el que nos acompañen en este
          día tan especial para nosotros es el mejor regalo que podemos recibir. Sin embargo, si desean
          hacernos un obsequio adicional ponemos a su disposición las siguientes opciones.
        </p>

        {/* 2 columnas */}
        <div className="grid grid-cols-2 gap-16 items-start">

          {/* Columna izquierda: Liverpool */}
          <div className="flex flex-col items-center gap-4 bg-white p-10 shadow-[4px_4px_12px_0px_rgba(0,0,0,0.08)] rounded-2xl">
            <p className="font-principal text-base text-azul text-center tracking-wide">
              N° de evento 51937067
            </p>
            <a
              href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51937067"
              target="_blank"
              rel="noopener noreferrer"
              className="px-16 py-3 text-[28px] text-white font-cursiva-secundario rounded-[10px] bg-verde"
            >
              Liverpool
            </a>
          </div>

          {/* Columna derecha: banco */}
          <div className="flex flex-col items-center gap-4 bg-white p-10 shadow-[4px_4px_12px_0px_rgba(0,0,0,0.08)] rounded-2xl">
            <p className="font-principal font-bold text-base tracking-[0.12em] text-azul text-center mb-2">
              Datos Bancarios
            </p>
            <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="68" height="52" rx="8" stroke="#1A385D" strokeWidth="2.5" />
              <rect x="2" y="14" width="68" height="10" fill="#1A385D" opacity="0.15" />
              <rect x="12" y="34" width="18" height="5" rx="2" stroke="#1A385D" strokeWidth="2" />
              <rect x="36" y="34" width="10" height="5" rx="2" stroke="#1A385D" strokeWidth="2" />
            </svg>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-principal font-bold text-base text-azul">Santander</p>
              <p className="font-principal text-sm text-azul/80">José Antonio Maltes Cuevas</p>
              <p className="font-principal text-sm text-azul/60">o</p>
              <p className="font-principal text-sm text-azul/80">Yelantzi Daiana Mendoza López</p>
            </div>
            <div className="w-full h-px bg-azul/10 my-2" />
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-principal font-bold text-sm text-azul">Número de Cuenta</p>
              <p className="font-principal text-sm text-azul/70">60635144085</p>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="font-principal font-bold text-sm text-azul">CLABE:</p>
              <p className="font-principal text-sm text-azul/70">014650606351440858</p>
            </div>
          </div>
        </div>

        {/* Flor4 */}
        <div className="relative w-full mt-24">
          <div className="absolute inset-x-0 top-0 -translate-y-1/2 flex justify-center z-10 pointer-events-none">
            <Image src="/assets/componentes/flor4.png" alt="" width={119} height={120} className="w-[119px] h-auto rotate-270" />
          </div>
        </div>
      </div>
    </section>
  );
}
