export type UserRole = 'admin' | 'conductor';

export type DemoUser = {
  id: string;
  name: string;
  role: UserRole;
  assignedVehicleIds: string[];
};

export type Driver = {
  id: string;
  name: string;
  phone: string;
};

export type VehicleStatus = 'Active' | 'Inactive';

export type AccountOwnershipCategory =
  | 'Vehicle Owner'
  | 'Conductor'
  | 'SACCO or Treasurer'
  | 'Varies or Requires Confirmation';

export type AccountStatus =
  | 'Not Configured'
  | 'Awaiting Verification'
  | 'Compatibility Unverified'
  | 'Approved for Future Integration'
  | 'Disabled';

export type ReceivingAccountConfig = {
  vehicleId: string;
  accountType: string;
  ownershipCategory: AccountOwnershipCategory;
  maskedIdentifier: string;
  compatibilityStatus: AccountStatus;
  liveStkPushEnabled: false;
};

export type Vehicle = {
  id: string;
  registrationNumber: string;
  routeName: string;
  assignedDriverId: string; // New field
  assignedConductorName: string; // New field (using name for simplicity in this demo)
  status: VehicleStatus;
  receivingAccount: ReceivingAccountConfig;
};

export type PaymentStatus =
  | 'SUCCESS'
  | 'PENDING'
  | 'FAILED'
  | 'CANCELLED'
  | 'TIMED_OUT';

export type PaymentTransaction = {
  id: string;
  demoReference: string;
  vehicleId: string;
  vehicleRegistration: string;
  conductorId: string;
  maskedPassengerPhone: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  source: 'SIMULATION';
  testOutcome: string;
};

export type AuditEvent = {
  id: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
};

export type DemoSettings = {
  globalLiveStkPushStatus: 'DISABLED';
  compatibilityVerification: string;
};