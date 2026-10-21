'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDemoStore } from '@/lib/demo-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';

export default function ConductorLoginPage() {
  const router = useRouter();
  const { loginConductor } = useDemoStore();
  
  const [reg, setReg] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginConductor(reg, name);
    if (success) {
      router.push('/dashboard?role=conductor');
    } else {
      setError('Vehicle registration not found. Check with Admin.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-lopha-bg p-6">
      <Card className="w-full max-w-md border-lopha-border shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-lopha-blue">Conductor Login</CardTitle>
          <CardDescription className="text-gray-500 font-medium">
            Enter your assigned vehicle details to access the POS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lopha-blue font-bold">Vehicle Registration</Label>
              <Input 
                value={reg} 
                onChange={e => setReg(e.target.value)} 
                placeholder="e.g. KDA 123A" 
                className="h-12 uppercase" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lopha-blue font-bold">Your Name</Label>
              <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g. David Ochieng" 
                className="h-12" 
                required 
              />
            </div>
            {error && <p className="text-sm font-bold text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full h-12 bg-lopha-blue hover:bg-[#092f4d] text-white font-bold text-base mt-2">
              <KeyRound className="h-4 w-4 mr-2" /> Access POS
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}