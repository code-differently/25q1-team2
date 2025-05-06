import { mockQuestions } from '../data/mockQuestions.js';

/**
 * @fileoverview Controller for handling question-related operations.
 */

/**
 * Get all questions.
 * @param {Request} req 
 * @param {Response} res 
 */
export const getAllQuestions = (req, res) => {
  res.status(200).json(mockQuestions);
};
