// pages/questions.js
import React from 'react';
import { useEffect, useState } from 'react';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const questionId in answers) {
      const answerText = answers[questionId];

      await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, answerText }),
      });
    }

    alert('Answers submitted!');
    setAnswers({});
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Answer the Questions</h1>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: '20px' }}>
          <p>{q.question_text}</p>
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
