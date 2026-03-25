import { Coins, TrendingUp } from 'lucide-react';
import { useCredits } from '../../hooks/useCredits';

export default function CreditBalance() {
  const { balance } = useCredits();

  const totalEarned = 270; // mock
  const monthDelta = 50; // mock

  return (
    <div className="text-center">
      <p className="text-sm text-ink-muted mb-2">Available Balance</p>
      <p className="font-heading text-6xl font-bold text-brand">{balance}</p>
      <p className="text-sm text-ink-muted mt-1">credits</p>
      <div className="flex items-center justify-center gap-1 mt-3 text-earn text-sm font-medium">
        <TrendingUp size={14} />
        +{monthDelta} credits this month
      </div>
    </div>
  );
}
