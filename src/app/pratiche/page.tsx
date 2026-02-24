'use client';

import { useState, useMemo } from 'react';
import { ClipboardList, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { DataTable } from '@/components/ui/data-table';
import { studioData } from '@/data/studio-data';

export default function PratichePage() {
  const [filterStato, setFilterStato] = useState('All');
  const [filterTipo, setFilterTipo] = useState('All');

  const pratiche = studioData.pratiche;
  const clienti = studioData.clienti;

  const tipi = [...new Set(pratiche.map(p => p.tipo))];
  const stati = [...new Set(pratiche.map(p => p.stato))];

  const praticheEnriched = useMemo(() => {
    return pratiche.map(p => ({
      ...p,
      cliente: clienti.find(c => c.id === p.clienteId)?.ragioneSociale || '-'
    }));
  }, []);

  const filtered = praticheEnriched.filter(p => {
    const matchStato = filterStato === 'All' || p.stato === filterStato;
    const matchTipo = filterTipo === 'All' || p.tipo === filterTipo;
    return matchStato && matchTipo;
  });

  const inCorso = pratiche.filter(p => p.stato === 'in_corso').length;
  const daIniziare = pratiche.filter(p => p.stato === 'da_iniziare').length;
  const completate = pratiche.filter(p => p.stato === 'completata').length;

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Cliente', accessor: 'cliente' },
    {
      header: 'Tipo',
      accessor: 'tipo',
      render: (r: typeof praticheEnriched[0]) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            r.tipo === 'Bilancio'
              ? 'bg-emerald-100 text-emerald-700'
              : r.tipo === 'Contabilita'
              ? 'bg-blue-100 text-blue-700'
              : r.tipo === 'Dichiarazioni'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-purple-100 text-purple-700'
          }`}
        >
          {r.tipo}
        </span>
      )
    },
    { header: 'Descrizione', accessor: 'descrizione' },
    {
      header: 'Stato',
      accessor: 'stato',
      render: (r: typeof praticheEnriched[0]) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            r.stato === 'completata'
              ? 'bg-emerald-100 text-emerald-700'
              : r.stato === 'in_corso'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-slate-100 text-slate-700'
          }`}
        >
          {r.stato === 'in_corso'
            ? 'In corso'
            : r.stato === 'da_iniziare'
            ? 'Da iniziare'
            : 'Completata'}
        </span>
      )
    },
    {
      header: 'Scadenza',
      accessor: 'scadenza',
      render: (r: typeof praticheEnriched[0]) =>
        r.scadenza ? new Date(r.scadenza).toLocaleDateString('it-IT') : '-'
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-800">Gestione Pratiche</h1>
          <p className="text-slate-500 text-xs sm:text-sm">Stato e avanzamento delle pratiche</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 sm:flex-none"
          >
            <option value="All">Tutti i tipi</option>
            {tipi.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={filterStato}
            onChange={(e) => setFilterStato(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 sm:flex-none"
          >
            <option value="All">Tutti gli stati</option>
            {stati.map(s => (
              <option key={s} value={s}>
                {s === 'in_corso' ? 'In corso' : s === 'da_iniziare' ? 'Da iniziare' : 'Completata'}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <KPICard
          title="Totale Pratiche"
          value={pratiche.length}
          detail="Nel sistema"
          icon={ClipboardList}
          color="indigo"
        />
        <KPICard
          title="In Corso"
          value={inCorso}
          detail={`${((inCorso / pratiche.length) * 100).toFixed(0)}% del totale`}
          icon={Activity}
        />
        <KPICard
          title="Da Iniziare"
          value={daIniziare}
          detail="In coda"
          icon={Clock}
          color="amber"
        />
        <KPICard
          title="Completate"
          value={completate}
          detail={`${((completate / pratiche.length) * 100).toFixed(0)}% del totale`}
          icon={CheckCircle2}
          color="emerald"
        />
      </section>

      {/* Table */}
      <DataTable columns={columns} data={filtered} />
    </>
  );
}
