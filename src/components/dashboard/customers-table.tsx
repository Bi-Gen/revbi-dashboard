'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, cn } from '@/lib/utils';
import type { Customer } from '@/types/reviso';

interface CustomersTableProps {
  customers: Customer[];
  limit?: number;
  onSelectCustomer?: (customer: Customer) => void;
}

export function CustomersTable({ customers, limit = 10, onSelectCustomer }: CustomersTableProps) {
  // Sort by balance descending
  const sorted = [...customers].sort((a, b) => b.balance - a.balance);
  const displayed = sorted.slice(0, limit);

  const totalBalance = customers.reduce((sum, c) => sum + c.balance, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Clienti per Saldo</CardTitle>
        <span className="text-sm font-medium text-gray-500">
          Totale: {formatCurrency(totalBalance)}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Città
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saldo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % Totale
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayed.map((customer) => {
                const percentage = totalBalance > 0 ? (customer.balance / totalBalance) * 100 : 0;
                return (
                  <tr
                    key={customer.customerNumber}
                    className={cn(
                      'hover:bg-gray-50 transition-colors',
                      onSelectCustomer && 'cursor-pointer hover:bg-blue-50'
                    )}
                    onClick={() => onSelectCustomer?.(customer)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          #{customer.customerNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.city || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={cn(
                        'text-sm font-medium',
                        customer.balance > 0 ? 'text-green-600' : customer.balance < 0 ? 'text-red-600' : 'text-gray-900'
                      )}>
                        {formatCurrency(customer.balance, customer.currency)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-12 text-right">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
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
