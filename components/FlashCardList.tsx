'use client';

import React from 'react';
import FlashcardFlip from './FlashCardFlip';
import styles from '../styles/flashcardList.module.css';
import type { Flashcard } from '@/app/dashboard/flashcards/page';

interface FlashcardListProps {
  flashcards: Flashcard[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function FlashcardList({ flashcards, loading, onDelete }: FlashcardListProps) {
  if (loading) {
    return <p className={styles.noFlashcards}>Loading flashcards...</p>;
  }
  if (flashcards.length === 0) {
    return <p className={styles.noFlashcards}>No flashcards yet. Add some!</p>;
  }

  const recentCards = flashcards.slice(0, 10);
  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Your Flashcards</h2>
      </div>
      <div className={styles.listWrapper}>
        {recentCards.map(card => (
          <div key={card.id} className={styles.cardHoverWrapper}>
            <button
              className={styles.deleteButton}
              onClick={async () => {
                if (!confirm('Delete this flashcard?')) return;
                const res = await fetch(`/api/flashcards/${card.id}`, { method: 'DELETE' });
                if (res.ok) onDelete(card.id);
                else alert('Failed to delete card.');
              }}
              aria-label="Delete flashcard"
            >
              ×
            </button>
            <FlashcardFlip question={card.questionText} answer={card.answer} />
          </div>
        ))}
      </div>
    </div>
  );
}