import { PaymentTransaction } from '@/types';
import { formatTimestamp } from '@/lib/formatters';
export function exportTransactionsCsv(transactions: PaymentTransaction[], filename = 'lopha-demo-transactions.csv') {
  const headers = ['Demo Reference', 'Timestamp', 'Vehicle', 'Passenger', 'Amount', 'Status', 'Source'];
  const rows = transactions.map(t => [t.demoReference, formatTimestamp(t.createdAt), t.vehicleRegistration, t.maskedPassengerPhone, t.amount, t.status, 'SIMULATION']);
  const csvContent = ['# DEMO DATA - NOT REAL M-PESA', headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}