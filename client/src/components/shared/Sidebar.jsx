import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart2, BookOpen, Wallet,
  Map, Upload, LogOut, Plus,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
  { label: 'Courses', icon: BookOpen, path: '/app/courses' },
  { label: 'My Skills', icon: BarChart2, path: '/app/skills' },
  { label: 'Wallet', icon: Wallet, path: '/app/wallet' },
  { label: 'Roadmaps', icon: Map, path: '/app/roadmaps' },
];

export default function Sidebar() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative
                 ${isActive
                  ? 'bg-brand-soft text-brand before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-brand before:rounded-r-full'
                  : 'text-ink-muted hover:bg-surface-alt hover:text-ink'}`
              }
            >
              <item.icon size={18} />
              <span className="md:hidden lg:inline">{item.label}</span>
            </NavLink>
          ))}

          {/* Upload button */}
          <NavLink
            to="/app/upload"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 mt-2
               ${isActive
                ? 'bg-brand text-white'
                : 'bg-brand-soft text-brand hover:bg-brand hover:text-white'}`
            }
          >
            <Plus size={18} />
            <span className="md:hidden lg:inline">Upload Course</span>
          </NavLink>
        </div>

        <div className="px-3 py-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                       text-ink-muted hover:bg-danger-soft hover:text-danger transition-colors duration-150 w-full"
          >
            <LogOut size={18} />
            <span className="md:hidden lg:inline">Logout</span>
          </button>
        </div>

        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-blue-400 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {profile?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="md:hidden lg:block min-w-0">
              <p className="text-sm font-medium text-ink truncate">{profile?.name || 'User'}</p>
              <p className="text-xs text-ink-muted truncate">{profile?.email || ''}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-border z-50 px-2 py-1 safe-bottom">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 text-xs min-w-[56px] rounded-lg transition-colors
                 ${isActive ? 'text-brand' : 'text-ink-muted'}`
              }
            >
              <item.icon size={20} />
              <span className="mt-0.5">{item.label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/app/upload"
            className="flex flex-col items-center py-2 px-3"
          >
            <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center -mt-4 shadow-lg">
              <Plus size={18} className="text-white" />
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
