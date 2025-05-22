'use client';
import React, { useState } from 'react';
import styles from '../styles/flashcardFlip.module.css';

interface FlashcardFlipProps {
  question: string;
  answer: string;
}

export default function FlashcardFlip({ question, answer }: FlashcardFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={styles.cardContainer}
      onClick={() => setFlipped(f => !f)}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      title="Click to flip"
    >
      <div className={`${styles.card} ${flipped ? styles.flipped : ''}`}>
        <div className={`${styles.cardFace} ${styles.cardQuestion}`}>
          <div className={styles.logo}>HIRED.EXE</div>
          <div className={styles.questionText}>{question}</div>
          <div className={styles.logoBottom}>HIRED.EXE</div>
        </div>
        <div className={`${styles.cardFace} ${styles.cardAnswer}`}>
          <div className={styles.answerText}>{answer}</div>
        </div>
      </div>
    </div>
  );
}
