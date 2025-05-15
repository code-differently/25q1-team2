"use client";

import React from 'react';
import styles from "../../../styles/DashboardHome.module.css";

export default function DashboardHome() {
  return (
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
  );
}
