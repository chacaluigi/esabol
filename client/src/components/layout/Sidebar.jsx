import { useLocation, Link } from 'react-router-dom';
import { navConfig } from '@/config/navigation';
import { Menu, LogOut } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-[#22252a] text-gray-300 flex flex-col fixed left-0 top-0 z-20">
      {/* Profile Header */}
      <div className="h-20 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center rounded-tr-4xl">
        <div className="w-16 h-16 rounded-full border-4 border-[#22252a] bg-blue-100 flex items-center justify-center overflow-hidden">
          <span className="text-blue-500 font-bold">ML</span>
        </div>
      </div>

      <div className="p-4 flex items-center gap-3 text-sm font-semibold mb-2">
        <Menu className="w-5 h-5" />
        <span>Menu</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navConfig.mainNav.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-4 px-6 py-3 text-sm transition-colors ${
                    isActive
                      ? 'bg-[#2a2e35] text-white border-l-4 border-blue-500'
                      : 'hover:bg-[#2a2e35] hover:text-white'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isActive ? 'text-blue-500' : ''}`}
                  />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 mt-auto">
        <button className="flex items-center gap-4 text-sm hover:text-white transition-colors w-full">
          <LogOut className="w-5 h-5" />
          sign out
        </button>
      </div>
    </aside>
  );
}
