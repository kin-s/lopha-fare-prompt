'use client';
import { useDemoStore } from '@/lib/demo-store';
import { formatTimestamp } from '@/lib/formatters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageLoader } from '@/components/ui/page-loader';

export default function AuditLogPage() {
  const { auditEvents, hydrated } = useDemoStore();
  if (!hydrated) return <PageLoader />;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-lopha-charcoal">Audit Log</h1>
      <div className="bg-white border border-lopha-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-lopha-light">
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditEvents.map(e => (
              <TableRow key={e.id} className="hover:bg-lopha-light/50 transition-colors">
                <TableCell className="text-sm text-lopha-gray">{formatTimestamp(e.timestamp)}</TableCell>
                <TableCell className="font-medium">{e.userName}</TableCell>
                <TableCell>{e.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}