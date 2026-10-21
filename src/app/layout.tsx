import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/splash-screen";
import { DemoStoreProvider } from "@/lib/demo-store";
import { PWARegister } from "@/components/ui/pwa-register";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lopha Travels | Fare Prompt",
  description: "Mobile-first matatu fare-prompting prototype (demo)",
  manifest: "/manifest.json", 
};

export const viewport: Viewport = {
  themeColor: "#0B3B60", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-lopha-bg text-lopha-blue`}>
        <PWARegister />
        <SplashScreen />
        <DemoStoreProvider>
          {children}
        </DemoStoreProvider>
      </body>
    </html>
  );
}