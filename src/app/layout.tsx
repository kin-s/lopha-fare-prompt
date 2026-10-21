import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/splash-screen";
import { DemoStoreProvider } from "@/lib/demo-store";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lopha Travels | Fare Prompt",
  description: "Mobile-first matatu fare-prompting prototype (demo)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-lopha-bg text-lopha-charcoal`}>
        {/* The store is now available to EVERY page, including Login */}
        <DemoStoreProvider>
          <SplashScreen />
          {children}
        </DemoStoreProvider>
      </body>
    </html>
  );
}