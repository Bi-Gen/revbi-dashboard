'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { VatStatement, VatAccount } from '@/types/reviso';

interface VatSummaryProps {
  vatStatements: VatStatement[];
  vatAccounts: VatAccount[];
}

export function VatSummary({ vatStatements, vatAccounts }: VatSummaryProps) {
  const currentStatement = vatStatements.find(s => s.status === 'pending');
  const paidStatements = vatStatements.filter(s => s.status === 'paid');

  const totalVatDue = vatStatements
    .filter(s => s.status !== 'paid')
    .reduce((sum, s) => sum + s.netVat, 0);

  const chartData = currentStatement ? [
    { name: 'IVA Vendite', value: currentStatement.salesVat, color: '#10b981' },
    { name: 'IVA Acquisti', value: currentStatement.purchaseVat, color: '#ef4444' },
  ] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riepilogo IVA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Period */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-4">Periodo Corrente</h4>
            {currentStatement ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">IVA Vendite</span>
                  <span className="text-sm font-medium text-green-600">
                    +{formatCurrency(currentStatement.salesVat)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">IVA Acquisti</span>
                  <span className="text-sm font-medium text-red-600">
                    -{formatCurrency(currentStatement.purchaseVat)}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">IVA Netta</span>
                  <span className={cn(
                    'text-lg font-bold',
                    currentStatement.netVat > 0 ? 'text-blue-600' : 'text-green-600'
                  )}>
                    {currentStatement.netVat > 0 ? 'Da versare: ' : 'A credito: '}
                    {formatCurrency(Math.abs(currentStatement.netVat))}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Nessun dato disponibile</p>
            )}
          </div>

          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => typeof value === 'number' ? formatCurrency(value) : value} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* VAT Rates */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Aliquote IVA Attive</h4>
          <div className="flex flex-wrap gap-2">
            {vatAccounts.slice(0, 6).map((vat, index) => (
              <span
                key={`vat-${vat.vatAccountNumber}-${index}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {vat.name}: {vat.ratePercentage}%
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
