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
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Anagrafica Clienti</h1>
          <p className="text-slate-500 text-sm">Dati da Reviso API</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Cerca cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

      {/* Table */}
      <DataTable columns={columns} data={filtered} />
    </>
  );
}
