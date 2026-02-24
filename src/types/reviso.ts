// Types based on Reviso API structure

export interface Customer {
  customerNumber: number;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
  email?: string;
  telephoneAndFaxNumber?: string;
  balance: number;
  currency: string;
  corporateIdentificationNumber?: string;
  vatZone?: {
    vatZoneNumber: number;
  };
  customerGroup?: {
    customerGroupNumber: number;
  };
  paymentTerms?: {
    paymentTermsNumber: number;
    name?: string;
    daysOfCredit?: number;
  };
}

export interface Supplier {
  supplierNumber: number;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  currency: string;
  balance?: number;
  paymentTerms?: {
    paymentTermsNumber: number;
  };
}

export interface Invoice {
  id: number;
  number: number;
  date: string;
  dueDate: string;
  customer: {
    customerNumber: number;
    name?: string;
  };
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  booked: boolean;
  remainder: number;
  lines?: InvoiceLine[];
}

export interface InvoiceLine {
  lineNumber: number;
  description: string;
  quantity: number;
  unitNetPrice: number;
  amount: number;
  vatAccount?: {
    vatAccountNumber: string;
    ratePercentage: number;
  };
}

export interface PaymentRequestLine {
  id: number;
  type: 'receivable' | 'payable';
  date: string;
  dueDate: string;
  amount: number;
  amountPaid: number;
  remainder: number;
  currency: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  customer?: {
    customerNumber: number;
    name: string;
  };
  supplier?: {
    supplierNumber: number;
    name: string;
  };
  invoice?: {
    invoiceNumber: number;
  };
}

export interface VatAccount {
  vatAccountNumber: string;
  name: string;
  ratePercentage: number;
  account: {
    accountNumber: number;
  };
  vatType: {
    vatTypeNumber: number;
    name: string;
  };
}

export interface VatStatement {
  period: string;
  periodType: 'monthly' | 'quarterly';
  year: number;
  month?: number;
  quarter?: number;
  salesVat: number;
  purchaseVat: number;
  netVat: number;
  status: 'pending' | 'submitted' | 'paid';
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  trend: 'up' | 'down' | 'stable';
  format: 'currency' | 'number' | 'percent';
  period: string;
}

export interface Account {
  accountNumber: number;
  name: string;
  accountType: 'heading' | 'status' | 'totalFrom' | 'profitAndLoss';
  balance: number;
  debitCredit: 'debit' | 'credit';
}

export interface AccountingYear {
  year: string;
  fromDate: string;
  toDate: string;
  closed: boolean;
}

export interface DashboardData {
  customers: Customer[];
  suppliers: Supplier[];
  invoices: Invoice[];
  paymentLines: PaymentRequestLine[];
  vatAccounts: VatAccount[];
  vatStatements: VatStatement[];
  kpis: KPI[];
  accounts: Account[];
}
