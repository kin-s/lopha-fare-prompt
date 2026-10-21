'use client';
import { useDemoStore } from '@/lib/demo-store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageLoader } from '@/components/ui/page-loader';

export default function ConductorsPage() {
  const { vehicles, hydrated } = useDemoStore();
  if (!hydrated) return <PageLoader />;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-lopha-charcoal">Conductor Assignments</h1>
      <div className="bg-white border border-lopha-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-lopha-light">
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Assigned Conductor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map(v => (
              <TableRow key={v.id} className="hover:bg-lopha-light/50 transition-colors">
                <TableCell className="font-bold">{v.registrationNumber}</TableCell>
                <TableCell>{v.routeName}</TableCell>
                <TableCell className="font-medium">{v.assignedConductorName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}