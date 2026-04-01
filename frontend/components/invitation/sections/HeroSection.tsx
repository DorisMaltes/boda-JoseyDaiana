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
          fontFamily: 'var(--font-principal)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--terracota)',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}
      >
        {nombreFamilia} — están cordialmente invitados
      </p>

      {/* Línea decorativa superior */}
      <div
        className="animate-expand-line delay-200"
        style={{
          width: '4rem',
          height: '1px',
          backgroundColor: 'var(--mostaza)',
          marginBottom: '2.5rem',
          transformOrigin: 'center',
        }}
      />

      {/* Encabezado "la boda de" */}
      <p
        className="animate-fade-up delay-300"
        style={{
          fontFamily: 'var(--font-principal)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--azul)',
          marginBottom: '0.75rem',
          opacity: 0.7,
        }}
      >
        la boda de
      </p>

      {/* Nombres — MonteCarlo cursiva */}
      <h1
        className="animate-fade-up delay-400"
        style={{
          fontFamily: 'var(--font-cursiva)',
          fontSize: 'clamp(4rem, 18vw, 7rem)',
          fontWeight: 400,
          color: 'var(--azul)',
          lineHeight: 1.1,
          textAlign: 'center',
        }}
      >
        José
      </h1>
      <p
        className="animate-fade-up delay-400"
        style={{
          fontFamily: 'var(--font-principal)',
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--mostaza)',
          margin: '0.3rem 0',
        }}
      >
        &amp;
      </p>
      <h1
        className="animate-fade-up delay-500"
        style={{
          fontFamily: 'var(--font-cursiva)',
          fontSize: 'clamp(4rem, 18vw, 7rem)',
          fontWeight: 400,
          color: 'var(--azul)',
          lineHeight: 1.1,
          textAlign: 'center',
        }}
      >
        Daiana
      </h1>

      {/* Línea decorativa inferior */}
      <div
        className="animate-expand-line delay-600"
        style={{
          width: '5rem',
          height: '1px',
          backgroundColor: 'var(--beige)',
          margin: '2rem 0',
          transformOrigin: 'center',
        }}
      />

      {/* Fecha */}
      <p
        className="animate-fade-up delay-600"
        style={{
          fontFamily: 'var(--font-cursiva)',
          fontSize: 'clamp(1.4rem, 5vw, 2rem)',
          color: 'var(--terracota)',
          letterSpacing: '0.02em',
          textAlign: 'center',
        }}
      >
        14 de Noviembre, 2026
      </p>

      {/* Ciudad */}
      <p
        className="animate-fade-up delay-700"
        style={{
          fontFamily: 'var(--font-principal)',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--azul)',
          marginTop: '0.5rem',
          opacity: 0.6,
        }}
      >
        Puebla, México
      </p>

      {/* Pases asignados */}
      <p
        className="animate-fade-up delay-700"
        style={{
          fontFamily: 'var(--font-principal)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--mostaza)',
          marginTop: '1.5rem',
          border: '1px solid var(--beige)',
          padding: '0.4rem 1.2rem',
          borderRadius: '999px',
        }}
      >
        {pasesAsignados} {pasesAsignados === 1 ? 'pase' : 'pases'}
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
            fontFamily: 'var(--font-principal)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--azul)',
            opacity: 0.5,
          }}
        >
          desliza
        </span>
        <div
          style={{
            width: '1px',
            height: '2.5rem',
            backgroundColor: 'var(--mostaza)',
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
