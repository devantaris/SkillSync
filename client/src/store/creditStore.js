import { create } from 'zustand';
import { api } from '../lib/api';

export const useCreditStore = create((set, get) => ({
  balance: 0,
  transactions: [],
  loading: false,

  setBalance: (balance) => set({ balance }),

  fetchBalance: async () => {
    try {
      const res = await api.get('/credits/balance');
      set({ balance: res.data.balance });
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  },

  fetchTransactions: async () => {
    try {
      set({ loading: true });
      const res = await api.get('/credits/transactions');
      set({ transactions: res.data.transactions || [], loading: false });
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      set({ loading: false });
    }
  },

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  deductCredits: (amount, description, courseId = null) => {
    const { balance, addTransaction } = get();
    if (balance < amount) return false;
    set({ balance: balance - amount });
    addTransaction({
      id: `t${Date.now()}`,
      type: 'spend',
      amount,
      description,
      courseId,
      date: new Date().toISOString(),
    });
    return true;
  },

  earnCredits: (amount, description, courseId = null) => {
    const { balance, addTransaction } = get();
    set({ balance: balance + amount });
    addTransaction({
      id: `t${Date.now()}`,
      type: 'earn',
      amount,
      description,
      courseId,
      date: new Date().toISOString(),
    });
  },
}));
