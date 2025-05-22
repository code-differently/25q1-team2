import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Handles GET requests to fetch all quiz questions.
 *
 * This endpoint:
 * - Retrieves all questions from the database, ordered by most recent.
 * - Returns a 500 status if there is an error fetching data.
 *
 * @returns A JSON response containing an array of questions or an error message.
 */
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('[GET QUESTIONS ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

/**
 * Handles POST requests to validate a user's submitted answer to a question.
 *
 * This endpoint:
 * - Expects a JSON body with `questionId` and `answerText`.
 * - Finds the corresponding question in the database.
 * - Compares the user's answer to the question's required keywords.
 * - Determines if all keywords are present (i.e., the answer is correct).
 * - Returns the correctness status and the correct answer.
 * - Returns 400 if required fields are missing.
 * - Returns 404 if the question is not found.
 * - Returns 500 if there is a server error.
 *
 * @param req The incoming request containing JSON with `questionId` and `answerText`.
 * @returns A JSON response indicating whether the answer is correct and the expected answer.
 */
export async function POST(req: Request) {
  try {
    const { questionId, answerText } = await req.json();

    if (!questionId || !answerText) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const question = await prisma.question.findUnique({
      where: { id: Number(questionId) },
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const userAnswer = answerText.toLowerCase();
    const requiredKeywords = question.keywords.map(k => k.toLowerCase());

    const allKeywordsPresent = requiredKeywords.every(keyword =>
      userAnswer.includes(keyword)
    );

    return NextResponse.json(
      {
        correct: allKeywordsPresent,
        correctAnswer: question.answer,
      },
      { status: 200 }
  )} catch (error) {
    console.error('[POST ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to check answer' }, { status: 500 });
  }
}
