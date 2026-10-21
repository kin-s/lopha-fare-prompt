'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DemoStoreProvider, useDemoStore } from '@/lib/demo-store';
import { getNavItems } from '@/lib/permissions';
import { Menu, X } from 'lucide-react';

function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, setRole, resetDemo } = useDemoStore();
  const nav = getNavItems(currentUser.role);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <div className="text-[10px] font-bold tracking-widest uppercase opacity-70">Travels System</div>
          </div>
          
          <nav className="space-y-1 mt-16 md:mt-0">
            {nav.map(item => {
              const active = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
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
        
        <div className="border-t border-white/20 pt-4 space-y-3">
          <select 
            value={currentUser.role} 
            onChange={e => setRole(e.target.value as any)} 
            className="w-full bg-black/20 text-white text-sm rounded-lg p-3 border border-white/20 outline-none cursor-pointer font-medium"
          >
            <option value="SACCO_ADMIN" className="text-black">SACCO Admin</option>
            <option value="CONDUCTOR" className="text-black">Conductor</option>
          </select>
          <div className="text-xs opacity-80 font-medium flex justify-between items-center">
            <span>Signed in:</span>
            <span className="font-bold">{currentUser.name}</span>
          </div>
          <button onClick={resetDemo} className="text-xs text-red-300 hover:text-red-200 underline font-bold block w-full text-left">
            Reset Demo Data
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      <main className="flex-1 w-full overflow-x-hidden animate-page">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DemoStoreProvider><Shell>{children}</Shell></DemoStoreProvider>;
}