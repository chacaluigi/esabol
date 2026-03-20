import { useState, useEffect } from 'react';
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
import { toast } from 'sonner';
import { UserTableSkeleton } from '@/features/users/components/UserTableSkeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UserPage = () => {
  const {
    users,
    loading,
    refresh,
    addUser,
    updateUser,
    deleteUser,
    totalPages,
  } = useUsers();

  //para la PAGINACIÓN
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentLimit = searchParams.get('limit') || '10';

  //cada vez que la página en la URL se cambie se dispara la petición al API
  useEffect(() => {
    refresh(currentPage, currentLimit);
  }, [currentPage, currentLimit]);

  //para cambiar de página actualizando la URL
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set('page', newPage);
      return prev;
    });
  };

  const handleLimitChange = (newLimit) => {
    setSearchParams((prev) => {
      prev.set('page', '1');
      prev.set('limit', newLimit);
      return prev;
    });
  };

  const handleResetAndRefresh = () => {
    //cuando se cambia la URL el useEffect detectará el cambio y ejecutará el refresh(1,10) automáticamente
    setSearchParams({ page: '1', limit: '10' });
  };
  //hasta aca la PAGINACIÓN

  const [modalConfig, setModalConfig] = useState({
    open: false,
    user: null,
    mode: 'view',
  });

  const openModal = (user, mode) => {
    setModalConfig({ open: true, user, mode });
  };

  // para comparar si hubo cambios al editar
  const hasChanges = (newData, originalData) => {
    return Object.keys(newData).some(
      (key) => newData[key] !== originalData[key],
    );
  };

  const handleSave = async (data) => {
    // primero comprobamos si hubo cambios en el form
    if (modalConfig.mode === 'edit' && !hasChanges(data, modalConfig.user)) {
      setModalConfig((prev) => ({ ...prev, open: false }));
      return;
    }

    let result;

    if (modalConfig.mode === 'add') {
      result = await addUser(data);
    } else if (modalConfig.mode === 'edit') {
      result = await updateUser(modalConfig.user.id, data);
    }

    if (result?.success) {
      handleResetAndRefresh();
      setModalConfig((prev) => ({ ...prev, open: false }));
      //toast para mostrar mensaje de éxito
      toast.success(
        modalConfig.mode === 'add'
          ? 'Usuario creado correctamente'
          : 'Datos actualizados con éxito',
      );
    } else {
      //alert('Error: ' + result.error);
      //notificacion de error
      toast.error('Ocurrió un problema: ' + result.error);
    }
  };

  // para manejar la eliminación
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const result = await deleteUser(id);
      if (result.success) {
        toast.success('Usuario eliminado');
      } else {
        toast.error('No se pudo eliminar al usuario');
      }
    }
  };

  const showSkeleton = loading && users.length === 0;

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
            onClick={handleResetAndRefresh}
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

          {showSkeleton ? (
            <UserTableSkeleton rows={5} /> // cantidad de filas skeleton para colocar
          ) : (
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
                        <DropdownMenuItem
                          onClick={() => openModal(user, 'view')}
                        >
                          <Eye className="mr-2 h-4 w-4 text-slate-400" /> Ver
                          detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openModal(user, 'edit')}
                        >
                          <Edit className="mr-2 h-4 w-4 text-slate-400" />{' '}
                          Editar
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
          )}
        </Table>
        {/* en caso de qu no haya usuarios y no está cargando */}
        {!showSkeleton && users.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No se encontraron usuarios en la institución.
          </div>
        )}
      </div>

      {/*para la paginación */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Mostrar</span>
          <Select value={currentLimit} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue placeholder={currentLimit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>filas por página</span>
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i} className="cursor-pointer">
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* modal único controlado por estado */}
      <UserFormModal
        open={modalConfig.open}
        onOpenChange={(open) => setModalConfig((prev) => ({ ...prev, open }))}
        user={modalConfig.user}
        mode={modalConfig.mode}
        onSave={handleSave}
        isLoading={loading}
      />
    </div>
  );
};

export default UserPage;
