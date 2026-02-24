'use client';

import { useState, useMemo } from 'react';
import { Clock, Euro, Activity, FileText } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { DataTable } from '@/components/ui/data-table';
import { studioData } from '@/data/studio-data';

const BI_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TimesheetPage() {
  const [filterCollab, setFilterCollab] = useState('All');

  const timesheet = studioData.timesheet;
  const collaboratori = studioData.collaboratori;
  const clienti = studioData.clienti;

  const filtered = filterCollab === 'All'
    ? timesheet
    : timesheet.filter(t => t.collaboratoreId === parseInt(filterCollab));

  const stats = useMemo(() => {
    const orePerCollab: Record<number, number> = {};
    const revenuePerCollab: Record<number, number> = {};

    filtered.forEach(t => {
      const collab = collaboratori.find(c => c.id === t.collaboratoreId);
      if (collab) {
        orePerCollab[t.collaboratoreId] = (orePerCollab[t.collaboratoreId] || 0) + t.ore;
        revenuePerCollab[t.collaboratoreId] = (revenuePerCollab[t.collaboratoreId] || 0) + (t.ore * collab.tariffaOraria);
      }
    });

    const collabStats = collaboratori.map(c => ({
      ...c,
      ore: orePerCollab[c.id] || 0,
      revenue: revenuePerCollab[c.id] || 0,
      utilizzo: ((orePerCollab[c.id] || 0) / c.oreMensiliTarget * 100).toFixed(0)
    }));

    const totOre = filtered.reduce((s, t) => s + t.ore, 0);
    const totRevenue = Object.values(revenuePerCollab).reduce((s: number, v) => s + v, 0);

    return { collabStats, totOre, totRevenue };
  }, [filtered]);

  const columns = [
    {
      header: 'Data',
      accessor: 'data',
      render: (r: typeof timesheet[0]) => new Date(r.data).toLocaleDateString('it-IT')
    },
    {
      header: 'Collaboratore',
      accessor: 'collaboratoreId',
      render: (r: typeof timesheet[0]) =>
        collaboratori.find(c => c.id === r.collaboratoreId)?.nome || '-'
    },
    {
      header: 'Cliente',
      accessor: 'clienteId',
      render: (r: typeof timesheet[0]) =>
        clienti.find(c => c.id === r.clienteId)?.ragioneSociale || '-'
    },
    {
      header: 'Ore',
      accessor: 'ore',
      render: (r: typeof timesheet[0]) => r.ore.toFixed(1)
    },
    { header: 'Descrizione', accessor: 'descrizione' },
  ];

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Timesheet</h1>
          <p className="text-slate-500 text-sm">Gestione ore e produttivita</p>
        </div>
        <select
          value={filterCollab}
          onChange={(e) => setFilterCollab(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">Tutti i collaboratori</option>
          {collaboratori.map(c => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Ore Totali"
          value={stats.totOre.toFixed(1)}
          detail="Registrate"
          icon={Clock}
          color="indigo"
        />
        <KPICard
          title="Revenue Stimato"
          value={`€${(stats.totRevenue / 1000).toFixed(1)}k`}
          detail="A tariffa oraria"
          icon={Euro}
          color="emerald"
        />
        <KPICard
          title="Media Ore/Giorno"
          value={(stats.totOre / 20).toFixed(1)}
          detail="Su 20 giorni lavorativi"
          icon={Activity}
        />
        <KPICard
          title="Registrazioni"
          value={filtered.length}
          detail="Entries timesheet"
          icon={FileText}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <DataTable columns={columns} data={filtered} />
        </div>

        {/* Utilizzo Collaboratori */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Utilizzo Collaboratori</h3>
          <div className="space-y-4">
            {stats.collabStats.map((c, i) => (
              <div key={c.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">
                    {c.nome.split(' ').pop()}
                  </span>
                  <span className="text-slate-500">{c.utilizzo}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      parseInt(c.utilizzo) > 100
                        ? 'bg-rose-500'
                        : parseInt(c.utilizzo) > 80
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(parseInt(c.utilizzo), 100)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {c.ore.toFixed(0)}h / {c.oreMensiliTarget}h target
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
