// pages/api/submit-answer.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { questionId, answerText } = req.body;

  if (!questionId || !answerText) {
    return res.status(400).json({ error: 'Missing questionId or answerText' });
  }

  try {
    await pool.query(
      'INSERT INTO answers (question_id, answer_text) VALUES ($1, $2)',
      [questionId, answerText]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving answer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
