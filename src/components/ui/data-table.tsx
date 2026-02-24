'use client';

import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Column<T = any> {
  header: string;
  accessor: string;
  render?: (row: T) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  limit?: number;
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  limit = 15
}: DataTableProps<T>) {
  const displayData = data.slice(0, limit);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-3 sm:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayData.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, j) => (
                  <td key={j} className="px-3 sm:px-6 py-2.5 sm:py-4 text-xs sm:text-sm text-slate-700 whitespace-nowrap">
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.accessor] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
        <p className="text-xs sm:text-sm text-slate-500">
          Mostrando {Math.min(limit, data.length)} di {data.length}
        </p>
      </div>
    </div>
  );
}
