"use client";

import React, { useEffect, useState } from "react";

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
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading your interview feedback...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (history.length === 0) return <p>You have no saved feedback yet.</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: "700px", margin: "auto" }}>
      <h1>Your Interview Feedback History</h1>
      {history.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Question:</strong> {entry.question}
          </p>
          <p>
            <strong>Your Answer:</strong> {entry.answer}
          </p>
          <p>
            <strong>AI Feedback:</strong>
            <pre
              style={{
                background: "#f9f9f9",
                padding: "0.5rem",
                borderRadius: "4px",
                whiteSpace: "pre-wrap",
              }}
            >
              {entry.feedback}
            </pre>
          </p>
          <p style={{ fontSize: "0.8rem", color: "#555" }}>
            Submitted on: {new Date(entry.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
