'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import "../styles/flashcardList.css";

/**
 * FlashcardList component displays a list of flashcards fetched from the API.
 *
 * The component fetches all flashcards from the backend API and displays them in a list.
 * If there are no flashcards, a message indicating the absence is shown. Each flashcard 
 * displays a question and an answer.
 *
 * @returns {JSX.Element} The FlashcardList component.
 */
interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  /**
   * Fetches flashcards from the backend API when the component is mounted.
   * 
   * @async
   * @function fetchFlashcards
   */
  useEffect(() => {
    async function fetchFlashcards() {
      const res = await fetch('/api/flashcards');
      const data = await res.json();
      setFlashcards(data);
    }
    fetchFlashcards();
  }, []);

  return (
    <div className="flashcard-list-container">
      <h2 className="flashcard-list-title">Flashcards</h2>
      {flashcards.length === 0 ? (
        <p className="no-flashcards">No flashcards available.</p>
      ) : (
        <ul className="flashcard-list">
          {flashcards.map((flashcard) => (
            <li key={flashcard.id} className="flashcard-item">
              <p className="flashcard-question"><strong>Q:</strong> {flashcard.question}</p>
              <p className="flashcard-answer"><strong>A:</strong> {flashcard.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
