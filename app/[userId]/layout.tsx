"use client";

import Footer from "@/components/ui/Footer";
import UserPageHeader from "@/components/ui/Header/UserPageHeader";
import { PageTransition } from "@/components/ui/PageTransition";
import { Toaster } from "@/components/ui/toaster";

import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-4/5 mx-auto mt-7">
<UserPageHeader />
    
      <Toaster />
      {/* <PageTransition>
    
      </PageTransition> */}

      {children}
  
    </div>
  );
}
