// src/app/api/flashcards/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle POST: Create a flashcard
export async function POST(req: Request) {
  try {
    const { questionText, answer } = await req.json();

    if (!questionText || !answer) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newFlashcard = await prisma.flashcard.create({
      data: { questionText, answer },
    });

    return NextResponse.json(newFlashcard, { status: 201 });
  } catch (error) {
    console.error('[POST ERROR]', error);
    return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 });
  }
}

// Handle GET: Fetch all flashcards
export async function GET() {
  try {
    const flashcards = await prisma.flashcard.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(flashcards, { status: 200 });
  } catch (error) {
    console.error('[GET ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

