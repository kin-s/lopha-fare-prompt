'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDemoStore } from '@/lib/demo-store';
import { Vehicle } from '@/types';
import { Plus } from 'lucide-react';

export function VehicleFormDialog() {
  const { addVehicle } = useDemoStore();
  const [open, setOpen] = useState(false);
  const [reg, setReg] = useState('');
  const [route, setRoute] = useState('');
  const [owner, setOwner] = useState<string>('Vehicle Owner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reg || !route) return;

    const newVehicle: Vehicle = {
      id: crypto.randomUUID(),
      registrationNumber: reg.toUpperCase(),
      routeName: route,
      assignedConductorId: 'cond-01', // Default assign to cond-01 for demo
      status: 'Active',
      receivingAccount: {
        vehicleId: crypto.randomUUID(), // Simplified for demo
        accountType: 'Pochi la Biashara',
        ownershipCategory: owner as any,
        maskedIdentifier: '****' + Math.floor(1000 + Math.random() * 9000),
        compatibilityStatus: 'Compatibility Unverified',
        liveStkPushEnabled: false,
      },
    };

    addVehicle(newVehicle);
    setOpen(false);
    setReg('');
    setRoute('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="bg-lopha-charcoal text-white hover:bg-black" />
      }>
        <Plus className="h-4 w-4 mr-2" /> Add Vehicle
      </DialogTrigger>
      
      <DialogContent className="border-lopha-border">
        <DialogHeader>
          <DialogTitle className="text-lopha-charcoal">Add New Vehicle</DialogTitle>
          <DialogDescription>
            Create a demo vehicle record. Live STK Push will remain disabled.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label>Registration Number</Label>
            <Input value={reg} onChange={e => setReg(e.target.value)} placeholder="e.g., KDA 999X" className="mt-1 border-lopha-border" required />
          </div>
          <div>
            <Label>Route</Label>
            <Input value={route} onChange={e => setRoute(e.target.value)} placeholder="e.g., CBD - Ngong" className="mt-1 border-lopha-border" required />
          </div>
          <div>
            <Label>Receiving Account Owner</Label>
            <Select value={owner} onValueChange={(val) => setOwner(val || 'Vehicle Owner')}>
              <SelectTrigger className="mt-1 border-lopha-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Vehicle Owner">Vehicle Owner</SelectItem>
                <SelectItem value="Conductor">Conductor</SelectItem>
                <SelectItem value="SACCO or Treasurer">SACCO or Treasurer</SelectItem>
                <SelectItem value="Varies or Requires Confirmation">Varies</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-md">
            Compatibility status will default to "Unverified". Live payments cannot be enabled.
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-lopha-mint text-lopha-charcoal hover:bg-[#1de0b3] font-bold">Save Vehicle</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}