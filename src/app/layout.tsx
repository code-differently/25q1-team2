// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "Flashcard Game",
  description: "Built with Clerk + Next.js",
};

/**
 * RootLayout is the top-level layout component for the entire application.
 *
 * Features:
 * - Wraps the app in ClerkProvider to enable authentication.
 * - Applies global font styling using the Inter font.
 * - Includes the HTML and body structure for Next.js App Router.
 *
 * @param children The child components to render within the layout.
 * @returns The root layout wrapping the entire app.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
