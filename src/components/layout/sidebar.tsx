'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Clock, Calendar, UserCog, ClipboardList,
  Briefcase, Settings, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Panoramica', path: '/' },
  { icon: Users, label: 'Clienti', path: '/clienti' },
  { icon: Clock, label: 'Timesheet', path: '/timesheet' },
  { icon: Calendar, label: 'Scadenze', path: '/scadenze' },
  { icon: UserCog, label: 'Collaboratori', path: '/collaboratori' },
  { icon: ClipboardList, label: 'Pratiche', path: '/pratiche' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed z-50',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Briefcase className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-800 tracking-tight block">
                BI Gen
              </span>
              <span className="text-xs text-slate-400">Studio Commercialista</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-slate-600">BI Gen v1.0</p>
              <p className="text-slate-400">Business Intelligence</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
