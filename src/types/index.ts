export type UserRole = 'SACCO_ADMIN' | 'FINANCE_OFFICER' | 'CONDUCTOR';

export type DemoUser = { id: string; name: string; role: UserRole };

export type AccountType = 'Pochi la Biashara' | 'M-Pesa Till' | 'M-Pesa Paybill';
export type IntegrationStatus = 'Awaiting Verification' | 'Prompt Supported' | 'Fully Configured' | 'Disabled';

export type ReceivingAccount = {
  id: string;
  type: AccountType;
  displayName: string;
  maskedIdentifier: string;
  integrationStatus: IntegrationStatus;
};

export type Vehicle = {
  id: string;
  regNumber: string;
  routeName: string;
  conductorId: string;
  accountId: string;
  status: 'Active' | 'Maintenance';
};

export type Shift = {
  id: string;
  conductorId: string;
  vehicleId: string;
  startTime: string;
  endTime: string | null;
  status: 'OPEN' | 'CLOSED';
};

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';

export type Transaction = {
  id: string;
  vehicleId: string;
  vehicleReg: string;
  conductorId: string;
  accountId: string;
  maskedPhone: string;
  amount: number;
  status: PaymentStatus;
  mpesaRef: string | null;
  createdAt: string;
};