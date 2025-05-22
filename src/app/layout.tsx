// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";

export const metadata = {
  title: "Flashcard Game",
  description: "Built with Clerk + Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
