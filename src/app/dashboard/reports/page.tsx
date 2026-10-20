'use client';
import { useDemoStore } from '@/lib/demo-store';
import { formatKsh } from '@/lib/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PageLoader } from '@/components/ui/page-loader';

const COLORS = ['#1D61F3', '#f59e0b', '#ef4444', '#6b7280'];

export default function ReportsPage() {
  const { transactions, hydrated } = useDemoStore();
  if (!hydrated) return <PageLoader />;

  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  const successCount = transactions.filter(t => t.status === 'SUCCESS').length;
  const successRate = transactions.length > 0 ? Math.round((successCount / transactions.length) * 100) : 0;

  const statusCounts = transactions.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  const vehicleCounts = transactions.reduce((acc, t) => {
    acc[t.vehicleRegistration] = (acc[t.vehicleRegistration] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(vehicleCounts).map(key => ({
    vehicle: key,
    amount: vehicleCounts[key]
  }));

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-lopha-charcoal">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-lopha-border shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-lopha-gray">Simulated Volume</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-lopha-charcoal">{formatKsh(totalVolume)}</p></CardContent>
        </Card>
        <Card className="border-lopha-border shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-lopha-gray">Total Requests</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-lopha-charcoal">{transactions.length}</p></CardContent>
        </Card>
        <Card className="border-lopha-border shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-lopha-gray">Demo Success Rate</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-green-600">{successRate}%</p></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-lopha-border shadow-sm">
          <CardHeader><CardTitle className="text-base text-lopha-charcoal">Outcomes by Status</CardTitle></CardHeader>
          <CardContent className="h-64">
            {transactions.length === 0 ? <p className="text-lopha-gray text-sm">No data yet.</p> : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-lopha-border shadow-sm">
          <CardHeader><CardTitle className="text-base text-lopha-charcoal">Simulated Volume by Vehicle</CardTitle></CardHeader>
          <CardContent className="h-64">
            {transactions.length === 0 ? <p className="text-lopha-gray text-sm">No data yet.</p> : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="vehicle" stroke="#66716F" fontSize={12} />
                  <YAxis stroke="#66716F" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#1D61F3" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}