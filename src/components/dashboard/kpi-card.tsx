'use client';

import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KPI } from '@/types/reviso';

interface KPICardProps {
  kpi: KPI;
  className?: string;
}

export function KPICard({ kpi, className }: KPICardProps) {
  const formatValue = (value: number) => {
    switch (kpi.format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return formatPercent(value);
      default:
        return formatNumber(value);
    }
  };

  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;

  const trendColor = kpi.id.includes('overdue') || kpi.id.includes('payable')
    ? (kpi.trend === 'up' ? 'text-red-600' : 'text-green-600')
    : (kpi.trend === 'up' ? 'text-green-600' : 'text-red-600');

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6 shadow-sm', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{kpi.name}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{formatValue(kpi.value)}</p>
        </div>
        {kpi.changePercent !== undefined && (
          <div className={cn('flex items-center gap-1 text-sm font-medium', trendColor)}>
            <TrendIcon className="h-4 w-4" />
            <span>{kpi.changePercent > 0 ? '+' : ''}{kpi.changePercent.toFixed(1)}%</span>
          </div>
        )}
      </div>
      {kpi.previousValue !== undefined && (
        <p className="mt-2 text-sm text-gray-500">
          vs {formatValue(kpi.previousValue)} periodo prec.
        </p>
      )}
    </div>
  );
}

interface KPIGridProps {
  kpis: KPI[];
}

export function KPIGrid({ kpis }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.slice(0, 4).map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
