import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-4">
        <Icon size={28} className="text-ink-muted" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-ink mb-1">{title}</h3>
      {description && <p className="text-sm text-ink-muted max-w-sm mb-4">{description}</p>}
      {action && action}
    </div>
  );
}
