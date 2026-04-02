export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type UserRole = 'admin' | 'viewer';

export interface DashboardState {
  transactions: Transaction[];
  role: UserRole;
}

export const CATEGORIES = [
  'Food & Dining',
  'Rent & Utilities',
  'Shopping',
  'Transport',
  'Entertainment',
  'Healthcare',
  'Salary',
  'Investment',
  'Freelance',
  'Other'
];
