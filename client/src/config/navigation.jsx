import {
  Home,
  User,
  MapPin,
  MessageSquare,
  Star,
  Settings,
  Lock,
} from 'lucide-react';
import DashboardPage from '@/pages/DashboardPage';
import UsersPage from '@/pages/UsersPage';

export const navConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/',
      icon: Home,
      component: DashboardPage,
    },
    {
      title: 'Usuarios',
      href: '/users',
      icon: User,
      component: UsersPage,
    },
    {
      title: 'Location',
      href: '/location',
      icon: MapPin,
      component: () => <div className="p-8">Location Page</div>,
    },
  ],
  footerNav: [
    {
      title: 'sign out',
      href: '/logout',
      icon: Settings,
    },
  ],
};
