import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-lopha-light">
      <header className="flex items-center justify-between px-6 py-4 border-b border-lopha-border">
        <div>
          <div className="font-bold text-lg text-lopha-charcoal">LOPHA</div>
          <div className="text-xs text-lopha-gray">Fare Prompt</div>
        </div>
        <Link href="/login"><Button variant="outline" className="border-lopha-border text-lopha-charcoal">Demo Login</Button></Link>
      </header>
      <section className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl text-center space-y-6">
          <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full">DEMO MODE — NO REAL MONEY</span>
          <h1 className="text-4xl md:text-6xl font-bold text-lopha-charcoal leading-tight">
            Matatu fare prompting, <span className="text-lopha-mint">ready for review.</span>
          </h1>
          <p className="text-lg text-lopha-gray">A mobile-first prototype for Kenyan matatu SACCOs. Simulate passenger fare requests, manage vehicles, and test the admin workflow — all without any real M-Pesa transactions.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/login"><Button size="lg" className="h-12 px-6 bg-lopha-charcoal text-white hover:bg-black">Enter Demo</Button></Link>
            <Link href="/dashboard"><Button size="lg" variant="outline" className="h-12 px-6 border-lopha-border text-lopha-charcoal">View Dashboard</Button></Link>
          </div>
        </div>
      </section>
    </main>
  );
}