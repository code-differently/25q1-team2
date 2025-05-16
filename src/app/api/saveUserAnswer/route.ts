import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req); // now req is NextRequest, so this works

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { questionId, answer, feedback } = await req.json();

    if (!questionId || !answer || !feedback) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const saved = await prisma.userAnswer.create({
      data: { userId, questionId, answer, feedback },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('[SAVE ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
  }
}
