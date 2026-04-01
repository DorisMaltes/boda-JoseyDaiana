interface HeroSectionProps {
  nombreFamilia: string;
  pasesAsignados: number;
}

export default function HeroSection({ nombreFamilia, pasesAsignados }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Saludo personalizado */}
      <p
        className="animate-fade-up delay-100"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          marginBottom: '2.5rem',
        }}
      >
        {nombreFamilia} — están cordialmente invitados
        {pasesAsignados}
      </p>

      {/* Línea decorativa superior */}
      <div
        className="animate-expand-line delay-200"
        style={{
          width: '4rem',
          height: '1px',
          backgroundColor: 'var(--gold)',
          marginBottom: '2.5rem',
          transformOrigin: 'center',
        }}
      />

      {/* Encabezado "la boda de" */}
      <p
        className="animate-fade-up delay-300"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          marginBottom: '1rem',
        }}
      >
        la boda de
      </p>

      {/* Nombres */}
      <h1
        className="animate-fade-up delay-400"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--brown-deep)',
          lineHeight: 1.05,
          textAlign: 'center',
          letterSpacing: '-0.01em',
        }}
      >
        José
        <span style={{ color: 'var(--gold)', margin: '0 0.3em', fontSize: '0.6em', verticalAlign: 'middle' }}>
          &
        </span>
        Daiana
      </h1>

      {/* Línea decorativa inferior */}
      <div
        className="animate-expand-line delay-500"
        style={{
          width: '6rem',
          height: '1px',
          backgroundColor: 'var(--parchment)',
          margin: '2.5rem 0',
          transformOrigin: 'center',
        }}
      />

      {/* Fecha */}
      <p
        className="animate-fade-up delay-600"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          fontWeight: 400,
          color: 'var(--brown-deep)',
          letterSpacing: '0.08em',
          textAlign: 'center',
        }}
      >
        14 de Noviembre, 2026
      </p>

      {/* Ciudad */}
      <p
        className="animate-fade-up delay-700"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--taupe)',
          marginTop: '0.6rem',
        }}
      >
        Puebla, México
      </p>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in delay-800"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--taupe)',
          }}
        >
          desliza
        </span>
        <div
          style={{
            width: '1px',
            height: '2.5rem',
            backgroundColor: 'var(--gold)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
