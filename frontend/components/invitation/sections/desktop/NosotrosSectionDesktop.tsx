import Image from 'next/image';

export default function NosotrosSectionDesktop() {
  return (
    <section id="nosotros" className="relative bg-ivory py-24 px-20 overflow-visible">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-20 items-center">

        {/* ── Columna izquierda: foto + talaveras ─────────────── */}
        <div className="flex flex-col items-center">

          {/* Talavera superior */}
          <div className="w-[140px] mb-5">
            <Image src="/assets/componentes/talaveraAzul.png" alt="" width={440} height={48} className="w-full h-auto" />
          </div>

          {/* Foto oval */}
          <div className="overflow-hidden shrink-0" style={{ width: '300px', height: '420px', borderRadius: '50%' }}>
            <Image
              src="/assets/photos/fotoNosotrosSection_opt.jpg"
              alt="José y Daiana"
              width={300}
              height={420}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Talavera inferior */}
          <div className="w-[140px] mt-5 rotate-180">
            <Image src="/assets/componentes/talaveraAzul.png" alt="" width={440} height={48} className="w-full h-auto" />
          </div>
        </div>

        {/* ── Columna derecha: texto ───────────────────────────── */}
        <div className="flex flex-col items-start">

          {/* Título + hojita */}
          <div className="relative mb-6">
            <h2 className="font-cursiva text-7xl leading-none text-azul">Nosotros</h2>
            <Image
              src="/assets/componentes/hojitaNosotros.png"
              alt=""
              width={54}
              height={54}
              className="absolute -right-10 translate-x-1/2 -translate-y-1/2 "
            />
          </div>

          <div className='flex flex-col  items-center '>
              <p className="font-principal text-2xl tracking-wide text-azul leading-snug">
              José Antonio Maltes Cuevas
              </p>
              
              <p className="font-principal text-2xl text-mostaza leading-none my-2">&amp;</p>

              <p className="font-principal text-2xl tracking-wide text-azul leading-snug mb-8">
                Yelantzi Daiana Mendoza López
              </p>
          </div>

          {/* Nombres */}
         

          {/* Divider */}
          <div className="w-16 h-px bg-azul/20 mb-8" />

          {/* Bendición */}
          <p className="font-principal font-bold text-lg tracking-[0.15em] uppercase text-azul leading-relaxed mb-10">
            Con la bendición de Dios<br />y nuestros padres nos unimos en matrimonio
          </p>

          {/* Padres */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-principal text-lg text-azul tracking-wide">Laura Mendoza López</p>
              <p className="font-principal text-sm tracking-[0.15em] uppercase text-azul mt-0.5">Madre de la Novia</p>
            </div>
            <div>
              <p className="font-principal text-lg text-azul tracking-wide leading-snug">
                José Antonio Maltes García<br />Doris Elena Cuevas Tejeda
              </p>
              <p className="font-principal text-sm tracking-[0.15em] uppercase text-azul mt-0.5">Padres del Novio</p>
            </div>
          </div>
        </div>

      </div>

      {/* Flor3 centrada al fondo */}
      <div className="flex justify-center relative z-10 -mb-25 mt-10 ">
        <img src="/assets/componentes/flor3.png" alt="" className='w-80 h-auto'/>
      </div>
    </section>
  );
}
