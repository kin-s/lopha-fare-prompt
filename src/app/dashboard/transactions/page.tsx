'use client';
import { useDemoStore } from '@/lib/demo-store';
import { formatKsh, formatTimestamp } from '@/lib/formatters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageLoader } from '@/components/ui/page-loader';

export default function TransactionsPage() {
  const { transactions, currentUser, hydrated } = useDemoStore();
  
  if (!hydrated) return <PageLoader />;

  const isConductor = currentUser.role === 'CONDUCTOR';
  
  // If Conductor, filter by their ID. If Admin, show all.
  const list = isConductor 
    ? transactions.filter(t => t.conductorId === currentUser.id) 
    : transactions;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4 animate-page">
      <h1 className="text-2xl font-black text-lopha-blue">
        {isConductor ? 'My Transactions' : 'All SACCO Transactions'}
      </h1>
      
      {/* Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-xl border border-lopha-border overflow-x-auto shadow-sm">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-lopha-bg">
            <TableRow>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Time</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Vehicle</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Phone</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Amount</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Status</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">M-Pesa Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-500 font-medium">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              list.map(t => (
                <TableRow key={t.id} className="hover:bg-gray-50/50">
                  <TableCell className="text-sm font-medium whitespace-nowrap">{formatTimestamp(t.createdAt)}</TableCell>
                  <TableCell className="font-bold whitespace-nowrap">{t.vehicleReg}</TableCell>
                  <TableCell className="text-gray-600 whitespace-nowrap">{t.maskedPhone}</TableCell>
                  <TableCell className="font-black text-lopha-blue whitespace-nowrap">{formatKsh(t.amount)}</TableCell>
                  <TableCell>
                    <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${t.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {t.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs font-bold text-gray-500 whitespace-nowrap">{t.mpesaRef || '—'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}