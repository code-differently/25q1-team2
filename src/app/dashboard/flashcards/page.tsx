'use client';

import React from 'react';
import FlashcardForm from "../../../../components/FlashCardForm";
import FlashcardList from "../../../../components/FlashCardList";
import styles from "../../../../styles/flashcardsPage.module.css";

export default function FlashcardsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Flashcards</h1>
        <FlashcardForm />
        <FlashcardList />
      </div>
    </div>
  );
}
