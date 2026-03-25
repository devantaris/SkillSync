import { create } from 'zustand';

const mockTransactions = [
  { id: 't1', type: 'earn', amount: 100, description: 'Welcome bonus — starter credits', courseId: null, date: '2025-03-20T10:00:00Z' },
  { id: 't2', type: 'earn', amount: 50, description: 'Course approved: "Python for Data Science"', courseId: '1', date: '2025-03-18T14:30:00Z' },
  { id: 't3', type: 'spend', amount: 60, description: 'Enrolled in "React from Zero to Hero"', courseId: '2', date: '2025-03-17T09:15:00Z' },
  { id: 't4', type: 'earn', amount: 34, description: 'Enrollment earning: "Python for Data Science"', courseId: '1', date: '2025-03-16T16:45:00Z' },
  { id: 't5', type: 'spend', amount: 35, description: 'Enrolled in "SQL Mastery: Queries to Optimization"', courseId: '3', date: '2025-03-15T11:20:00Z' },
  { id: 't6', type: 'earn', amount: 34, description: 'Enrollment earning: "Python for Data Science"', courseId: '1', date: '2025-03-14T08:00:00Z' },
  { id: 't7', type: 'spend', amount: 75, description: 'Enrolled in "ML Fundamentals with Scikit-learn"', courseId: '4', date: '2025-03-13T13:30:00Z' },
  { id: 't8', type: 'earn', amount: 52, description: 'Enrollment earning: "Python for Data Science"', courseId: '1', date: '2025-03-12T17:00:00Z' },
];

export const useCreditStore = create((set, get) => ({
  balance: 100,
  transactions: mockTransactions,
  loading: false,

  setBalance: (balance) => set({ balance }),

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
