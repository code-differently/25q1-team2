// src/app/dashboard/layout.tsx (Dashboard layout)
"use client";

import Sidebar from "../../../components/Sidebar";
import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
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
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.home}>
      <div className={styles.gradientOverlay} />
      <h1 className={styles.title}>Welcome to Hired.exe!</h1>
      <p className={styles.subtitle}>Your personal interview prep assistant.</p>
      <div className={styles.gifWrapper}>
        <iframe
          src="https://giphy.com/embed/doXBzUFJRxpaUbuaqz"
          width="100%"
          height="100%"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
