import React, { type JSX } from 'react';
import styles from "./DashBoard.module.css";
import Navbar from '../../components/Navbar/Navbar';

/**
 * Dashboard page for authenticated users.
 * 
 * @component
 * @returns {JSX.Element}
 */
const Dashboard: React.FC = (): JSX.Element => {
  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.dashboardContent}>
        <h2>Your Interview Prep Toolkit</h2>
        <ul>
          <li>📚 Flashcard Review</li>
          <li>🧠 Algorithm Practice</li>
          <li>🎤 Mock Interview Simulator</li>
          <li>⏱️ Timed Challenges</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
