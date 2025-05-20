'use client';

import React, { useState } from 'react';
import { FaCircleQuestion, FaLightbulb } from 'react-icons/fa6'; // You need react-icons installed!
import styles from '../styles/flashcardForm.module.css';

export default function FlashcardForm({ onSuccess }: { onSuccess?: () => void }) {
  const [questionText, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
        if (onSuccess) onSuccess();
        setTimeout(() => setSuccess(false), 1600);
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to add flashcard');
      }
    } catch {
      alert('Network error or server not reachable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.flashcardForm} onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.inputRow}>
        <label className={styles.iconLabel}>
          <FaCircleQuestion className={styles.inputIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="Question"
            value={questionText}
            onChange={(e) => setQuestion(e.target.value)}
            required
            disabled={loading}
          />
        </label>
      </div>
      <div className={styles.inputRow}>
        <label className={styles.iconLabel}>
          <FaLightbulb className={styles.inputIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            disabled={loading}
          />
        </label>
      </div>
      <button
        className={styles.button}
        type="submit"
        disabled={!questionText || !answer || loading}
      >
        {loading ? 'Creating...' : 'Create Flashcard'}
      </button>
      {success && <div className={styles.successAlert}>Flashcard added!</div>}
    </form>
  );
}
