'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDemoStore } from '@/lib/demo-store';
import { PageLoader } from '@/components/ui/page-loader';
import ConductorPrompt from './ConductorPrompt';
import AdminOverview from './AdminOverview';

function DashboardContent() {
  const { currentUser, hydrated } = useDemoStore();
  const searchParams = useSearchParams();
  
  if (!hydrated) return <PageLoader />;
  
  const isConductor = searchParams.get('role') === 'conductor' || (searchParams.get('role') === null && currentUser.role === 'CONDUCTOR');
  
  return isConductor ? <ConductorPrompt /> : <AdminOverview />;
}

export default function DashboardHome() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardContent />
    </Suspense>
  );
}