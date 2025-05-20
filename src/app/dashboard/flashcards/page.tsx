'use client';

import React, { useEffect, useState, useCallback } from 'react';
import FlashcardForm from "../../../../components/FlashCardForm";
import FlashcardList from "../../../../components/FlashCardList";
import AddFlashcardButton from "../../../../components/addFlashcardButton";
import FlashcardModal from "../../../../components/flashcardModal";
import styles from "../../../../styles/flashcardsPage.module.css";

export interface Flashcard {
  id: number;
  questionText: string;
  answer: string;
}

export default function FlashcardsPage() {
  const [showModal, setShowModal] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch flashcards on mount
  const fetchFlashcards = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/flashcards');
      if (!res.ok) throw new Error('Failed to fetch flashcards');
      const data = await res.json();
      setFlashcards(data);
    } catch (err) {
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  // Called after a new card is created
  const handleAddFlashcard = (newCard: Flashcard | null) => {
    setShowModal(false);
    if (newCard) {
      setFlashcards(prev => [newCard, ...prev]);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Flashcards</h1>
        <FlashcardList flashcards={flashcards} loading={loading} />
      </div>
      <AddFlashcardButton onClick={() => setShowModal(true)} />
      <FlashcardModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <FlashcardForm onSuccess={handleAddFlashcard} />
      </FlashcardModal>
    </div>
  );
}
