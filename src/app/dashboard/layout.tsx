'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DemoStoreProvider, useDemoStore } from '@/lib/demo-store';
import { getNavItemsForRole } from '@/lib/permissions';
import { Menu, X } from 'lucide-react';

function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole, setRole, currentUser, resetDemo } = useDemoStore();
  const navItems = getNavItemsForRole(currentRole);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-lopha-light">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-lopha-dark text-white p-4">
        <div>
          <div className="text-lopha-mint font-bold text-lg tracking-tight">LOPHA</div>
          <div className="text-xs text-gray-400">Fare Prompt</div>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${mobileOpen ? 'flex' : 'hidden'} 
        md:flex flex-col justify-between w-full md:w-64 bg-lopha-dark text-white p-4 md:min-h-screen
        absolute md:relative z-50 top-[60px] md:top-0 h-[calc(100vh-60px)] md:h-auto
      `}>
        <div>
          <div className="hidden md:block mb-6">
            <div className="text-lopha-mint font-bold text-lg tracking-tight">LOPHA</div>
            <div className="text-xs text-gray-400">Fare Prompt</div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map(item => {
              const active = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                    active 
                      ? 'bg-lopha-mint text-white font-semibold shadow-sm' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4 space-y-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">Demo Role Switcher</p>
            <select 
              value={currentRole} 
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-lopha-charcoal text-white text-sm rounded p-2 border border-gray-600 outline-none focus:border-lopha-mint"
            >
              <option value="admin">SACCO Admin</option>
              <option value="conductor">Conductor</option>
            </select>
          </div>
          <div className="text-xs text-gray-500">
            Signed in: {currentUser.name}
          </div>
          <button onClick={resetDemo} className="text-xs text-red-400 hover:text-red-300 underline transition-colors">
            Reset Demo Data
          </button>
        </div>
      </aside>
      
      {/* Main Content Area - REMOVED overflow-x-hidden so dropdowns can pop out */}
      <main key={pathname} className="flex-1 animate-page mt-[60px] md:mt-0 p-0">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoStoreProvider>
      <DashboardShell>{children}</DashboardShell>
    </DemoStoreProvider>
  );
}