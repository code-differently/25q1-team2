'use client';

import React from 'react';
import Sidebar from "../../../../components/Sidebar"; // assuming your sidebar location
import FlashcardForm from "../../../../components/FlashCardForm";
import FlashcardList from "../../../../components/FlashCardList";
import styles from "@/styles/flashcardsPage.module.css";

export default function FlashcardsPage() {
  return (
    <div className={styles.pageWrapper}>
      <Sidebar activePage="flashcards" setActivePage={() => {}} />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Flashcards</h1>
        <FlashcardForm />
        <FlashcardList />
      </div>
    </div>
  );
}
