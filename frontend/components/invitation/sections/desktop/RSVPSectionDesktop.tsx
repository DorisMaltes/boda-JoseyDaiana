'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { submitRsvp } from '@/services/guestService';
import type { RsvpStatus } from '@/types';

interface Props {
  token: string;
  nombreFamilia: string;
  pasesAsignados: number;
  pasesConfirmados: number;
  statusRSVP: RsvpStatus;
  mensajeParanovios?: string;
}

/* ── Dropdown ─────────────────────────────────────────────── */
function CustomSelect({ placeholder, options, value, onChange }: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  return (
    <div ref={ref} className="relative w-full">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-4 text-left rounded-lg border"
        style={{ backgroundColor: '#F4EBE0', borderColor: 'var(--mostaza)' }}>
        <span className="font-principal text-base" style={{ color: value ? 'var(--azul)' : 'var(--mostaza)' }}>
          {value || placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mostaza)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-lg border shadow-md overflow-hidden"
          style={{ backgroundColor: '#F4EBE0', borderColor: 'var(--mostaza)' }}>
          {options.map((opt) => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full px-4 py-3 text-left font-principal text-base text-azul hover:bg-mostaza/10 transition-colors">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusConfirmado({ pasesConfirmados }: { pasesConfirmados: number }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <p className="font-cursiva text-5xl text-azul">¡Gracias por confirmar!</p>
      <p className="font-principal text-base text-azul/70 leading-relaxed">
        Tu asistencia ya fue registrada.<br />
        Tienes <span className="font-bold text-azul">{pasesConfirmados} {pasesConfirmados === 1 ? 'pase confirmado' : 'pases confirmados'}</span> para la boda.<br />
        ¡Nos vemos el 14 de noviembre de 2026!
      </p>
    </div>
  );
}

function StatusDeclinado() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <p className="font-cursiva text-5xl text-azul">Lo entendemos</p>
      <p className="font-principal text-base text-azul/70 leading-relaxed">
        Tu confirmación ha sido declinada.<br />
        Gracias por tomarte el tiempo de avisarnos con anticipación.<br />
        ¡Los tendremos en nuestros corazones ese día especial!
      </p>
    </div>
  );
}

export default function RSVPSectionDesktop({ token, nombreFamilia, pasesAsignados, pasesConfirmados: initialPases, statusRSVP: initialStatus }: Props) {
  const [status, setStatus]           = useState<RsvpStatus>(initialStatus);
  const [pases, setPases]             = useState(initialPases);
  const [asistencia, setAsistencia]   = useState('');
  const [numAsistentes, setNumAsistentes] = useState('');
  const [mensaje, setMensaje]         = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const opcionesAsistentes = Array.from({ length: pasesAsignados }, (_, i) =>
    i + 1 === 1 ? '1 persona' : `${i + 1} personas`
  );
  const vaAAsistir = asistencia === 'Sí, ahí estaremos 🎉';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (vaAAsistir) {
        const res = await submitRsvp({ token, status: 'confirmado', pasesConfirmados: parseInt(numAsistentes), ...(mensaje.trim() ? { mensajeParanovios: mensaje.trim() } : {}) });
        setStatus(res.statusRSVP); setPases(res.pasesConfirmados);
      } else {
        const res = await submitRsvp({ token, status: 'declinado', pasesConfirmados: 0, ...(mensaje.trim() ? { mensajeParanovios: mensaje.trim() } : {}) });
        setStatus(res.statusRSVP);
      }
    } catch { setError('Hubo un error al enviar. Por favor intenta de nuevo.'); }
    finally { setLoading(false); }
  }

  return (
    <section id="rsvp" className="relative bg-ivory py-24 px-20 overflow-visible">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-20 items-start">

        {/* ── Columna izquierda: decorativa ───────────────────── */}
        <div className="flex flex-col items-center pt-8">
          <Image src="/assets/componentes/flor3.png" alt="" width={260} height={140} className="w-[240px] h-auto mb-8" />

          <p className="font-principal text-base text-azul text-center tracking-[0.15em] mb-2">
            Pase reservado para:
          </p>
          <h2 className="font-cursiva text-6xl text-azul text-center leading-tight mb-3">
            {pasesAsignados > 1 ? `Fam. ${nombreFamilia}` : nombreFamilia}
          </h2>
          <p className="font-principal text-base text-azul/70 text-center tracking-[0.08em]">
            ({pasesAsignados} {pasesAsignados === 1 ? 'persona' : 'personas'})
          </p>

          <div className="w-16 h-px bg-azul/20 my-8" />

          <p className="font-principal text-sm tracking-[0.2em] uppercase text-azul/60 text-center max-w-xs leading-relaxed">
            Tu presencia es el mejor regalo.<br />¡Esperamos verte el 14 de noviembre!
          </p>

          {/* Regresar al inicio */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-12 flex flex-col items-center gap-1 group animate-bounce"
          >
            <div className="w-9 h-9 rounded-full border border-azul flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-azul/50">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
            <span className="font-principal text-[9px] text-azul/40 tracking-[0.12em] uppercase">Inicio</span>
          </button>
        </div>

        {/* ── Columna derecha: formulario ──────────────────────── */}
        <div className="flex flex-col">
          <p className="font-principal font-bold text-base text-azul tracking-[0.18em] uppercase mb-8">
            Confirma tu Asistencia
          </p>

          {status === 'confirmado' && <StatusConfirmado pasesConfirmados={pases} />}
          {status === 'declinado'  && <StatusDeclinado />}

          {status === 'pendiente' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <CustomSelect
                placeholder="¿Asistirás a la boda?"
                options={['Sí, ahí estaremos 🎉', 'No podré asistir']}
                value={asistencia}
                onChange={(v) => { setAsistencia(v); setNumAsistentes(''); }}
              />
              {vaAAsistir && (
                <CustomSelect
                  placeholder="Número de asistentes"
                  options={opcionesAsistentes}
                  value={numAsistentes}
                  onChange={setNumAsistentes}
                />
              )}
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Mensaje para los novios (Opcional)"
                rows={4}
                className="w-full px-4 py-4 rounded-lg border font-principal text-base text-azul placeholder:text-mostaza/70 resize-none outline-none focus:ring-1 focus:ring-mostaza"
                style={{ backgroundColor: '#F4EBE0', borderColor: 'var(--mostaza)' }}
              />
              {error && <p className="font-principal text-sm text-red-500 text-center">{error}</p>}
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={!asistencia || (vaAAsistir && !numAsistentes) || loading}
                  className="px-10 py-3 text-[22px] text-white font-cursiva-secundario bg-verde rounded-full disabled:opacity-40 transition-opacity"
                >
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Flor8 doble al fondo */}
      <div className="flex justify-center mt-16 relative z-10 -mb-10">
        <Image src="/assets/componentes/flor8.png" alt="" width={224} height={100} />
        <Image src="/assets/componentes/flor8.png" alt="" width={224} height={100} />
      </div>
    </section>
  );
}
