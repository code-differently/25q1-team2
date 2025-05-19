"use client";

<<<<<<< HEAD

import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import React from 'react';
=======
import React from "react";
import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles/Landing.module.css";
>>>>>>> origin/main

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
  );
}
