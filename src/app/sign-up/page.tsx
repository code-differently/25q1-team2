"use client";

import { SignUp } from '@clerk/nextjs';
import React from 'react';

/**
 * SignUpPage is a client-side page component that renders the Clerk-provided sign-up form.
 *
 * It handles user registration using Clerk's pre-built UI.
 *
 * @returns The Clerk <SignUp /> component for user account creation.
 */
export default function SignUpPage() {
  return <SignUp />;
}
