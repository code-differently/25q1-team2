"use client";

import React, { useEffect, useState } from "react";
import styles from "../../../../styles/UserFeedback.module.css";

type FeedbackEntry = {
  id: number;
  question: string;
  answer: string;
  feedback: string;
  createdAt: string;
};

export default function FeedbackHistoryPage() {
  const [history, setHistory] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/getFeedbackHistory");
        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }
        const data: FeedbackEntry[] = await res.json();
        setHistory(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading your interview feedback...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (history.length === 0) return <p>You have no saved feedback yet.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Interview Feedback History</h1>
      {history.map((entry) => (
        <div key={entry.id} className={styles.card}>
          <p>
            <strong>🧠 Question:</strong> {entry.question}
          </p>
          <p>
            <strong>✍️ Your Answer:</strong> {entry.answer}
          </p>
          <div>
            <strong>🤖 AI Feedback:</strong>
            <pre className={styles.feedback}>{entry.feedback}</pre>
          </div>
          <p className={styles.timestamp}>
            🕒 Submitted on: {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
