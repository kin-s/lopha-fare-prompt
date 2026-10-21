'use client';
import { useDemoStore } from '@/lib/demo-store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VehicleFormDialog } from '@/components/admin/vehicle-form-dialog';
import { PageLoader } from '@/components/ui/page-loader';

export default function VehiclesPage() {
  const { vehicles, drivers, hydrated } = useDemoStore();
  if (!hydrated) return <PageLoader />;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-lopha-charcoal">Vehicles</h1>
        <VehicleFormDialog />
      </div>
      <div className="bg-white border border-lopha-border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-lopha-light">
            <TableRow>
              <TableHead>Registration</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Conductor</TableHead>
              <TableHead>STK Push</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map(v => {
              const driver = drivers.find(d => d.id === v.assignedDriverId);
              return (
                <TableRow key={v.id} className="hover:bg-lopha-light/50 transition-colors">
                  <TableCell className="font-bold">{v.registrationNumber}</TableCell>
                  <TableCell>{v.routeName}</TableCell>
                  <TableCell>{driver?.name || 'Unassigned'}</TableCell>
                  <TableCell>{v.assignedConductorName || 'Unassigned'}</TableCell>
                  <TableCell>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">DISABLED</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}