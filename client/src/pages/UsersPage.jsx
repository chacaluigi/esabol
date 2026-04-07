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
import { Input } from '@/components/ui/input';
import { UserStatusBadge } from '@/features/users/components/UserStatusBadge';
import { UserFormModal } from '@/features/users/components/UserFormModal';
import {
  MoreHorizontal,
  Plus,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Search,
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
import { UserDeleteDialog } from '@/features/users/components/UserDeleteDialog';
import { useDebounce } from '@/hooks/useDebounce';
import { useRoles } from '@/features/users/hooks/useRoles';
import { UserRoleBadge } from '@/features/users/components/UserRoleBadge';

const UsersPage = () => {
  const { roles } = useRoles();
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

  //para la busqueda dinámica de users
  const search = searchParams.get('search') || '';
  const debouncedSearch = useDebounce(search, 500);

  //cada vez que la página en la URL se cambie se dispara la petición al API
  useEffect(() => {
    refresh(currentPage, currentLimit, debouncedSearch);
  }, [currentPage, currentLimit, debouncedSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    // Al buscar reseteamos a la página 1 para evitar errores de paginación
    setSearchParams({
      page: 1,
      limit: searchParams.get('limit') || '10',
      search: value,
    });
  };

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

  const handleResetAndRefresh = async () => {
    //cuando se cambia la URL el useEffect detectará el cambio y ejecutará el refresh(1,10) automáticamente
    setSearchParams({ page: '1', limit: '10' });
    await refresh();
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
      //await refresh(currentPage, currentLimit);
      setModalConfig((prev) => ({ ...prev, open: false }));
      toast.success(
        modalConfig.mode === 'add'
          ? 'Usuario creado correctamente'
          : 'Datos actualizados con éxito',
      );
    } else {
      toast.error('Ocurrió un problema: ' + result.error);
    }
  };

  // para manejar la eliminación
  const [deleteConfig, setDeleteConfig] = useState({
    open: false,
    userId: null,
  });

  const openDeleteConfirm = (id) => {
    setDeleteConfig({ open: true, userId: id });
  };

  const handleConfirmDelete = async () => {
    const result = await deleteUser(deleteConfig.userId);

    if (result.success) {
      toast.success('Usuario eliminado correctamente');
      setDeleteConfig({ open: false, userId: null });
    } else {
      toast.error('Error: ' + result.error);
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

        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nombre o email..."
              className="pl-9"
              value={search}
              onChange={handleSearch}
            />
          </div>

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
            <UserTableSkeleton rows={10} />
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
                    {user.roles ? (
                      <UserRoleBadge roleName={user.roles.name} />
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        Sin rol
                      </span>
                    )}
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
                          className="text-red-600 cursor-pointer"
                          onClick={() => openDeleteConfirm(user.id)}
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

      {/* para el dialogo de confirmaciónd e eliminación */}
      <UserDeleteDialog
        open={deleteConfig.open}
        onOpenChange={(open) => setDeleteConfig((prev) => ({ ...prev, open }))}
        onConfirm={handleConfirmDelete}
        isLoading={loading}
      />

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

export default UsersPage;
