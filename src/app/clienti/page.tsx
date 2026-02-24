'use client';

import { useState, useEffect, useMemo } from 'react';
import { Users, Euro, AlertTriangle, Target, RefreshCw } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { DataTable } from '@/components/ui/data-table';
import { revisoClient } from '@/lib/reviso-client';
import type { Customer, Invoice, PaymentRequestLine } from '@/types/reviso';

interface ClienteStats {
  customerNumber: number;
  name: string;
  city: string;
  balance: number;
  fatturato: number;
  incassato: number;
  crediti: number;
  currency: string;
}

export default function ClientiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentLines, setPaymentLines] = useState<PaymentRequestLine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [customersData, invoicesData, paymentsData] = await Promise.all([
        revisoClient.getCustomers(),
        revisoClient.getInvoices(),
        revisoClient.getPaymentRequestLines()
      ]);
      setCustomers(customersData);
      setInvoices(invoicesData);
      setPaymentLines(paymentsData);
      setLoading(false);
    };
    loadData();
  }, []);

  const clientiStats = useMemo((): ClienteStats[] => {
    return customers.map(c => {
      // Fatture del cliente
      const fattCliente = invoices.filter(f => f.customer.customerNumber === c.customerNumber);
      const fatturato = fattCliente.reduce((s, f) => s + f.grossAmount, 0);
      const incassato = fattCliente.filter(f => f.status === 'paid').reduce((s, f) => s + f.grossAmount, 0);

      // Crediti aperti da payment lines
      const creditiAperti = paymentLines
        .filter(pl => pl.type === 'receivable' && pl.customer?.customerNumber === c.customerNumber)
        .reduce((s, pl) => s + pl.remainder, 0);

      return {
        customerNumber: c.customerNumber,
        name: c.name,
        city: c.city || '-',
        balance: c.balance,
        fatturato,
        incassato,
        crediti: creditiAperti,
        currency: c.currency
      };
    });
  }, [customers, invoices, paymentLines]);

  const filtered = clientiStats.filter(c => {
    return c.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totFatturato = filtered.reduce((s, c) => s + c.fatturato, 0);
  const totCrediti = filtered.reduce((s, c) => s + c.crediti, 0);

  const columns = [
    {
      header: 'Cliente',
      accessor: 'name',
      render: (r: ClienteStats) => (
        <span className="font-medium">{r.name}</span>
      )
    },
    {
      header: 'Citta',
      accessor: 'city'
    },
    {
      header: 'Fatturato',
      accessor: 'fatturato',
      render: (r: ClienteStats) => `€${r.fatturato.toLocaleString('it-IT')}`
    },
    {
      header: 'Incassato',
      accessor: 'incassato',
      render: (r: ClienteStats) => `€${r.incassato.toLocaleString('it-IT')}`
    },
    {
      header: 'Crediti Aperti',
      accessor: 'crediti',
      render: (r: ClienteStats) =>
        r.crediti > 0 ? (
          <span className="text-rose-600 font-medium">€{r.crediti.toLocaleString('it-IT')}</span>
        ) : '-'
    },
    {
      header: 'Saldo Conto',
      accessor: 'balance',
      render: (r: ClienteStats) => (
        <span className={r.balance > 0 ? 'text-emerald-600' : r.balance < 0 ? 'text-rose-600' : ''}>
          €{r.balance.toLocaleString('it-IT')}
        </span>
      )
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-500">Caricamento clienti...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold text-slate-800">Anagrafica Clienti</h1>
          <p className="text-slate-500 text-xs sm:text-sm">Dati da Reviso API</p>
        </div>
        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cerca cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <KPICard
          title="Clienti Totali"
          value={filtered.length}
          detail="Nel portafoglio"
          icon={Users}
          color="indigo"
        />
        <KPICard
          title="Fatturato Totale"
          value={`€${(totFatturato / 1000).toFixed(1)}k`}
          detail="Da clienti filtrati"
          icon={Euro}
          color="emerald"
        />
        <KPICard
          title="Crediti Aperti"
          value={`€${(totCrediti / 1000).toFixed(1)}k`}
          detail="Da incassare"
          icon={AlertTriangle}
          color="amber"
        />
        <KPICard
          title="Valore Medio"
          value={`€${filtered.length > 0 ? (totFatturato / filtered.length).toFixed(0) : 0}`}
          detail="Per cliente"
          icon={Target}
        />
      </section>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filtered.slice(0, 15).map((c) => (
          <div key={c.customerNumber} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-slate-800">{c.name}</p>
                <p className="text-xs text-slate-500">{c.city}</p>
              </div>
              {c.crediti > 0 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-rose-100 text-rose-700">
                  €{c.crediti.toLocaleString('it-IT')} crediti
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Fatturato</p>
                <p className="font-medium text-slate-800">€{c.fatturato.toLocaleString('it-IT')}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Incassato</p>
                <p className="font-medium text-emerald-600">€{c.incassato.toLocaleString('it-IT')}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Saldo Conto</p>
                <p className={`font-medium ${c.balance > 0 ? 'text-emerald-600' : c.balance < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                  €{c.balance.toLocaleString('it-IT')}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Valuta</p>
                <p className="font-medium text-slate-800">{c.currency}</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length > 15 && (
          <p className="text-center text-sm text-slate-500 py-2">
            Mostrando 15 di {filtered.length} clienti
          </p>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <DataTable columns={columns} data={filtered} />
      </div>
    </>
  );
}
