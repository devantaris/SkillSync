import { Coins } from 'lucide-react';
import { useCredits } from '../../hooks/useCredits';

export default function CreditBadge() {
  const { balance } = useCredits();

  return (
    <div className="inline-flex items-center gap-1.5 bg-earn-soft text-earn px-3 py-1.5 rounded-full text-sm font-semibold">
      <Coins size={16} />
      <span className="font-heading">{balance}</span>
    </div>
  );
}
