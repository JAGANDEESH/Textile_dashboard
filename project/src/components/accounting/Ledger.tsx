import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  reference: string;
  debit: number;
  credit: number;
  balance: number;
}

interface Account {
  name: string;
  entries: LedgerEntry[];
}

export default function Ledger() {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof LedgerEntry>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sample data
  const accounts: Account[] = [
    {
      name: 'Cash',
      entries: [
        {
          id: '1',
          date: '2025-03-01',
          description: 'Initial balance',
          reference: 'JE-001',
          debit: 10000,
          credit: 0,
          balance: 10000
        },
        {
          id: '2',
          date: '2025-03-02',
          description: 'Purchase payment',
          reference: 'JE-002',
          debit: 0,
          credit: 2500,
          balance: 7500
        }
      ]
    }
  ];

  const handleSort = (field: keyof LedgerEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof LedgerEntry }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">General Ledger</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Account
            </label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an account</option>
              {accounts.map(account => (
                <option key={account.name} value={account.name}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['date', 'description', 'reference', 'debit', 'credit', 'balance'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field as keyof LedgerEntry)}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
                >
                  <div className="flex items-center gap-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    <SortIcon field={field as keyof LedgerEntry} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {selectedAccount && accounts
              .find(account => account.name === selectedAccount)
              ?.entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-3">{entry.date}</td>
                  <td className="px-4 py-3">{entry.description}</td>
                  <td className="px-4 py-3">{entry.reference}</td>
                  <td className="px-4 py-3 text-right">
                    {entry.debit > 0 ? entry.debit.toFixed(2) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {entry.credit > 0 ? entry.credit.toFixed(2) : '-'}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {entry.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}