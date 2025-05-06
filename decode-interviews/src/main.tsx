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

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)
