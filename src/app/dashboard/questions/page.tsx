"use client";
import React, { useEffect, useState } from 'react';
import styles from "../../../../styles/InterviewQuestions.module.css";

//Define types for question and result structure
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
  // State for the questions fetched from the backend
  const [questions, setQuestions] = useState<Question[]>([]);
  // State to track the user's answers by question ID
  const [answers, setAnswers] = useState<Record<number, string>>({});
   // State to indicate loading state
  const [loading, setLoading] = useState(true);
  // State to store the results after submission
  const [results, setResults] = useState<Result[] | null>(null);
  // Fetch questions from the API on component mount
  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem('seenQuestionIds') || '[]') as number[];
  
    fetch('/api/questions')
      .then((res) => res.json())
      .then((data: Question[]) => {
        // Filter out questions that have already been seen
        const unseen = data.filter((q) => !seenIds.includes(q.id));
  
        // If not enough unseen, fallback to random 5 from all
        const source = unseen.length >= 5 ? unseen : data;
  
        const shuffled = [...source].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 5);
  
        // Update localStorage with new seen IDs
        const updatedSeen = [...new Set([...seenIds, ...selected.map((q) => q.id)])];
        localStorage.setItem('seenQuestionIds', JSON.stringify(updatedSeen));
  
        setQuestions(selected);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch questions:', err);
        setLoading(false);
      });
  }, []);
  // Update the user's answer for a given question
  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tempResults: Result[] = [];
      // For each answered question, submit the answer to the API
      for (const questionId in answers) {
        const answerText = answers[+questionId];

        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questionId: Number(questionId), answerText }),
        });
  
        const data = await res.json();
        // Collect the result
        tempResults.push({
          questionId: Number(questionId),
          userAnswer: answerText,
          correct: data.correct,
          correctAnswer: data.correctAnswer,
        });
      }
       // Save all results to show to the user
      setResults(tempResults);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };
  // Show loading spinner while questions are being fetched
  if (loading) return <p>Loading questions...</p>;
  // Show results after the user has submitted their answers
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
        <button className = {styles.button} onClick={() => {
  localStorage.removeItem('seenQuestionIds');
  window.location.reload();
}}>
 Reset Questions
</button>
      </div>
    );
  } 
  return (
    <form onSubmit={handleSubmit}>
      <h1>Answer the Questions</h1>
      <p>End each answer wih a period.</p>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px' }}>
          <p>{q.text}</p>
          <input className ={styles.input}
            type="text"
            value={answers[q.id] || ''}
            onChange={(e) => handleChange(q.id, e.target.value)}
          />
        </div>
      ))}
      <button  className={styles.button} type="submit">Submit</button>
    </form>
  
  );
}