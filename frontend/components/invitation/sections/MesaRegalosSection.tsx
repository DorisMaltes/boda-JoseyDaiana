import Image from 'next/image';

export default function MesaRegalosSection() {
  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Flor6 esquina superior izquierda ───────────────── */}
      <div className="absolute top-0 left-0 pointer-events-none z-10">
        <Image
          src="/assets/componentes/flor6.png"
          alt=""
          width={160}
          height={160}
          className="w-[160px] h-auto"
        />
      </div>

      {/* ── Título ─────────────────────────────────────────── */}
      <h2 className="font-cursiva text-6xl leading-tight text-azul text-center mb-6 pt-4">
        Mesa de Regalos
      </h2>

      {/* ── Icono regalos ──────────────────────────────────── */}
      <div className="mb-8">
        <Image
          src="/assets/icons/REGALOS-AZUL.png"
          alt="Regalos"
          width={100}
          height={100}
          className="w-[100px] h-auto"
        />
      </div>

      {/* ── Texto descriptivo ──────────────────────────────── */}
      <p className="font-principal text-base text-azul text-center leading-relaxed mb-8 px-2">
        Sabemos el esfuerzo que requiere una boda destino, por lo que el que nos acompañen en este
        día tan especial para nosotros es el mejor regalo que podemos recibir. Sin embargo, si desean
        hacernos un obsequio adicional ponemos a su disposición las siguientes opciones.
      </p>

      {/* ── N° de evento ───────────────────────────────────── */}
      <p className="font-principal text-sm text-azul/70 text-center tracking-wide mb-4">
        N° de evento 51562546
      </p>

      {/* ── Botón Liverpool ────────────────────────────────── */}
      <a
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className=" w-62.5 text-center px-16 py-2 text-[26px] text-white font-cursiva-secundario rounded-[10px] bg-verde mb-12"
      >
        Liverpool
      </a>

      {/* ── Datos Bancarios ────────────────────────────────── */}
      <p className="font-principal font-bold text-base tracking-[0.12em] text-azul text-center mb-6">
        Datos Bancarios
      </p>

      {/* Icono tarjeta */}
      <div className="mb-6">
        <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="68" height="52" rx="8" stroke="#1A385D" strokeWidth="2.5" />
          <rect x="2" y="14" width="68" height="10" fill="#1A385D" opacity="0.15" />
          <rect x="12" y="34" width="18" height="5" rx="2" stroke="#1A385D" strokeWidth="2" />
          <rect x="36" y="34" width="10" height="5" rx="2" stroke="#1A385D" strokeWidth="2" />
        </svg>
      </div>

      {/* Info bancaria */}
      <div className="flex flex-col items-center gap-1 mb-6 text-center">
        <p className="font-principal font-bold text-base text-azul">Santander</p>
        <p className="font-principal text-sm text-azul/80">José Antonio Maltes Cuevas</p>
        <p className="font-principal text-sm text-azul/60">o</p>
        <p className="font-principal text-sm text-azul/80">Yelantzi Daiana Mendoza López</p>
      </div>

      <div className="flex flex-col items-center gap-1 mb-4 text-center">
        <p className="font-principal font-bold text-sm text-azul">Número de Cuenta</p>
        <p className="font-principal text-sm text-azul/70">60635144085</p>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-principal font-bold text-sm text-azul">CLABE:</p>
        <p className="font-principal text-sm text-azul/70">014650606351440858</p>
      </div>

      {/* ── Flor4 encima del separador inferior ────────────── */}
      <div className="relative w-full mt-26">
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
