'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

/* ── Todas las fotos disponibles ──────────────────────────── */
const ALL_PHOTOS = [
  'STD_DAIANA & JOSE-10.jpg',
  'STD_DAIANA & JOSE-11.jpg',
  'STD_DAIANA & JOSE-12.jpg',
  'STD_DAIANA & JOSE-126.jpg',
  'STD_DAIANA & JOSE-129.jpg',
  'STD_DAIANA & JOSE-131.jpg',
  'STD_DAIANA & JOSE-141.jpg',
  'STD_DAIANA & JOSE-142.jpg',
  'STD_DAIANA & JOSE-144.jpg',
  'STD_DAIANA & JOSE-152.jpg',
  'STD_DAIANA & JOSE-155.jpg',
  'STD_DAIANA & JOSE-165.jpg',
  'STD_DAIANA & JOSE-170.jpg',
  'STD_DAIANA & JOSE-183.jpg',
  'STD_DAIANA & JOSE-191.jpg',
  'STD_DAIANA & JOSE-196.jpg',
  'STD_DAIANA & JOSE-206.jpg',
  'STD_DAIANA & JOSE-212.jpg',
  'STD_DAIANA & JOSE-220.jpg',
  'STD_DAIANA & JOSE-224.jpg',
  'STD_DAIANA & JOSE-228.jpg',
  'STD_DAIANA & JOSE-231.jpg',
  'STD_DAIANA & JOSE-235.jpg',
  'STD_DAIANA & JOSE-238.jpg',
  'STD_DAIANA & JOSE-24.jpg',
  'STD_DAIANA & JOSE-244.jpg',
  'STD_DAIANA & JOSE-250.jpg',
  'STD_DAIANA & JOSE-252.jpg',
  'STD_DAIANA & JOSE-26.jpg',
  'STD_DAIANA & JOSE-260.jpg',
  'STD_DAIANA & JOSE-262.jpg',
  'STD_DAIANA & JOSE-267.jpg',
  'STD_DAIANA & JOSE-269.jpg',
  'STD_DAIANA & JOSE-276.jpg',
  'STD_DAIANA & JOSE-284.jpg',
  'STD_DAIANA & JOSE-287.jpg',
  'STD_DAIANA & JOSE-289.jpg',
  'STD_DAIANA & JOSE-29.jpg',
  'STD_DAIANA & JOSE-295.jpg',
  'STD_DAIANA & JOSE-299.jpg',
  'STD_DAIANA & JOSE-302.jpg',
  'STD_DAIANA & JOSE-33.jpg',
  'STD_DAIANA & JOSE-67.jpg',
  'STD_DAIANA & JOSE-70.jpg',
  'STD_DAIANA & JOSE-76.jpg',
  'STD_DAIANA & JOSE-89.jpg',
  'STD_DAIANA & JOSE-9.jpg',
  'STD_DAIANA & JOSE-90.jpg',
  'STD_DAIANA & JOSE-97.jpg',
  'STD_DAIANA & JOSE-99.jpg',
].map((f) => `/assets/fotografiasGaleria/${f.replace(/ /g, '%20').replace(/&/g, '%26')}`);

function pickRandom10(): string[] {
  const copy = [...ALL_PHOTOS];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 10);
}

/* ── Card Stack ───────────────────────────────────────────── */
function CardStack({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dismissed, setDismissed] = useState<'left' | 'right' | null>(null);
  const startX = useRef<number | null>(null);

  const total = photos.length;

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    setIsDragging(true);
    setDismissed(null);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging || startX.current === null) return;
    setDragX(e.clientX - startX.current);
  }

  function onPointerUp() {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) > 80) {
      setDismissed(dragX > 0 ? 'right' : 'left');
      setTimeout(() => {
        setCurrent((p) => (p + 1) % total); // loop al llegar al final
        setDragX(0);
        setDismissed(null);
      }, 300);
    } else {
      setDragX(0);
    }
    startX.current = null;
  }

  const visibleCount = 3;

  return (
    <div className="relative w-full" style={{ height: '420px' }}>
      {Array.from({ length: visibleCount }).map((_, stackPos) => {
        const photoIndex = (current + (visibleCount - 1 - stackPos)) % total;
        const isTop = stackPos === visibleCount - 1;

        const scale   = isTop ? 1 : 1 - (visibleCount - 1 - stackPos) * 0.04;
        const offsetY = isTop ? 0 : (visibleCount - 1 - stackPos) * -10;
        const rotate  = isTop ? dragX / 18 : 0;
        const tx      = isTop
          ? dismissed === 'left'  ? -400
          : dismissed === 'right' ? 400
          : dragX
          : 0;
        const opacity = isTop
          ? dismissed ? 0 : 1
          : 1 - (visibleCount - 1 - stackPos) * 0.1;

        return (
          <div
            key={photos[photoIndex]}
            className="absolute inset-x-0 mx-auto bg-white shadow-[4px_4px_16px_rgba(0,0,0,0.15)]"
            style={{
              width: '100%',
              height: '400px',
              transform: `translateX(${tx}px) translateY(${offsetY}px) scale(${scale}) rotate(${rotate}deg)`,
              transition: isDragging && isTop ? 'none' : 'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
              opacity,
              zIndex: stackPos + 1,
              transformOrigin: 'center bottom',
              touchAction: 'none',
            }}
            onPointerDown={isTop ? onPointerDown : undefined}
            onPointerMove={isTop ? onPointerMove : undefined}
            onPointerUp={isTop ? onPointerUp : undefined}
            onPointerCancel={isTop ? onPointerUp : undefined}
          >
            <div className="relative w-full h-full p-2">
              <Image
                src={photos[photoIndex]}
                alt="Foto"
                fill
                className="object-cover object-center p-2"
                draggable={false}
              />
            </div>
          </div>
        );
      })}

      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 font-principal text-xs text-azul/40 tracking-wide">
        {(current % total) + 1} / {total}
      </p>
    </div>
  );
}

/* ── Sección principal ────────────────────────────────────── */
export default function GaleriaSection() {
  // Inicializar con fotos random directamente — solo corre en cliente
  const [photos] = useState<string[]>(() =>
    typeof window !== 'undefined' ? pickRandom10() : []
  );

  return (
    <section className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      <h2 className="font-cursiva text-6xl leading-none text-azul text-center mb-4">
        Galería
      </h2>

      <div className="flex items-center justify-center gap-4 mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-azul/40">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <p className="font-principal text-sm text-azul/50 tracking-wide">
          Desliza para ver más
        </p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-azul/40">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      {photos.length > 0 && <CardStack photos={photos} />}

      <div className="relative z-10 -mb-10 mt-8">
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
