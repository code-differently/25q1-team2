'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/InterviewQuestions.module.css';

// Types
type Question = { id: number; text: string; };
type Result = {
  questionId: number;
  userAnswer: string;
  correct: boolean;
  correctAnswer: string;
};

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers]     = useState<Record<number,string>>({});
  const [loading, setLoading]     = useState(true);
  const [results, setResults]     = useState<Result[]|null>(null);

  // Fetch & pick 5 unseen questions
  useEffect(() => {
    const seenIds = JSON.parse(localStorage.getItem('seenQuestionIds')||'[]') as number[];
    fetch('/api/questions')
      .then(r=>r.json())
      .then((data:Question[])=>{
        const unseen = data.filter(q=>!seenIds.includes(q.id));
        const pool = unseen.length>=5 ? unseen : data;
        const pick = [...pool].sort(()=>Math.random()-0.5).slice(0,5);
        localStorage.setItem(
          'seenQuestionIds',
          JSON.stringify(Array.from(new Set([...seenIds,...pick.map(q=>q.id)])))
        );
        setQuestions(pick);
      })
      .catch(console.error)
      .finally(()=>setLoading(false));
  },[]);

  const handleChange = (id:number, v:string) => {
    setAnswers(a=>({ ...a, [id]: v }));
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const tmp:Result[] = [];
    for (const qId in answers) {
      const userAnswer = answers[+qId];
      const res = await fetch('/api/questions', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ questionId:Number(qId), answerText:userAnswer })
      });
      const data = await res.json();
      tmp.push({
        questionId:Number(qId),
        userAnswer,
        correct: data.correct,
        correctAnswer: data.correctAnswer
      });
    }
    setResults(tmp);
  };

  // Loading screen
  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.background}/>
        <div className={styles.container}>
          <p>Loading questions…</p>
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
      <div className={`${styles.pageWrapper} ${styles[wrapperClass]}`}>
        <div className={styles.background}/>
        <div className={styles.container}>
          <h2 className={styles.score}>Your Score: {score} / {results.length}</h2>
          <div className={styles.results}>
            {results.map(({ questionId, userAnswer, correct, correctAnswer })=>{
              const q = questions.find(x=>x.id===questionId);
              return (
                <div key={questionId} className={styles.resultItem}>
                  <p className={styles.questionText}>{q?.text}</p>
                  <p className={styles.answerText}>Your answer: {userAnswer}</p>
                  <p>
                    {correct
                      ? <span style={{color:'#2ecc71', fontWeight:500}}>Correct!</span>
                      : <span style={{color:'#e74c3c', fontWeight:500}}>
                          Wrong! Correct answer: {correctAnswer}
                        </span>
                    }
                  </p>
                </div>
              );
            })}
          </div>
          <div className={styles.formControls}>
            <button
              className={styles.button}
              onClick={()=>{
                localStorage.removeItem('seenQuestionIds');
                window.location.reload();
              }}
            >
              Reset Questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question form
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.background}/>
      <div className={styles.container}>
        <h1 className={styles.score}>Answer the Questions</h1>
        <form onSubmit={handleSubmit}>
          {questions.map(q=>(
            <div key={q.id} className="spacing-md">
              <p className={styles.questionText}>{q.text}</p>
              <input
                className={styles.input}
                type="text"
                value={answers[q.id]||''}
                onChange={e=>handleChange(q.id, e.target.value)}
                placeholder="Type your answer and end with a period."
              />
            </div>
          ))}
          <div className={styles.formControls}>
            <button className={styles.button} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
