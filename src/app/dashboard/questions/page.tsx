'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/InterviewQuestions.module.css';

// Define types for question and result structure
type Question = {
  id: number;
  text: string;
};
type Result = {
  questionId: number;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Result[] | null>(null);

  // Fetch questions on mount
  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem('seenQuestionIds') || '[]') as number[];
    fetch('/api/questions')
      .then(res => res.json())
      .then((data: Question[]) => {
        const unseen = data.filter(q => !seenIds.includes(q.id));
        const source = unseen.length >= 5 ? unseen : data;
        const shuffled = [...source].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5);
        const updatedSeen = Array.from(new Set([...seenIds, ...selected.map(q => q.id)]));
        localStorage.setItem('seenQuestionIds', JSON.stringify(updatedSeen));
        setQuestions(selected);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch questions:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tempResults: Result[] = [];
      for (const qId in answers) {
        const answerText = answers[+qId];
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: Number(qId), answerText }),
        });
        const data = await res.json();
        tempResults.push({
          questionId: Number(qId),
          userAnswer: answerText,
          correct: data.correct,
          correctAnswer: data.correctAnswer,
        });
      }
      setResults(tempResults);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background} />
        <div className={styles.container}>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  // Results view
  if (results) {
    const score = results.filter(r=>r.correct).length;
    // wrap an overall correct/incorrect class to style border & text
    const wrapperClass = results.every(r=>r.correct) ? 'correct' : 'incorrect';
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background} />
        <div className={styles.container}>
          <h2 className={styles.score}>Your Score: {score} / {results.length}</h2>
          <div className={styles.results}>
            {results.map(({ questionId, userAnswer, correct, correctAnswer }) => {
              const question = questions.find(q => q.id === questionId);
              return (
                <div key={questionId} className={styles.resultItem}>
                  <p className={styles.questionText}>{question?.text}</p>
                  <p className={styles.answerText}>Your answer: {userAnswer}</p>
                  <p className={correct ? styles.correct : styles.incorrect}>
                    {correct ? 'Correct!' : `Wrong! Correct answer: ${correctAnswer}`}
                  </p>
                </div>
              );
            })}
          </div>
          <button
            className={styles.button}
            onClick={() => {
              localStorage.removeItem('seenQuestionIds');
              window.location.reload();
            }}
          >
            Reset Questions
          </button>
        </div>
      </div>
    );
  }

  // Default form view
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.background} />
      <div className={styles.container}>
        <h1>Answer the Questions</h1>
        <p>End each answer with a period.</p>
        <form onSubmit={handleSubmit}>
          {questions.map(q => (
            <div key={q.id} style={{ marginBottom: '20px' }}>
              <p className={styles.questionText}>{q.text}</p>
              <input
                className={styles.input}
                type="text"
                value={answers[q.id] || ''}
                onChange={e => handleChange(q.id, e.target.value)}
              />
            </div>
          ))}
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
}
