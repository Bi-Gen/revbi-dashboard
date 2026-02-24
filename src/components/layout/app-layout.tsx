'use client';

import { useState, ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { GlobalHeader } from './global-header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <GlobalHeader onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
