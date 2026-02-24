'use client';

import { useState, useMemo } from 'react';
import { Search, X, User, Building2 } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import type { Customer } from '@/types/reviso';

interface CustomerFilterProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer | null) => void;
}

export function CustomerFilter({ customers, selectedCustomer, onSelectCustomer }: CustomerFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    const term = searchTerm.toLowerCase();
    return customers.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.customerNumber.toString().includes(term) ||
      c.city?.toLowerCase().includes(term)
    );
  }, [customers, searchTerm]);

  const handleSelect = (customer: Customer) => {
    onSelectCustomer(customer);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onSelectCustomer(null);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
            selectedCustomer
              ? 'bg-blue-50 border-blue-200 text-blue-700 rounded-r-none border-r-0'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          )}
        >
          <User className="h-4 w-4" />
          {selectedCustomer ? (
            <span className="font-medium">{selectedCustomer.name}</span>
          ) : (
            <span>Tutti i clienti</span>
          )}
        </button>
        {selectedCustomer && (
          <button
            onClick={handleClear}
            className="px-2 py-2 rounded-lg rounded-l-none bg-blue-50 border border-blue-200 border-l-0 text-blue-700 hover:bg-blue-100 transition-colors"
            title="Rimuovi filtro"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-20">
            {/* Search */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Clear filter option */}
            {selectedCustomer && (
              <button
                onClick={handleClear}
                className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
              >
                <X className="h-4 w-4" />
                Mostra tutti i clienti
              </button>
            )}

            {/* Customer List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredCustomers.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Nessun cliente trovato
                </div>
              ) : (
                filteredCustomers.map((customer) => (
                  <button
                    key={customer.customerNumber}
                    onClick={() => handleSelect(customer)}
                    className={cn(
                      'w-full px-4 py-3 text-left hover:bg-gray-50 flex items-start gap-3 border-b border-gray-50 last:border-0',
                      selectedCustomer?.customerNumber === customer.customerNumber && 'bg-blue-50'
                    )}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {customer.name}
                        </span>
                        <span className={cn(
                          'text-sm font-medium',
                          customer.balance > 0 ? 'text-green-600' : 'text-gray-500'
                        )}>
                          {formatCurrency(customer.balance, customer.currency)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">#{customer.customerNumber}</span>
                        {customer.city && (
                          <>
                            <span className="text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{customer.city}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
