import { Transaction, PaymentStatus } from '@/types';

export async function simulatePrompt(
  vehicleId: string, vehicleReg: string, conductorId: string, accountId: string, phone: string, amount: number
): Promise<Transaction> {
  // Simulates the time it takes for the customer to enter their PIN
  await new Promise(r => setTimeout(r, 2500));

  // Demo: Randomly succeed 80% of the time, fail 20%
  const isSuccess = Math.random() > 0.2;
  const status: PaymentStatus = isSuccess ? 'SUCCESS' : 'FAILED';
  
  // Generate a realistic M-Pesa receipt code
  const mpesaRef = isSuccess ? 'Q' + Math.random().toString(36).substring(2, 10).toUpperCase() : null;

  return {
    id: crypto.randomUUID(),
    vehicleId, vehicleReg, conductorId, accountId,
    maskedPhone: phone.slice(0, 4) + '***' + phone.slice(-3),
    amount,
    status,
    mpesaRef,
    createdAt: new Date().toISOString(),
  };
}