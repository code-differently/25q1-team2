import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/questions → fetch all questions (including correct answers)
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

// POST /api/questions → validate submitted answers (not saving them)
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
        correctAnswer: requiredKeywords.join(', '),
      },
      { status: 200 }
  )} catch (error) {
    console.error('[POST ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to check answer' }, { status: 500 });
  }
}
