'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDemoStore } from '@/lib/demo-store';
import { getNavItems } from '@/lib/permissions';
import { Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, setRole, resetDemo } = useDemoStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync the store role with the URL parameter on load
  const roleParam = searchParams.get('role');
  useEffect(() => {
    if (roleParam === 'admin' && currentUser.role !== 'SACCO_ADMIN') setRole('SACCO_ADMIN');
    if (roleParam === 'conductor' && currentUser.role !== 'CONDUCTOR') setRole('CONDUCTOR');
  }, [roleParam, currentUser.role, setRole]);

  const nav = getNavItems(currentUser.role);

  const handleLogout = () => {
    resetDemo();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-lopha-bg text-lopha-blue">
      
      <div className="md:hidden flex items-center justify-between bg-lopha-blue text-white p-4 sticky top-0 z-40 shadow-md">
        <div className="font-black text-xl tracking-tight">LOPHA TRAVELS</div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <aside className={`
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:sticky top-0 left-0 z-50 w-64 h-screen 
        bg-lopha-blue text-white p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
      `}>
        <div>
          <div className="hidden md:block mb-10 mt-2">
            <div className="font-black text-2xl tracking-tighter">LOPHA</div>
            <div className="text-[10px] font-bold tracking-widest uppercase opacity-70">
              {currentUser.role === 'SACCO_ADMIN' ? 'Admin Portal' : 'Conductor POS'}
            </div>
          </div>
          
          <nav className="space-y-1 mt-16 md:mt-0">
            {nav.map(item => {
              const active = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
              return (
                <Link 
                  key={item.href} 
                  href={`${item.href}?role=${currentUser.role === 'SACCO_ADMIN' ? 'admin' : 'conductor'}`}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    active ? 'bg-white text-lopha-blue font-bold shadow-md' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="border-t border-white/20 pt-4 space-y-4">
          <div className="text-xs opacity-80 font-medium flex flex-col gap-1">
            <span>Signed in as:</span>
            <span className="font-bold text-sm text-white">{currentUser.name}</span>
          </div>
          <Button onClick={handleLogout} variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white justify-start">
            <LogOut className="h-4 w-4 mr-2" /> Log Out
          </Button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <main className="flex-1 w-full overflow-x-hidden animate-page">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold text-lopha-blue">Loading System...</div>}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}