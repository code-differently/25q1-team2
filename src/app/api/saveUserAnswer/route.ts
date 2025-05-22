// app/api/feedback/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

/**
 * Save a new feedback entry
 */
/**
 * Save a new feedback entry
 */
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { questionId, answer, feedback } = await req.json();
    if (!questionId || !answer || !feedback) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Ensure user exists

    // Ensure user exists
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId }
    });

      where: { id: userId },
      update: {},
      create: { id: userId }
    });

    const saved = await prisma.userAnswer.create({
      data: { userId, questionId, answer, feedback }
      data: { userId, questionId, answer, feedback }
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('[SAVE ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
  }
}

/**
 * Delete an existing feedback entry
 */
export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Verify ownership
    const entry = await prisma.userAnswer.findUnique({ where: { id } });
    if (!entry || entry.userId !== userId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    await prisma.userAnswer.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete answer' }, { status: 500 });
  }
}

/**
 * Delete an existing feedback entry
 */
export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Verify ownership
    const entry = await prisma.userAnswer.findUnique({ where: { id } });
    if (!entry || entry.userId !== userId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    await prisma.userAnswer.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete answer' }, { status: 500 });
  }
}
