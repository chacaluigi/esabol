import { Badge } from '@/components/ui/badge';
import { ShieldCheck, User, ShieldAlert } from 'lucide-react';

export function UserRoleBadge({ roleName }) {
  const roleStyles = {
    Admin: {
      className: 'bg-red-100 text-red-700 hover:bg-red-200 border-red-200',
      icon: <ShieldAlert className="w-3 h-3 mr-1" />,
    },
    Editor: {
      className: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
      icon: <ShieldCheck className="w-3 h-3 mr-1" />,
    },
    User: {
      className:
        'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200',
      icon: <User className="w-3 h-3 mr-1" />,
    },
  };

  const config = roleStyles[roleName] || roleStyles.User;

  return (
    <Badge variant="outline" className={config.className}>
      {config.icon}
      {roleName}
    </Badge>
  );
}
