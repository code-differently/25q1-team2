"use client";
import React, { useEffect, useState } from 'react';


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
      const tempResults: Result[] = [];
      for (const questionId in answers) {
        const answerText = answers[+questionId];

        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: Number(questionId), answerText }),
        });
  
        const data = await res.json();
  
        tempResults.push({
          questionId: Number(questionId),
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

  if (loading) return <p>Loading questions...</p>;
  if (results) {
    const score = results.filter(r => r.correct).length;
    return (
      <div>
        <h2>Your Score: {score} / {results.length}</h2>
        {results.map(({ questionId, userAnswer, correct, correctAnswer }) => {
          const question = questions.find(q => q.id === questionId);
          return (
            <div key={questionId} style={{ marginBottom: '20px' }}>
              <p><strong>Question:</strong> {question?.text}</p>
              <p><strong>Your answer:</strong> {userAnswer}</p>
              <p style={{ color: correct ? 'green' : 'red' }}>
                {correct ? 'Correct!' : `Wrong! Correct answer: ${correctAnswer}`}
              </p>
            </div>
          );
        })}
        <button onClick={() => {
          setResults(null);
          setAnswers({});
        }}>Try Again</button>
      </div>
    );
  }

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
