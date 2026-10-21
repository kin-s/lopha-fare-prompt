'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, UserCheck, ChevronRight } from 'lucide-react';

export default function LoginPortalPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-lopha-bg p-6">
      <Card className="w-full max-w-md border-lopha-border shadow-xl bg-white">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 bg-lopha-blue rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-lopha-blue">Lopha Travels</CardTitle>
          <CardDescription className="text-gray-500 font-medium mt-1">
            Select your portal to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <Link href="/login/admin" className="block">
            <div className="group border border-lopha-border rounded-xl p-4 flex items-center justify-between hover:bg-blue-50 hover:border-lopha-blue transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-lopha-blue/10 p-3 rounded-lg group-hover:bg-lopha-blue group-hover:text-white transition-colors">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lopha-blue">SACCO Admin</h3>
                  <p className="text-xs text-gray-500">Manage fleet & accounts</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-lopha-blue" />
            </div>
          </Link>
          
          <Link href="/login/conductor" className="block">
            <div className="group border border-lopha-border rounded-xl p-4 flex items-center justify-between hover:bg-blue-50 hover:border-lopha-blue transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-lopha-blue/10 p-3 rounded-lg group-hover:bg-lopha-blue group-hover:text-white transition-colors">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lopha-blue">Conductor POS</h3>
                  <p className="text-xs text-gray-500">Collect fares via M-Pesa</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-lopha-blue" />
            </div>
          </Link>

        </CardContent>
      </Card>
    </main>
  );
}