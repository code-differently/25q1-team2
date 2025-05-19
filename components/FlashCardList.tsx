'use client';

import React, { useEffect, useState } from 'react';
import "../styles/flashcardList.module.css";
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

  if (loading)
    return <p className="no-flashcards">Loading flashcards...</p>;

  return (
    <div className="flashcard-list-container">
      <h2 className="flashcard-list-title">Flashcards</h2>
      {flashcards.length === 0 ? (
        <p className="no-flashcards">No flashcards yet. Add some!</p>
      ) : (
        <ul className="flashcard-list">
          {flashcards.map(({ id, questionText, answer }) => (
            <li key={id} className="flashcard-item">
              <p className="flashcard-question">
                <strong>Q:</strong> {questionText}
              </p>
              <p className="flashcard-answer">
                <strong>A:</strong> {answer}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
