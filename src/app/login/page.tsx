'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex items-center justify-center bg-lopha-light p-6">
      <Card className="w-full max-w-md border-lopha-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-lopha-charcoal">Demo Sign-In</CardTitle>
          <p className="text-sm text-lopha-gray mt-1">No real credentials required. Choose a role.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full h-12 bg-lopha-charcoal hover:bg-black text-white" onClick={() => router.push('/dashboard')}>Continue as Conductor</Button>
          <Button variant="outline" className="w-full h-12 border-lopha-border text-lopha-charcoal hover:bg-lopha-light" onClick={() => router.push('/dashboard')}>Continue as SACCO Admin</Button>
        </CardContent>
      </Card>
    </main>
  );
}