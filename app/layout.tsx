"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { PageTransition } from "@/components/ui/PageTransition";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster />
        <SessionProvider>
      
          {children}
         
        </SessionProvider>

        <div className="mt-10">
        <Footer />
      </div>
      </body>
    </html>
  );
}
