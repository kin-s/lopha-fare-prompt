'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useDemoStore } from '@/lib/demo-store';
import { Vehicle } from '@/types';
import { Plus } from 'lucide-react';

export function VehicleFormDialog() {
  const { addVehicle, addDriver } = useDemoStore();
  const [open, setOpen] = useState(false);
  
  const [reg, setReg] = useState('');
  const [route, setRoute] = useState('');
  const [driverName, setDriverName] = useState('');
  const [conductorName, setConductorName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reg || !route || !driverName || !conductorName) return;

    // 1. Create the driver record
    const newDriverId = crypto.randomUUID();
    addDriver({ id: newDriverId, name: driverName, phone: '07XX***XXX' });

    // 2. Create the vehicle record
    const newVehicle: Vehicle = {
      id: crypto.randomUUID(),
      registrationNumber: reg.toUpperCase(),
      routeName: route,
      assignedDriverId: newDriverId,
      assignedConductorName: conductorName,
      status: 'Active',
      receivingAccount: {
        vehicleId: crypto.randomUUID(),
        accountType: 'Pochi la Biashara',
        ownershipCategory: 'Vehicle Owner', // Default for new vehicles
        maskedIdentifier: '****' + Math.floor(1000 + Math.random() * 9000),
        compatibilityStatus: 'Compatibility Unverified',
        liveStkPushEnabled: false,
      },
    };

    addVehicle(newVehicle);
    setOpen(false);
    
    // Reset form
    setReg(''); setRoute(''); setDriverName(''); setConductorName('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-lopha-charcoal text-white hover:bg-black" />}>
        <Plus className="h-4 w-4 mr-2" /> Add Vehicle
      </DialogTrigger>
      
      <DialogContent className="border-lopha-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lopha-charcoal">Register New Vehicle</DialogTitle>
          <DialogDescription>
            Add a vehicle, its driver, and assigned conductor to the fleet.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label>Registration Number</Label>
            <Input value={reg} onChange={e => setReg(e.target.value)} placeholder="e.g., KDA 999X" className="mt-1 border-lopha-border" required />
          </div>
          <div>
            <Label>Route Name</Label>
            <Input value={route} onChange={e => setRoute(e.target.value)} placeholder="e.g., CBD - Ngong" className="mt-1 border-lopha-border" required />
          </div>
          <div>
            <Label>Driver Name</Label>
            <Input value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="e.g., John Kamau" className="mt-1 border-lopha-border" required />
          </div>
          <div>
            <Label>Conductor Name</Label>
            <Input value={conductorName} onChange={e => setConductorName(e.target.value)} placeholder="e.g., David Ochieng" className="mt-1 border-lopha-border" required />
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