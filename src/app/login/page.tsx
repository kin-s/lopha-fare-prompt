'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-lopha-bg p-6">
      <Card className="w-full max-w-md border-lopha-border shadow-xl bg-white">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-lopha-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-lopha-blue">Lopha Travels</CardTitle>
          <CardDescription className="text-gray-500 font-medium mt-1">
            Select a portal to access the system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <Button 
            onClick={() => router.push('/dashboard?role=admin')} 
            className="w-full h-14 bg-lopha-blue hover:bg-[#092f4d] text-white font-bold text-base shadow-md flex items-center justify-start px-6"
          >
            <UserCheck className="mr-3 h-5 w-5" />
            Enter SACCO Admin Portal
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.push('/dashboard?role=conductor')} 
            className="w-full h-14 border-lopha-blue text-lopha-blue font-bold text-base hover:bg-blue-50 transition-colors flex items-center justify-start px-6"
          >
            <UserCheck className="mr-3 h-5 w-5" />
            Enter Conductor POS
          </Button>

        </CardContent>
      </Card>
    </main>
  );
}