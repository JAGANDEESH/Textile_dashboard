import { CreditCard, Wallet, Building2, BookOpen, TrendingUp, TrendingDown, ArrowDownUp } from "lucide-react";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function DashboardCards() {
    const cards = [
        { 
            title: 'Cash Payment', 
            value: '₹1,85,000', 
            change: '-5.2%', 
            icon: <CreditCard size={24} />, 
            color: 'from-red-500 to-red-600', 
            trend: 'down' 
        },
        { 
            title: 'Cash Receipt', 
            value: '₹2,75,000', 
            change: '+10.8%', 
            icon: <Wallet size={24} />, 
            color: 'from-blue-500 to-blue-600', 
            trend: 'up' 
        },
        { 
            title: 'Bank Payment', 
            value: '₹90,000', 
            change: '-3.1%', 
            icon: <Building2 size={24} />,  
            color: 'from-green-500 to-green-600', 
            trend: 'down' 
        },
        { 
            title: 'Bank Receipt', 
            value: '₹90,000', 
            change: '+7.1%', 
            icon: <Building2 size={24} />,  
            color: 'from-green-500 to-green-600', 
            trend: 'up' 
        },
        { 
            title: 'Journal', 
            value: '₹1,20,000', 
            change: '-3.5%', 
            icon: <BookOpen size={24} />, 
            color: 'from-purple-500 to-purple-600', 
            trend: 'down' 
        },
        { 
            title: 'Contra', 
            value: '₹75,000', 
            change: '+2.9%', 
            icon: <ArrowDownUp size={24} />, 
            color: 'from-yellow-500 to-yellow-600', 
            trend: 'up' 
        }
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }} // Hover animation
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                {card.icon}
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-medium 
                ${card.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                {card.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {card.change}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{card.title}</h3>
            <p className="text-2xl font-bold mt-1 text-gray-800">{card.value}</p>
          </motion.div>
        ))}
      </div>
    );
}

export default DashboardCards;
