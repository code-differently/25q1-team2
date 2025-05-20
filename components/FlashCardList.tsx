'use client';

import React, { useEffect, useState } from 'react';
import FlashcardFlip from './FlashCardFlip';
import FlashcardForm from './FlashCardForm';
import styles from '../styles/flashcardList.module.css';

interface Flashcard {
  id: number;
  questionText: string;
  answer: string;
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  // For modal control
  const [showForm, setShowForm] = useState(false);

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

  // Handler to delete a flashcard
  const handleDelete = async (id: number) => {
    if (!confirm('Delete this flashcard?')) return;
    try {
      const res = await fetch(`/api/flashcards/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFlashcards(cards => cards.filter(card => card.id !== id));
      } else {
        alert('Failed to delete card.');
      }
    } catch {
      alert('Network error.');
    }
  };

  // Only the 10 most recent (already sorted by createdAt: desc in API)
  const recentCards = flashcards.slice(0, 10);

  if (loading) return <p className={styles.noFlashcards}>Loading flashcards...</p>;

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Your Flashcards</h2>
      </div>
      <div className={styles.listWrapper}>
        {recentCards.length === 0 ? (
          <p className={styles.noFlashcards}>No flashcards yet. Add some!</p>
        ) : (
          recentCards.map(card => (
            <div key={card.id} className={styles.cardHoverWrapper}>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(card.id)}
                aria-label="Delete flashcard"
                tabIndex={0}
              >
                &times;
              </button>
              <FlashcardFlip question={card.questionText} answer={card.answer} />
            </div>
          ))
        )}
      </div>
      {/* Modal popup for form */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModalBtn} onClick={() => setShowForm(false)}>&times;</button>
            <h2 className={styles.modalTitle}>Add a Flashcard</h2>
            {/* Pass a callback so form can close modal and update the list */}
            <FlashcardForm onAdded={() => {
              setShowForm(false);
              // Refresh the flashcards list
              (async function fetchFlashcards() {
                try {
                  const res = await fetch('/api/flashcards');
                  if (!res.ok) throw new Error('Failed to fetch flashcards');
                  const data = await res.json();
                  setFlashcards(data);
                } catch (error) {
                  console.error(error);
                }
              })();
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
