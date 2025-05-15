'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Sidebar.module.css';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === `/dashboard/${path}` ? styles.activeLink : '';

  return (
    <div className={styles.sidebar}>
      <Link href="/dashboard" className={styles.title}>
        Hired.exe
      </Link>      
      <nav className={styles.nav}>
        <Link href="/dashboard/flashcards" className={`${styles.link} ${isActive('flashcards')}`}>
          Flash Cards
        </Link>
        <Link href="/dashboard/interview" className={`${styles.link} ${isActive('interview')}`}>
          Interview Questions
        </Link>
        <Link href="/dashboard/mock" className={`${styles.link} ${isActive('mock')}`}>
          Mock Interview
        </Link>
        <Link href="/dashboard/about" className={`${styles.link} ${isActive('about')}`}>
          About
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
