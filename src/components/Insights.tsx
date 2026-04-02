import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../lib/utils';

interface InsightsProps {
  transactions: Transaction[];
}

const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
  const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const categorySpending = expenses.reduce((acc: Record<string, number>, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(categorySpending).sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0] as [string, number] | undefined;

  const insights = [
    {
      title: 'Highest Spending',
      description: highestCategory ? `You spent ${formatCurrency(highestCategory[1])} on ${highestCategory[0]} this month.` : 'No spending data yet.',
      icon: TrendingDown,
      color: 'text-danger',
      bg: 'bg-danger/10'
    },
    {
      title: 'Savings Rate',
      description: `Your savings rate is ${savingsRate.toFixed(1)}%. ${savingsRate > 20 ? 'Great job!' : 'Try to save more.'}`,
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success/10'
    },
    {
      title: 'Budget Alert',
      description: totalExpense > totalIncome ? 'Your expenses exceeded your income this month.' : 'You are well within your budget.',
      icon: totalExpense > totalIncome ? AlertCircle : CheckCircle2,
      color: totalExpense > totalIncome ? 'text-danger' : 'text-success',
      bg: totalExpense > totalIncome ? 'bg-danger/10' : 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {insights.map((insight, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-start gap-4">
          <div className={`p-3 rounded-xl ${insight.bg} ${insight.color} shrink-0`}>
            <insight.icon size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed">{insight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Insights;
