import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalBalance, totalIncome, totalExpenses }) => {
  const cards = [
    {
      label: 'Total Balance',
      value: totalBalance,
      icon: Wallet,
      color: 'text-accent',
      bg: 'bg-accent/10',
      trend: '+2.5%',
      isPositive: true
    },
    {
      label: 'Total Income',
      value: totalIncome,
      icon: ArrowUpRight,
      color: 'text-success',
      bg: 'bg-success/10',
      trend: '+12.3%',
      isPositive: true
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      icon: ArrowDownLeft,
      color: 'text-danger',
      bg: 'bg-danger/10',
      trend: '-4.1%',
      isPositive: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${card.isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {card.trend}
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">{card.label}</p>
          <h3 className="text-2xl font-bold data-value">{formatCurrency(card.value)}</h3>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
