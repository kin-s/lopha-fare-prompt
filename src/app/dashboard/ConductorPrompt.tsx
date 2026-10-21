'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoStore } from '@/lib/demo-store';
import { simulatePrompt, recordCashTransaction } from '@/lib/mock-payment-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldAlert, CheckCircle2, XCircle, Loader2, PlayCircle, StopCircle, Banknote, LogOut } from 'lucide-react';
import { formatKsh } from '@/lib/formatters';

export default function ConductorPrompt() {
  const router = useRouter();
  const { 
    currentUser, currentVehicle, accounts, transactions, addTransaction, shifts, openShift, closeShift, logoutConductor 
  } = useDemoStore();
  
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [step, setStep] = useState<'form' | 'waiting' | 'result'>('form');
  const [result, setResult] = useState<{ status: string; ref: string | null } | null>(null);

  // If there is no current vehicle after hydration, redirect to login
  useEffect(() => {
    if (currentUser.role === 'CONDUCTOR' && !currentVehicle) {
      router.push('/login/conductor');
    }
  }, [currentUser.role, currentVehicle, router]);

  const activeShift = shifts.find(s => s.conductorId === currentUser.id && s.status === 'OPEN');
  const account = accounts.find(a => a.id === currentVehicle?.accountId);
  
  const recentTxs = transactions
    .filter(t => t.vehicleId === currentVehicle?.id && t.status === 'SUCCESS')
    .slice(0, 3);

  const isValidPhone = /^(?:0[17]\d{8}|254[17]\d{8})$/.test(phone);
  const numericAmount = Number(amount);

  const handleStartShift = () => {
    if (currentVehicle) openShift({ id: crypto.randomUUID(), conductorId: currentUser.id, vehicleId: currentVehicle.id, startTime: new Date().toISOString(), endTime: null, status: 'OPEN' });
  };

  const handlePrompt = async () => {
    if (!isValidPhone || !numericAmount || !currentVehicle || !account || !activeShift) return;
    setStep('waiting');
    const tx = await simulatePrompt(currentVehicle.id, currentVehicle.regNumber, currentUser.id, account.id, phone, numericAmount);
    addTransaction(tx);
    setResult({ status: tx.status, ref: tx.mpesaRef });
    setStep('result');
  };

  const handleCash = () => {
    if (!numericAmount || !currentVehicle || !account || !activeShift) return;
    const tx = recordCashTransaction(currentVehicle.id, currentVehicle.regNumber, currentUser.id, account.id, numericAmount);
    addTransaction(tx);
    setResult({ status: tx.status, ref: tx.mpesaRef });
    setStep('result');
  };

  const handleLogout = () => {
    logoutConductor();
    router.push('/login/conductor');
  };

  if (!currentVehicle) return null; // Will redirect via useEffect

  if (step === 'waiting') {
    return (
      <div className="p-6 max-w-md mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-6 animate-page">
        <Loader2 className="h-20 w-20 text-lopha-blue animate-spin" />
        <h2 className="text-2xl font-bold">STK Push Sent</h2>
        <p className="text-gray-500">Waiting for customer to enter PIN on <span className="font-bold text-black">{phone}</span>...</p>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="p-6 max-w-md mx-auto mt-10 animate-page">
        <div className="bg-white p-6 rounded-2xl border border-lopha-border shadow-xl text-center space-y-4">
          {result?.status === 'SUCCESS' ? <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" /> : <XCircle className="h-16 w-16 text-red-500 mx-auto" />}
          <h2 className="text-3xl font-black">{result?.status}</h2>
          <p className="text-4xl font-black text-lopha-blue">{formatKsh(numericAmount)}</p>
          {result?.ref && <p className="font-mono text-sm bg-blue-50 text-blue-800 p-3 rounded-lg font-bold">Ref: {result.ref}</p>}
          <Button onClick={() => { setStep('form'); setPhone(''); setAmount(''); }} className="w-full h-14 bg-lopha-blue text-white font-bold text-lg mt-4">Next Passenger</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-md mx-auto space-y-6 animate-page">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-lopha-blue">{currentVehicle.regNumber}</h1>
          <p className="text-sm font-bold text-gray-500">{currentVehicle.routeName}</p>
          <p className="text-xs text-gray-400 mt-1">Receiving: {account?.displayName}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="text-red-500 border-red-200 hover:bg-red-50"><LogOut className="h-4 w-4 mr-2" /> End</Button>
      </div>

      <div className={`p-4 rounded-xl border ${activeShift ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} flex justify-between items-center shadow-sm`}>
        <div>
          <p className="font-bold text-sm">{activeShift ? 'Shift is OPEN' : 'Shift CLOSED'}</p>
          {activeShift && <p className="text-xs text-green-700 mt-1">Started: {new Date(activeShift.startTime).toLocaleTimeString()}</p>}
        </div>
        {activeShift ? (
          <Button onClick={() => closeShift(activeShift.id)} variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 text-xs font-bold"><StopCircle className="h-4 w-4 mr-1" /> End Shift</Button>
        ) : (
          <Button onClick={handleStartShift} className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold"><PlayCircle className="h-4 w-4 mr-1" /> Start Shift</Button>
        )}
      </div>

      <div className={`bg-white p-5 rounded-2xl border border-lopha-border shadow-md space-y-5 relative ${!activeShift ? 'opacity-50 pointer-events-none' : ''}`}>
        {!activeShift && <div className="absolute inset-0 z-10 flex items-center justify-center font-bold text-red-600 text-lg bg-white/60 rounded-2xl">Open shift to take payments</div>}
        
        <div>
          <Label className="text-lopha-blue font-bold text-base">Customer Phone Number</Label>
          <Input type="tel" placeholder="07XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} className={`h-14 text-xl font-bold mt-1 ${phone && !isValidPhone ? 'border-red-500' : ''}`} />
          {phone && !isValidPhone && <p className="text-xs text-red-500 mt-1">Enter a valid Kenyan number.</p>}
        </div>

        <div>
          <Label className="text-lopha-blue font-bold text-base">Fare Amount (KSh)</Label>
          <Input type="number" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} className="h-16 text-4xl font-black mt-1 text-center bg-blue-50/50" />
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[30, 50, 100, 150].map(v => (
              <Button key={v} type="button" variant={amount === String(v) ? 'default' : 'outline'} onClick={() => setAmount(String(v))} className={`h-10 font-bold ${amount === String(v) ? 'bg-lopha-blue text-white' : 'text-gray-600'}`}>{v}</Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-xs text-blue-800 flex gap-2">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <p>Prompt will be sent to the customer. You cannot redirect this payment.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button onClick={handlePrompt} disabled={!isValidPhone || !numericAmount || !activeShift} className="w-full h-16 text-xl bg-lopha-blue hover:bg-blue-900 text-white font-black tracking-wide shadow-lg">
            Request M-Pesa Payment
          </Button>
          
          <Button onClick={handleCash} disabled={!numericAmount || !activeShift} variant="outline" className="w-full h-12 text-sm border-2 border-dashed border-green-500 text-green-700 hover:bg-green-50 font-bold">
            <Banknote className="h-5 w-5 mr-2" /> Record Cash / Offline Payment
          </Button>
        </div>
      </div>

      {recentTxs.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recent Receipts</h3>
          {recentTxs.map(tx => (
            <div key={tx.id} className="bg-white p-3 rounded-lg border border-lopha-border shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-lopha-blue">{formatKsh(tx.amount)}</p>
                <p className="text-xs text-gray-500">{tx.maskedPhone}</p>
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">SUCCESS</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}