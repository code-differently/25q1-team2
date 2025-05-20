'use client';

import React, { useEffect, useState } from 'react';
import FlashcardFlip from './FlashCardFlip';
import styles from '../styles/flashcardList.module.css';

interface Flashcard {
  id: number;
  questionText: string;
  answer: string;
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const res = await fetch('/api/flashcards');
        if (!res.ok) throw new Error('Failed to fetch flashcards');
        const data = await res.json();
        setFlashcards(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlashcards();
  }, []);

  if (loading) return <p className={styles.noFlashcards}>Loading flashcards...</p>;

  return (
    <div>
      <h2 className={styles.title}>Your Flashcards</h2>
      <div className={styles.listWrapper}>
        {flashcards.length === 0 ? (
          <p className={styles.noFlashcards}>No flashcards yet. Add some!</p>
        ) : (
          flashcards.map(card => (
            <FlashcardFlip
              key={card.id}
              question={card.questionText}
              answer={card.answer}
            />
          ))
        )}
      </div>
    </div>
  );
}
