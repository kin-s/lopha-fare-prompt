'use client';
import { useState } from 'react';
import { useDemoStore } from '@/lib/demo-store';
import { formatKsh, formatTimestamp } from '@/lib/formatters';
import { StatusBadge } from '@/components/ui/status-badge';
import { exportTransactionsCsv } from '@/lib/csv-export';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageLoader } from '@/components/ui/page-loader';
import { TransactionDetailDialog } from '@/components/transactions/transaction-detail-dialog';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function TransactionsPage() {
  const { transactions, hydrated } = useDemoStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortConfig, setSortConfig] = useState<{ key: 'amount' | 'createdAt', direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });

  if (!hydrated) return <PageLoader />;

  const handleSort = (key: 'amount' | 'createdAt') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const filteredAndSorted = [...transactions]
    .filter(t => {
      const matchesSearch = t.demoReference.toLowerCase().includes(search.toLowerCase()) || t.vehicleRegistration.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return sortConfig.direction === 'asc' 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-lopha-charcoal">Transactions</h1>
        <Button onClick={() => exportTransactionsCsv(filteredAndSorted)} className="bg-lopha-charcoal text-white shadow-sm hover:shadow">
          Export CSV
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="Search reference or vehicle..." 
          value={search} onChange={e => setSearch(e.target.value)}
          className="max-w-sm border-lopha-border bg-white shadow-sm" 
        />
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'ALL')}>
          <SelectTrigger className="w-[180px] border-lopha-border bg-white shadow-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white border border-lopha-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-lopha-light">
            <TableRow>
              <TableHead className="cursor-pointer hover:text-lopha-charcoal transition-colors" onClick={() => handleSort('createdAt')}>
                <div className="flex items-center gap-1">
                  Timestamp
                  {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </div>
              </TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead className="cursor-pointer hover:text-lopha-charcoal transition-colors" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-1">
                  Amount
                  {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-lopha-gray">No transactions found.</TableCell>
              </TableRow>
            ) : (
              filteredAndSorted.map(t => (
                <TableRow key={t.id} className="hover:bg-lopha-light/50 transition-colors">
                  <TableCell className="text-sm">{formatTimestamp(t.createdAt)}</TableCell>
                  <TableCell className="font-mono text-xs">{t.demoReference}</TableCell>
                  <TableCell className="font-medium">{t.vehicleRegistration}</TableCell>
                  <TableCell className="text-lopha-gray">{t.maskedPassengerPhone}</TableCell>
                  <TableCell className="font-bold">{formatKsh(t.amount)}</TableCell>
                  <TableCell><StatusBadge status={t.status} /></TableCell>
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