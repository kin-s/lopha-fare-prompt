'use client';
import { useDemoStore } from '@/lib/demo-store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageLoader } from '@/components/ui/page-loader';

export default function ConductorsPage() {
  const { vehicles, updateVehicle, hydrated } = useDemoStore();
  if (!hydrated) return <PageLoader />;

  const conductors = [
    { id: 'cond-01', name: 'David Ochieng' },
    { id: 'cond-02', name: 'Grace Wanjiku' },
  ];

  const handleAssign = (vehicleId: string, conductorId: string | null) => {
    if (!conductorId) return;
    const v = vehicles.find(x => x.id === vehicleId);
    if (v) updateVehicle({ ...v, assignedConductorId: conductorId });
  };

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
                <TableCell>
                  <Select value={v.assignedConductorId} onValueChange={(val) => handleAssign(v.id, val)}>
                    <SelectTrigger className="w-[200px] h-9 border-lopha-border bg-white">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      {conductors.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}