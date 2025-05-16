"use client";

import React from "react";
import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "../../styles/Landing.module.css";

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
