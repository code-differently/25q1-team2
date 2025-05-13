import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method to retrieve all questions from the database
export async function GET() {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch questions' }, { status: 500 });
  }
}

// POST method to create a new question in the database
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newQuestion = await prisma.question.create({
      data: {
        text: body.text,
        answer: body.answer,
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create question' }, { status: 500 });
  }
}
