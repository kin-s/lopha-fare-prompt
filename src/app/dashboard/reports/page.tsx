'use client';
import { useDemoStore } from '@/lib/demo-store';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatKsh, formatTimestamp } from '@/lib/formatters';
import { Download } from 'lucide-react';

export default function ReportsPage() {
  const { transactions } = useDemoStore();
  const successful = transactions.filter(t => t.status === 'SUCCESS');
  const total = successful.reduce((s, t) => s + t.amount, 0);

  const handleExport = () => {
    const headers = 'Time,Vehicle,Phone,Amount,Status,M-Pesa Ref\n';
    const rows = transactions.map(t => `${formatTimestamp(t.createdAt)},${t.vehicleReg},${t.maskedPhone},${t.amount},${t.status},${t.mpesaRef || ''}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'lopha_reconciliation.csv'; a.click();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-lopha-blue">Reconciliation Report</h1>
          <p className="text-sm text-gray-500 mt-1">Total Verified Revenue: <strong className="text-green-600">{formatKsh(total)}</strong></p>
        </div>
        <Button onClick={handleExport} className="bg-lopha-blue text-white"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
      </div>
      <div className="bg-white rounded-xl border border-lopha-border overflow-hidden">
        <Table>
          <TableHeader className="bg-lopha-bg"><TableRow><TableHead>Time</TableHead><TableHead>Vehicle</TableHead><TableHead>Phone</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Ref</TableHead></TableRow></TableHeader>
          <TableBody>
            {transactions.map(t => (
              <TableRow key={t.id}>
                <TableCell>{formatTimestamp(t.createdAt)}</TableCell>
                <TableCell>{t.vehicleReg}</TableCell>
                <TableCell>{t.maskedPhone}</TableCell>
                <TableCell className="font-bold">{formatKsh(t.amount)}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell className="font-mono text-xs">{t.mpesaRef || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}