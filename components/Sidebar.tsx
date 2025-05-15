import React from 'react';
import styles from '../styles/Sidebar.module.css';

type Page = 'flashcards' | 'interview' | 'mock' | 'about';

interface SidebarProps {
  activePage: Page;
  setActivePage: React.Dispatch<React.SetStateAction<Page>>;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const isActive = (page: Page) => (activePage === page ? styles.activeLink : '');

  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>Hired.exe</div>
      <nav className={styles.nav}>
        <div className={`${styles.link} ${isActive('flashcards')}`} onClick={() => setActivePage('flashcards')}>
          Flash Cards
        </div>
        <div className={`${styles.link} ${isActive('interview')}`} onClick={() => setActivePage('interview')}>
          Interview Questions
        </div>
        <div className={`${styles.link} ${isActive('mock')}`} onClick={() => setActivePage('mock')}>
          Mock Interview
        </div>
        <div className={`${styles.link} ${isActive('about')}`} onClick={() => setActivePage('about')}>
          About
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
