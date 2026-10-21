'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard?role=admin');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-lopha-bg p-6">
      <Card className="w-full max-w-md border-lopha-border shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-lopha-blue">Admin Login</CardTitle>
          <CardDescription className="text-gray-500 font-medium">
            Enter your credentials to access the SACCO dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lopha-blue font-bold">Email</Label>
              <Input type="email" placeholder="admin@lophatravels.co.ke" defaultValue="admin@lophatravels.co.ke" required className="h-12" />
            </div>
            <div className="space-y-2">
              <Label className="text-lopha-blue font-bold">Password</Label>
              <Input type="password" placeholder="••••••••" defaultValue="password" required className="h-12" />
            </div>
            <Button type="submit" className="w-full h-12 bg-lopha-blue hover:bg-[#092f4d] text-white font-bold text-base mt-2">
              <Lock className="h-4 w-4 mr-2" /> Secure Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}