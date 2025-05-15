
// src/app/dashboard/layout.tsx (Dashboard layout)
"use client";

import Sidebar from "../../../components/Sidebar";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import React from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '2rem', backgroundColor: '#1a2634', color: 'white', overflowY: 'auto' }}>
            <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <UserButton afterSignOutUrl="/sign-in" />
            </header>
            {children}
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
