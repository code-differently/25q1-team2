// app/mock-interview/page.tsx or wherever your page component lives
'use client';

import { useState } from 'react';
import React from "react";
import styles from "../../../../styles/mockInterviews.module.css";

const questions = [
  "Describe a time when you had to step up and demonstrate leadership skills.",
  "Tell me about a time you were under a lot of pressure at work or school. What was going on, and how did you get through it?",
  "Give me an example of a time you managed numerous responsibilities. How did you handle that?",
];

export default function MockInterview() {
  const [question, setQuestion] = useState(questions[Math.floor(Math.random() * questions.length)]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/getFeedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });
    const data = await res.json();
    setFeedback(data.feedback);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Mock Interview Practice</h1>

    <div>
      <p className={styles.questionLabel}>Question:</p>
      <p className={styles.questionText}>{question}</p>
    </div>

    <textarea
      className={styles.textarea}
      placeholder="Type your answer here..."
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      disabled={loading}
    />

    <button
      onClick={handleSubmit}
      disabled={loading || !answer.trim()}
      className={styles.button}
    >
      {loading ? 'Submitting...' : 'Submit Answer'}
    </button>

    <button
      onClick={() => {
        setQuestion(questions[Math.floor(Math.random() * questions.length)]);
        setAnswer('');
        setFeedback('');
      }}
      className={styles.button}
    >
      Next Question
    </button>

    {feedback && (
  <div className={styles.feedbackBox}>
    <h2 className={styles.feedbackTitle}>AI Feedback</h2>
    <ul className={styles.feedbackList}>
      {feedback
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map((line, idx) => (
          <li key={idx} className={styles.feedbackItem}>{line}</li>
        ))
      }
    </ul>
  </div>
)}
  </div>
  )
}
