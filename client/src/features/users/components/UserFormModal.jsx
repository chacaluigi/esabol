import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export function UserFormModal({
  open,
  onOpenChange,
  user,
  mode = 'view',
  onSave,
  roles = [],
}) {
  const isReadOnly = mode === 'view';
  // Necesitamos controlar el valor del select manualmente si no usamos una librería de formularios
  const [selectedRole, setSelectedRole] = useState(user?.roleId?.toString());

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      username: formData.get('username'),
      status: formData.get('status') === 'on',
      roleId: parseInt(selectedRole),
    };
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'add' && 'Agregar Usuario'}
              {mode === 'edit' && 'Editar Usuario'}
              {mode === 'view' && 'Detalles del Usuario'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                name="name"
                defaultValue={user?.name}
                disabled={isReadOnly}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled={isReadOnly}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                defaultValue={user?.username}
                disabled={isReadOnly}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="roleId">Rol de Usuario</Label>
              <Select
                disabled={isReadOnly}
                onValueChange={setSelectedRole}
                defaultValue={user?.roleId?.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
              <Label htmlFor="status">Estado de cuenta</Label>
              <Switch
                id="status"
                name="status"
                defaultChecked={user?.status === true}
                disabled={isReadOnly}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {isReadOnly ? 'Cerrar' : 'Cancelar'}
            </Button>
            {!isReadOnly && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                Guardar cambios
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
