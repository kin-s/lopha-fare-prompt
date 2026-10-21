'use client';
import { useState } from 'react';
import { useDemoStore } from '@/lib/demo-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export default function VehiclesPage() {
  const { vehicles, accounts, addVehicle } = useDemoStore();
  const [open, setOpen] = useState(false);
  const [reg, setReg] = useState(''); 
  const [route, setRoute] = useState(''); 
  const [accId, setAccId] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reg || !route || !accId) return;
    addVehicle({ 
      id: crypto.randomUUID(), 
      regNumber: reg.toUpperCase(), 
      routeName: route, 
      conductorId: 'u3', 
      accountId: accId, 
      status: 'Active' 
    });
    setOpen(false); 
    setReg(''); 
    setRoute(''); 
    setAccId('');
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4 animate-page">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-lopha-blue">Vehicles</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-lopha-blue text-white font-bold h-11 px-6 shadow-md" />}>
            <Plus className="h-4 w-4 mr-2" /> Add Vehicle
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-lopha-blue">Add Vehicle</DialogTitle>
              <DialogDescription className="text-gray-500">
                Register a new matatu to the SACCO fleet.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAdd} className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label className="text-lopha-blue font-bold">Registration Number</Label>
                <Input 
                  value={reg} 
                  onChange={e => setReg(e.target.value)} 
                  placeholder="e.g. KDA 123A" 
                  className="h-12 bg-white border-lopha-border focus-visible:ring-lopha-blue uppercase" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-lopha-blue font-bold">Route</Label>
                <Input 
                  value={route} 
                  onChange={e => setRoute(e.target.value)} 
                  placeholder="e.g. CBD - Westlands" 
                  className="h-12 bg-white border-lopha-border focus-visible:ring-lopha-blue" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-lopha-blue font-bold">Receiving Account</Label>
                <Select value={accId} onValueChange={(val) => setAccId(val || '')}>
                  <SelectTrigger className="h-12 bg-white border-lopha-border focus:ring-lopha-blue">
                    <SelectValue placeholder="Select an account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(a => (
                      <SelectItem key={a.id} value={a.id}>{a.displayName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full h-12 bg-lopha-blue hover:bg-[#092f4d] text-white font-bold text-base mt-2">
                Save Vehicle
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-xl border border-lopha-border overflow-x-auto shadow-sm">
        <Table className="min-w-[600px]">
          <TableHeader className="bg-lopha-bg">
            <TableRow>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Reg</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Route</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Account</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map(v => (
              <TableRow key={v.id}>
                <TableCell className="font-bold whitespace-nowrap">{v.regNumber}</TableCell>
                <TableCell className="whitespace-nowrap">{v.routeName}</TableCell>
                <TableCell className="whitespace-nowrap">{accounts.find(a => a.id === v.accountId)?.displayName || 'Unassigned'}</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                    {v.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}