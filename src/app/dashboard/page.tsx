import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <SignedIn>
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
          <h1>🧠 Flashcard Game</h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </header>

        <main style={{ padding: '2rem' }}>
          <h2>Welcome back! What would you like to do?</h2>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
            <Link href="/flashcards">
              <div>
                <h3>📚 My Flashcards</h3>
                <p>Review, create, or delete your flashcards.</p>
              </div>
            </Link>

            <Link href="/interview">
              <div>
                <h3>💼 Interview Practice</h3>
                <p>Practice coding and behavioral questions.</p>
              </div>
            </Link>
          </div>
        </main>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

