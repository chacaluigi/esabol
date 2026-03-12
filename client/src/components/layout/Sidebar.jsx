import {
  Home,
  User,
  MapPin,
  MessageSquare,
  Star,
  Settings,
  Lock,
  LogOut,
  Menu,
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: User, label: 'Account' },
  { icon: MapPin, label: 'Location' },
  { icon: MessageSquare, label: 'Chat' },
  { icon: Star, label: 'Favorite' },
  { icon: Settings, label: 'Setting' },
  { icon: Lock, label: 'Privacy' },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#22252a] text-gray-300 flex flex-col fixed left-0 top-0 z-20">
      {/* Círculo del perfil (superpuesto al header en el diseño original) */}
      <div className="h-24 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center rounded-br-3xl">
        <div className="w-16 h-16 rounded-full border-4 border-[#22252a] bg-blue-100 flex items-center justify-center overflow-hidden">
          <User className="text-blue-500 w-8 h-8" />
        </div>
      </div>

      <div className="p-4 flex items-center gap-3 text-sm font-semibold mb-2">
        <Menu className="w-5 h-5" />
        <span>Menu</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center gap-4 px-6 py-3 text-sm transition-colors ${
                  item.active
                    ? 'bg-[#2a2e35] text-white border-l-4 border-blue-500'
                    : 'hover:bg-[#2a2e35] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 mt-auto">
        <a
          href="#"
          className="flex items-center gap-4 text-sm hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          sign out
        </a>
      </div>
    </aside>
  );
}
