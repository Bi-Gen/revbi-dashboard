'use client';

import { Menu, Building2 } from 'lucide-react';
import { studioData } from '@/data/studio-data';

interface GlobalHeaderProps {
  onMenuClick: () => void;
}

const dayNames = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

export function GlobalHeader({ onMenuClick }: GlobalHeaderProps) {
  const today = new Date();

  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-6 ml-auto">
        {/* Date */}
        <div className="text-right hidden sm:block">
          <p className="text-xs text-slate-400">{dayNames[today.getDay()]}</p>
          <p className="text-sm font-medium text-slate-700">
            {today.getDate()} {monthNames[today.getMonth()]} {today.getFullYear()}
          </p>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden sm:block" />

        {/* Studio info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800 hidden sm:block">
              {studioData.studio.name}
            </p>
            <p className="text-xs text-slate-400 hidden sm:block">
              {studioData.studio.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
