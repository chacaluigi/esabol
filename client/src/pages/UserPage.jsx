import { useState } from 'react';
import { useUsers } from '@/features/users/hooks/useUsers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UserStatusBadge } from '@/features/users/components/UserStatusBadge';
import { UserFormModal } from '@/features/users/components/UserFormModal';
import {
  MoreHorizontal,
  Plus,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';

const UserPage = () => {
  const { users, loading, refresh, addUser, updateUser, deleteUser } =
    useUsers();
  const [modalConfig, setModalConfig] = useState({
    open: false,
    user: null,
    mode: 'view',
  });

  const openModal = (user, mode) => {
    setModalConfig({ open: true, user, mode });
  };

  const handleSave = async (data) => {
    let result;

    if (modalConfig.mode === 'add') {
      result = await addUser(data);
    } else if (modalConfig.mode === 'edit') {
      result = await updateUser(modalConfig.user.id, data);
    }

    if (result?.success) {
      await refresh();
      setModalConfig((prev) => ({ ...prev, open: false }));
      // Opcional: mostrar un toast de éxito aquí
    } else {
      alert('Error: ' + result.error);
    }
  };

  // 3. Función para manejar la eliminación
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const result = await deleteUser(id);
      if (!result.success) alert(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-slate-500">
            Administra los accesos de la institución
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={refresh}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => openModal(null, 'add')}
          >
            <Plus className="w-4 h-4 mr-2" /> Agregar Usuario
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-semibold">Usuario</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Rol</TableHead>
              <TableHead className="font-semibold">Estado</TableHead>
              <TableHead className="text-right font-semibold">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-slate-500">{user.email}</TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p className="text-xs text-slate-400 font-normal">
                      {user.Role?.name || 'Sin rol'}{' '}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => openModal(user, 'view')}>
                        <Eye className="mr-2 h-4 w-4 text-slate-400" /> Ver
                        detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openModal(user, 'edit')}>
                        <Edit className="mr-2 h-4 w-4 text-slate-400" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal único controlado por estado */}
      <UserFormModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig((prev) => ({ ...prev, open }))}
        user={modalConfig.user}
        mode={modalConfig.mode}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserPage;
