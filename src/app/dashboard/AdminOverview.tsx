'use client';
import { useDemoStore } from '@/lib/demo-store';
import { formatKsh } from '@/lib/formatters';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminOverview() {
  const { transactions, vehicles, accounts } = useDemoStore();
  
  // Calculate real metrics from the store
  const total = transactions.filter(t => t.status === 'SUCCESS').reduce((s, t) => s + t.amount, 0);
  const successful = transactions.filter(t => t.status === 'SUCCESS').length;
  const failed = transactions.filter(t => t.status === 'FAILED').length;

  // Group successful collections by vehicle for the chart
  const chartData = vehicles.map(v => ({
    name: v.regNumber,
    amount: transactions
      .filter(t => t.vehicleId === v.id && t.status === 'SUCCESS')
      .reduce((s, t) => s + t.amount, 0)
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-page">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-lopha-blue">SACCO Overview</h1>
        <span className="bg-blue-100 text-lopha-blue text-xs font-bold px-3 py-1 rounded-full">
          {vehicles.length} Active Vehicles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-lopha-border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Verified Collections</p>
          <p className="text-3xl font-black text-lopha-blue mt-1">{formatKsh(total)}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-lopha-border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Successful Prompts</p>
          <p className="text-3xl font-black text-green-600 mt-1">{successful}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-lopha-border shadow-sm">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Failed Prompts</p>
          <p className="text-3xl font-black text-red-600 mt-1">{failed}</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-lopha-border shadow-sm h-80">
        <h3 className="font-bold text-lopha-blue mb-4">Verified Collections by Vehicle</h3>
        {transactions.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 font-medium">
            No transactions recorded yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{fill: '#64748B', fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#64748B', fontSize: 12}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#F4F7F9'}} contentStyle={{ borderRadius: '8px', border: '1px solid #D1DCE5', fontWeight: 'bold' }} />
              <Bar dataKey="amount" fill="#0B3B60" radius={[6, 6, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}