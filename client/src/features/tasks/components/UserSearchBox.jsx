import { useState, useEffect } from 'react';
import { Search, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useUsers } from '@/features/users/hooks/useUsers'; // Ajusta tu ruta
import { useDebounce } from '@/hooks/useDebounce';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserSearchBox({ selectedUser, onSelectUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { users, refresh, loading } = useUsers();

  useEffect(() => {
    if (debouncedSearch) {
      refresh(1, 5, debouncedSearch);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch]);

  const handleClear = () => {
    onSelectUser(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar usuario por nombre o email..."
          value={selectedUser ? selectedUser.name : searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-9"
          readOnly={!!selectedUser}
        />
        {selectedUser && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-2 p-1 rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* dropdown de resultados */}
      {isOpen && !selectedUser && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-sm text-slate-500 text-center">
              Buscando...
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  onSelectUser(user);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-2 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-slate-500 text-center">
              No se encontraron usuarios
            </div>
          )}
        </div>
      )}
    </div>
  );
}
