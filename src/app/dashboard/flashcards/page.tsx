"use client";

import React, { useState, useEffect, useCallback } from "react";
import FlashcardList from "../../../../components/FlashCardList";
import AddFlashcardButton from "../../../../components/addFlashcardButton";
import FlashcardModal from "../../../../components/flashcardModal";
import FlashcardForm from "../../../../components/FlashCardForm";
import styles from "../../../../styles/flashcardsPage.module.css";

export interface Flashcard {
  id: number;
  questionText: string;
  answer: string;
}

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
  const [showModal, setShowModal] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlashcards = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flashcards");
      if (!res.ok) throw new Error("Failed to fetch flashcards");
      const data: Flashcard[] = await res.json();
      setFlashcards(data);
    } catch {
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  const handleAddFlashcard = (newCard: Flashcard) => {
    setShowModal(false);
    setFlashcards((prev) => [newCard, ...prev]);
  };

  const handleDelete = (id: number) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  const [showModal, setShowModal] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlashcards = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flashcards");
      if (!res.ok) throw new Error("Failed to fetch flashcards");
      const data: Flashcard[] = await res.json();
      setFlashcards(data);
    } catch {
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  const handleAddFlashcard = (newCard: Flashcard) => {
    setShowModal(false);
    setFlashcards((prev) => [newCard, ...prev]);
  };

  const handleDelete = (id: number) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Flashcards</h1>
        <FlashcardList
          flashcards={flashcards}
          loading={loading}
          onDelete={handleDelete}
        />
        <FlashcardList
          flashcards={flashcards}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>

      <AddFlashcardButton onClick={() => setShowModal(true)} />

      <FlashcardModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <FlashcardForm onSuccess={handleAddFlashcard} />
      </FlashcardModal>

      <AddFlashcardButton onClick={() => setShowModal(true)} />

      <FlashcardModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <FlashcardForm onSuccess={handleAddFlashcard} />
      </FlashcardModal>
    </div>
  );
}
