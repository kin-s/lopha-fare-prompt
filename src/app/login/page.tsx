'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, UserCheck, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // Since the DemoStore defaults to Admin, clicking these just navigates to the dashboard.
  // In the dashboard, they can use the sidebar to switch roles immediately.
  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-lopha-bg p-6">
      <Card className="w-full max-w-md border-lopha-border shadow-xl bg-white">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-lopha-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-lopha-blue">Lopha Travels</CardTitle>
          <CardDescription className="text-gray-500 font-medium mt-1">
            Select a demo role to access the SACCO system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <Button 
            onClick={handleLogin} 
            className="w-full h-14 bg-lopha-blue hover:bg-[#092f4d] text-white font-bold text-base shadow-md flex items-center justify-start px-6"
          >
            <UserCheck className="mr-3 h-5 w-5" />
            Continue as SACCO Admin
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleLogin} 
            className="w-full h-14 border-lopha-blue text-lopha-blue font-bold text-base hover:bg-blue-50 transition-colors flex items-center justify-start px-6"
          >
            <ShieldAlert className="mr-3 h-5 w-5" />
            Continue as Finance Officer
          </Button>

          <Button 
            variant="outline"
            onClick={handleLogin} 
            className="w-full h-14 border-lopha-blue text-lopha-blue font-bold text-base hover:bg-blue-50 transition-colors flex items-center justify-start px-6"
          >
            <UserCheck className="mr-3 h-5 w-5" />
            Continue as Conductor
          </Button>

          <p className="text-xs text-center text-gray-400 pt-4">
            You can switch between these roles at any time inside the dashboard using the sidebar.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}