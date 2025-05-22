"use client";

import React from "react";
import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles/Landing.module.css";

/**
 * Home is the landing page component for the application.
 *
 * Features:
 * - Redirects authenticated users to the dashboard automatically.
 * - Displays a welcome screen with login and sign-up buttons when signed out.
 * - Uses Clerk's `useUser` and `SignedOut` to handle authentication state.
 * - Styled using a custom CSS module.
 *
 * @returns The landing page JSX with login/sign-up options or a redirect if signed in.
 */
export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <main className={styles.wrapper}>
      <SignedOut>
        <div className={styles.container}>
          <h1 className={styles.title}>HIRED.EXE</h1>
          <p className={styles.subtitle}>Your personal interview prep assistant</p>
          <div className={styles.buttons}>
            <SignInButton mode="modal">
              <button className={styles.btn}>Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={styles.btn}>Sign Up</button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>
    </main>
  );
}
