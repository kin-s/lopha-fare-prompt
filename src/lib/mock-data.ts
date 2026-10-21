import { DemoUser, Driver, Vehicle, PaymentTransaction, AuditEvent, DemoSettings } from '@/types';

export const demoUsers: DemoUser[] = [
  { id: 'admin-01', name: 'Amina Yusuf', role: 'admin', assignedVehicleIds: [] },
  { id: 'cond-01', name: 'David Ochieng', role: 'conductor', assignedVehicleIds: ['veh-01', 'veh-02'] },
  { id: 'cond-02', name: 'Grace Wanjiku', role: 'conductor', assignedVehicleIds: ['veh-03'] },
];

export const initialDrivers: Driver[] = [
  { id: 'drv-01', name: 'John Kamau', phone: '0711***111' },
  { id: 'drv-02', name: 'Peter Njoroge', phone: '0722***222' },
];

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-01', registrationNumber: 'KDA 123A', routeName: 'CBD - Westlands', 
    assignedDriverId: 'drv-01', assignedConductorName: 'David Ochieng',
    status: 'Active',
    receivingAccount: { vehicleId: 'veh-01', accountType: 'Pochi la Biashara', ownershipCategory: 'Vehicle Owner', maskedIdentifier: '****8912', compatibilityStatus: 'Compatibility Unverified', liveStkPushEnabled: false },
  },
  {
    id: 'veh-02', registrationNumber: 'KCB 456B', routeName: 'CBD - Karen', 
    assignedDriverId: 'drv-02', assignedConductorName: 'David Ochieng',
    status: 'Active',
    receivingAccount: { vehicleId: 'veh-02', accountType: 'Pochi la Biashara', ownershipCategory: 'Conductor', maskedIdentifier: '****3345', compatibilityStatus: 'Awaiting Verification', liveStkPushEnabled: false },
  },
  {
    id: 'veh-03', registrationNumber: 'KDD 789C', routeName: 'CBD - Rongai', 
    assignedDriverId: 'drv-01', assignedConductorName: 'Grace Wanjiku',
    status: 'Active',
    receivingAccount: { vehicleId: 'veh-03', accountType: 'Pochi la Biashara', ownershipCategory: 'SACCO or Treasurer', maskedIdentifier: '****0011', compatibilityStatus: 'Approved for Future Integration', liveStkPushEnabled: false },
  },
];

export const initialTransactions: PaymentTransaction[] = [];
export const initialAuditEvents: AuditEvent[] = [];
export const demoSettings: DemoSettings = {
  globalLiveStkPushStatus: 'DISABLED',
  compatibilityVerification: 'Pending provider approval for individual Pochi la Biashara accounts.',
};