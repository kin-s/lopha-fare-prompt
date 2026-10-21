'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatKsh, maskPhoneNumber } from '@/lib/formatters';
import { simulatePayment, SimulationOutcome } from '@/lib/mock-payment-service';
import { PaymentTransaction } from '@/types';
import { useDemoStore } from '@/lib/demo-store';
import { ShieldAlert, CheckCircle2, Loader2, MessageSquare, XCircle } from 'lucide-react';

export default function NewRequestPage() {
  const { addTransaction, currentUser, vehicles, hydrated } = useDemoStore();
  
  const myVehicles = vehicles.filter(v => v.assignedConductorId === currentUser.id);
  
  const [vehicleId, setVehicleId] = useState<string>(myVehicles[0]?.id || '');
  const [amount, setAmount] = useState<number>(50);
  const [phone, setPhone] = useState<string>('');
  const [outcome, setOutcome] = useState<SimulationOutcome>('SUCCESS');
  
  // States: 'form' -> 'waiting' -> 'result'
  const [step, setStep] = useState<'form' | 'waiting' | 'result'>('form');
  const [tx, setTx] = useState<PaymentTransaction | null>(null);

  if (!hydrated) return <div className="p-6 text-lopha-gray">Loading...</div>;

  const selectedVehicle = myVehicles.find(v => v.id === vehicleId);
  const isValidPhone = /^(?:0[17]\d{8}|254[17]\d{8})$/.test(phone);

  const handleSimulate = async () => {
    if (!selectedVehicle || !isValidPhone) return;
    
    setStep('waiting');
    
    const res = await simulatePayment({
      vehicleId: selectedVehicle.id, 
      vehicleRegistration: selectedVehicle.registrationNumber, 
      conductorId: currentUser.id,
      maskedPhone: maskPhoneNumber(phone),
      amount: amount, 
      outcome: outcome,
    });
    
    addTransaction(res);
    setTx(res);
    
    // Simulate a slight delay after the payment service resolves
    // to mimic the M-Pesa SMS hitting the phone
    setTimeout(() => {
      setStep('result');
    }, 800);
  };

  const resetForm = () => {
    setTx(null);
    setPhone('');
    setStep('form');
  };

  // --- RESULT SCREEN (MPESA RECEIPT) ---
  if (step === 'result' && tx) {
    // Generate a realistic fake M-Pesa receipt code
    const receiptCode = `Q${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const isSuccess = tx.status === 'SUCCESS';

    return (
      <div className="p-6 max-w-md mx-auto animate-page">
        <div className="bg-white p-6 rounded-xl border border-lopha-border shadow-lg space-y-4">
          
          <div className="text-center pb-4 border-b border-lopha-border">
            <h2 className="text-xl font-bold text-lopha-charcoal">Transaction Result</h2>
            <p className="text-xs text-lopha-gray mt-1">Confirmation received</p>
          </div>

          {isSuccess ? (
            <div className="space-y-4">
              {/* The M-Pesa SMS Style Box */}
              <div className="bg-[#EAF6FF] border border-[#B6D9F5] p-4 rounded-lg shadow-sm relative">
                <MessageSquare className="absolute top-3 right-3 h-4 w-4 text-[#1D61F3] opacity-50" />
                <p className="font-mono text-sm text-[#1D61F3] font-bold mb-2">
                  {receiptCode} Confirmed.
                </p>
                <p className="font-mono text-sm text-lopha-charcoal leading-relaxed">
                  {formatKsh(tx.amount)} sent to LOPHA FARE PROMPT for {tx.vehicleRegistration}. 
                  <br/>
                  Transaction cost, Ksh0.00.
                  <br/>
                  New M-PESA balance is Ksh***.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm font-bold">
                <CheckCircle2 className="h-5 w-5" />
                Payment Verified
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center space-y-2">
              <XCircle className="h-8 w-8 text-red-500 mx-auto" />
              <p className="font-bold text-red-800">Payment Not Completed</p>
              <p className="text-sm text-red-700">The transaction was {tx.status}.</p>
            </div>
          )}

          <div className="text-xs text-lopha-gray space-y-1 bg-lopha-light p-3 rounded-lg">
            <p><span className="font-semibold">Demo Ref:</span> {tx.demoReference}</p>
            <p><span className="font-semibold">Phone:</span> {tx.maskedPassengerPhone}</p>
            <p><span className="font-semibold">Status:</span> {tx.status}</p>
          </div>

          <Button 
            className="w-full h-14 bg-lopha-charcoal hover:bg-black text-white font-bold text-lg mt-2" 
            onClick={resetForm}
          >
            Confirm & Next Passenger
          </Button>
        </div>
      </div>
    );
  }

  // --- WAITING SCREEN ---
  if (step === 'waiting') {
    return (
      <div className="p-6 max-w-md mx-auto h-[80vh] flex flex-col items-center justify-center text-center space-y-6 animate-page">
        <div className="relative">
          <Loader2 className="h-20 w-20 text-lopha-mint animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-lopha-charcoal">STK Push Sent</h2>
          <p className="text-sm text-lopha-gray mt-2">
            Waiting for <strong className="text-lopha-charcoal">{maskPhoneNumber(phone)}</strong> to enter M-Pesa PIN...
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-lopha-border shadow-sm w-full max-w-xs">
          <p className="text-xs text-lopha-gray uppercase tracking-wide">Amount Requested</p>
          <p className="text-3xl font-bold mt-1">{formatKsh(amount)}</p>
        </div>
      </div>
    );
  }

  // --- FORM SCREEN ---
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

          <div>
            <Label>Customer M-Pesa Number</Label>
            <Input 
              type="tel" 
              placeholder="07XXXXXXXX" 
              className={`h-12 mt-1 border-lopha-border ${phone && !isValidPhone ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            {phone && !isValidPhone && (
              <p className="text-xs text-red-500 mt-1">Enter a valid Kenyan number (07/01).</p>
            )}
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
          
          <Button 
            onClick={handleSimulate} 
            disabled={!isValidPhone}
            className="w-full h-14 text-lg bg-lopha-mint hover:bg-blue-700 text-white font-bold mt-2 shadow-md disabled:opacity-50"
          >
            Send STK Push Prompt
          </Button>
        </div>
      )}
    </div>
  );
}