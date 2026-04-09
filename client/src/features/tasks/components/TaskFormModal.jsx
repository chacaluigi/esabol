import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { Badge } from '@/components/ui/badge';
import { useUsers } from '@/features/users/hooks/useUsers';
import { useDebounce } from '@/hooks/useDebounce';

export function TaskFormModal({
  open,
  onOpenChange,
  task,
  mode,
  onSave,
  isLoading,
}) {
  const [date, setDate] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  //estados para la búsqueda local
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { users, fetchUsers, loading: isUsersLoading } = useUsers();

  //useEffect para disparar la búsqueda cuando cambie el texto
  useEffect(() => {
    if (open) {
      fetchUsers(1, 5, debouncedSearch);
    }
  }, [debouncedSearch, open]);

  //useEffect para setear la data inicial
  useEffect(() => {
    if (open) {
      setDate(task?.dueDate ? new Date(task.dueDate) : null);
      setSelectedUsers(
        task?.assignees?.map((u) => ({
          id: u.id.toString(),
          name: u.name,
        })) || [],
      );
      setSearchTerm('');
    }
  }, [open, task]);

  const toggleUser = (userToToggle) => {
    setSelectedUsers((prev) => {
      const exists = prev.some((u) => u.id === userToToggle.id.toString());
      if (exists) {
        return prev.filter((u) => u.id !== userToToggle.id.toString());
      } else {
        return [
          ...prev,
          { id: userToToggle.id.toString(), name: userToToggle.name },
        ];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      status: formData.get('status'),
      dueDate: date ? date.toISOString() : null,
      // creatorId y assigneeId se manejan aka segun el auth/users
      creatorId: 36,
      //assigneeUserId: 23,
      assigneeUserIds: selectedUsers.map((u) => u.id),
    };
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isLoading && onOpenChange(val)}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <form onSubmit={handleSubmit} className="relative p-6 space-y-4">
          {isLoading && <LoadingOverlay message="Guardando tarea..." />}

          <DialogHeader>
            <DialogTitle>
              {mode === 'add' ? 'Nueva Tarea' : 'Editar Tarea'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                defaultValue={task?.title}
                required
                placeholder="¿Qué hay que hacer?"
              />
            </div>

            {/* añadir usuarios a la tarea */}
            <div className="grid gap-2">
              <Label>Miembros Asignados</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between h-auto min-h-10 py-2"
                  >
                    {selectedUsers.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedUsers.map((user) => (
                          <Badge
                            variant="secondary"
                            key={user.id}
                            className="text-xs"
                          >
                            {user.name.split(' ')[0]}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground font-normal">
                        Seleccionar miembros...
                      </span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[450px] p-0"
                  align="start"
                  side="bottom"
                  avoidCollisions={false}
                >
                  <div className="p-2 border-b">
                    <Input
                      placeholder="Buscar usuario por nombre o correo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8"
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                    {isUsersLoading ? (
                      <div className="text-sm text-center py-2 text-muted-foreground">
                        Buscando...
                      </div>
                    ) : users.length === 0 ? (
                      <div className="text-sm text-center py-2 text-muted-foreground">
                        No se encontraron usuarios.
                      </div>
                    ) : (
                      users.map((user) => {
                        const isSelected = selectedUsers.some(
                          (su) => su.id === user.id.toString(),
                        );
                        return (
                          <div
                            key={user.id}
                            onClick={() => toggleUser(user)}
                            className={cn(
                              'flex items-center justify-between px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-slate-100',
                              isSelected &&
                                'bg-slate-50 text-blue-600 font-medium',
                            )}
                          >
                            <span>{user.name}</span>
                            {isSelected && (
                              <Check className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Prioridad</Label>
                <Select
                  name="priority"
                  defaultValue={task?.priority || 'Media'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baja">Baja</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select name="status" defaultValue={task?.status || 'TO_DO'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TO_DO">Por Hacer</SelectItem>
                    <SelectItem value="DOING">En Progreso</SelectItem>
                    <SelectItem value="DONE">Completadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={task?.description}
                placeholder="Detalles adicionales..."
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Fecha de Entrega</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date
                      ? format(date, 'PPP', { locale: es })
                      : 'Seleccionar fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {mode === 'add' ? 'Crear Tarea' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
