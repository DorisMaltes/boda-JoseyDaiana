'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { submitRsvp } from '@/services/guestService';
import type { RsvpStatus } from '@/types';

interface Props {
  token: string;
  nombreFamilia: string;
  ApellidosFamilia?: string;
  esFamilia?: boolean;
  pasesAsignados: number;
  pasesConfirmados: number;
  statusRSVP: RsvpStatus;
  mensajeParanovios?: string;
}

/* ── Dropdown personalizado ───────────────────────────────── */
interface CustomSelectProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function CustomSelect({ placeholder, options, value, onChange }: CustomSelectProps) {
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
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-4 text-left rounded-lg border"
        style={{ backgroundColor: '#F4EBE0', borderColor: 'var(--mostaza)' }}
      >
        <span className="font-principal text-base" style={{ color: value ? 'var(--azul)' : 'var(--mostaza)' }}>
          {value || placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="var(--mostaza)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-lg border shadow-md overflow-hidden"
          style={{ backgroundColor: '#F4EBE0', borderColor: 'var(--mostaza)' }}
        >
          {options.map((opt) => (
            <button key={opt} type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full px-4 py-3 text-left font-principal text-base text-azul hover:bg-mostaza/10 transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Contenido según status ───────────────────────────────── */
function StatusConfirmado({ pasesConfirmados }: { pasesConfirmados: number }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center pb-12">
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
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <p className="font-cursiva text-5xl text-azul">Lo entendemos</p>
      <p className="font-principal text-base text-azul/70 leading-relaxed">
        Tu confirmación ha sido declinada.<br />
        Gracias por tomarte el tiempo de avisarnos con anticipación.<br />
        ¡Los tendremos en nuestros corazones ese día especial!
      </p>
    </div>
  );
}

/* ── Sección RSVP ─────────────────────────────────────────── */
export default function RSVPSection({ token, nombreFamilia, ApellidosFamilia, esFamilia, pasesAsignados, pasesConfirmados: initialPases, statusRSVP: initialStatus }: Props) {
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
    setLoading(true);
    setError('');

    try {
      if (vaAAsistir) {
        const num = parseInt(numAsistentes);
        const res = await submitRsvp({
          token,
          status: 'confirmado',
          pasesConfirmados: num,
          ...(mensaje.trim() ? { mensajeParanovios: mensaje.trim() } : {}),
        });
        setStatus(res.statusRSVP);
        setPases(res.pasesConfirmados);
      } else {
        const res = await submitRsvp({
          token,
          status: 'declinado',
          pasesConfirmados: 0,
          ...(mensaje.trim() ? { mensajeParanovios: mensaje.trim() } : {}),
        });
        setStatus(res.statusRSVP);
      }
    } catch (err) {
      setError('Hubo un error al enviar. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="rsvp" className="relative flex flex-col items-center bg-ivory px-6 pt-10 pb-0 overflow-hidden">

      {/* ── Flor3 superior centrada ─────────────────────────── */}
      <div className="mb-6">
        <Image src="/assets/componentes/flor3.png" alt="" width={220} height={120} className="w-[200px] h-auto" />
      </div>

      {/* ── Pase reservado ──────────────────────────────────── */}
      <p className="font-principal text-base text-azul text-center tracking-[0.15em] mb-2">
        Pase reservado para:
      </p>
      
      <h2 className="font-cursiva text-5xl text-azul text-center leading-tight mb-3">
        {esFamilia ? ` Familia ${ApellidosFamilia}` : nombreFamilia }
      </h2>
      <p className="font-principal text-base text-azul/70 text-center tracking-[0.08em] mb-8">
        ({pasesAsignados} {pasesAsignados === 1 ? 'persona' : 'personas'})
      </p>

      {/* ── Título formulario ───────────────────────────────── */}
      <p className="font-principal font-bold text-base text-azul text-center tracking-[0.18em] uppercase mb-2">
        Confirma tu Asistencia
      </p>
      <p className="font-principal text-sm text-azul/60 text-center tracking-[0.06em] mb-8">
        Por favor confirmar antes del 1 de junio de 2026
      </p>

      {/* ── Contenido según status ──────────────────────────── */}
      {status === 'confirmado' && <StatusConfirmado pasesConfirmados={pases} />}
      {status === 'declinado'  && <StatusDeclinado />}

      {status === 'pendiente' && (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          <CustomSelect
            placeholder="¿Asistirás a la boda?"
            options={['Sí, ahí estaremos 🎉', 'No podré asistir']}
            value={asistencia}
            onChange={(v) => { setAsistencia(v); setNumAsistentes(''); }}
          />

          {/* Dropdown de pases — solo aparece si dijo Sí */}
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

          {error && (
            <p className="font-principal text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex justify-center mt-2 mb-6">
            <button
              type="submit"
              disabled={!asistencia || (vaAAsistir && !numAsistentes) || loading}
              className="px-8 py-3 text-[22px] text-white font-cursiva-secundario bg-verde rounded-full disabled:opacity-40 transition-opacity"
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      )}

      {/* ── Regresar al inicio ──────────────────────────────── */}
      {/* ── Flor8 inferior centrada ─────────────────────────── */}
      <div className="relative w-full ">
        <div className=' flex flex-row justify-center'>
          <Image src="/assets/componentes/flor8.png" alt="" width={200} height={95} className="" />
          <Image src="/assets/componentes/flor8.png" alt="" width={200} height={95} className="" />
        </div>
        
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-20 left-4 flex flex-col items-center gap-1 group animate-bounce"
        >
          <div className="w-9 h-9 rounded-full border border-azul flex items-center justify-center transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-azul/50">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
          <span className="font-principal text-[9px] text-azul/40 tracking-[0.12em] uppercase">Inicio</span>
        </button>
      </div>

    </section>
  );
}
