"use client";

import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import styles from "../../styles/Landing.module.css";

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <SignedOut>
        <div className={styles.container}>
          <h1 className={styles.title}>HIRED.EXE</h1>
          <div className={styles.buttons}>
            <SignInButton mode="modal">
              <button className={styles.btn}>LOGIN</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={styles.btn}>SIGN UP</button>
            </SignUpButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p>You are already signed in. Go to your Dashboard.</p>
          <a href = "/dashboard">
          <button className={styles.btn}>Dashboard</button>
          </a>
        </div>
      </SignedIn>
    </main>
  );
}
