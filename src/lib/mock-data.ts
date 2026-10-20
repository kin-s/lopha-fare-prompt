import { DemoUser, Vehicle, PaymentTransaction, AuditEvent, DemoSettings } from '@/types';
export const demoUsers: DemoUser[] = [
  { id: 'admin-01', name: 'Amina Yusuf', role: 'admin', assignedVehicleIds: [] },
  { id: 'cond-01', name: 'David Ochieng', role: 'conductor', assignedVehicleIds: ['veh-01', 'veh-02'] },
  { id: 'cond-02', name: 'Grace Wanjiku', role: 'conductor', assignedVehicleIds: ['veh-03'] },
];
export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-01', registrationNumber: 'KDA 123A', routeName: 'CBD - Westlands', assignedConductorId: 'cond-01', status: 'Active',
    receivingAccount: { vehicleId: 'veh-01', accountType: 'Pochi la Biashara', ownershipCategory: 'Vehicle Owner', maskedIdentifier: '****8912', compatibilityStatus: 'Compatibility Unverified', liveStkPushEnabled: false },
  },
  {
    id: 'veh-02', registrationNumber: 'KCB 456B', routeName: 'CBD - Karen', assignedConductorId: 'cond-01', status: 'Active',
    receivingAccount: { vehicleId: 'veh-02', accountType: 'Pochi la Biashara', ownershipCategory: 'Conductor', maskedIdentifier: '****3345', compatibilityStatus: 'Awaiting Verification', liveStkPushEnabled: false },
  },
  {
    id: 'veh-03', registrationNumber: 'KDD 789C', routeName: 'CBD - Rongai', assignedConductorId: 'cond-02', status: 'Active',
    receivingAccount: { vehicleId: 'veh-03', accountType: 'Pochi la Biashara', ownershipCategory: 'SACCO or Treasurer', maskedIdentifier: '****0011', compatibilityStatus: 'Approved for Future Integration', liveStkPushEnabled: false },
  },
];
export const initialTransactions: PaymentTransaction[] = [];
export const initialAuditEvents: AuditEvent[] = [
  { id: 'evt-01', action: 'Vehicle KDA 123A created', userId: 'admin-01', userName: 'Amina Yusuf', timestamp: new Date().toISOString() },
];
export const demoSettings: DemoSettings = {
  globalLiveStkPushStatus: 'DISABLED',
  compatibilityVerification: 'Pending provider approval for individual Pochi la Biashara accounts.',
};