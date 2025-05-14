'use client';

import { useEffect, useState } from 'react';
import React from 'react';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    async function fetchFlashcards() {
      const res = await fetch('/api/flashcards');
      const data = await res.json();
      setFlashcards(data);
    }
    fetchFlashcards();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flashcards</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (
        <ul>
          {flashcards.map((flashcard) => (
            <li key={flashcard.id} className="border p-2 mb-2">
              <p><strong>Q:</strong> {flashcard.question}</p>
              <p><strong>A:</strong> {flashcard.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
