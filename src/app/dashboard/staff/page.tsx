'use client';
import { useDemoStore } from '@/lib/demo-store';
import { demoUsers } from '@/lib/mock-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function StaffPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-lopha-blue">Staff Management</h1>
      <div className="bg-white rounded-xl border border-lopha-border overflow-hidden">
        <Table>
          <TableHeader className="bg-lopha-bg"><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {demoUsers.map(u => (
              <TableRow key={u.id}>
                <TableCell className="font-bold">{u.name}</TableCell>
                <TableCell>{u.role.replace('_', ' ')}</TableCell>
                <TableCell><span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Active</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}