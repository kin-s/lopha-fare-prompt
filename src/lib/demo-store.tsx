'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DemoUser, Vehicle, ReceivingAccount, Transaction, UserRole, Shift } from '@/types';
import { demoUsers, initialVehicles, initialAccounts, initialTransactions, initialShifts } from '@/lib/mock-data';

const STORAGE_KEY = 'lopha-prompt-v6';

type DemoState = { 
  currentUser: DemoUser; 
  currentVehicle: Vehicle | null; // NEW: Tracks the logged-in vehicle
  vehicles: Vehicle[]; 
  accounts: ReceivingAccount[]; 
  transactions: Transaction[]; 
  shifts: Shift[]; 
};

type DemoContextValue = DemoState & { 
  hydrated: boolean; 
  setRole: (role: UserRole) => void; 
  loginConductor: (regNumber: string, name: string) => boolean;
  logoutConductor: () => void;
  addTransaction: (tx: Transaction) => void; 
  addVehicle: (v: Vehicle) => void; 
  addAccount: (a: ReceivingAccount) => void; 
  openShift: (s: Shift) => void; 
  closeShift: (id: string) => void; 
  resetDemo: () => void; 
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>({ 
    currentUser: demoUsers[0], 
    currentVehicle: null,
    vehicles: initialVehicles, 
    accounts: initialAccounts, 
    transactions: initialTransactions, 
    shifts: initialShifts 
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) setState(JSON.parse(raw)); } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state, hydrated]);

  const setRole = useCallback((role: UserRole) => { 
    const u = demoUsers.find(x => x.role === role); 
    // If switching to Conductor via sidebar, we clear the vehicle so they must log in
    if (u) setState(p => ({ ...p, currentUser: u, currentVehicle: role === 'CONDUCTOR' ? null : p.currentVehicle })); 
  }, []);

  const loginConductor = useCallback((regNumber: string, name: string) => {
    const vehicle = state.vehicles.find(v => v.regNumber.replace(/\s/g, '').toUpperCase() === regNumber.replace(/\s/g, '').toUpperCase());
    if (vehicle) {
      // Find or create conductor user
      const existingUser = demoUsers.find(u => u.name.toLowerCase() === name.toLowerCase() && u.role === 'CONDUCTOR');
      const user = existingUser || { id: crypto.randomUUID(), name, role: 'CONDUCTOR' as UserRole };
      
      setState(p => ({ ...p, currentUser: user, currentVehicle: vehicle }));
      return true;
    }
    return false;
  }, [state.vehicles]);

  const logoutConductor = useCallback(() => {
    setState(p => ({ ...p, currentVehicle: null }));
  }, []);

  const addTransaction = useCallback((tx: Transaction) => setState(p => ({ ...p, transactions: [tx, ...p.transactions] })), []);
  const addVehicle = useCallback((v: Vehicle) => setState(p => ({ ...p, vehicles: [...p.vehicles, v] })), []);
  const addAccount = useCallback((a: ReceivingAccount) => setState(p => ({ ...p, accounts: [...p.accounts, a] })), []);
  const openShift = useCallback((s: Shift) => setState(p => ({ ...p, shifts: [s, ...p.shifts] })), []);
  const closeShift = useCallback((id: string) => setState(p => ({ ...p, shifts: p.shifts.map(s => s.id === id ? { ...s, status: 'CLOSED', endTime: new Date().toISOString() } : s) })), []);
  
  const resetDemo = useCallback(() => { 
    localStorage.removeItem(STORAGE_KEY); 
    setState({ currentUser: demoUsers[0], currentVehicle: null, vehicles: initialVehicles, accounts: initialAccounts, transactions: [], shifts: [] }); 
  }, []);

  return <DemoContext.Provider value={{ ...state, hydrated, setRole, loginConductor, logoutConductor, addTransaction, addVehicle, addAccount, openShift, closeShift, resetDemo }}>{children}</DemoContext.Provider>;
}

export function useDemoStore() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemoStore must be used inside provider');
  return ctx;
}