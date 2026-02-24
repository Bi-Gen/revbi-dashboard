'use client';

import { useMemo } from 'react';
import { UserCog, Clock, Euro, Target } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { studioData } from '@/data/studio-data';

export default function CollaboratoriPage() {
  const collaboratori = studioData.collaboratori;
  const timesheet = studioData.timesheet;
  const fatture = studioData.fatture;
  const clienti = studioData.clienti;

  const stats = useMemo(() => {
    return collaboratori.map(c => {
      const oreCollab = timesheet.filter(t => t.collaboratoreId === c.id);
      const ore = oreCollab.reduce((s, t) => s + t.ore, 0);
      const revenue = ore * c.tariffaOraria;
      const utilizzo = (ore / c.oreMensiliTarget * 100).toFixed(0);

      // Clienti seguiti
      const clientiIds = [...new Set(oreCollab.map(t => t.clienteId))];
      const numClienti = clientiIds.length;

      // Fatturato clienti seguiti
      const fatturatoClienti = fatture.filter(f => {
        const cliente = clienti.find(cl => cl.id === f.clienteId);
        return cliente && cliente.collaboratoreId === c.id;
      }).reduce((s, f) => s + f.importo, 0);

      return { ...c, ore, revenue, utilizzo, numClienti, fatturatoClienti };
    }).sort((a, b) => b.revenue - a.revenue);
  }, []);

  const totOre = stats.reduce((s, c) => s + c.ore, 0);
  const totRevenue = stats.reduce((s, c) => s + c.revenue, 0);
  const avgUtilizzo = stats.reduce((s, c) => s + parseInt(c.utilizzo), 0) / stats.length;

  return (
    <>
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Collaboratori</h1>
        <p className="text-slate-500 text-sm">Performance e produttivita del team</p>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Team"
          value={collaboratori.length}
          detail="Collaboratori attivi"
          icon={UserCog}
          color="indigo"
        />
        <KPICard
          title="Ore Totali"
          value={totOre.toFixed(0)}
          detail="Questo mese"
          icon={Clock}
        />
        <KPICard
          title="Revenue Team"
          value={`€${(totRevenue / 1000).toFixed(0)}k`}
          detail="A tariffa oraria"
          icon={Euro}
          color="emerald"
        />
        <KPICard
          title="Media Utilizzo"
          value={`${avgUtilizzo.toFixed(0)}%`}
          detail="Del target ore"
          icon={Target}
        />
      </section>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Collaboratore
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">
                  Ruolo
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Tariffa/h
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Ore
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Utilizzo
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Revenue
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Clienti
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">
                  Fatt. Clienti
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{c.nome}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{c.ruolo}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-right">€{c.tariffaOraria}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-right">{c.ore.toFixed(1)}</td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        parseInt(c.utilizzo) > 100
                          ? 'bg-rose-100 text-rose-700'
                          : parseInt(c.utilizzo) > 80
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {c.utilizzo}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800 text-right">
                    €{c.revenue.toLocaleString('it-IT')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-right">{c.numClienti}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 text-right">
                    €{(c.fatturatoClienti / 1000).toFixed(1)}k
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
