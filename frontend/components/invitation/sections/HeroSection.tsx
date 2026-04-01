import Image from 'next/image';

interface HeroSectionProps {
  nombreFamilia: string;
  pasesAsignados: number;
}

export default function HeroSection({ nombreFamilia, pasesAsignados }: HeroSectionProps) {
  return (
    <section
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      {/* ── Saludo personalizado ───────────────────────────── */}
      <div
        className="animate-fade-in delay-100"
        style={{
          textAlign: 'center',
          padding: '1.25rem 1.5rem 0',
          fontFamily: 'var(--font-principal)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--terracota)',
        }}
      >
        {nombreFamilia} &nbsp;·&nbsp; {pasesAsignados} {pasesAsignados === 1 ? 'pase' : 'pases'}
      </div>

      {/* ── Flores + Sello ─────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          flexShrink: 0,
        }}
      >
        {/* Flor izquierda */}
        <div
          className="animate-fade-in delay-200"
          style={{
            position: 'absolute',
            top: 0,
            left: '-12px',
            width: '200px',
            height: '200px',
          }}
        >
          <Image
            src="/assets/componentes/flor1.png"
            alt=""
            fill
            style={{ objectFit: 'contain', objectPosition: 'top left' }}
            priority
          />
        </div>

        {/* Flor derecha */}
        <div
          className="animate-fade-in delay-200"
          style={{
            position: 'absolute',
            top: 0,
            right: '-12px',
            width: '200px',
            height: '200px',
          }}
        >
          <Image
            src="/assets/componentes/flor2.png"
            alt=""
            fill
            style={{ objectFit: 'contain', objectPosition: 'top right' }}
            priority
          />
        </div>

        {/* Sello / Monograma — centrado, superpuesto */}
        <div
          className="animate-fade-up delay-400"
          style={{
            position: 'absolute',
            bottom: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '76px',
            height: '76px',
            zIndex: 10,
          }}
        >
          <Image
            src="/assets/componentes/monogramaSello.png"
            alt="Monograma"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* ── Texto central ──────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '2.8rem',
          paddingBottom: '1.5rem',
          gap: '0',
          zIndex: 1,
        }}
      >
        {/* "NUESTRA BODA" */}
        <p
          className="animate-fade-up delay-500"
          style={{
            fontFamily: 'var(--font-principal)',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--azul)',
            opacity: 0.6,
            marginBottom: '0.5rem',
          }}
        >
          nuestra boda
        </p>

        {/* José */}
        <h1
          className="animate-fade-up delay-500"
          style={{
            fontFamily: 'var(--font-cursiva)',
            fontSize: 'clamp(3.8rem, 17vw, 6rem)',
            fontWeight: 400,
            color: 'var(--azul)',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          José
        </h1>

        {/* & */}
        <p
          className="animate-fade-up delay-600"
          style={{
            fontFamily: 'var(--font-cursiva)',
            fontSize: 'clamp(1.6rem, 7vw, 2.4rem)',
            color: 'var(--mostaza)',
            lineHeight: 1,
            margin: '0.1rem 0',
          }}
        >
          &amp;
        </p>

        {/* Daiana */}
        <h1
          className="animate-fade-up delay-600"
          style={{
            fontFamily: 'var(--font-cursiva)',
            fontSize: 'clamp(3.8rem, 17vw, 6rem)',
            fontWeight: 400,
            color: 'var(--azul)',
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          Daiana
        </h1>

        {/* Hojita SVG */}
        <div
          className="animate-fade-in delay-700"
          style={{ margin: '0.75rem 0 0.6rem' }}
        >
          <Image
            src="/assets/componentes/hojita.svg"
            alt=""
            width={34}
            height={34}
          />
        </div>

        {/* Fecha */}
        <p
          className="animate-fade-up delay-700"
          style={{
            fontFamily: 'var(--font-principal)',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--azul)',
            opacity: 0.75,
          }}
        >
          14 de noviembre 2026
        </p>
      </div>

      {/* ── Foto de los novios ─────────────────────────────── */}
      <div
        className="animate-fade-in delay-800"
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '320px',
        }}
      >
        <Image
          src="/assets/photos/fotoHeroSection.png"
          alt="José y Daiana"
          fill
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          priority
        />
      </div>

    </section>
  );
}
