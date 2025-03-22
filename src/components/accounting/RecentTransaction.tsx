function RecentTransactions() {
    const transactions = [
      { id: 1, type: 'Cash Payment', amount: '₹12,500', date: '2024-03-10', status: 'Completed' },
      { id: 2, type: 'Bank Receipt', amount: '₹28,000', date: '2024-03-09', status: 'Pending' },
      { id: 3, type: 'Journal Entry', amount: '₹15,750', date: '2024-03-08', status: 'Completed' },
      { id: 4, type: 'Cash Receipt', amount: '₹9,000', date: '2024-03-07', status: 'Completed' }
    ];
  
    return (
      <div className="bg-white  rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  export default RecentTransactions