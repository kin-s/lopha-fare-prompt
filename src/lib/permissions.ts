import { UserRole } from '@/types';

export function getNavItems(role: UserRole) {
  if (role === 'SACCO_ADMIN') {
    return [
      { label: 'Overview', href: '/dashboard' },
      { label: 'Accounts', href: '/dashboard/accounts' },
      { label: 'Vehicles', href: '/dashboard/vehicles' },
      { label: 'Staff', href: '/dashboard/staff' },
      { label: 'Transactions', href: '/dashboard/transactions' },
      { label: 'Reports & CSV', href: '/dashboard/reports' },
    ];
  }
  
  // Conductor Navigation
  return [
    { label: 'Fare Prompt', href: '/dashboard' },
    { label: 'My Transactions', href: '/dashboard/transactions' },
  ];
}