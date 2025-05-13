import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET method to retrieve all questions from the database
export async function GET(req: NextRequest) {
  try {
    // Query the database for all questions
    const questions = await prisma.question.findMany();
    
    // Return the questions as a JSON response
    return NextResponse.json(questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch questions' }, { status: 500 });
  }
}

// POST method to create a new question in the database
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Create a new question using Prisma (using 'text' instead of 'question')
    const newQuestion = await prisma.question.create({
      data: {
        text: body.text,  // Use 'text' field instead of 'question'
        answer: body.answer,
      },
    });
    
    // Return the newly created question as a response
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create question' }, { status: 500 });
  }
}
