import { Badge } from '@/components/ui/badge';

export function UserStatusBadge({ status }) {
  const isActive = status === 'active' || status === true;
  return (
    <Badge
      variant="outline"
      className={`capitalize ${
        isActive
          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
          : 'bg-slate-50 text-slate-500 border-slate-200'
      }`}
    >
      {isActive ? 'Activo' : 'Inactivo'}
    </Badge>
  );
}
