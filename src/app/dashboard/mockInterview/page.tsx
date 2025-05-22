'use client';

import React, { useState, useEffect } from 'react';
import styles from '../../../../styles/mockInterviews.module.css';

const questions = [
  'Describe a time when you had to step up and demonstrate leadership skills.',
  'Tell me about a time you were under a lot of pressure at work or school. What was going on, and how did you get through it?',
  'Give me an example of a time you managed numerous responsibilities. How did you handle that?',
  'Can you share an example of a time when you had to adapt to a rapidly changing project requirement?',
  'Tell me about a time you worked well under pressure.',
  'Describe a time you received tough or critical feedback. How did you respond to it?',
  'Describe a time when you had to give someone difficult feedback. How did you handle it?',
  'Describe a time when you anticipated potential problems and developed preventive measures.',
  'Tell me about a time when you had to deal with a significant change at work. How did you adapt to this change?'
const questions = [
  'Describe a time when you had to step up and demonstrate leadership skills.',
  'Tell me about a time you were under a lot of pressure at work or school. What was going on, and how did you get through it?',
  'Give me an example of a time you managed numerous responsibilities. How did you handle that?',
  'Can you share an example of a time when you had to adapt to a rapidly changing project requirement?',
  'Tell me about a time you worked well under pressure.',
  'Describe a time you received tough or critical feedback. How did you respond to it?',
  'Describe a time when you had to give someone difficult feedback. How did you handle it?',
  'Describe a time when you anticipated potential problems and developed preventive measures.',
  'Tell me about a time when you had to deal with a significant change at work. How did you adapt to this change?'
];

/**
 * MockInterview is a client-side component for practicing behavioral interview questions.
 *
 * Features:
 * - Randomly selects a question from a preset list.
 * - Accepts user input for answers.
 * - Submits the answer to an API endpoint to receive AI-generated feedback.
 * - Displays and optionally saves feedback.
 *
 * @returns The rendered Mock Interview practice interface.
 */
export default function MockInterview() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  // Load draft from localStorage on question change
  useEffect(() => {
    const draft = localStorage.getItem(`draft-${index}`) || '';
    setAnswer(draft);
    setFeedback('');
  }, [index]);

  // Auto-save draft whenever answer or index changes
  useEffect(() => {
    localStorage.setItem(`draft-${index}`, answer);
  }, [index, answer]);

  // Keyboard shortcuts: ←/→ and Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  const [shake, setShake] = useState(false);

  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  // Load draft from localStorage on question change
  useEffect(() => {
    const draft = localStorage.getItem(`draft-${index}`) || '';
    setAnswer(draft);
    setFeedback('');
  }, [index]);

  // Auto-save draft whenever answer or index changes
  useEffect(() => {
    localStorage.setItem(`draft-${index}`, answer);
  }, [index, answer]);

  // Keyboard shortcuts: ←/→ and Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  const [shake, setShake] = useState(false);

  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  // Load draft from localStorage on question change
  useEffect(() => {
    const draft = localStorage.getItem(`draft-${index}`) || '';
    setAnswer(draft);
    setFeedback('');
  }, [index]);

  // Auto-save draft whenever answer or index changes
  useEffect(() => {
    localStorage.setItem(`draft-${index}`, answer);
  }, [index, answer]);

  // Keyboard shortcuts: ←/→ and Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  /**
   * Submits the user's answer to the feedback API and displays the result.
   */
  const handleSubmit = async () => {
    if (!answer.trim()) return handleShake();
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

  const handleNext = () => {
    setIndex(i => (i + 1) % questions.length);
  };
  const handlePrev = () => {
    setIndex(i => (i - 1 + questions.length) % questions.length);
  };

  // Smooth scroll into view on question change
  useEffect(() => {
    document.getElementById('mock-container')?.scrollIntoView({ behavior: 'smooth' });
  }, [index]);

  const handleNext = () => {
    setIndex(i => (i + 1) % questions.length);
  };
  const handlePrev = () => {
    setIndex(i => (i - 1 + questions.length) % questions.length);
  };

  // Smooth scroll into view on question change
  useEffect(() => {
    document.getElementById('mock-container')?.scrollIntoView({ behavior: 'smooth' });
  }, [index]);

  const handleNext = () => {
    setIndex(i => (i + 1) % questions.length);
  };
  const handlePrev = () => {
    setIndex(i => (i - 1 + questions.length) % questions.length);
  };

  // Smooth scroll into view on question change
  useEffect(() => {
    document.getElementById('mock-container')?.scrollIntoView({ behavior: 'smooth' });
  }, [index]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.background} />

      <div
        key={index}
        id="mock-container"
        className={`${styles.container} ${styles.slideIn}`}
      >
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>

        <h1 className={styles.title}>Mock Interview Practice</h1>
        <p className={styles.counter}>Question {index + 1} of {questions.length}</p>
    <div className={styles.pageWrapper}>
      <div className={styles.background} />

      <div
        key={index}
        id="mock-container"
        className={`${styles.container} ${styles.slideIn}`}
      >
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>

        <h1 className={styles.title}>Mock Interview Practice</h1>
        <p className={styles.counter}>Question {index + 1} of {questions.length}</p>
    <div className={styles.pageWrapper}>
      <div className={styles.background} />

      <div
        key={index}
        id="mock-container"
        className={`${styles.container} ${styles.slideIn}`}
      >
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: `${progress}%` }} />
        </div>

        <h1 className={styles.title}>Mock Interview Practice</h1>
        <p className={styles.counter}>Question {index + 1} of {questions.length}</p>

        <p className={styles.questionLabel}>Question:</p>
        <p className={styles.questionText}>{question}</p>

        <div className={styles.floating}>
          <textarea
            className={styles.textarea}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={loading}
          />
          <label className={answer ? styles.filled : ''}>Your Answer</label>
        </div>
        <div className={styles.floating}>
          <textarea
            className={styles.textarea}
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={loading}
          />
          <label className={answer ? styles.filled : ''}>Your Answer</label>
        </div>

        <div className={styles.navButtons}>
          <button className={styles.button} onClick={handlePrev} disabled={loading}>
            ← Previous
          </button>
          <button
            className={`${styles.button} ${loading ? styles.loading : ''} ${shake ? styles.shake : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Thinking…' : 'Submit Answer'}
          </button>
          <button className={styles.button} onClick={handleNext} disabled={loading}>
            Next →
          </button>
        </div>

        {feedback && (
          <details open className={styles.feedbackBox}>
            <summary className={styles.feedbackTitle}>AI Feedback</summary>
            <ul className={styles.feedbackList}>
              {feedback.split('\n').map((line, i) => (
                <li key={i} className={styles.feedbackItem}>{line.trim()}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
        {feedback && (
          <details open className={styles.feedbackBox}>
            <summary className={styles.feedbackTitle}>AI Feedback</summary>
            <ul className={styles.feedbackList}>
              {feedback.split('\n').map((line, i) => (
                <li key={i} className={styles.feedbackItem}>{line.trim()}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </div>
  );
}
