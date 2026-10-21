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

export default function AccountsPage() {
  const { accounts, addAccount } = useDemoStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [type, setType] = useState<any>('Pochi la Biashara');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !identifier) return;
    addAccount({ 
      id: crypto.randomUUID(), 
      type, 
      displayName: name, 
      maskedIdentifier: '****' + identifier.slice(-4), 
      integrationStatus: 'Prompt Supported' 
    });
    setOpen(false); 
    setName(''); 
    setIdentifier('');
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4 animate-page">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-lopha-blue">M-Pesa Accounts</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-lopha-blue text-white font-bold h-11 px-6 shadow-md" />}>
            <Plus className="h-4 w-4 mr-2" /> Add Account
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-lopha-blue">Add Receiving Account</DialogTitle>
              <DialogDescription className="text-gray-500">
                Configure a new M-Pesa account for collecting fares.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAdd} className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label className="text-lopha-blue font-bold">Account Name</Label>
                <Input 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="e.g. Lopha Bus 3" 
                  className="h-12 bg-white border-lopha-border focus-visible:ring-lopha-blue" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-lopha-blue font-bold">Account Identifier (Phone/Till)</Label>
                <Input 
                  value={identifier} 
                  onChange={e => setIdentifier(e.target.value)} 
                  placeholder="e.g. 0712345678" 
                  className="h-12 bg-white border-lopha-border focus-visible:ring-lopha-blue" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-lopha-blue font-bold">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-12 bg-white border-lopha-border focus:ring-lopha-blue">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pochi la Biashara">Pochi la Biashara</SelectItem>
                    <SelectItem value="M-Pesa Till">M-Pesa Till</SelectItem>
                    <SelectItem value="M-Pesa Paybill">M-Pesa Paybill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full h-12 bg-lopha-blue hover:bg-[#092f4d] text-white font-bold text-base mt-2">
                Save Account
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
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Name</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Type</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Identifier</TableHead>
              <TableHead className="font-bold text-lopha-blue whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-bold whitespace-nowrap">{a.displayName}</TableCell>
                <TableCell className="whitespace-nowrap">{a.type}</TableCell>
                <TableCell className="whitespace-nowrap">{a.maskedIdentifier}</TableCell>
                <TableCell>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                    {a.integrationStatus}
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