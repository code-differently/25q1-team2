// src/app/dashboard/layout.tsx (Dashboard layout)
"use client";

import Sidebar from "../../components/Sidebar";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

/**
 * DashboardLayout is a client-side layout component for all pages under `/dashboard`.
 *
 * Features:
 * - Only renders for signed-in users using Clerk's `SignedIn` wrapper.
 * - Redirects to the sign-in page if the user is not authenticated via `SignedOut`.
 * - Includes a sidebar and a top-right user button with sign-out capability.
 * - Renders child components within a styled main content area.
 *
 * @param children The content to render inside the dashboard layout.
 * @returns The full dashboard layout including sidebar and header.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedIn>
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <div
            style={{
              flex: 1,
              padding: "2rem",
              backgroundColor: "#1a2634",
              color: "white",
              overflowY: "auto",
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "1rem",
              }}
            >
              <UserButton afterSignOutUrl="/" />
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
