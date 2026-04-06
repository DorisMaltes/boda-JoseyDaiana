'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

/* ── Todas las fotos disponibles ──────────────────────────── */
const ALL_PHOTOS = [
  'STD_DAIANA & JOSE-10.jpg','STD_DAIANA & JOSE-11.jpg','STD_DAIANA & JOSE-12.jpg',
  'STD_DAIANA & JOSE-126.jpg','STD_DAIANA & JOSE-129.jpg','STD_DAIANA & JOSE-131.jpg','STD_DAIANA & JOSE-141.jpg',
  'STD_DAIANA & JOSE-142.jpg','STD_DAIANA & JOSE-144.jpg','STD_DAIANA & JOSE-152.jpg','STD_DAIANA & JOSE-155.jpg','STD_DAIANA & JOSE-165.jpg',
  'STD_DAIANA & JOSE-170.jpg','STD_DAIANA & JOSE-183.jpg','STD_DAIANA & JOSE-191.jpg','STD_DAIANA & JOSE-196.jpg','STD_DAIANA & JOSE-206.jpg',
  'STD_DAIANA & JOSE-212.jpg','STD_DAIANA & JOSE-220.jpg','STD_DAIANA & JOSE-224.jpg','STD_DAIANA & JOSE-228.jpg','STD_DAIANA & JOSE-231.jpg',
  'STD_DAIANA & JOSE-235.jpg','STD_DAIANA & JOSE-238.jpg','STD_DAIANA & JOSE-24.jpg','STD_DAIANA & JOSE-244.jpg','STD_DAIANA & JOSE-250.jpg',
  'STD_DAIANA & JOSE-252.jpg','STD_DAIANA & JOSE-26.jpg','STD_DAIANA & JOSE-260.jpg',
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

/* ── Image Modal ──────────────────────────────────────────── */
function ImageModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,255,255,0.15)', border: 'none',
          borderRadius: '50%', width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff', fontSize: '20px',
        }}
      >
        ✕
      </button>

      {/* Imagen — detiene propagación para no cerrar al clicar la foto */}
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '100%', maxHeight: '100%' }}>
        <Image
          src={src}
          alt="Foto ampliada"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh', display: 'block' }}
        />
      </div>
    </div>
  );
}

/* ── Card Stack ───────────────────────────────────────────── */
const BACK_ROTATIONS = [-2.5, 1.8];

function CardStack({ photos, onImageClick }: { photos: string[]; onImageClick: (src: string) => void }) {
  const [current, setCurrent]       = useState(0);
  const [dragX, setDragX]           = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dismissed, setDismissed]   = useState<'left' | 'right' | null>(null);
  const startX = useRef<number | null>(null);
  const total  = photos.length;

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
      /* Swipe — avanzar carta */
      setDismissed(dragX > 0 ? 'right' : 'left');
      setTimeout(() => { setCurrent((p) => (p + 1) % total); setDragX(0); setDismissed(null); }, 300);
    } else {
      /* Tap (movimiento mínimo) — abrir modal */
      if (Math.abs(dragX) < 8) onImageClick(photos[current]);
      setDragX(0);
    }
    startX.current = null;
  }

  const visibleCount = 3;
  const CARD_WIDTH = 280;

  return (
    <div className="relative w-full" style={{ minHeight: '500px' }}>
      {Array.from({ length: visibleCount }).map((_, stackPos) => {
        const photoIndex = (current + (visibleCount - 1 - stackPos)) % total;
        const isTop  = stackPos === visibleCount - 1;
        const scale  = isTop ? 1 : 1 - (visibleCount - 1 - stackPos) * 0.03;
        const offsetY = isTop ? 0 : (visibleCount - 1 - stackPos) * 10;
        const rotate  = isTop ? dragX / 18 : BACK_ROTATIONS[stackPos] ?? 0;
        const tx      = isTop ? (dismissed === 'left' ? -400 : dismissed === 'right' ? 400 : dragX) : 0;
        const opacity = isTop ? (dismissed ? 0 : 1) : 1 - (visibleCount - 1 - stackPos) * 0.08;

        return (
          <div
            key={photos[photoIndex]}
            className="absolute bg-white shadow-[4px_4px_16px_rgba(0,0,0,0.15)]"
            style={{
              width: `${CARD_WIDTH}px`,
              left: '50%',
              top: 0,
              cursor: isTop ? 'pointer' : 'default',
              transform: `translateX(calc(-50% + ${tx}px)) translateY(${offsetY}px) scale(${scale}) rotate(${rotate}deg)`,
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
            <div className="p-2">
              <Image
                src={photos[photoIndex]}
                alt="Foto"
                width={0}
                height={0}
                sizes="280px"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                draggable={false}
              />
            </div>
          </div>
        );
      })}

      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 font-principal text-xs text-azul/40 tracking-wide" style={{ bottom: '-24px' }}>
        {(current % total) + 1} / {total}
      </p>
    </div>
  );
}

/* ── Sección principal ────────────────────────────────────── */
export default function GaleriaSection() {
  const [photos] = useState<string[]>(() =>
    typeof window !== 'undefined' ? pickRandom10() : []
  );
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section id="galeria" className="relative flex flex-col items-center bg-ivory px-6 pt-10 overflow-visible">

      <h2 className="font-cursiva text-6xl leading-none text-azul text-center mb-4">
        Galería
      </h2>

      <div className="flex items-center justify-center gap-4 mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-azul">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <p className="font-principal text-lg text-azul tracking-wide font-thin">
          Desliza para ver más
        </p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-azul">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

      {photos.length > 0 && (
        <CardStack photos={photos} onImageClick={setSelectedPhoto} />
      )}

      <div className="relative z-10 -mb-10 mt-8">
        <Image
          src="/assets/componentes/flor11.png"
          alt=""
          width={360}
          height={131}
          className="pb-2"
        />
      </div>

      {selectedPhoto && (
        <ImageModal src={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}

    </section>
  );
}
