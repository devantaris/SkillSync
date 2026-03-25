import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CreditBadge from './CreditBadge';

export default function Navbar() {
  const { isAuthenticated, profile, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = location.pathname === '/';

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-white/60 backdrop-blur-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-heading text-xl font-bold text-ink">
              Skill<span className="text-brand">Sync</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <CreditBadge />
                <Link to="/dashboard" className="btn-ghost text-sm">
                  Dashboard
                </Link>
                <button onClick={logout} className="btn-ghost text-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/courses" className="btn-ghost text-sm">
                  Browse Courses
                </Link>
                <Link to="/login" className="btn-ghost text-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
