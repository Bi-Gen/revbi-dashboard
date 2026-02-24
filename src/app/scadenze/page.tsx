'use client';

import { useState, useEffect, useMemo } from 'react';
import { AlertCircle, AlertTriangle, XCircle, Calendar, RefreshCw, Euro } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { revisoClient } from '@/lib/reviso-client';
import type { PaymentRequestLine, VatStatement } from '@/types/reviso';

export default function ScadenzePage() {
  const [paymentLines, setPaymentLines] = useState<PaymentRequestLine[]>([]);
  const [vatStatements, setVatStatements] = useState<VatStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'receivable' | 'payable'>('all');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [payments, vat] = await Promise.all([
        revisoClient.getPaymentRequestLines(),
        revisoClient.getVatStatements()
      ]);
      setPaymentLines(payments);
      setVatStatements(vat);
      setLoading(false);
    };
    loadData();
  }, []);

  const oggi = new Date();

  const data = useMemo(() => {
    // Filtra per tipo
    const filtered = filterType === 'all'
      ? paymentLines
      : paymentLines.filter(pl => pl.type === filterType);

    // Solo scadenze aperte
    const scadenzeAperte = filtered
      .filter(pl => pl.remainder > 0)
      .map(pl => ({
        ...pl,
        giorniRimanenti: Math.ceil(
          (new Date(pl.dueDate).getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24)
        )
      }))
      .sort((a, b) => a.giorniRimanenti - b.giorniRimanenti);

    // Statistiche
    const receivables = revisoClient.getReceivablesSummary(paymentLines);
    const payables = revisoClient.getPayablesSummary(paymentLines);

    // IVA pendente
    const ivaPendente = vatStatements
      .filter(v => v.status === 'pending')
      .reduce((sum, v) => sum + v.netVat, 0);

    return {
      scadenzeAperte,
      receivables,
      payables,
      ivaPendente,
      scaduteCrediti: scadenzeAperte.filter(s => s.type === 'receivable' && s.giorniRimanenti < 0).length,
      scaduteDebiti: scadenzeAperte.filter(s => s.type === 'payable' && s.giorniRimanenti < 0).length
    };
  }, [paymentLines, vatStatements, filterType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-500">Caricamento scadenze...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Scadenzario</h1>
          <p className="text-slate-500 text-sm">Crediti e debiti da Reviso API</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tutti
          </button>
          <button
            onClick={() => setFilterType('receivable')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'receivable'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Crediti
          </button>
          <button
            onClick={() => setFilterType('payable')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'payable'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Debiti
          </button>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Crediti da Incassare"
          value={`€${(data.receivables.total / 1000).toFixed(1)}k`}
          detail={`${data.receivables.count} scadenze`}
          icon={AlertCircle}
          color="emerald"
        />
        <KPICard
          title="Crediti Scaduti"
          value={`€${(data.receivables.overdue / 1000).toFixed(1)}k`}
          detail={`${data.receivables.overdueCount} scaduti`}
          icon={XCircle}
          color="rose"
        />
        <KPICard
          title="Debiti da Pagare"
          value={`€${(data.payables.total / 1000).toFixed(1)}k`}
          detail={`${data.payables.count} scadenze`}
          icon={AlertTriangle}
          color="amber"
        />
        <KPICard
          title="IVA da Versare"
          value={`€${data.ivaPendente.toLocaleString('it-IT')}`}
          detail="Prossima liquidazione"
          icon={Euro}
          color="indigo"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scadenze Attive (Crediti) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            Crediti da Incassare
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {data.scadenzeAperte
              .filter(s => s.type === 'receivable')
              .map((s, i) => {
                const isOverdue = s.giorniRimanenti < 0;
                const isUrgent = s.giorniRimanenti >= 0 && s.giorniRimanenti <= 7;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl ${
                      isOverdue
                        ? 'bg-rose-50'
                        : isUrgent
                        ? 'bg-amber-50'
                        : 'bg-white border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {s.customer?.name || 'Cliente'}
                        </p>
                        <p className="text-xs text-slate-500">
                          Fatt. #{s.invoice?.invoiceNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          isOverdue ? 'text-rose-600' : 'text-slate-700'
                        }`}>
                          €{s.remainder.toLocaleString('it-IT')}
                        </p>
                        <p className={`text-xs ${
                          isOverdue
                            ? 'text-rose-500 font-semibold'
                            : isUrgent
                            ? 'text-amber-600'
                            : 'text-slate-400'
                        }`}>
                          {isOverdue
                            ? `Scaduta da ${Math.abs(s.giorniRimanenti)}gg`
                            : s.giorniRimanenti === 0
                            ? 'Oggi'
                            : `${s.giorniRimanenti}gg`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {data.scadenzeAperte.filter(s => s.type === 'receivable').length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">Nessun credito aperto</p>
            )}
          </div>
        </div>

        {/* Scadenze Passive (Debiti) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
            Debiti da Pagare
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {data.scadenzeAperte
              .filter(s => s.type === 'payable')
              .map((s, i) => {
                const isOverdue = s.giorniRimanenti < 0;
                const isUrgent = s.giorniRimanenti >= 0 && s.giorniRimanenti <= 7;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl ${
                      isOverdue
                        ? 'bg-rose-50'
                        : isUrgent
                        ? 'bg-amber-50'
                        : 'bg-white border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {s.supplier?.name || 'Fornitore'}
                        </p>
                        <p className="text-xs text-slate-500">
                          Scad. {new Date(s.dueDate).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${
                          isOverdue ? 'text-rose-600' : 'text-slate-700'
                        }`}>
                          €{s.remainder.toLocaleString('it-IT')}
                        </p>
                        <p className={`text-xs ${
                          isOverdue
                            ? 'text-rose-500 font-semibold'
                            : isUrgent
                            ? 'text-amber-600'
                            : 'text-slate-400'
                        }`}>
                          {isOverdue
                            ? `Scaduta da ${Math.abs(s.giorniRimanenti)}gg`
                            : s.giorniRimanenti === 0
                            ? 'Oggi'
                            : `${s.giorniRimanenti}gg`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {data.scadenzeAperte.filter(s => s.type === 'payable').length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">Nessun debito aperto</p>
            )}
          </div>
        </div>
      </div>

      {/* VAT Section */}
      <div className="mt-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Liquidazioni IVA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vatStatements.map((vat, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl ${
                vat.status === 'pending'
                  ? 'bg-amber-50 border border-amber-200'
                  : vat.status === 'paid'
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-slate-50 border border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">{vat.period}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  vat.status === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : vat.status === 'paid'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {vat.status === 'pending' ? 'Da versare' : vat.status === 'paid' ? 'Versata' : 'Inviata'}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">IVA Vendite:</span>
                  <span className="text-slate-700">€{vat.salesVat.toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IVA Acquisti:</span>
                  <span className="text-slate-700">€{vat.purchaseVat.toLocaleString('it-IT')}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-slate-200 pt-1 mt-1">
                  <span className="text-slate-700">Saldo:</span>
                  <span className={vat.netVat > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                    €{vat.netVat.toLocaleString('it-IT')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
