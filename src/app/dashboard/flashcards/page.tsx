'use client';

import React from 'react';
import FlashcardForm from "../../../../components/FlashCardForm";
import FlashcardList from "../../../../components/FlashCardList";
import styles from "../../../../styles/flashcardsPage.module.css";

/**
 * FlashcardsPage is a client-side component that displays the flashcards interface.
 *
 * This page includes:
 * - A title for the flashcards section.
 * - A form for adding new flashcards.
 * - A list displaying existing flashcards.
 *
 * Styling is applied using CSS modules.
 *
 * @returns The rendered Flashcards page.
 */
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
