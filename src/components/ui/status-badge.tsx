import { PaymentStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
export function StatusBadge({ status }: { status: PaymentStatus }) {
  const map = {
    SUCCESS: 'bg-green-100 text-green-800 border-green-200',
    PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    FAILED: 'bg-red-100 text-red-800 border-red-200',
    CANCELLED: 'bg-gray-100 text-gray-800 border-gray-200',
    TIMED_OUT: 'bg-orange-100 text-orange-800 border-orange-200',
  };
  const label = status === 'SUCCESS' ? 'DEMO SUCCESS' : status === 'PENDING' ? 'DEMO PENDING' : status;
  return <Badge className={`${map[status]} border text-xs font-bold`}>{label}</Badge>;
}