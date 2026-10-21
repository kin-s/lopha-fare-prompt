import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-lopha-bg">
      <header className="flex items-center justify-between px-6 py-4 border-b border-lopha-border bg-white">
        <div>
          <div className="font-black text-xl text-lopha-blue tracking-tight">LOPHA TRAVELS</div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-0.5">SACCO Fare Collection</div>
        </div>
        <Link href="/login">
          <Button variant="outline" className="border-lopha-blue text-lopha-blue font-bold hover:bg-lopha-blue hover:text-white transition-colors">
            Demo Login
          </Button>
        </Link>
      </header>
      
      <section className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl text-center space-y-8">
          <span className="inline-block bg-lopha-red text-white text-xs font-bold px-4 py-2 rounded-full tracking-wider shadow-sm">
            SECURE M-PESA COLLECTION
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-lopha-blue leading-tight">
            Complete SACCO management, <span className="text-lopha-red">without fare leakage.</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            A professional transport management system for Kenyan matatu SACCOs. Administrators configure the receiving accounts, and conductors initiate automatic M-Pesa payment prompts securely.
          </p>
          <div className="flex justify-center pt-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-lg bg-lopha-blue text-white hover:bg-[#092f4d] font-bold shadow-xl transition-transform hover:scale-105">
                Enter System
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-4 text-center text-xs text-gray-500 border-t border-lopha-border">
        Lopha Travels &copy; {new Date().getFullYear()} • Secure Payments Integration
      </footer>
    </main>
  );
}