"use client";

import React from "react";
import styles from "../../../styles/DashboardHome.module.css";

export default function DashboardHome() {
  return (
    <div className={styles.home}>
      <div className={styles.gradientOverlay} />
      <h1 className={styles.title}>Welcome to HIRED.EXE!</h1>
      <p className={styles.subtitle}>
        “Debug Your Doubts. Code Your Confidence.”
      </p>
      <div className={styles.gifWrapper}>
        <img
          src="https://giffiles.alphacoders.com/787/7879.gif"
          alt="Interview assistant animation"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
