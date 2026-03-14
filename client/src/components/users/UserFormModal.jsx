import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function UserFormModal({ open, onOpenChange, user, mode = 'view' }) {
  const isReadOnly = mode === 'view';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
            <Input id="name" defaultValue={user?.name} disabled={isReadOnly} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user?.email}
              disabled={isReadOnly}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 border p-3 rounded-md">
            <Label htmlFor="status">Estado de cuenta</Label>
            <Switch
              id="status"
              defaultChecked={user?.status === 'active'}
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
      </DialogContent>
    </Dialog>
  );
}
