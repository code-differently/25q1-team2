import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css'

/**
 * Main entry point for Decode Interviews application.
 * 
 * @returns {void}
 */

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined");
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)
