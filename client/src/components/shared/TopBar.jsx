import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import CreditBadge from './CreditBadge';

const pageTitles = {
  '/app/dashboard': 'Dashboard',
  '/app/courses': 'Course Marketplace',
  '/app/skills': 'My Skills',
  '/app/wallet': 'Wallet',
  '/app/upload': 'Upload Course',
  '/app/roadmaps': 'Learning Roadmaps',
};

export default function TopBar() {
  const { profile } = useAuth();
  const location = useLocation();

  const title = pageTitles[location.pathname] || 'SkillSync';
  const initial = profile?.name?.[0]?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        <h1 className="font-heading text-lg font-semibold text-ink truncate">{title}</h1>

        <div className="flex items-center gap-3">
          <CreditBadge />

          <button className="relative p-2 rounded-lg text-ink-muted hover:bg-surface-alt hover:text-ink transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-blue-400 flex items-center justify-center text-white text-sm font-semibold">
              {initial}
            </div>
            <span className="text-sm font-medium text-ink hidden sm:inline">{profile?.name || 'User'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
