'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatDate, getDaysUntilDue, cn } from '@/lib/utils';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import type { PaymentRequestLine } from '@/types/reviso';

interface DueDatesTableProps {
  paymentLines: PaymentRequestLine[];
  type?: 'receivable' | 'payable' | 'all';
  limit?: number;
}

export function DueDatesTable({ paymentLines, type = 'all', limit = 10 }: DueDatesTableProps) {
  const filtered = type === 'all'
    ? paymentLines
    : paymentLines.filter(p => p.type === type);

  const sorted = [...filtered].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const displayed = sorted.slice(0, limit);

  const getStatusBadge = (status: string, daysUntil: number) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="h-3 w-3" />
          Pagato
        </span>
      );
    }
    if (status === 'overdue' || daysUntil < 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3" />
          Scaduto
        </span>
      );
    }
    if (daysUntil <= 7) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3" />
          {daysUntil}gg
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <Clock className="h-3 w-3" />
        {daysUntil}gg
      </span>
    );
  };

  const title = type === 'receivable' ? 'Scadenze Clienti' : type === 'payable' ? 'Scadenze Fornitori' : 'Tutte le Scadenze';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {type === 'payable' ? 'Fornitore' : 'Cliente'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scadenza
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importo
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayed.map((line) => {
                const daysUntil = getDaysUntilDue(line.dueDate);
                return (
                  <tr key={line.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={cn(
                          'w-2 h-2 rounded-full mr-3',
                          line.type === 'receivable' ? 'bg-green-500' : 'bg-red-500'
                        )} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {line.customer?.name || line.supplier?.name}
                          </div>
                          {line.invoice && (
                            <div className="text-xs text-gray-500">
                              Fatt. #{line.invoice.invoiceNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(line.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      {formatCurrency(line.remainder)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(line.status, daysUntil)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
