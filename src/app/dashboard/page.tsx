'use client';
import { useDemoStore } from '@/lib/demo-store';
import { PageLoader } from '@/components/ui/page-loader';
import ConductorPrompt from './ConductorPrompt';
import AdminOverview from './AdminOverview';

export default function DashboardHome() {
  const { currentUser, hydrated } = useDemoStore();
  
  if (!hydrated) return <PageLoader />;
  
  return currentUser.role === 'CONDUCTOR' ? <ConductorPrompt /> : <AdminOverview />;
}