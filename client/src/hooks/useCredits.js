import { useCreditStore } from '../store/creditStore';

export const useCredits = () => {
  const { balance, transactions, loading, setBalance, deductCredits, earnCredits } = useCreditStore();

  return {
    balance,
    transactions,
    loading,
    setBalance,
    deductCredits,
    earnCredits,
  };
};
