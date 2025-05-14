import React from 'react';
import { ClerkProvider, UserButton, SignIn, SignUp } from '@clerk/nextjs';  // Import Clerk's components for Next.js
import { useRouter } from 'next/router';  // Use Next.js's built-in routing
import './index.css';  // Your custom styles

// Use environment variables in Next.js
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;  // Correctly access the env variable

// A protected page that only renders if the user is signed in
const ProtectedPage = () => {
  return (
    <div>
      <h1>Welcome to the Flashcard Game</h1>
      <UserButton />  {/* Button for signing out */}
    </div>
  );
};

const MyApp = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <MainPage />
    </ClerkProvider>
  );
};

const MainPage = () => {
  const router = useRouter();

  if (!router.isReady) return null; // Ensures the page is ready

  // Define routes directly using Next.js's file system-based routing
  if (router.pathname === '/sign-in') {
    return <SignIn />;
  } else if (router.pathname === '/sign-up') {
    return <SignUp />;
  }

  return <ProtectedPage />;
};

export default MyApp;
