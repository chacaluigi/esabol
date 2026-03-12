import { Search, Bell, User, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="h-20 bg-gradient-to-r from-indigo-600 to-sky-400 flex items-center justify-between px-8 ml-64 fixed top-0 right-0 left-0 z-10">
      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center w-full">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 pr-10 py-2 rounded-full border-none bg-white text-gray-800 focus-visible:ring-0 shadow-sm"
          />
          <Search className="absolute right-4 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-6 text-white ml-6">
        <button className="hover:text-gray-200 transition">
          <Bell className="w-5 h-5" />
        </button>
        <button className="hover:text-gray-200 transition">
          <User className="w-5 h-5" />
        </button>
        <button className="hover:text-gray-200 transition">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
