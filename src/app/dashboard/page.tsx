'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDemoStore } from '@/lib/demo-store';
import { formatKsh } from '@/lib/formatters';
import { PageLoader } from '@/components/ui/page-loader';

export default function DashboardHome() {
  const { currentUser, currentRole, transactions, vehicles, hydrated } = useDemoStore();
  if (!hydrated) return <PageLoader />;

  // FIX: Changed from assignedConductorId to assignedConductorName
  const myVehicles = vehicles.filter(v => v.assignedConductorName === currentUser.name || currentRole === 'admin');
  const todayTxs = transactions.filter(t => new Date(t.createdAt).toDateString() === new Date().toDateString());

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-lopha-gray">Signed in as</p>
          <h1 className="text-2xl font-bold text-lopha-charcoal">{currentUser.name}</h1>
        </div>
        <span className="text-xs font-bold bg-red-100 text-red-800 px-3 py-1 rounded-full">DEMO MODE</span>
      </div>

      {currentRole === 'conductor' && (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl border border-lopha-border text-center shadow-sm">
            <p className="text-2xl font-bold">{todayTxs.length}</p>
            <p className="text-[10px] text-lopha-gray uppercase tracking-wide">Today's Requests</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-lopha-border text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">{todayTxs.filter(t => t.status === 'SUCCESS').length}</p>
            <p className="text-[10px] text-lopha-gray uppercase tracking-wide">Success</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-lopha-border text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-600">{todayTxs.filter(t => t.status === 'PENDING').length}</p>
            <p className="text-[10px] text-lopha-gray uppercase tracking-wide">Pending</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-lopha-border p-5 space-y-3 shadow-sm">
        <div className="flex justify-between items-center border-b border-lopha-border pb-3">
          <div>
            <p className="text-xs text-lopha-gray">Selected Vehicle</p>
            <p className="font-bold text-lopha-charcoal">{myVehicles[0]?.registrationNumber || 'None assigned'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-lopha-gray">Route</p>
            <p className="text-sm font-medium text-lopha-charcoal">{myVehicles[0]?.routeName || '—'}</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-lopha-gray">Live STK Push</span>
          <span className="font-bold text-red-600">DISABLED</span>
        </div>
      </div>

      {currentRole === 'conductor' && (
        <div className="grid gap-4 md:grid-cols-1">
          <Link href="/dashboard/new-request">
            <Button className="w-full h-24 text-lg bg-lopha-mint hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl">
              + New Fare Request
            </Button>
          </Link>
        </div>
      )}

      {currentRole === 'conductor' && todayTxs.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-lopha-charcoal mb-2">Recent Activity</h2>
          <div className="space-y-2">
            {todayTxs.slice(0,3).map(t => (
              <div key={t.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-lopha-border text-sm shadow-sm">
                <div>
                  <p className="font-bold">{t.vehicleRegistration}</p>
                  <p className="text-xs text-lopha-gray">{t.maskedPassengerPhone}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatKsh(t.amount)}</p>
                  <p className="text-xs text-lopha-gray">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}