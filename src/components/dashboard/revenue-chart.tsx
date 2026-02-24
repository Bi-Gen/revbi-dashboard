'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface RevenueChartProps {
  data: { month: string; fatturato: number; incassi: number; anno_prec: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fatturato vs Incassi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => typeof value === 'number' ? formatCurrency(value) : value}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend />
              <Bar dataKey="fatturato" name="Fatturato" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="incassi" name="Incassi" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="anno_prec" name="Anno Prec." fill="#d1d5db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

interface CashFlowChartProps {
  data: { week: string; entrate: number; uscite: number }[];
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  const dataWithNet = data.map(d => ({
    ...d,
    netto: d.entrate - d.uscite
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Settimanale</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataWithNet} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value) => typeof value === 'number' ? formatCurrency(value) : value}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend />
              <Line type="monotone" dataKey="entrate" name="Entrate" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="uscite" name="Uscite" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="netto" name="Netto" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
