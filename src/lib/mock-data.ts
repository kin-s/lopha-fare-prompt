import { DemoUser, Vehicle, ReceivingAccount, Transaction, Shift } from '@/types';

export const demoUsers: DemoUser[] = [
  { id: 'u1', name: 'Amina Yusuf', role: 'SACCO_ADMIN' },
  { id: 'u3', name: 'David Ochieng', role: 'CONDUCTOR' },
];

export const initialAccounts: ReceivingAccount[] = [
  { id: 'acc1', type: 'Pochi la Biashara', displayName: 'Lopha Bus 1', maskedIdentifier: '****8912', integrationStatus: 'Prompt Supported' },
  { id: 'acc2', type: 'M-Pesa Till', displayName: 'Lopha Till', maskedIdentifier: '****3345', integrationStatus: 'Fully Configured' },
];

export const initialVehicles: Vehicle[] = [
  { id: 'v1', regNumber: 'KDA 123A', routeName: 'CBD - Westlands', conductorId: 'u3', accountId: 'acc1', status: 'Active' },
  { id: 'v2', regNumber: 'KCB 456B', routeName: 'CBD - Karen', conductorId: 'u3', accountId: 'acc2', status: 'Active' },
];

export const initialShifts: Shift[] = [];
export const initialTransactions: Transaction[] = [];