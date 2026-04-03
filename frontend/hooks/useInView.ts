import { useEffect, useRef, useState } from 'react';

/**
 * Detecta cuando un elemento entra al viewport.
 * Usa IntersectionObserver + scroll fallback para máxima compatibilidad con iOS Safari.
 */
export function useInView(offset = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setVisible(true);
      window.removeEventListener('scroll', onScroll, true);
    };

    // Fallback: scroll event con getBoundingClientRect (siempre funciona en iOS)
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + offset) show();
    };

    window.addEventListener('scroll', onScroll, { passive: true, capture: true });

    // IntersectionObserver como trigger adicional
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) show(); },
        { threshold: 0, rootMargin: `0px 0px ${offset}px 0px` }
      );
      observer.observe(el);
    }

    // Verificar inmediatamente por si ya está en viewport al montar
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll, true);
      observer?.disconnect();
    };
  }, [offset]);

  return { ref, visible };
}
