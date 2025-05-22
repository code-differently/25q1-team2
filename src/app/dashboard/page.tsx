"use client";

import React from 'react';
import styles from "../../../styles/DashboardHome.module.css";

export default function DashboardHome() {
  return (
<<<<<<< HEAD
    <div className={styles.home}>
      <div className={styles.gradientOverlay} />
      <h1 className={styles.title}>Welcome to Hired.exe!</h1>
      <p className={styles.subtitle}>Your personal interview prep assistant.</p>
      <div className={styles.gifWrapper}>
        <iframe
          src="https://giphy.com/embed/doXBzUFJRxpaUbuaqz"
          width="100%"
          height="100%"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
    </div>
=======
    <>
      <SignedIn>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '2rem', backgroundColor: '#1a2634', color: 'white', overflowY: 'auto' }}>
            <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <UserButton afterSignOutUrl="/sign-in" />
            </header>
            {children}
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
>>>>>>> 4a8c8ce (task:added javadoc comments to code and finished feedback test)
  );
}
