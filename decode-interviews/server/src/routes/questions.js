import express from 'express';
import { getAllQuestions } from '../controllers/questionController.js';

const router = express.Router();

// GET route for fetching all questions
router.get('/', getAllQuestions);

export default router;
