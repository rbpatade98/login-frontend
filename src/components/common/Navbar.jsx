import { memo } from 'react';
import { LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '@/features/auth/hooks/useAuth';

const Navbar = memo(() => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-canvas-dark border-b border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-ink flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-[16px] font-medium text-on-dark tracking-[-0.16px] font-display">
              Auth<span className="text-accent-periwinkle">System</span>
            </span>
          </div>

          {/* User section */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-surface-dark-soft flex items-center justify-center text-on-dark text-[11px] font-mono-caps">
                  {user.username?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-on-dark text-[14px] font-medium font-display tracking-[-0.16px]">
                    {user.username || 'User'}
                  </p>
                  <p className="text-on-dark/40 text-[11px] font-mono-caps">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center px-4 py-2 bg-accent-periwinkle text-on-dark rounded-sm font-mono-caps text-[11px] hover:bg-accent-periwinkle/80 transition-all duration-200"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-surface-dark-soft text-on-dark rounded-sm font-mono-caps text-[11px] hover:bg-surface-dark-soft/80 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
