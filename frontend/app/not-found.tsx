import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-[family-name:var(--font-display)] text-6xl font-light italic text-[#C9A96E] mb-4">
          404
        </p>
        <p className="font-[family-name:var(--font-body)] text-[#8C7B68] mb-6">
          Esta invitación no existe o el enlace es inválido. :) 
        </p>
        <Link
          href="/"
          className="text-xs tracking-[0.15em] uppercase text-[#8C7B68] hover:text-[#2C2416] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
