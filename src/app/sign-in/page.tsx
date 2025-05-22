// pages/sign-in.tsx

"use client";

import { SignIn } from '@clerk/nextjs';
import React from 'react';

/**
 * SignInPage is a client-side page component that renders the Clerk-provided sign-in form.
 *
 * It handles user authentication using Clerk's pre-built UI.
 *
 * @returns The Clerk <SignIn /> component for user login.
 */
export default function SignInPage() {
  return <SignIn />;
}
