import React, { type JSX } from 'react';
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

/**
 * Landing Page Component
 * 
 * @component
 * @returns {JSX.Element} - The Landing page UI component.
 */

const Landing: React.FC = (): JSX.Element => {
    return (
      <div className={styles.landingWrapper}>
      <div className={styles.leftPanel}>
        <h1 className={styles.landingTitle}>Welcome to Decode! 💻</h1>
        <p className={styles.landingSubtitle}>Sharpen your skills and conquer interviews!</p>

        <div className={styles.landingLinks}>
          <Link to="/dashboard">Enter App</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.fakeAd}>
          <p className={styles.adText}>🚀 Now hiring junior devs!</p>
          <img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="Animated developer" />
        </div>
      </div>
    </div>
    )
}

export default Landing;