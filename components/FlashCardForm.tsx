'use client';

import React, { useState } from 'react';

export default function FlashcardForm() {
  const [questionText, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionText, answer }),
      });

      if (res.ok) {
        setQuestion('');
        setAnswer('');
        alert('Flashcard added!');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to add flashcard');
      }
    } catch {
      alert('Network error or server not reachable');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Question"
        value={questionText}
        onChange={(e) => setQuestion(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Flashcard
      </button>
    </form>
  );
}
