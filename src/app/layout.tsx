import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/ui/splash-screen";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lopha Fare Prompt",
  description: "Mobile-first matatu fare-prompting prototype (demo)",
  manifest: "/manifest.json", // Links the PWA manifest
};

export const viewport: Viewport = {
  themeColor: "#1D61F3", // Matches your Blue Ribbon theme
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
      <body className={`${poppins.className} antialiased bg-lopha-light text-lopha-charcoal`}>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}