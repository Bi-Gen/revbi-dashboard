'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  color?: 'slate' | 'indigo' | 'emerald' | 'amber' | 'rose';
}

export function KPICard({
  title,
  value,
  detail,
  icon: Icon,
  trend,
  trendLabel,
  color = 'slate'
}: KPICardProps) {
  const colorClasses = {
    slate: { bg: 'bg-slate-50', text: 'text-slate-600' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-2.5 rounded-xl', colorClasses[color].bg)}>
          <Icon className={cn('w-5 h-5', colorClasses[color].text)} />
        </div>
        {trend !== undefined && (
          <span
            className={cn(
              'text-xs font-semibold px-2 py-1 rounded-full',
              trend >= 0
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-rose-50 text-rose-600'
            )}
          >
            {trend >= 0 ? '+' : ''}{trend}%{trendLabel ? ` ${trendLabel}` : ''}
          </span>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      {detail && <p className="text-slate-400 text-xs">{detail}</p>}
    </div>
  );
}
