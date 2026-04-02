'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

/* ── Fotos de la galería — agrega más aquí ────────────────── */
const FOTOS = [
  { src: '/assets/photos/fotoNosotrosSection.jpg', alt: 'José y Daiana' },
  { src: '/assets/photos/fotoHacienda.jpg',        alt: 'Hacienda San Antonio Arenillas' },
  { src: '/assets/photos/fotoHeroSection.png',     alt: 'José y Daiana' },
];

/* ── Sección principal ────────────────────────────────────── */
export default function GaleriaSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      {/* ── Título ─────────────────────────────────────────── */}
      <h2 className="font-cursiva text-6xl leading-none text-azul text-center mb-8">
        Galería
      </h2>

      {/* ── Postcard con sello + carousel ──────────────────── */}
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

        {/* Marco blanco */}
        <div className="bg-white pt-10 pb-8 shadow-[5px_4px_4px_0px_rgba(0,0,0,0.1)]">

          {/* Embla viewport */}
          <div className="overflow-hidden px-4" ref={emblaRef}>
            <div className="flex">
              {FOTOS.map((foto) => (
                <div key={foto.src} className="relative shrink-0 w-full h-[340px]">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <DotButtons emblaApi={emblaApi} total={FOTOS.length} />
        </div>
      </div>

      {/* ── Flor11 inferior ────────────────────────────────── */}
      <div className="relative z-10 -mb-10 mt-6">
        <Image
          src="/assets/componentes/flor11.png"
          alt=""
          width={360}
          height={131}
          className="pb-2"
        />
      </div>

    </section>
  );
}

/* ── Dots sincronizados con Embla ─────────────────────────── */
import { useCallback, useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

function DotButtons({ emblaApi, total }: { emblaApi: EmblaCarouselType | undefined; total: number }) {
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="flex justify-center gap-2 mt-5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => emblaApi?.scrollTo(i)}
          className="rounded-full transition-all duration-300"
          style={{
            width:           i === selected ? '10px' : '8px',
            height:          i === selected ? '10px' : '8px',
            backgroundColor: 'var(--azul)',
            opacity:         i === selected ? 1 : 0.3,
          }}
          aria-label={`Foto ${i + 1}`}
        />
      ))}
    </div>
  );
}
