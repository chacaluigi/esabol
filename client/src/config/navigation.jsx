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

export const navConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/',
      icon: Home,
      component: DashboardPage,
    },
    {
      title: 'Account',
      href: '/account',
      icon: User,
      component: () => <div className="p-8">Account Page</div>, // Placeholder
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
