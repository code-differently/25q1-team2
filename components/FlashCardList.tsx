'use client';

import React, { useEffect, useState } from 'react';

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

  if (loading) return <p>Loading flashcards...</p>;

  return (
    <div className="max-w-md mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Flashcards</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards yet. Add some!</p>
      ) : (
        flashcards.map(({ id, questionText, answer }) => (
          <div key={id} className="border p-4 rounded shadow-sm">
            <p>
              <strong>Q:</strong> {questionText}
            </p>
            <p>
              <strong>A:</strong> {answer}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
