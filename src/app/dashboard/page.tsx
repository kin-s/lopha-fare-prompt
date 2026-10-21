'use client';
import { useSearchParams } from 'next/navigation';
import { useDemoStore } from '@/lib/demo-store';
import { PageLoader } from '@/components/ui/page-loader';
import ConductorPrompt from './ConductorPrompt';
import AdminOverview from './AdminOverview';

export default function DashboardHome() {
  const { currentUser, hydrated } = useDemoStore();
  const searchParams = useSearchParams();
  
  if (!hydrated) return <PageLoader />;
  
  // Fallback to currentUser.role if URL param is missing
  const isConductor = searchParams.get('role') === 'conductor' || (searchParams.get('role') === null && currentUser.role === 'CONDUCTOR');
  
  return isConductor ? <ConductorPrompt /> : <AdminOverview />;
}