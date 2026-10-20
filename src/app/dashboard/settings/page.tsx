'use client';
import { useState } from 'react';
import { useDemoStore } from '@/lib/demo-store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function SettingsPage() {
  const { resetDemo } = useDemoStore();
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    resetDemo();
    setOpen(false);
    window.location.reload(); // Hard refresh to clear any local component state
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-lopha-charcoal">Settings</h1>

      <div className="bg-lopha-dark text-white p-5 rounded-xl">
        <p className="text-xs text-gray-400 uppercase tracking-wide">Global Live STK Push</p>
        <p className="text-3xl font-bold text-red-400 mt-1">DISABLED</p>
        <p className="text-xs text-gray-400 mt-2">
          Backend credentials and an approved payment integration are required before production use. This cannot be toggled from the frontend.
        </p>
      </div>

      <div className="bg-white border border-lopha-border p-5 rounded-xl space-y-3">
        <h2 className="font-bold text-lopha-charcoal">Demo Data Management</h2>
        <p className="text-sm text-lopha-gray">
          Reset all simulated transactions, vehicles, and audit logs back to their initial state. This is useful for starting a fresh demonstration.
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" />
          }>
            Reset Demo Data
          </DialogTrigger>
          
          <DialogContent className="border-lopha-border">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This will permanently delete all simulated transactions you have created and reset the vehicles to their default state.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleReset} className="bg-red-600 text-white hover:bg-red-700">
                Yes, reset data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}