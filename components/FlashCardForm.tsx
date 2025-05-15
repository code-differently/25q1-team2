'use client';

import React, { useState } from 'react';
import "../styles/flashcardForm.css";

export default function FlashcardForm() {
  const [questionText, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [success, setSuccess] = useState(false);

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
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to add flashcard');
      }
    } catch {
      alert('Network error or server not reachable');
    }
  };

  return (
    <div className="flashcard-form-container">
      <div className="flashcard-form-header">
        <h1 className="flashcard-form-title">Add a Flashcard</h1>
        <p className="flashcard-form-subtitle">Create your study cards easily</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={questionText}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit" disabled={!questionText || !answer}>
          Add Flashcard
        </button>
        {success && <div className="success-alert">Flashcard added!</div>}
      </form>
    </div>
  );
}
