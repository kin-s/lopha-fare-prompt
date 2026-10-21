'use client';
import { Transaction } from '@/types';
import { formatKsh, formatTimestamp } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';

export function TransactionDetailDialog({ tx }: { tx: Transaction }) {
  const isSuccess = tx.status === 'SUCCESS';
  
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-lopha-blue hover:bg-blue-50" />}>
        <Eye className="h-4 w-4" />
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-lopha-blue text-center">M-Pesa Receipt</DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess ? 'Payment verified successfully.' : 'Payment was not completed.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex justify-center mb-2">
            {isSuccess ? <CheckCircle2 className="h-16 w-16 text-green-500" /> : <XCircle className="h-16 w-16 text-red-500" />}
          </div>

          <div className="text-center bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-3xl font-black text-lopha-blue">{formatKsh(tx.amount)}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">{tx.vehicleReg} • {tx.maskedPhone}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm px-2">
            <div>
              <p className="text-gray-500">Reference</p>
              <p className="font-mono font-bold text-lopha-blue mt-1">{tx.mpesaRef || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500">Date & Time</p>
              <p className="font-medium mt-1">{formatTimestamp(tx.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className={`font-bold mt-1 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>{tx.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Category</p>
              <p className="font-medium mt-1">M-Pesa STK Push</p>
            </div>
          </div>

          <div className="bg-blue-50 text-blue-800 text-xs text-center p-3 rounded-lg mt-4 font-medium">
            Receipt generated securely by Lopha Travels.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}