'use client';

import { useEffect, useState, useMemo } from 'react';
import { revisoClient } from '@/lib/reviso-client';
import { KPIGrid } from '@/components/dashboard/kpi-card';
import { RevenueChart, CashFlowChart } from '@/components/dashboard/revenue-chart';
import { DueDatesTable } from '@/components/dashboard/due-dates-table';
import { CustomersTable } from '@/components/dashboard/customers-table';
import { VatSummary } from '@/components/dashboard/vat-summary';
import { CustomerFilter } from '@/components/dashboard/customer-filter';
import { mockRevenueByMonth, mockCashFlow } from '@/data/mock-data';
import type { DashboardData, Customer } from '@/types/reviso';
import { RefreshCw, Database, Cloud } from 'lucide-react';

export default function DashboardPage() {
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

  // Filter data based on selected customer
  const filteredData = useMemo(() => {
    if (!data) return null;
    if (!selectedCustomer) return data;

    // Filter invoices by customer (nested structure: invoice.customer.customerNumber)
    const filteredInvoices = data.invoices.filter(
      invoice => invoice.customer.customerNumber === selectedCustomer.customerNumber
    );

    // Filter payment lines by customer (only receivables have customer)
    const filteredPaymentLines = data.paymentLines.filter(
      line => line.customer?.customerNumber === selectedCustomer.customerNumber
    );

    // Only show the selected customer in the list
    const filteredCustomers = data.customers.filter(
      c => c.customerNumber === selectedCustomer.customerNumber
    );

    // Recalculate KPIs based on filtered data
    const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + inv.grossAmount, 0);
    const paidInvoices = filteredInvoices.filter(inv => inv.status === 'paid');
    const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.grossAmount, 0);
    const outstandingReceivables = filteredPaymentLines
      .filter(line => line.type === 'receivable')
      .reduce((sum, line) => sum + line.remainder, 0);
    const overdueReceivables = filteredPaymentLines
      .filter(line => line.type === 'receivable' && line.status === 'overdue')
      .reduce((sum, line) => sum + line.remainder, 0);

    const filteredKpis = [
      {
        id: 'revenue_customer',
        name: 'Fatturato Cliente',
        value: totalRevenue,
        previousValue: 0,
        change: 0,
        changePercent: 0,
        trend: 'stable' as const,
        format: 'currency' as const,
        period: 'totale'
      },
      {
        id: 'paid_customer',
        name: 'Incassato',
        value: totalPaid,
        previousValue: 0,
        change: 0,
        changePercent: totalRevenue > 0 ? (totalPaid / totalRevenue) * 100 : 0,
        trend: 'stable' as const,
        format: 'currency' as const,
        period: 'totale'
      },
      {
        id: 'outstanding_customer',
        name: 'Da Incassare',
        value: outstandingReceivables,
        previousValue: 0,
        change: 0,
        changePercent: 0,
        trend: outstandingReceivables > 0 ? 'up' as const : 'stable' as const,
        format: 'currency' as const,
        period: 'current'
      },
      {
        id: 'overdue_customer',
        name: 'Scaduto',
        value: overdueReceivables,
        previousValue: 0,
        change: 0,
        changePercent: outstandingReceivables > 0 ? (overdueReceivables / outstandingReceivables) * 100 : 0,
        trend: overdueReceivables > 0 ? 'up' as const : 'stable' as const,
        format: 'currency' as const,
        period: 'current'
      },
      {
        id: 'invoice_count_customer',
        name: 'Fatture Emesse',
        value: filteredInvoices.length,
        previousValue: 0,
        change: 0,
        changePercent: 0,
        trend: 'stable' as const,
        format: 'number' as const,
        period: 'totale'
      },
      {
        id: 'avg_invoice_customer',
        name: 'Valore Medio Fattura',
        value: filteredInvoices.length > 0 ? totalRevenue / filteredInvoices.length : 0,
        previousValue: 0,
        change: 0,
        changePercent: 0,
        trend: 'stable' as const,
        format: 'currency' as const,
        period: 'media'
      },
      {
        id: 'balance_customer',
        name: 'Saldo Cliente',
        value: selectedCustomer.balance,
        previousValue: 0,
        change: 0,
        changePercent: 0,
        trend: selectedCustomer.balance > 0 ? 'up' as const : selectedCustomer.balance < 0 ? 'down' as const : 'stable' as const,
        format: 'currency' as const,
        period: 'attuale'
      },
      {
        id: 'collection_rate',
        name: 'Tasso Incasso',
        value: totalRevenue > 0 ? (totalPaid / totalRevenue) * 100 : 0,
        previousValue: 0,
        change: 0,
        changePercent: 0,
        trend: 'stable' as const,
        format: 'percent' as const,
        period: 'totale'
      }
    ];

    return {
      ...data,
      invoices: filteredInvoices,
      paymentLines: filteredPaymentLines,
      customers: filteredCustomers,
      kpis: filteredKpis
    };
  }, [data, selectedCustomer]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Caricamento dati...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Errore sconosciuto'}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RevBI Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Business Intelligence per Commercialisti
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Customer Filter */}
              {data && (
                <CustomerFilter
                  customers={data.customers}
                  selectedCustomer={selectedCustomer}
                  onSelectCustomer={setSelectedCustomer}
                />
              )}
              {/* Data source indicators */}
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-800">
                  <Cloud className="h-3 w-3" />
                  API Live
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                  <Database className="h-3 w-3" />
                  Mock Data
                </span>
              </div>
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className="h-4 w-4" />
                Aggiorna
              </button>
              {lastUpdate && (
                <span className="text-xs text-gray-500">
                  Ultimo agg: {lastUpdate.toLocaleTimeString('it-IT')}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selected Customer Banner */}
        {selectedCustomer && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-sm text-blue-600 font-medium">Visualizzazione filtrata per:</span>
              <span className="ml-2 text-blue-900 font-semibold">{selectedCustomer.name}</span>
              <span className="ml-2 text-blue-600 text-sm">#{selectedCustomer.customerNumber}</span>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Mostra tutti
            </button>
          </div>
        )}

        {/* KPIs */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">KPI Principali</h2>
          <KPIGrid kpis={filteredData!.kpis} />
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={mockRevenueByMonth} />
          <CashFlowChart data={mockCashFlow} />
        </section>

        {/* Tables Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DueDatesTable paymentLines={filteredData!.paymentLines} type="receivable" limit={5} />
          <DueDatesTable paymentLines={filteredData!.paymentLines} type="payable" limit={5} />
        </section>

        {/* Bottom Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomersTable
            customers={filteredData!.customers}
            limit={selectedCustomer ? 1 : 5}
            onSelectCustomer={setSelectedCustomer}
          />
          <VatSummary vatStatements={filteredData!.vatStatements} vatAccounts={filteredData!.vatAccounts} />
        </section>

        {/* Debug Info */}
        <section className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Debug Info - Sorgente Dati</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
            <div>
              <span className="font-medium">Clienti:</span> {data.customers.length}
              <span className="ml-1 text-green-600">(API)</span>
            </div>
            <div>
              <span className="font-medium">Fornitori:</span> {data.suppliers.length}
              <span className="ml-1 text-green-600">(API)</span>
            </div>
            <div>
              <span className="font-medium">Fatture:</span> {data.invoices.length}
              <span className="ml-1 text-yellow-600">(Mock)</span>
            </div>
            <div>
              <span className="font-medium">Scadenze:</span> {data.paymentLines.length}
              <span className="ml-1 text-yellow-600">(Mock)</span>
            </div>
            <div>
              <span className="font-medium">Conti IVA:</span> {data.vatAccounts.length}
              <span className="ml-1 text-green-600">(API)</span>
            </div>
            <div>
              <span className="font-medium">Liquidazioni IVA:</span> {data.vatStatements.length}
              <span className="ml-1 text-yellow-600">(Mock)</span>
            </div>
            <div>
              <span className="font-medium">KPIs:</span> {data.kpis.length}
              <span className="ml-1 text-yellow-600">(Mock)</span>
            </div>
            <div>
              <span className="font-medium">Conti:</span> {data.accounts.length}
              <span className="ml-1 text-green-600">(API)</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            RevBI - Business Intelligence per Commercialisti | Powered by Reviso API
          </p>
        </div>
      </footer>
    </div>
  );
}
