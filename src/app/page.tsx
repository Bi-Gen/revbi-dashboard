'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Euro, CreditCard, AlertTriangle, Users, TrendingUp, TrendingDown,
  RefreshCw, Cloud, Database
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { KPICard } from '@/components/ui/kpi-card';
import { revisoClient } from '@/lib/reviso-client';
import { mockRevenueByMonth, mockCashFlow } from '@/data/mock-data';
import type { DashboardData, Customer } from '@/types/reviso';

const BI_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function PanoramicaPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dashboardData = await revisoClient.getDashboardData();
      setData(dashboardData);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Errore nel caricamento dei dati');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calcola statistiche dai dati Reviso
  const stats = useMemo(() => {
    if (!data) return null;

    const invoices = selectedCustomer
      ? data.invoices.filter(inv => inv.customer.customerNumber === selectedCustomer.customerNumber)
      : data.invoices;

    const paymentLines = selectedCustomer
      ? data.paymentLines.filter(pl => pl.customer?.customerNumber === selectedCustomer.customerNumber)
      : data.paymentLines;

    // Fatturato totale
    const fatturato = invoices.reduce((sum, inv) => sum + inv.grossAmount, 0);

    // Incassato (fatture pagate)
    const incassato = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.grossAmount, 0);

    // Crediti da incassare (receivables)
    const receivables = revisoClient.getReceivablesSummary(paymentLines);

    // Debiti da pagare (payables)
    const payables = revisoClient.getPayablesSummary(paymentLines);

    // IVA da versare
    const ivaVersare = data.vatStatements
      .filter(v => v.status === 'pending')
      .reduce((sum, v) => sum + v.netVat, 0);

    // Top clienti per fatturato
    const fatturatoPerCliente: Record<number, { customer: typeof invoices[0]['customer'], importo: number }> = {};
    invoices.forEach(inv => {
      const key = inv.customer.customerNumber;
      if (!fatturatoPerCliente[key]) {
        fatturatoPerCliente[key] = { customer: inv.customer, importo: 0 };
      }
      fatturatoPerCliente[key].importo += inv.grossAmount;
    });

    const topClienti = Object.values(fatturatoPerCliente)
      .sort((a, b) => b.importo - a.importo)
      .slice(0, 5);

    return {
      fatturato,
      incassato,
      crediti: receivables.total,
      creditiScaduti: receivables.overdue,
      debiti: payables.total,
      debitiScaduti: payables.overdue,
      ivaVersare,
      clientiTotali: data.customers.length,
      fattureEmesse: invoices.length,
      topClienti
    };
  }, [data, selectedCustomer]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-500">Caricamento dati Reviso...</p>
        </div>
      </div>
    );
  }

  if (error || !data || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-rose-600 mb-4">{error || 'Errore nel caricamento'}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Panoramica Studio</h1>
          <p className="text-slate-500 text-sm">Dati in tempo reale da Reviso API</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Data source indicators */}
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-800">
              <Cloud className="h-3 w-3" />
              API Reviso
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800">
              <Database className="h-3 w-3" />
              Demo
            </span>
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            <RefreshCw className="h-4 w-4" />
            Aggiorna
          </button>
          {lastUpdate && (
            <span className="text-xs text-slate-400">
              {lastUpdate.toLocaleTimeString('it-IT')}
            </span>
          )}
        </div>
      </header>

      {/* Selected Customer Banner */}
      {selectedCustomer && (
        <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
          <div>
            <span className="text-sm text-indigo-600 font-medium">Filtrato per:</span>
            <span className="ml-2 text-indigo-900 font-semibold">{selectedCustomer.name}</span>
          </div>
          <button
            onClick={() => setSelectedCustomer(null)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Rimuovi filtro
          </button>
        </div>
      )}

      {/* KPI Row 1 - Fatturazione */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Fatturato"
          value={`€${(stats.fatturato / 1000).toFixed(1)}k`}
          detail={`${stats.fattureEmesse} fatture emesse`}
          icon={Euro}
          trend={12.5}
          color="indigo"
        />
        <KPICard
          title="Incassato"
          value={`€${(stats.incassato / 1000).toFixed(1)}k`}
          detail={`${stats.fatturato > 0 ? ((stats.incassato / stats.fatturato) * 100).toFixed(0) : 0}% del fatturato`}
          icon={CreditCard}
          trend={8.2}
          color="emerald"
        />
        <KPICard
          title="Crediti Aperti"
          value={`€${(stats.crediti / 1000).toFixed(1)}k`}
          detail={stats.creditiScaduti > 0 ? `€${(stats.creditiScaduti / 1000).toFixed(1)}k scaduti` : 'Nessuno scaduto'}
          icon={stats.creditiScaduti > 0 ? AlertTriangle : TrendingUp}
          color={stats.creditiScaduti > 0 ? 'amber' : 'slate'}
        />
        <KPICard
          title="Clienti Attivi"
          value={stats.clientiTotali}
          detail="Nel portafoglio"
          icon={Users}
          trend={3}
          color="indigo"
        />
      </section>

      {/* KPI Row 2 - Passivo e IVA */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Debiti da Pagare"
          value={`€${(stats.debiti / 1000).toFixed(1)}k`}
          detail={stats.debitiScaduti > 0 ? `€${(stats.debitiScaduti / 1000).toFixed(1)}k scaduti` : 'Nessuno scaduto'}
          icon={stats.debitiScaduti > 0 ? AlertTriangle : TrendingDown}
          color={stats.debitiScaduti > 0 ? 'rose' : 'slate'}
        />
        <KPICard
          title="IVA da Versare"
          value={`€${stats.ivaVersare.toLocaleString('it-IT')}`}
          detail="Prossima liquidazione"
          icon={Euro}
          color="amber"
        />
        <KPICard
          title="Cash Position"
          value={`€${((stats.crediti - stats.debiti) / 1000).toFixed(1)}k`}
          detail="Crediti - Debiti"
          icon={stats.crediti > stats.debiti ? TrendingUp : TrendingDown}
          color={stats.crediti > stats.debiti ? 'emerald' : 'rose'}
        />
        <KPICard
          title="Valore Medio Fattura"
          value={`€${stats.fattureEmesse > 0 ? (stats.fatturato / stats.fattureEmesse).toFixed(0) : 0}`}
          detail="Per fattura"
          icon={Euro}
        />
      </section>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Area Chart - Fatturato/Incassi */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Andamento Fatturato e Incassi</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueByMonth}>
                <defs>
                  <linearGradient id="colorFatt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`€${Number(value).toLocaleString('it-IT')}`, '']} />
                <Area type="monotone" dataKey="fatturato" stroke="#6366f1" strokeWidth={2} fill="url(#colorFatt)" name="Fatturato" />
                <Area type="monotone" dataKey="incassi" stroke="#10b981" strokeWidth={2} fill="url(#colorInc)" name="Incassi" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6">Cash Flow Settimanale</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCashFlow}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`€${Number(value).toLocaleString('it-IT')}`, '']} />
                <Bar dataKey="entrate" fill="#10b981" radius={[4, 4, 0, 0]} name="Entrate" />
                <Bar dataKey="uscite" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Uscite" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Accounting Totals from Reviso API */}
      {data.accountTotals.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Totali Contabili</h3>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
              API /accounting-years/totals
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.accountTotals
              .filter(t => Math.abs(t.totalInBaseCurrency) > 100)
              .sort((a, b) => Math.abs(b.totalInBaseCurrency) - Math.abs(a.totalInBaseCurrency))
              .slice(0, 12)
              .map((total, i) => {
                const account = data.accounts.find(a => a.accountNumber === total.account.accountNumber);
                const isPositive = total.totalInBaseCurrency >= 0;
                return (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 truncate" title={account?.name || `Conto ${total.account.accountNumber}`}>
                      {account?.name || `#${total.account.accountNumber}`}
                    </p>
                    <p className={`text-sm font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      €{total.totalInBaseCurrency.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clienti */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Top 5 Clienti per Fatturato</h3>
          <div className="space-y-4">
            {stats.topClienti.map((item, i) => {
              const maxImp = Math.max(...stats.topClienti.map(x => x.importo));
              const pct = (item.importo / maxImp) * 100;
              return (
                <div
                  key={i}
                  className="cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors"
                  onClick={() => {
                    const customer = data.customers.find(c => c.customerNumber === item.customer.customerNumber);
                    if (customer) setSelectedCustomer(customer);
                  }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 truncate">
                      {item.customer.name}
                    </span>
                    <span className="text-slate-500">€{item.importo.toLocaleString('it-IT')}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: BI_COLORS[i] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scadenze Imminenti */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Scadenze Imminenti</h3>
          <div className="space-y-3 max-h-[280px] overflow-y-auto">
            {data.paymentLines
              .filter(pl => pl.remainder > 0)
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 6)
              .map((pl, i) => {
                const isOverdue = pl.status === 'overdue';
                const isReceivable = pl.type === 'receivable';
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl ${
                      isOverdue ? 'bg-rose-50' : 'bg-white border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          isReceivable ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isReceivable ? 'CREDITO' : 'DEBITO'}
                        </span>
                        <p className="text-sm font-medium text-slate-700 mt-1">
                          {isReceivable ? pl.customer?.name : pl.supplier?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${isOverdue ? 'text-rose-600' : 'text-slate-700'}`}>
                          €{pl.remainder.toLocaleString('it-IT')}
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(pl.dueDate).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <section className="mt-8 p-4 bg-slate-100 rounded-xl">
        <h3 className="text-sm font-medium text-slate-700 mb-2">Sorgente Dati</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs text-slate-600">
          <div>
            <span className="font-medium">Clienti:</span> {data.customers.length}
            <span className="ml-1 text-green-600">(API)</span>
          </div>
          <div>
            <span className="font-medium">Fornitori:</span> {data.suppliers.length}
            <span className="ml-1 text-green-600">(API)</span>
          </div>
          <div>
            <span className="font-medium">Conti:</span> {data.accounts.length}
            <span className="ml-1 text-green-600">(API)</span>
          </div>
          <div>
            <span className="font-medium">Anni:</span> {data.accountingYears.length}
            <span className="ml-1 text-green-600">(API)</span>
          </div>
          <div>
            <span className="font-medium">Totali:</span> {data.accountTotals.length}
            <span className="ml-1 text-green-600">(API)</span>
          </div>
          <div>
            <span className="font-medium">Azienda:</span> {data.companyInfo ? '✓' : '-'}
            <span className="ml-1 text-green-600">(API)</span>
          </div>
          <div>
            <span className="font-medium">Fatture:</span> {data.invoices.length}
            <span className="ml-1 text-amber-600">(Mock)</span>
          </div>
          <div>
            <span className="font-medium">Scadenze:</span> {data.paymentLines.length}
            <span className="ml-1 text-amber-600">(Mock)</span>
          </div>
        </div>
        {data.companyInfo && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              <span className="font-medium">Azienda:</span> {data.companyInfo.company.name} |
              <span className="ml-2 font-medium">P.IVA:</span> {data.companyInfo.company.vatNumber} |
              <span className="ml-2 font-medium">Valuta:</span> {data.companyInfo.settings.baseCurrency}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
