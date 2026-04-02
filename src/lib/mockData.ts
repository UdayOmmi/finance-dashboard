import { Transaction } from '../types';
import { subDays, format } from 'date-fns';

const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const categories = {
    income: ['Salary', 'Investment', 'Freelance'],
    expense: ['Food & Dining', 'Rent & Utilities', 'Shopping', 'Transport', 'Entertainment', 'Healthcare', 'Other']
  };

  for (let i = 0; i < 50; i++) {
    const type = Math.random() > 0.7 ? 'income' : 'expense';
    const categoryList = categories[type];
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];
    
    // Random amount: 500 to 50000 for income, 100 to 5000 for expense
    const amount = type === 'income' 
      ? Math.floor(Math.random() * 45000) + 5000 
      : Math.floor(Math.random() * 4500) + 100;

    transactions.push({
      id: Math.random().toString(36).substr(2, 9),
      date: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
      amount,
      category,
      type,
      description: `${category} transaction #${i + 1}`
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const initialTransactions = generateMockTransactions();
