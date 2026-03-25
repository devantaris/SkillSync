import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart2, BookOpen, Wallet,
  Map, Upload, User, LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import CreditBadge from './CreditBadge';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Skills', icon: BarChart2, path: '/skills' },
  { label: 'Courses', icon: BookOpen, path: '/courses' },
  { label: 'Wallet', icon: Wallet, path: '/wallet' },
  { label: 'Roadmaps', icon: Map, path: '/roadmaps' },
  { label: 'Upload', icon: Upload, path: '/upload' },
];

const bottomItems = [
  { label: 'Profile', icon: User, path: '/dashboard' },
];

export default function Sidebar() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-btn text-sm font-medium transition-colors duration-150
     ${isActive
      ? 'bg-brand-soft text-brand'
      : 'text-ink-muted hover:bg-surface-alt hover:text-ink'}`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-60 lg:w-60 md:w-14 bg-white border-r border-border z-40">
        <div className="px-4 py-5 border-b border-border">
          <NavLink to="/" className="flex items-center gap-1">
            <span className="font-heading text-xl font-bold text-ink md:hidden lg:inline">
              Skill<span className="text-brand">Sync</span>
            </span>
            <span className="font-heading text-xl font-bold text-brand hidden md:inline lg:hidden">
              S
            </span>
          </NavLink>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClasses}>
              <item.icon size={18} />
              <span className="md:hidden lg:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="px-3 py-4 border-t border-border space-y-1">
          {bottomItems.map((item) => (
            <NavLink key={item.label} to={item.path} className={linkClasses}>
              <item.icon size={18} />
              <span className="md:hidden lg:inline">{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-btn text-sm font-medium
                       text-ink-muted hover:bg-danger-soft hover:text-danger transition-colors duration-150 w-full"
          >
            <LogOut size={18} />
            <span className="md:hidden lg:inline">Logout</span>
          </button>
        </div>

        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center text-brand text-sm font-semibold">
              {profile?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="md:hidden lg:block">
              <p className="text-sm font-medium text-ink truncate">{profile?.name || 'User'}</p>
              <p className="text-xs text-ink-muted truncate">{profile?.email || ''}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 px-2 py-1">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 text-xs min-w-[44px] min-h-[44px] justify-center
                 ${isActive ? 'text-brand' : 'text-ink-muted'}`
              }
            >
              <item.icon size={20} />
              <span className="mt-0.5">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
