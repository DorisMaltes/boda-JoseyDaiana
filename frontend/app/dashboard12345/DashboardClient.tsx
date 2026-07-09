//SE USA UN TOKEN PROP, un boton de logout  y las interacciones del CRUD UI 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { apiFetch } from '@/lib/api';

type RsvpStatus = 'pendiente' | 'confirmado' | 'declinado';
type FamiliarDe = 'novio' | 'novia';

export interface DashboardGuest {
  id: number;
  token: string;
  nombreFamilia: string;
  ApellidosFamilia?: string | null;
  esFamilia?: boolean | null;
  pasesAsignados: number;
  pasesConfirmados: number;
  statusRSVP: RsvpStatus;
  mensajeParanovios?: string | null;

  rondaInvitado: number;
  familiarDe?: FamiliarDe | null;
  ladaTelefonica?: string | null;
  numTelefonico?: string | null;

  respondedAt?: string | null;
  confirmedAt?: string | null;
  created_at: string;
}

type FilterTab = 'todos' | RsvpStatus;

const STATUS_LABEL: Record<RsvpStatus, string> = {
  confirmado: 'Confirmado',
  pendiente: 'Pendiente',
  declinado: 'Declinado',
};

const STATUS_BADGE: Record<RsvpStatus, string> = {
  confirmado: 'bg-emerald-100 text-emerald-800',
  pendiente: 'bg-amber-100 text-amber-800',
  declinado: 'bg-red-100 text-red-800',
};

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ── Modal helpers ─────────────────────────────────────────────────────────────

interface ModalProps { onClose: () => void; children: React.ReactNode }
function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4">
        {children}
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  value: string | number | boolean | undefined;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
}
function FormField({ label, value, onChange, type = 'text', required, min, max }: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        required={required}
        min={min}
        max={max}
        value={value as string | number}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}

interface NumberStepperProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}
function NumberStepper({ label, value, onChange, min = 0, max }: NumberStepperProps) {
  const decrement = () => { if (value > min) onChange(value - 1); };
  const increment = () => { if (max === undefined || value < max) onChange(value + 1); };
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
        <button type="button" onClick={decrement}
          className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors text-base font-medium disabled:opacity-30"
          disabled={value <= min}>
          −
        </button>
        <span className="flex-1 text-center text-sm font-semibold text-gray-800 select-none">
          {value}
        </span>
        <button type="button" onClick={increment}
          className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors text-base font-medium disabled:opacity-30"
          disabled={max !== undefined && value >= max}>
          +
        </button>
      </div>
    </div>
  );
}

interface FamiliarDeRadioProps {
  name: string;
  value: FamiliarDe | '' | null | undefined;
  onChange: (v: FamiliarDe) => void;
  required?: boolean;
}
function FamiliarDeRadio({ name, value, onChange, required }: FamiliarDeRadioProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        Familiar de{required ? ' *' : ''}
      </label>
      <div className="flex items-center gap-5 px-3 py-2 rounded-lg border border-gray-200">
        {(['novio', 'novia'] as const).map(opt => (
          <label key={opt} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              required={required}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-gray-900"
            />
            {opt === 'novio' ? 'Novio' : 'Novia'}
          </label>
        ))}
      </div>
    </div>
  );
}

interface PhoneFieldsProps {
  lada: string;
  num: string;
  onLadaChange: (v: string) => void;
  onNumChange: (v: string) => void;
}
function PhoneFields({ lada, num, onLadaChange, onNumChange }: PhoneFieldsProps) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Lada</label>
        <input type="text" value={lada}
          onChange={e => onLadaChange(e.target.value.replace(/[^\d+]/g, ''))}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Número telefónico</label>
        <input type="tel" inputMode="numeric" value={num} placeholder="10 dígitos"
          onChange={e => onNumChange(e.target.value.replace(/\D/g, ''))}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DashboardClient({
  guests: initialGuests,
  token,
}: {
  guests: DashboardGuest[];
  token: string;
}) {
  const router = useRouter();
  const [guests, setGuests] = useState<DashboardGuest[]>(initialGuests);
  const [filter, setFilter] = useState<FilterTab>('todos');
  const [search, setSearch] = useState('');
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  function copyInviteUrl(g: DashboardGuest) {
    navigator.clipboard.writeText(`https://www.joseaydaiana.com/i/${g.token}`);
    setCopiedId(g.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // ── Modals ──────────────────────────────────────────────────────────────────
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState<DashboardGuest | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DashboardGuest | null>(null);

  // ── Create form state ───────────────────────────────────────────────────────
  const [createForm, setCreateForm] = useState({
    nombreFamilia: '', ApellidosFamilia: '',
    pasesAsignados: '1', esFamilia: false,
    rondaInvitado: '1',
    familiarDe: '' as FamiliarDe | '',
    ladaTelefonica: '+52', numTelefonico: '',
  });

  // ── Edit form state ─────────────────────────────────────────────────────────
  const [editForm, setEditForm] = useState<Partial<DashboardGuest>>({});

  // ── Logout ──────────────────────────────────────────────────────────────────
  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  // ── CRUD actions ────────────────────────────────────────────────────────────
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setActionError(null);
    try {
      const created = await apiFetch<DashboardGuest>('/dashboard/guests', {
        method: 'POST',
        body: JSON.stringify({
          nombreFamilia: createForm.nombreFamilia,
          ApellidosFamilia: createForm.esFamilia ? (createForm.ApellidosFamilia || undefined) : undefined,
          esFamilia: createForm.esFamilia,
          pasesAsignados: Number(createForm.pasesAsignados),
          rondaInvitado: Number(createForm.rondaInvitado),
        }),
      }, token);
      setGuests(prev => [...prev, created]);
      setShowCreate(false);
      setCreateForm({ nombreFamilia: '', ApellidosFamilia: '', pasesAsignados: '1', esFamilia: false, rondaInvitado: '1' });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Error al crear invitado');
    }
  }

  function openEdit(g: DashboardGuest) {
    setEditForm({
      nombreFamilia: g.nombreFamilia,
      ApellidosFamilia: g.ApellidosFamilia ?? '',
      esFamilia: g.esFamilia ?? false,
      pasesAsignados: g.pasesAsignados,
      pasesConfirmados: g.pasesConfirmados,
      statusRSVP: g.statusRSVP,
      rondaInvitado: g.rondaInvitado
    });
    setEditTarget(g);
    setActionError(null);
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setActionError(null);
    try {
      const updated = await apiFetch<DashboardGuest>(`/dashboard/guests/${editTarget.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...editForm,
          pasesAsignados: Number(editForm.pasesAsignados),
          pasesConfirmados: Number(editForm.pasesConfirmados),
          ApellidosFamilia: editForm.esFamilia ? (editForm.ApellidosFamilia || undefined) : undefined,
        }),
      }, token);
      setGuests(prev => prev.map(g => g.id === updated.id ? updated : g));
      setEditTarget(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Error al actualizar invitado');
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setActionError(null);
    try {
      await apiFetch(`/dashboard/guests/${deleteTarget.id}`, { method: 'DELETE' }, token);
      setGuests(prev => prev.filter(g => g.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Error al eliminar invitado');
    }
  }

  // ── Derived stats ────────────────────────────────────────────────────────────
  const confirmados = guests.filter(g => g.statusRSVP === 'confirmado');
  const pendientes = guests.filter(g => g.statusRSVP === 'pendiente');
  const declinados = guests.filter(g => g.statusRSVP === 'declinado');
  const totalPasesAsignados = guests.reduce((s, g) => s + g.pasesAsignados, 0);
  const totalPasesConfirmados = confirmados.reduce((s, g) => s + g.pasesConfirmados, 0);
  const totalPasesDeclinados = declinados.reduce((s, g) => s + g.pasesAsignados, 0);
  const totalPasesPendientes = pendientes.reduce((s, g) => s + g.pasesAsignados, 0);

  const query = search.toLowerCase().trim();
  let filtered = filter === 'todos' ? guests : guests.filter(g => g.statusRSVP === filter);
  if (query) filtered = filtered.filter(g =>
    g.nombreFamilia.toLowerCase().includes(query) ||
    (g.ApellidosFamilia ?? '').toLowerCase().includes(query)
  );
  if (sortByDate !== null) {
    filtered = [...filtered].sort((a, b) => {
      const ta = a.confirmedAt ? new Date(a.confirmedAt).getTime() : 0;
      const tb = b.confirmedAt ? new Date(b.confirmedAt).getTime() : 0;
      return sortByDate === 'asc' ? ta - tb : tb - ta;
    });
  }

  const mensajes = guests.filter(g => g.mensajeParanovios?.trim());

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'todos', label: 'Todos', count: guests.length },
    { key: 'confirmado', label: 'Confirmados', count: confirmados.length },
    { key: 'pendiente', label: 'Pendientes', count: pendientes.length },
    { key: 'declinado', label: 'Declinados', count: declinados.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Modals ────────────────────────────────────────────────────────── */}

      {/* Create */}
      {showCreate && (
        <Modal onClose={() => setShowCreate(false)}>
          <h2 className="text-base font-semibold text-gray-900">Agregar invitado</h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
              <input type="text" required value={createForm.nombreFamilia}
                onChange={e => setCreateForm(p => ({ ...p, nombreFamilia: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumberStepper label="Pases asignados *" value={Number(createForm.pasesAsignados)} min={1}
                onChange={v => setCreateForm(p => ({ ...p, pasesAsignados: String(v) }))} />
              <NumberStepper label="Ronda *" value={Number(createForm.rondaInvitado)} min={1} max={3}
                onChange={v => setCreateForm(p => ({ ...p, rondaInvitado: String(v) }))} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={createForm.esFamilia}
                onChange={e => setCreateForm(p => ({ ...p, esFamilia: e.target.checked }))}
                className="rounded" />
              Es familia
            </label>
            {createForm.esFamilia && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Apellidos de familia</label>
                <input type="text" value={createForm.ApellidosFamilia}
                  onChange={e => setCreateForm(p => ({ ...p, ApellidosFamilia: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
              </div>
            )}
            {actionError && <p className="text-xs text-red-600 bg-red-50 rounded px-3 py-2">{actionError}</p>}
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setShowCreate(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit"
                className="flex-1 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700">
                Agregar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit */}
      {editTarget && (
        <Modal onClose={() => setEditTarget(null)}>
          <h2 className="text-base font-semibold text-gray-900">Editar — {editTarget.nombreFamilia}</h2>
          <form onSubmit={handleEdit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
              <input type="text" required value={editForm.nombreFamilia ?? ''}
                onChange={e => setEditForm(p => ({ ...p, nombreFamilia: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Estado RSVP</label>
              <select value={editForm.statusRSVP ?? 'pendiente'}
                onChange={e => setEditForm(p => ({ ...p, statusRSVP: e.target.value as RsvpStatus }))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white">
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="declinado">Declinado</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <NumberStepper label="Pases asignados *" value={editForm.pasesAsignados ?? 1} min={1}
                onChange={v => setEditForm(p => ({ ...p, pasesAsignados: v }))} />
              <NumberStepper label="Pases confirmados" value={editForm.pasesConfirmados ?? 0} min={0}
                max={editForm.pasesAsignados ?? undefined}
                onChange={v => setEditForm(p => ({ ...p, pasesConfirmados: v }))} />
              <NumberStepper label="Ronda" value={editForm.rondaInvitado ?? 1} min={1} max={3}
                onChange={v => setEditForm(p => ({ ...p, rondaInvitado: v }))} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={editForm.esFamilia ?? false}
                onChange={e => setEditForm(p => ({ ...p, esFamilia: e.target.checked }))}
                className="rounded" />
              Es familia
            </label>
            {editForm.esFamilia && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Apellidos de familia</label>
                <input type="text" value={editForm.ApellidosFamilia ?? ''}
                  onChange={e => setEditForm(p => ({ ...p, ApellidosFamilia: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" />
              </div>
            )}
            {actionError && <p className="text-xs text-red-600 bg-red-50 rounded px-3 py-2">{actionError}</p>}
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setEditTarget(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit"
                className="flex-1 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700">
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <h2 className="text-base font-semibold text-gray-900">¿Eliminar invitado?</h2>
          <p className="text-sm text-gray-500">
            Esto eliminará permanentemente a <strong>{deleteTarget.nombreFamilia}</strong>. No se puede deshacer.
          </p>
          {actionError && <p className="text-xs text-red-600 bg-red-50 rounded px-3 py-2">{actionError}</p>}
          <div className="flex gap-2">
            <button onClick={() => setDeleteTarget(null)}
              className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
              Cancelar
            </button>
            <button onClick={handleDelete}
              className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700">
              Eliminar
            </button>
          </div>
        </Modal>
      )}

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard — José &amp; Daiana</h1>
            <p className="text-sm text-gray-500 mt-0.5">14 de Noviembre 2026 · Puebla</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActionError(null); setShowCreate(true); }}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              + Agregar invitado
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total pases Confirmados" value={totalPasesConfirmados}
            sub={`${totalPasesAsignados} pases asignados`} color="bg-blue-50 border-blue-200 text-blue-700" />
          <StatCard label="Invitaciones Confirmadas" value={confirmados.length}
            sub={`de ${guests.length} invitaciones`} color="bg-emerald-50 border-emerald-200 text-emerald-700" />
          <StatCard label="Pendientes" value={pendientes.length}
            sub={`${totalPasesPendientes} pases sin responder`} color="bg-amber-50 border-amber-200 text-amber-700" />
          <StatCard label="Declinados" value={declinados.length}
            sub={`${totalPasesDeclinados} pases declinados`} color="bg-red-50 border-red-200 text-red-700" />
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Pases confirmados</span>
            <span className="text-sm font-semibold text-gray-900">{totalPasesConfirmados} / {totalPasesAsignados}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: totalPasesAsignados > 0 ? `${Math.round((totalPasesConfirmados / totalPasesAsignados) * 100)}%` : '0%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            {totalPasesAsignados > 0
              ? `${Math.round((totalPasesConfirmados / totalPasesAsignados) * 100)}% de los pases confirmados`
              : 'Sin datos'}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-gray-100">
            <div className="flex gap-1 overflow-x-auto flex-1">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setFilter(t.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === t.key ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  {t.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                    filter === t.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{t.count}</span>
                </button>
              ))}
            </div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por familia o apellido…"
              className="w-full sm:w-64 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-5 py-3">Invitado</th>
                  <th className="px-5 py-3">Familia</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3 text-center">Pases Asignados</th>
                  <th className="px-5 py-3 text-center">Pases Confirmados</th>
                  <th className="px-5 py-3 text-center">Ronda</th>
                  <th className="px-5 py-3">
                    <button onClick={() => setSortByDate(prev => prev === null ? 'desc' : prev === 'desc' ? 'asc' : null)}
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors">
                      CONFIRMÓ
                      <span className="text-gray-300">{sortByDate === 'desc' ? '↓' : sortByDate === 'asc' ? '↑' : '↕'}</span>
                    </button>
                  </th>
                  <th className="px-5 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-gray-400">
                      No hay invitados en esta categoría
                    </td>
                  </tr>
                )}
                {filtered.map(g => (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">{g.nombreFamilia}</td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {g.esFamilia ? (g.ApellidosFamilia ?? '-') : '-'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[g.statusRSVP]}`}>
                        {STATUS_LABEL[g.statusRSVP]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-gray-700">{g.pasesAsignados}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={g.statusRSVP === 'confirmado' ? 'font-semibold text-emerald-700' : 'text-gray-400'}>
                        {g.statusRSVP === 'pendiente' ? '—' : g.pasesConfirmados}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-gray-700">{g.rondaInvitado}</td>
                    <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap text-xs">
                      {formatDate(g.confirmedAt ?? g.respondedAt)}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button onClick={() => copyInviteUrl(g)}
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ml-1 ${
                          copiedId === g.id
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'
                        }`}>
                        {copiedId === g.id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                        {copiedId === g.id ? '¡Copiado!' : 'Copiar URL'}
                      </button>
                      <button onClick={() => openEdit(g)}
                        className="text-xs text-gray-500 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors ml-1">
                        Editar
                      </button>
                      <button onClick={() => { setActionError(null); setDeleteTarget(g); }}
                        className="text-xs text-red-400 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors ml-1">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mensajes */}
        {mensajes.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Mensajes para los novios ({mensajes.length})
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {mensajes.map(g => (
                <div key={g.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {g.pasesAsignados > 1 ? `Fam. ${g.nombreFamilia}` : g.nombreFamilia}
                    {g.ApellidosFamilia && <span className="text-gray-400 font-normal"> {g.ApellidosFamilia}</span>}
                  </p>
                  <p className="text-sm text-gray-600 italic">&ldquo;{g.mensajeParanovios!.trim()}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: number; sub: string; color: string }) {
  return (
    <div className={`rounded-xl border p-5 ${color}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-xs mt-1 opacity-70">{sub}</p>
    </div>
  );
}
