import React, { useState } from 'react';
import { Download, Printer, ChevronRight } from 'lucide-react';

interface AccountGroup {
  name: string;
  accounts: {
    name: string;
    amount: number;
  }[];
}

export default function BalanceSheet() {
  const [period, setPeriod] = useState<string>(new Date().toISOString().split('T')[0]);

  // Sample data
  const assets: AccountGroup[] = [
    {
      name: 'Current Assets',
      accounts: [
        { name: 'Cash', amount: 7500 },
        { name: 'Accounts Receivable', amount: 5000 },
        { name: 'Inventory', amount: 15000 }
      ]
    },
    {
      name: 'Fixed Assets',
      accounts: [
        { name: 'Equipment', amount: 25000 },
        { name: 'Buildings', amount: 150000 },
        { name: 'Accumulated Depreciation', amount: -15000 }
      ]
    }
  ];

  const liabilities: AccountGroup[] = [
    {
      name: 'Current Liabilities',
      accounts: [
        { name: 'Accounts Payable', amount: 8000 },
        { name: 'Short-term Loans', amount: 10000 }
      ]
    },
    {
      name: 'Long-term Liabilities',
      accounts: [
        { name: 'Long-term Loans', amount: 50000 }
      ]
    }
  ];

  const equity: AccountGroup[] = [
    {
      name: "Owner's Equity",
      accounts: [
        { name: 'Capital', amount: 100000 },
        { name: 'Retained Earnings', amount: 19500 }
      ]
    }
  ];

  const calculateTotal = (groups: AccountGroup[]) => {
    return groups.reduce((total, group) => 
      total + group.accounts.reduce((sum, account) => sum + account.amount, 0)
    , 0);
  };

  const totalAssets = calculateTotal(assets);
  const totalLiabilities = calculateTotal(liabilities);
  const totalEquity = calculateTotal(equity);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Balance Sheet</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            As of Date
          </label>
          <input
            type="date"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full md:w-64 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Assets */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Assets</h3>
            {assets.map((group) => (
              <div key={group.name} className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">{group.name}</h4>
                {group.accounts.map((account) => (
                  <div key={account.name} className="flex justify-between py-1 text-sm">
                    <span className="flex items-center gap-1">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      {account.name}
                    </span>
                    <span>{account.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="border-t pt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total Assets</span>
                <span>{totalAssets.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Liabilities and Equity */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liabilities</h3>
            {liabilities.map((group) => (
              <div key={group.name} className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">{group.name}</h4>
                {group.accounts.map((account) => (
                  <div key={account.name} className="flex justify-between py-1 text-sm">
                    <span className="flex items-center gap-1">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      {account.name}
                    </span>
                    <span>{account.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="border-t pt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total Liabilities</span>
                <span>{totalLiabilities.toFixed(2)}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-4">Equity</h3>
            {equity.map((group) => (
              <div key={group.name} className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">{group.name}</h4>
                {group.accounts.map((account) => (
                  <div key={account.name} className="flex justify-between py-1 text-sm">
                    <span className="flex items-center gap-1">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                      {account.name}
                    </span>
                    <span>{account.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            ))}
            <div className="border-t pt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total Equity</span>
                <span>{totalEquity.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-double border-t-2 mt-4 pt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total Liabilities and Equity</span>
                <span>{(totalLiabilities + totalEquity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}