'use client';
import { useState } from 'react';
import { useDemoStore } from '@/lib/demo-store';
import { formatKsh, formatTimestamp } from '@/lib/formatters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageLoader } from '@/components/ui/page-loader';
import { TransactionDetailDialog } from '@/components/transactions/transaction-detail-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search } from 'lucide-react';

export default function TransactionsPage() {
  const { transactions, currentUser, hydrated } = useDemoStore();
  const [search, setSearch] = useState('');
  
  if (!hydrated) return <PageLoader />;

  const isConductor = currentUser.role === 'CONDUCTOR';
  
  const list = (isConductor ? transactions.filter(t => t.conductorId === currentUser.id) : transactions)
    .filter(t => t.vehicleReg.toLowerCase().includes(search.toLowerCase()) || (t.mpesaRef && t.mpesaRef.toLowerCase().includes(search.toLowerCase())));

  const handleExport = () => {
    const headers = 'Time,Vehicle,Phone,Amount,Status,M-Pesa Ref\n';
    const rows = list.map(t => `${formatTimestamp(t.createdAt)},${t.vehicleReg},${t.maskedPhone},${t.amount},${t.status},${t.mpesaRef || ''}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'lopha_transactions.csv'; a.click();
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6 animate-page">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-black text-lopha-blue">
          {isConductor ? 'My Transactions' : 'All SACCO Transactions'}
        </h1>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search vehicle or ref..." 
              value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 h-10 bg-white" 
            />
          </div>
          <Button onClick={handleExport} className="bg-lopha-blue text-white h-10 font-bold">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>
      
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
              <TableHead className="font-bold text-lopha-blue text-right whitespace-nowrap">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16 text-gray-500 font-medium">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-300" />
                    <p>No transactions found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              list.map(t => (
                <TableRow key={t.id} className="hover:bg-blue-50/30 transition-colors">
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
                  <TableCell className="text-right">
                    <TransactionDetailDialog tx={t} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}