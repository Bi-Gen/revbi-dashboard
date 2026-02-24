/**
 * Reviso API Client
 * Supporta sia dati demo reali che mock data per endpoint non disponibili
 */

import type { Customer, Supplier, Invoice, PaymentRequestLine, VatAccount, VatStatement, KPI, Account } from '@/types/reviso';
import { mockInvoices, mockPaymentLines, mockVatStatements, mockKPIs } from '@/data/mock-data';

// Use local API proxy to avoid CORS issues
const BASE_URL = '/api/reviso';

class RevisoClient {
  private async fetch<T>(endpoint: string): Promise<T | null> {
    try {
      // Call our local API proxy instead of Reviso directly
      const url = `${BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        console.warn(`API Error: ${endpoint} returned ${response.status}`);
        return null;
      }

      const data = await response.json();

      // Handle paginated responses
      if (data.collection) {
        return data.collection as T;
      }
      return data as T;
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      return null;
    }
  }

  // ========== REAL API ENDPOINTS (funzionano in demo) ==========

  async getCustomers(): Promise<Customer[]> {
    const data = await this.fetch<Customer[]>('/customers');
    return data || [];
  }

  async getCustomer(customerNumber: number): Promise<Customer | null> {
    return this.fetch<Customer>(`/customers/${customerNumber}`);
  }

  async getSuppliers(): Promise<Supplier[]> {
    const data = await this.fetch<Supplier[]>('/suppliers');
    return data || [];
  }

  async getAccounts(): Promise<Account[]> {
    const data = await this.fetch<Account[]>('/accounts');
    return data || [];
  }

  async getVatAccounts(): Promise<VatAccount[]> {
    const data = await this.fetch<VatAccount[]>('/vat-accounts');
    return data || [];
  }

  async getAccountingYears(): Promise<{ year: string; fromDate: string; toDate: string; closed: boolean }[]> {
    const data = await this.fetch<{ year: string; fromDate: string; toDate: string; closed: boolean }[]>('/accounting-years');
    return data || [];
  }

  async getAccountTotals(year: string): Promise<{ account: { accountNumber: number }; totalInBaseCurrency: number }[]> {
    const data = await this.fetch<{ account: { accountNumber: number }; totalInBaseCurrency: number }[]>(`/accounting-years/${year}/totals`);
    return data || [];
  }

  async getSelf(): Promise<{
    company: { name: string; email: string; vatNumber: string };
    settings: { baseCurrency: string; vatReportingFrequency: string };
  } | null> {
    return this.fetch(`/self`);
  }

  // ========== MOCK ENDPOINTS (non disponibili in demo) ==========

  async getInvoices(): Promise<Invoice[]> {
    // In produzione chiameremmo l'API reale
    // const data = await this.fetch<Invoice[]>('/invoices/booked');
    // if (data) return data;

    // In demo usiamo mock data
    return Promise.resolve(mockInvoices);
  }

  async getPaymentRequestLines(): Promise<PaymentRequestLine[]> {
    // In produzione: return this.fetch('/payment-request-lines');
    return Promise.resolve(mockPaymentLines);
  }

  async getVatStatements(): Promise<VatStatement[]> {
    // In produzione: return this.fetch('/vat-statements');
    return Promise.resolve(mockVatStatements);
  }

  async getKPIs(): Promise<KPI[]> {
    // In produzione: return this.fetch('/kpi');
    return Promise.resolve(mockKPIs);
  }

  // ========== COMPUTED DATA ==========

  async getDashboardData() {
    const [
      customers,
      suppliers,
      invoices,
      paymentLines,
      vatAccounts,
      vatStatements,
      kpis,
      accounts
    ] = await Promise.all([
      this.getCustomers(),
      this.getSuppliers(),
      this.getInvoices(),
      this.getPaymentRequestLines(),
      this.getVatAccounts(),
      this.getVatStatements(),
      this.getKPIs(),
      this.getAccounts()
    ]);

    return {
      customers,
      suppliers,
      invoices,
      paymentLines,
      vatAccounts,
      vatStatements,
      kpis,
      accounts
    };
  }

  // ========== ANALYTICS ==========

  getReceivablesSummary(paymentLines: PaymentRequestLine[]) {
    const receivables = paymentLines.filter(p => p.type === 'receivable');
    return {
      total: receivables.reduce((sum, p) => sum + p.remainder, 0),
      overdue: receivables.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.remainder, 0),
      pending: receivables.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.remainder, 0),
      count: receivables.length,
      overdueCount: receivables.filter(p => p.status === 'overdue').length
    };
  }

  getPayablesSummary(paymentLines: PaymentRequestLine[]) {
    const payables = paymentLines.filter(p => p.type === 'payable');
    return {
      total: payables.reduce((sum, p) => sum + p.remainder, 0),
      overdue: payables.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.remainder, 0),
      pending: payables.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.remainder, 0),
      count: payables.length,
      overdueCount: payables.filter(p => p.status === 'overdue').length
    };
  }

  getInvoiceSummary(invoices: Invoice[]) {
    return {
      total: invoices.reduce((sum, i) => sum + i.grossAmount, 0),
      paid: invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.grossAmount, 0),
      outstanding: invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + i.remainder, 0),
      count: invoices.length,
      paidCount: invoices.filter(i => i.status === 'paid').length
    };
  }
}

// Export singleton instance
export const revisoClient = new RevisoClient();

// Export class for custom configurations
export { RevisoClient };
