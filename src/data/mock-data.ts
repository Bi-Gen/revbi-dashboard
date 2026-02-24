/**
 * Mock data per endpoint non disponibili in demo Reviso
 * Struttura basata su orders/quotations reali + documentazione API
 */

import type { Invoice, PaymentRequestLine, VatStatement, KPI } from '@/types/reviso';

// Mock Invoices (basato su struttura orders)
export const mockInvoices: Invoice[] = [
  {
    id: 1,
    number: 2024001,
    date: '2024-01-15',
    dueDate: '2024-02-14',
    customer: { customerNumber: 101, name: 'Datahouse Ltd.' },
    netAmount: 6551.70,
    vatAmount: 1310.34,
    grossAmount: 7862.04,
    currency: 'EUR',
    status: 'paid',
    booked: true,
    remainder: 0
  },
  {
    id: 2,
    number: 2024002,
    date: '2024-01-20',
    dueDate: '2024-02-19',
    customer: { customerNumber: 102, name: 'Schmidt Corp.' },
    netAmount: 3200.00,
    vatAmount: 704.00,
    grossAmount: 3904.00,
    currency: 'EUR',
    status: 'paid',
    booked: true,
    remainder: 0
  },
  {
    id: 3,
    number: 2024003,
    date: '2024-02-01',
    dueDate: '2024-03-02',
    customer: { customerNumber: 103, name: 'Opticia Inc.' },
    netAmount: 12500.00,
    vatAmount: 2750.00,
    grossAmount: 15250.00,
    currency: 'EUR',
    status: 'overdue',
    booked: true,
    remainder: 15250.00
  },
  {
    id: 4,
    number: 2024004,
    date: '2024-02-10',
    dueDate: '2024-03-11',
    customer: { customerNumber: 101, name: 'Datahouse Ltd.' },
    netAmount: 4800.00,
    vatAmount: 1056.00,
    grossAmount: 5856.00,
    currency: 'EUR',
    status: 'sent',
    booked: true,
    remainder: 5856.00
  },
  {
    id: 5,
    number: 2024005,
    date: '2024-02-15',
    dueDate: '2024-03-16',
    customer: { customerNumber: 104, name: 'Tech Solutions Srl' },
    netAmount: 8900.00,
    vatAmount: 1958.00,
    grossAmount: 10858.00,
    currency: 'EUR',
    status: 'sent',
    booked: true,
    remainder: 10858.00
  },
  {
    id: 6,
    number: 2024006,
    date: '2024-02-18',
    dueDate: '2024-03-19',
    customer: { customerNumber: 105, name: 'The Lawyer Office' },
    netAmount: 2300.00,
    vatAmount: 506.00,
    grossAmount: 2806.00,
    currency: 'EUR',
    status: 'draft',
    booked: false,
    remainder: 2806.00
  },
  {
    id: 7,
    number: 2024007,
    date: '2024-02-20',
    dueDate: '2024-03-21',
    customer: { customerNumber: 102, name: 'Schmidt Corp.' },
    netAmount: 15600.00,
    vatAmount: 3432.00,
    grossAmount: 19032.00,
    currency: 'EUR',
    status: 'sent',
    booked: true,
    remainder: 19032.00
  },
  {
    id: 8,
    number: 2024008,
    date: '2024-02-22',
    dueDate: '2024-03-23',
    customer: { customerNumber: 106, name: 'Global Consulting' },
    netAmount: 6200.00,
    vatAmount: 1364.00,
    grossAmount: 7564.00,
    currency: 'EUR',
    status: 'sent',
    booked: true,
    remainder: 7564.00
  }
];

// Mock Payment Request Lines (scadenze)
export const mockPaymentLines: PaymentRequestLine[] = [
  // Scadenze attive (da incassare)
  {
    id: 1,
    type: 'receivable',
    date: '2024-02-01',
    dueDate: '2024-03-02',
    amount: 15250.00,
    amountPaid: 0,
    remainder: 15250.00,
    currency: 'EUR',
    status: 'overdue',
    customer: { customerNumber: 103, name: 'Opticia Inc.' },
    invoice: { invoiceNumber: 2024003 }
  },
  {
    id: 2,
    type: 'receivable',
    date: '2024-02-10',
    dueDate: '2024-03-11',
    amount: 5856.00,
    amountPaid: 0,
    remainder: 5856.00,
    currency: 'EUR',
    status: 'pending',
    customer: { customerNumber: 101, name: 'Datahouse Ltd.' },
    invoice: { invoiceNumber: 2024004 }
  },
  {
    id: 3,
    type: 'receivable',
    date: '2024-02-15',
    dueDate: '2024-03-16',
    amount: 10858.00,
    amountPaid: 0,
    remainder: 10858.00,
    currency: 'EUR',
    status: 'pending',
    customer: { customerNumber: 104, name: 'Tech Solutions Srl' },
    invoice: { invoiceNumber: 2024005 }
  },
  {
    id: 4,
    type: 'receivable',
    date: '2024-02-20',
    dueDate: '2024-03-21',
    amount: 19032.00,
    amountPaid: 5000.00,
    remainder: 14032.00,
    currency: 'EUR',
    status: 'partial',
    customer: { customerNumber: 102, name: 'Schmidt Corp.' },
    invoice: { invoiceNumber: 2024007 }
  },
  // Scadenze passive (da pagare)
  {
    id: 5,
    type: 'payable',
    date: '2024-02-05',
    dueDate: '2024-03-05',
    amount: 8500.00,
    amountPaid: 0,
    remainder: 8500.00,
    currency: 'EUR',
    status: 'pending',
    supplier: { supplierNumber: 101, name: 'Office Supplies Ltd.' }
  },
  {
    id: 6,
    type: 'payable',
    date: '2024-02-12',
    dueDate: '2024-03-12',
    amount: 3200.00,
    amountPaid: 0,
    remainder: 3200.00,
    currency: 'EUR',
    status: 'pending',
    supplier: { supplierNumber: 102, name: 'Cleaning Services' }
  },
  {
    id: 7,
    type: 'payable',
    date: '2024-01-28',
    dueDate: '2024-02-27',
    amount: 12000.00,
    amountPaid: 0,
    remainder: 12000.00,
    currency: 'EUR',
    status: 'overdue',
    supplier: { supplierNumber: 103, name: 'Freight Company' }
  }
];

// Mock VAT Statements (liquidazioni IVA)
export const mockVatStatements: VatStatement[] = [
  {
    period: '2024-01',
    periodType: 'monthly',
    year: 2024,
    month: 1,
    salesVat: 4520.34,
    purchaseVat: 2180.00,
    netVat: 2340.34,
    status: 'paid'
  },
  {
    period: '2024-02',
    periodType: 'monthly',
    year: 2024,
    month: 2,
    salesVat: 9116.00,
    purchaseVat: 3450.00,
    netVat: 5666.00,
    status: 'pending'
  },
  {
    period: '2024-Q1',
    periodType: 'quarterly',
    year: 2024,
    quarter: 1,
    salesVat: 13636.34,
    purchaseVat: 5630.00,
    netVat: 8006.34,
    status: 'pending'
  }
];

// Mock KPIs
export const mockKPIs: KPI[] = [
  {
    id: 'revenue_mtd',
    name: 'Fatturato Mese',
    value: 54351.70,
    previousValue: 48200.00,
    change: 6151.70,
    changePercent: 12.76,
    trend: 'up',
    format: 'currency',
    period: '2024-02'
  },
  {
    id: 'revenue_ytd',
    name: 'Fatturato Anno',
    value: 112117.74,
    previousValue: 98500.00,
    change: 13617.74,
    changePercent: 13.82,
    trend: 'up',
    format: 'currency',
    period: '2024'
  },
  {
    id: 'outstanding_receivables',
    name: 'Crediti da Incassare',
    value: 45996.00,
    previousValue: 38000.00,
    change: 7996.00,
    changePercent: 21.04,
    trend: 'up',
    format: 'currency',
    period: 'current'
  },
  {
    id: 'outstanding_payables',
    name: 'Debiti da Pagare',
    value: 23700.00,
    previousValue: 25000.00,
    change: -1300.00,
    changePercent: -5.20,
    trend: 'down',
    format: 'currency',
    period: 'current'
  },
  {
    id: 'overdue_receivables',
    name: 'Crediti Scaduti',
    value: 15250.00,
    previousValue: 8500.00,
    change: 6750.00,
    changePercent: 79.41,
    trend: 'up',
    format: 'currency',
    period: 'current'
  },
  {
    id: 'vat_balance',
    name: 'IVA da Versare',
    value: 5666.00,
    previousValue: 2340.34,
    change: 3325.66,
    changePercent: 142.11,
    trend: 'up',
    format: 'currency',
    period: '2024-02'
  },
  {
    id: 'invoice_count_mtd',
    name: 'Fatture Emesse (Mese)',
    value: 6,
    previousValue: 4,
    change: 2,
    changePercent: 50,
    trend: 'up',
    format: 'number',
    period: '2024-02'
  },
  {
    id: 'avg_invoice_value',
    name: 'Valore Medio Fattura',
    value: 9058.62,
    previousValue: 8500.00,
    change: 558.62,
    changePercent: 6.57,
    trend: 'up',
    format: 'currency',
    period: '2024-02'
  }
];

// Dati per grafici
export const mockRevenueByMonth = [
  { month: 'Gen', fatturato: 48200, incassi: 45000, anno_prec: 42000 },
  { month: 'Feb', fatturato: 54351, incassi: 38500, anno_prec: 48500 },
  { month: 'Mar', fatturato: 0, incassi: 0, anno_prec: 51200 },
  { month: 'Apr', fatturato: 0, incassi: 0, anno_prec: 49800 },
  { month: 'Mag', fatturato: 0, incassi: 0, anno_prec: 55600 },
  { month: 'Giu', fatturato: 0, incassi: 0, anno_prec: 52300 },
];

export const mockCashFlow = [
  { week: 'Sett 1', entrate: 12500, uscite: 8200 },
  { week: 'Sett 2', entrate: 18300, uscite: 15600 },
  { week: 'Sett 3', entrate: 9800, uscite: 7400 },
  { week: 'Sett 4', entrate: 22400, uscite: 12300 },
];

export const mockAgingReport = [
  { range: '0-30 gg', amount: 24746, count: 3 },
  { range: '31-60 gg', amount: 15250, count: 1 },
  { range: '61-90 gg', amount: 6000, count: 1 },
  { range: '>90 gg', amount: 0, count: 0 },
];
