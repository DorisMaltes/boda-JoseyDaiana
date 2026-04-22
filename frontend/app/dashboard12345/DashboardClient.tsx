'use client';

import { useState } from 'react';

type RsvpStatus = 'pendiente' | 'confirmado' | 'declinado';

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
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DashboardClient({ guests }: { guests: DashboardGuest[] }) {
  const [filter, setFilter] = useState<FilterTab>('todos');
  const [search, setSearch] = useState('');
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | null>(null);

  const confirmados = guests.filter(g => g.statusRSVP === 'confirmado');
  const pendientes = guests.filter(g => g.statusRSVP === 'pendiente');
  const declinados = guests.filter(g => g.statusRSVP === 'declinado');

  const totalPasesAsignados = guests.reduce((s, g) => s + g.pasesAsignados, 0);
  const totalPasesConfirmados = confirmados.reduce((s, g) => s + g.pasesConfirmados, 0);

  const query = search.toLowerCase().trim();

  let filtered =
    filter === 'todos'
      ? guests
      : guests.filter(g => g.statusRSVP === filter);

  if (query) {
    filtered = filtered.filter(g =>
      g.nombreFamilia.toLowerCase().includes(query) ||
      (g.ApellidosFamilia ?? '').toLowerCase().includes(query)
    );
  }

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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard — José &amp; Daiana
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">14 de Noviembre 2026 · Puebla</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total familias"
            value={guests.length}
            sub={`${totalPasesAsignados} pases asignados`}
            color="bg-blue-50 border-blue-200 text-blue-700"
          />
          <StatCard
            label="Confirmados"
            value={confirmados.length}
            sub={`${totalPasesConfirmados} pases confirmados`}
            color="bg-emerald-50 border-emerald-200 text-emerald-700"
          />
          <StatCard
            label="Pendientes"
            value={pendientes.length}
            sub="Sin responder"
            color="bg-amber-50 border-amber-200 text-amber-700"
          />
          <StatCard
            label="Declinados"
            value={declinados.length}
            sub="No asistirán"
            color="bg-red-50 border-red-200 text-red-700"
          />
        </div>

        {/* Pases progress bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Pases confirmados</span>
            <span className="text-sm font-semibold text-gray-900">
              {totalPasesConfirmados} / {totalPasesAsignados}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: totalPasesAsignados > 0
                  ? `${Math.round((totalPasesConfirmados / totalPasesAsignados) * 100)}%`
                  : '0%',
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            {totalPasesAsignados > 0
              ? `${Math.round((totalPasesConfirmados / totalPasesAsignados) * 100)}% de los pases confirmados`
              : 'Sin datos'}
          </p>
        </div>

        {/* Filter tabs + Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Tabs + Search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border-b border-gray-100">
            <div className="flex gap-1 overflow-x-auto flex-1">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === t.key
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      filter === t.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por familia o apellido…"
              className="w-full sm:w-64 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-5 py-3">Invitado</th>
                  <th className="px-5 py-3">Familia</th>  
                  <th className="px-5 py-3">Estado RSVP</th>
                  <th className="px-5 py-3 text-center">Pases Asignados</th>
                  <th className="px-5 py-3 text-center">Pases Confirmados</th>
                  
                  <th className="px-5 py-3">
                    <button
                      onClick={() =>
                        setSortByDate(prev =>
                          prev === null ? 'desc' : prev === 'desc' ? 'asc' : null
                        )
                      }
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    >
                      CONFIRMÓ
                      <span className="text-gray-300">
                        {sortByDate === 'desc' ? '↓' : sortByDate === 'asc' ? '↑' : '↕'}
                      </span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                      No hay invitados en esta categoría
                    </td>
                  </tr>
                )}
                {filtered.map(g => (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">
                      
                      {g.nombreFamilia}
                      
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {g.esFamilia ? (g.ApellidosFamilia ?? '-') : '-'}
                      
                      
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[g.statusRSVP]}`}
                      >
                        {STATUS_LABEL[g.statusRSVP]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center text-gray-700">{g.pasesAsignados}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span
                        className={
                          g.statusRSVP === 'confirmado'
                            ? 'font-semibold text-emerald-700'
                            : 'text-gray-400'
                        }
                      >
                        {g.statusRSVP === 'pendiente' ? '—' : g.pasesConfirmados}
                      </span>
                    </td>
                    
                    <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap text-xs">
                      {formatDate(g.confirmedAt ?? g.respondedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mensajes section */}
        {mensajes.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Mensajes para los novios ({mensajes.length})
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {mensajes.map(g => (
                <div
                  key={g.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                >
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {g.pasesAsignados > 1 ? `Fam. ${g.nombreFamilia}` : g.nombreFamilia}
                    {g.ApellidosFamilia && (
                      <span className="text-gray-400 font-normal"> {g.ApellidosFamilia}</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    &ldquo;{g.mensajeParanovios!.trim()}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: number;
  sub: string;
  color: string;
}) {
  return (
    <div className={`rounded-xl border p-5 ${color}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-xs mt-1 opacity-70">{sub}</p>
    </div>
  );
}
