import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Search, FileText, Beaker } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/upload', label: 'Upload', icon: Upload },
  { path: '/search', label: 'Search', icon: Search },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal text-white">
            <Beaker className="w-5 h-5" />
          </div>
          <span className="text-xl font-semibold text-sidebar-foreground">DocuMol</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                }
              `}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="px-4 py-3">
          <p className="text-xs text-sidebar-foreground/50">
            Pharma Research Assistant
          </p>
          <p className="text-xs text-sidebar-foreground/30 mt-0.5">
            v1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
}
