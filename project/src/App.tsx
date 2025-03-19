import React, { useState } from 'react';
import { Gauge, Package, Zap } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ImageSlider from './components/ImageSlider';
import InfoCard from './components/InfoCard';
import CompanySection from './components/CompanySection';
import Footer from './components/Footer';
import JournalEntry from './components/accounting/JournalEntry';
import Ledger from './components/accounting/Ledger';
import TrialBalance from './components/accounting/TrialBalance';
import BalanceSheet from './components/accounting/BalanceSheet';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const infoCards = [
    {
      icon: Gauge,
      title: 'Efficient',
      description: 'Streamline your production process with our advanced management tools',
      color: 'bg-blue-500'
    },
    {
      icon: Package,
      title: 'Inventory',
      description: 'Keep track of your stock levels with real-time monitoring',
      color: 'bg-green-500'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Save time with automated workflows and processes',
      color: 'bg-purple-500'
    }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'journal-entry':
        return <JournalEntry />;
      case 'ledger':
        return <Ledger />;
      case 'trial-balance':
        return <TrialBalance />;
      case 'balance-sheet':
        return <BalanceSheet />;
      default:
        return (
          <>
            <div className="max-w-6xl mx-auto px-4 py-8">
              <ImageSlider />
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {infoCards.map((card) => (
                  <InfoCard key={card.title} {...card} />
                ))}
              </div>
            </div>
            <CompanySection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Navbar />
      <main className="ml-64 pt-16">
        {renderPage()}
        <Footer />
      </main>
    </div>
  );
}

export default App;