// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "HIRED.EXE",
  description: "Debug your doubts, code your confidence",
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
