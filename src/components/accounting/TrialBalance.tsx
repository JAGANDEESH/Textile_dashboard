import React, { useState } from 'react';
import { Download, Filter } from 'lucide-react';

interface AccountBalance {
  account: string;
  debit: number;
  credit: number;
}

export default function TrialBalance() {
  const [period, setPeriod] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Sample data
  const accounts: AccountBalance[] = [
    { account: 'Cash', debit: 10000, credit: 2500 },
    { account: 'Accounts Receivable', debit: 5000, credit: 0 },
    { account: 'Inventory', debit: 15000, credit: 0 },
    { account: 'Accounts Payable', debit: 0, credit: 8000 },
    { account: 'Sales Revenue', debit: 0, credit: 20000 },
    { account: 'Purchases', debit: 8000, credit: 0 }
  ];

  const totalDebits = accounts.reduce((sum, account) => sum + account.debit, 0);
  const totalCredits = accounts.reduce((sum, account) => sum + account.credit, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Trial Balance</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              As of Date
            </label>
            <input
              type="date"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Account</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Debit</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {accounts.map((account) => (
              <tr key={account.account}>
                <td className="px-4 py-3">{account.account}</td>
                <td className="px-4 py-3 text-right">
                  {account.debit > 0 ? account.debit.toFixed(2) : '-'}
                </td>
                <td className="px-4 py-3 text-right">
                  {account.credit > 0 ? account.credit.toFixed(2) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-medium">
            <tr>
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-right">{totalDebits.toFixed(2)}</td>
              <td className="px-4 py-3 text-right">{totalCredits.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}