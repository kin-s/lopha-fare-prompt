import { DemoUser, UserRole } from '@/types';

export function canAccessAdminRoutes(user: DemoUser | null): boolean {
  return user?.role === 'admin';
}

export type NavItem = { label: string; href: string };

export function getNavItemsForRole(role: UserRole | null): NavItem[] {
  if (role === 'admin') {
    return [
      { label: 'Overview', href: '/dashboard' },
      { label: 'Vehicles', href: '/dashboard/vehicles' },
      { label: 'Conductors', href: '/dashboard/conductors' },
      { label: 'Transactions', href: '/dashboard/transactions' },
      { label: 'Reports', href: '/dashboard/reports' },
      { label: 'Audit Log', href: '/dashboard/audit-log' },
      { label: 'Settings', href: '/dashboard/settings' },
    ];
  }
  return [
    { label: 'Home', href: '/dashboard' },
    { label: 'New Request', href: '/dashboard/new-request' },
    { label: 'My Transactions', href: '/dashboard/transactions' },
  ];
}