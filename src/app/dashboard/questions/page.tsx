"use client";
import React, { useEffect, useState } from 'react';


type Question = {
  id: number;
  text: string;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data: Question[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch questions:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      for (const questionId in answers) {
        const answerText = answers[+questionId];

        await fetch('/api/submit-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: Number(questionId), answerText }),
        });
      }

      alert('Answers submitted!');
      setAnswers({});
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Answer the Questions</h1>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px' }}>
          <p>{q.text}</p>
          <input
            type="text"
            value={answers[q.id] || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
