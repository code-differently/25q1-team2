'use client';

import React, { useState } from 'react';
import styles from '../styles/flashcardForm.module.css';

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
    <div className={styles['flashcard-form-container']}>
      <div className={styles['flashcard-form-header']}>
        <h1 className={styles['flashcard-form-title']}>Add a Flashcard</h1>
        <p className={styles['flashcard-form-subtitle']}>Create your study cards easily</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Question"
          value={questionText}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button
          className={styles.button}
          type="submit"
          disabled={!questionText || !answer}
        >
          Add Flashcard
        </button>
        {success && <div className={styles['success-alert']}>Flashcard added!</div>}
      </form>
    </div>
  );
}
