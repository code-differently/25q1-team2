// src/app/dashboard/userFeedback/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Copy, X, Trash2 } from 'lucide-react';
import styles from '../../../../styles/UserFeedback.module.css';

type FeedbackEntry = {
  id: number;
  question: string;
  answer: string;
  feedback: string;
  createdAt: string;
};

/**
 * FeedbackHistoryPage is a client-side React component that displays
 * a logged-in user's past interview answers and corresponding AI-generated feedback.
 *
 * Features:
 * - Fetches feedback history from the `/api/getFeedbackHistory` endpoint on mount.
 * - Shows loading and error states appropriately.
 * - Displays each feedback entry with the original question, user answer, feedback, and submission timestamp.
 *
 * @returns The rendered Feedback History page.
 */
export default function FeedbackHistoryPage() {
  const [history, setHistory] = useState<FeedbackEntry[]>([]);
  const [filtered, setFiltered] = useState<FeedbackEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalEntry, setModalEntry] = useState<FeedbackEntry | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/getFeedbackHistory');
        if (!res.ok) throw new Error('Failed to fetch history');
        const data: FeedbackEntry[] = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setHistory(sorted);
        setFiltered(sorted);
      } catch (e: unknown) {
        const err = e instanceof Error ? e : new Error(String(e));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFiltered(history);
    } else {
      const term = searchTerm.toLowerCase();
      setFiltered(
        history.filter(e =>
          e.question.toLowerCase().includes(term) ||
          e.answer.toLowerCase().includes(term) ||
          e.feedback.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, history]);

  const copyFeedback = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      const res = await fetch('/api/saveUserAnswer', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setHistory(prev => prev.filter(e => e.id !== id));
      setFiltered(prev => prev.filter(e => e.id !== id));
    } catch {
      alert('Failed to delete feedback');
    }
  };

  if (loading) return <p className={styles.message}>Loading your feedback…</p>;
  if (error)   return <p className={styles.error}>{error}</p>;
  if (!filtered.length) return <p className={styles.message}>No feedback matches your search.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Interview Feedback History</h1>
      {history.map((entry) => (
        <div key={entry.id} className={styles.card}>
          <p>
            <strong> Question:</strong> {entry.question}
          </p>
          <p>
            <strong>✍️ Your Answer:</strong> {entry.answer}
          </p>
          <div>
            <strong> AI Feedback:</strong>
            <pre className={styles.feedback}>{entry.feedback}</pre>
          </div>
          <p className={styles.timestamp}>
             Submitted on: {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>

        {modalEntry && (
          <div className={styles.modalBackdrop} onClick={() => setModalEntry(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setModalEntry(null)}>
                <X size={20}/>
              </button>
              <h2 className={styles.modalTitle}>{modalEntry.question}</h2>
              <p><strong>Your Answer:</strong> {modalEntry.answer}</p>
              <pre className={styles.feedback}>{modalEntry.feedback}</pre>
              <p className={styles.timestamp}>🕒 {new Date(modalEntry.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
