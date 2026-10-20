'use client';
import { PaymentTransaction } from '@/types';
import { formatKsh, formatTimestamp } from '@/lib/formatters';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';

export function TransactionDetailDialog({ tx }: { tx: PaymentTransaction }) {
  return (
    <Dialog>
      <DialogTrigger render={
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lopha-gray hover:text-lopha-charcoal" />
      }>
        <Eye className="h-4 w-4" />
      </DialogTrigger>
      
      <DialogContent className="border-lopha-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lopha-charcoal">Transaction Details</DialogTitle>
          <DialogDescription>
            Simulated record — no real funds were moved.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center bg-lopha-light p-4 rounded-xl border border-lopha-border">
            <div>
              <p className="text-xs text-lopha-gray uppercase tracking-wide">Amount</p>
              <p className="text-2xl font-bold text-lopha-charcoal">{formatKsh(tx.amount)}</p>
            </div>
            <StatusBadge status={tx.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-lopha-gray">Reference</p>
              <p className="font-mono text-xs mt-1">{tx.demoReference}</p>
            </div>
            <div>
              <p className="text-lopha-gray">Date & Time</p>
              <p className="font-medium mt-1">{formatTimestamp(tx.createdAt)}</p>
            </div>
            <div>
              <p className="text-lopha-gray">Vehicle</p>
              <p className="font-bold mt-1">{tx.vehicleRegistration}</p>
            </div>
            <div>
              <p className="text-lopha-gray">Passenger</p>
              <p className="font-medium mt-1">{tx.maskedPassengerPhone}</p>
            </div>
            <div>
              <p className="text-lopha-gray">Conductor ID</p>
              <p className="font-medium mt-1">{tx.conductorId}</p>
            </div>
            <div>
              <p className="text-lopha-gray">Source</p>
              <p className="font-bold text-blue-600 mt-1">{tx.source}</p>
            </div>
          </div>

          <div className="bg-red-50 text-red-800 text-xs font-bold p-3 rounded-lg text-center mt-2">
            DEMO DATA — NOT A REAL M-PESA TRANSACTION
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}