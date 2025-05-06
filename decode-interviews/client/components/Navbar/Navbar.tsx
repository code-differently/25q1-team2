import React, { type JSX } from 'react';
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import styles from "./Navbar.module.css";

/**
 * Top navigation bar component.
 * 
 * @component
 * @returns {JSX.Element}
 */
const Navbar: React.FC = (): JSX.Element => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">💻 Decode</Link>
      </div>
      <div className={styles.links}>
        <Link to="/dashboard">Dashboard</Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
