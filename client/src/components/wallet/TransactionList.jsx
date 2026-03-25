import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TransactionList({ transactions }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-3 rounded-card border border-border bg-surface-card hover:bg-surface-alt transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tx.type === 'earn' ? 'bg-earn-soft text-earn' : 'bg-danger-soft text-danger'
              }`}
            >
              {tx.type === 'earn' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{tx.description}</p>
              <p className="text-xs text-ink-muted">{formatDate(tx.date)}</p>
            </div>
          </div>
          <span
            className={`font-heading font-semibold text-sm ${
              tx.type === 'earn' ? 'text-earn' : 'text-danger'
            }`}
          >
            {tx.type === 'earn' ? '+' : '-'}{tx.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
