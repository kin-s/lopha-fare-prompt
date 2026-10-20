import { PaymentTransaction, PaymentStatus } from '@/types';
export type SimulationOutcome = 'SUCCESS' | 'PENDING' | 'FAILED' | 'CANCELLED' | 'TIMED_OUT';
interface SimulateRequest { vehicleId: string; vehicleRegistration: string; conductorId: string; maskedPhone: string; amount: number; outcome: SimulationOutcome; }
export async function simulatePayment(request: SimulateRequest): Promise<PaymentTransaction> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const statusMap: Record<SimulationOutcome, PaymentStatus> = {
    SUCCESS: 'SUCCESS', PENDING: 'PENDING', FAILED: 'FAILED', CANCELLED: 'CANCELLED', TIMED_OUT: 'TIMED_OUT',
  };
  return {
    id: crypto.randomUUID(), demoReference: `DEMO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    vehicleId: request.vehicleId, vehicleRegistration: request.vehicleRegistration, conductorId: request.conductorId,
    maskedPassengerPhone: request.maskedPhone, amount: request.amount, status: statusMap[request.outcome],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), source: 'SIMULATION', testOutcome: request.outcome,
  };
}