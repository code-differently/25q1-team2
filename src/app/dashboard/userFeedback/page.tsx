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
    <>
      <div className={styles.background} />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Your Interview Feedback History</h1>

          <div className={styles.toolbar}>
            <input
              type="text"
              placeholder="🔍 Search feedback..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.timeline}>
            {filtered.map(entry => (
              <details key={entry.id} className={styles.card}>
                <summary className={styles.cardHeader}>
                  <span className={styles.dot} />
                  <span className={styles.summaryText}>{entry.question}</span>
                  <span className={styles.preview}>
                    {entry.feedback.slice(0, 50)}{entry.feedback.length > 50 ? '…' : ''}
                  </span>
                </summary>
                <div className={styles.cardBody}>
                  <div className={styles.actionRow}>
                    <button className={styles.viewBtn} onClick={() => setModalEntry(entry)}>
                      View Full
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(entry.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p><strong>✍️ Your Answer:</strong> {entry.answer}</p>
                  <div className={styles.feedbackWrapper}>
                    <pre className={styles.feedback}>{entry.feedback}</pre>
                    <button
                      className={styles.copyBtn}
                      onClick={() => copyFeedback(entry.feedback)}
                      title="Copy feedback"
                    >
                      <Copy size={16}/>
                    </button>
                  </div>
                  <p className={styles.timestamp}>🕒 {new Date(entry.createdAt).toLocaleString()}</p>
                </div>
              </details>
            ))}
          </div>
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
