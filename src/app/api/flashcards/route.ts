// src/app/api/flashcards/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handles POST requests to create a new flashcard.
 *
 * This endpoint:
 * - Validates the incoming request body to ensure all fields are present.
 * - Creates a new flashcard in the database.
 * - Returns a 400 if required fields are missing.
 * - Returns a 500 if an internal error occurs.
 *
 * @param req The incoming Next.js request object containing JSON with `questionText` and `answer`.
 * @returns A JSON response with the created flashcard or an error message.
 */
export async function POST(req: Request) {
  try {
    const { questionText, answer } = await req.json();

    if (!questionText || !answer) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newFlashcard = await prisma.flashcard.create({
      data: { questionText, answer },
    });

    return NextResponse.json(newFlashcard, { status: 201 });
  } catch (error) {
    console.error("[POST ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const flashcards = await prisma.flashcard.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(flashcards, { status: 200 });
  } catch (error) {
    console.error("[GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcards" },
      { status: 500 },
    );
  }
}
