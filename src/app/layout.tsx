import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { TRPCProvider } from "@/trpc/client";
import localFont from "next/font/local";
import { ReactScan } from "@/components/react-scan";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baumans = localFont({
  src: "./fonts/Baumans-Regular.ttf",
});

export const metadata: Metadata = {
  title: "MicroJob",
  description: "A micro job platform for quick tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ReactScan />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baumans.className} antialiased bg-gray-50`}
      >
        <TRPCProvider>
          <div className='w-full max-w-7xl mx-auto'>{children}</div>
          <Toaster richColors expand={true} visibleToasts={6} />
        </TRPCProvider>
      </body>
    </html>
  );
}
