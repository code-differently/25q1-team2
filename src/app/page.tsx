"use client";


import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import React from 'react';

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="p-4">
          <h1 className="text-2xl">Welcome to the Flashcard Game!</h1>
          <UserButton />
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
