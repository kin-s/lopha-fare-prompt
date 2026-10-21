'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DemoUser, Driver, Vehicle, PaymentTransaction, AuditEvent, UserRole } from '@/types';
import { demoUsers, initialDrivers, initialVehicles, initialTransactions, initialAuditEvents } from '@/lib/mock-data';

const STORAGE_KEY = 'lopha-demo-state-v2';

type DemoState = {
  currentRole: UserRole;
  currentUser: DemoUser;
  drivers: Driver[];
  vehicles: Vehicle[];
  transactions: PaymentTransaction[];
  auditEvents: AuditEvent[];
};

type DemoContextValue = DemoState & {
  hydrated: boolean;
  setRole: (role: UserRole) => void;
  addTransaction: (tx: PaymentTransaction) => void;
  addVehicle: (v: Vehicle) => void;
  updateVehicle: (v: Vehicle) => void;
  addDriver: (d: Driver) => void;
  addAuditEvent: (action: string) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

function getUserForRole(role: UserRole): DemoUser {
  const match = demoUsers.find((u) => u.role === role);
  return match ?? demoUsers[0];
}

const initialState: DemoState = {
  currentRole: 'admin',
  currentUser: getUserForRole('admin'),
  drivers: initialDrivers,
  vehicles: initialVehicles,
  transactions: initialTransactions,
  auditEvents: initialAuditEvents,
};

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state, hydrated]);

  const setRole = useCallback((role: UserRole) => {
    setState((prev) => ({ ...prev, currentRole: role, currentUser: getUserForRole(role) }));
  }, []);

  const addTransaction = useCallback((tx: PaymentTransaction) => {
    setState((prev) => ({
      ...prev,
      transactions: [tx, ...prev.transactions],
      auditEvents: [
        { id: crypto.randomUUID(), action: `Simulated ${tx.status} request for ${tx.vehicleRegistration}`, userId: prev.currentUser.id, userName: prev.currentUser.name, timestamp: new Date().toISOString() },
        ...prev.auditEvents,
      ],
    }));
  }, []);

  const addVehicle = useCallback((v: Vehicle) => {
    setState((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, v],
      auditEvents: [
        { id: crypto.randomUUID(), action: `Vehicle ${v.registrationNumber} created`, userId: prev.currentUser.id, userName: prev.currentUser.name, timestamp: new Date().toISOString() },
        ...prev.auditEvents,
      ],
    }));
  }, []);

  const updateVehicle = useCallback((v: Vehicle) => {
    setState((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((x) => (x.id === v.id ? v : x)),
      auditEvents: [
        { id: crypto.randomUUID(), action: `Vehicle ${v.registrationNumber} updated`, userId: prev.currentUser.id, userName: prev.currentUser.name, timestamp: new Date().toISOString() },
        ...prev.auditEvents,
      ],
    }));
  }, []);

  const addDriver = useCallback((d: Driver) => {
    setState((prev) => ({ ...prev, drivers: [...prev.drivers, d] }));
  }, []);

  const addAuditEvent = useCallback((action: string) => {
    setState((prev) => ({
      ...prev,
      auditEvents: [
        { id: crypto.randomUUID(), action, userId: prev.currentUser.id, userName: prev.currentUser.name, timestamp: new Date().toISOString() },
        ...prev.auditEvents,
      ],
    }));
  }, []);

  const resetDemo = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setState({ ...initialState });
  }, []);

  return (
    <DemoContext.Provider value={{ ...state, hydrated, setRole, addTransaction, addVehicle, updateVehicle, addDriver, addAuditEvent, resetDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoStore() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemoStore must be used inside DemoStoreProvider');
  return ctx;
}