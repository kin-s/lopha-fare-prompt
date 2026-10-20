'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatKsh, maskPhoneNumber } from '@/lib/formatters';
import { simulatePayment, SimulationOutcome } from '@/lib/mock-payment-service';
import { PaymentTransaction } from '@/types';
import { useDemoStore } from '@/lib/demo-store';
import { ShieldAlert } from 'lucide-react';

export default function NewRequestPage() {
  const router = useRouter();
  const { addTransaction, currentUser, vehicles, hydrated } = useDemoStore();
  
  const myVehicles = vehicles.filter(v => v.assignedConductorId === currentUser.id);
  
  const [vehicleId, setVehicleId] = useState<string>(myVehicles[0]?.id || '');
  const [amount, setAmount] = useState<number>(50);
  const [phone, setPhone] = useState<string>('');
  const [outcome, setOutcome] = useState<SimulationOutcome>('SUCCESS');
  const [processing, setProcessing] = useState(false);
  const [tx, setTx] = useState<PaymentTransaction | null>(null);

  if (!hydrated) return <div className="p-6 text-lopha-gray">Loading...</div>;

  const selectedVehicle = myVehicles.find(v => v.id === vehicleId);

  const handleSimulate = async () => {
    if (!selectedVehicle) return;
    setProcessing(true);
    const res = await simulatePayment({
      vehicleId: selectedVehicle.id, 
      vehicleRegistration: selectedVehicle.registrationNumber, 
      conductorId: currentUser.id,
      maskedPhone: maskPhoneNumber(phone), amount: amount, outcome: outcome,
    });
    addTransaction(res);
    setTx(res);
    setProcessing(false);
  };

  if (tx) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <div className="bg-white p-6 rounded-xl border border-lopha-border text-center space-y-4 shadow-sm animate-page">
          <h2 className="text-xl font-bold text-lopha-charcoal">Simulation Complete</h2>
          <StatusBadge status={tx.status} />
          <p className="text-3xl font-bold">{formatKsh(tx.amount)}</p>
          <p className="text-sm text-lopha-gray">Ref: {tx.demoReference}</p>
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-bold">DEMO — NOT A REAL M-PESA TRANSACTION</div>
          <Button className="w-full bg-lopha-charcoal text-white" onClick={() => { setTx(null); setPhone(''); }}>New Request</Button>
          <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard/transactions')}>View History</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto space-y-6 animate-page">
      <h1 className="text-2xl font-bold text-lopha-charcoal">New Fare Request</h1>
      
      {myVehicles.length === 0 ? (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl text-sm flex gap-3">
          <ShieldAlert className="h-5 w-5 shrink-0" />
          <p>You currently have no vehicles assigned to you. Please contact the SACCO admin.</p>
        </div>
      ) : (
        <div className="space-y-4 bg-white p-5 rounded-xl border border-lopha-border shadow-sm">
          
          <div>
            <Label>Select Assigned Vehicle</Label>
            <Select value={vehicleId} onValueChange={(val) => setVehicleId(val || '')}>
              <SelectTrigger className="h-12 mt-1 border-lopha-border bg-white w-full truncate">
                <SelectValue placeholder="Select vehicle..." />
              </SelectTrigger>
              <SelectContent>
                {myVehicles.map(v => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.registrationNumber} — {v.routeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedVehicle?.receivingAccount.compatibilityStatus !== 'Approved for Future Integration' && (
             <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
               Live STK push is disabled for this vehicle. This will be simulated.
             </div>
          )}

          <div>
            <Label>Passenger Phone Number</Label>
            <Input type="tel" placeholder="07XXXXXXXX" className="h-12 mt-1 border-lopha-border" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          
          <div>
            <Label>Fare (KSh)</Label>
            <div className="grid grid-cols-4 gap-2 mt-1 mb-2">
              {[20, 30, 50, 100].map(val => (
                <Button key={val} type="button" variant={amount === val ? 'default' : 'outline'} onClick={() => setAmount(val)} className={`h-12 ${amount === val ? 'bg-lopha-charcoal text-white' : 'border-lopha-border'}`}>{val}</Button>
              ))}
            </div>
            <Input type="number" className="h-12 border-lopha-border" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          
          <div className="border-t border-lopha-border pt-4">
            <Label className="text-xs text-lopha-gray">Simulation Outcome</Label>
            <Select value={outcome} onValueChange={(v) => setOutcome(v as SimulationOutcome)}>
              <SelectTrigger className="mt-1 h-10 border-lopha-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SUCCESS">Success</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="TIMED_OUT">Timed Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleSimulate} disabled={processing} className="w-full h-14 text-lg bg-lopha-mint hover:bg-blue-700 text-white font-bold mt-2 shadow-md">
            {processing ? 'Simulating...' : 'Simulate Payment Prompt'}
          </Button>
        </div>
      )}
    </div>
  );
}