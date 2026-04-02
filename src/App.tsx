import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import TransactionTable from './components/TransactionTable';
import Insights from './components/Insights';
import RoleSwitcher from './components/RoleSwitcher';
import TransactionModal from './components/TransactionModal';
import { initialTransactions } from './lib/mockData';
import { Transaction, UserRole } from './types';
import { Bell, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<UserRole>('admin');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalBalance: income - expenses + 50000, // Base balance
      totalIncome: income,
      totalExpenses: expenses
    };
  }, [transactions]);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSaveTransaction = (data: Partial<Transaction>) => {
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? { ...t, ...data } as Transaction : t));
    } else {
      const newTransaction: Transaction = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      } as Transaction;
      setTransactions(prev => [newTransaction, ...prev]);
    }
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold capitalize">{activeTab}</h2>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-border text-xs font-medium text-gray-500">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live Market Data
            </div>
          </div>

          <div className="flex items-center gap-6">
            <RoleSwitcher role={role} setRole={setRole} />
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-ink hover:bg-gray-50 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-[1px] bg-border mx-1" />
              <div className="flex items-center gap-3 pl-1">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold leading-none">Uday Teja</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{role}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && (
                <>
                  <SummaryCards 
                    totalBalance={stats.totalBalance}
                    totalIncome={stats.totalIncome}
                    totalExpenses={stats.totalExpenses}
                  />
                  <Charts transactions={transactions} />
                  <Insights transactions={transactions} />
                  <TransactionTable 
                    transactions={transactions.slice(0, 5)} 
                    role={role}
                    onAdd={handleAddTransaction}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                  />
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => setActiveTab('transactions')}
                      className="text-sm font-bold text-accent hover:underline"
                    >
                      View All Transactions
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'transactions' && (
                <TransactionTable 
                  transactions={transactions} 
                  role={role}
                  onAdd={handleAddTransaction}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              )}

              {activeTab === 'insights' && (
                <div className="space-y-8">
                  <Insights transactions={transactions} />
                  <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-xl font-bold mb-4">Financial Health Score</h3>
                    <div className="flex items-center gap-8">
                      <div className="w-32 h-32 rounded-full border-8 border-success flex items-center justify-center">
                        <span className="text-3xl font-bold">84</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 mb-4">Based on your spending patterns and savings rate, your financial health is excellent. You are saving 24% more than the average user in your bracket.</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Budget Adherence</span>
                            <span className="font-bold">92%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-success w-[92%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="p-6 bg-gray-50 rounded-full mb-4">
                    <User size={48} />
                  </div>
                  <h3 className="text-lg font-bold text-ink">Reports Module</h3>
                  <p className="text-sm">Detailed PDF and Excel reports are coming soon.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
}
