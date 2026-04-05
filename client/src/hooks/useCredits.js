import { useCreditStore } from '../store/creditStore';

export function useCredits() {
  const store = useCreditStore();
  return {
    balance: store.balance,
    transactions: store.transactions,
    loading: store.loading,
    deductCredits: store.deductCredits,
    earnCredits: store.earnCredits,
    fetchBalance: store.fetchBalance,
    fetchTransactions: store.fetchTransactions,
  };
}
