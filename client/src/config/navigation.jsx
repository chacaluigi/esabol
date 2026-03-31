import {
  Home,
  User,
  ClipboardList,
  MapPin,
  MessageSquare,
  Star,
  Settings,
  Lock,
} from 'lucide-react';
import DashboardPage from '@/pages/DashboardPage';
import UsersPage from '@/pages/UsersPage';
import TaskBoardPage from '@/pages/TaskBoardPage';

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
      title: 'Tareas',
      href: '/tasks',
      icon: ClipboardList,
      component: TaskBoardPage,
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
