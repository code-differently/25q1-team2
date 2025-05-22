// src/app/api/getFeedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getFeedbackOnAnswer } from "../../lib/openai";

const prisma = new PrismaClient();

/**
 * Handles POST requests to generate AI feedback for a user's interview answer.
 *
 * This endpoint:
 * - Authenticates the user via Clerk.
 * - Expects a JSON body containing a `question` and `answer` string.
 * - Uses the OpenAI-powered `getFeedbackOnAnswer` function to generate feedback.
 * - Saves the behavioral question to the database.
 * - Returns the generated feedback as a JSON response.
 * - Returns a 401 if the user is not authenticated.
 * - Returns a 400 if required fields are missing or invalid.
 * - Returns a 500 if an error occurs during processing.
 *
 * @param req The incoming Next.js request containing a JSON object with `question` and `answer`.
 * @returns A JSON response with the AI-generated feedback or an error message.
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { question, answer } = await req.json();

    if (typeof question !== "string" || typeof answer !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid question or answer" },
        { status: 400 }
      );
    }

    // Get AI feedback
    const feedback = await getFeedbackOnAnswer(question, answer);

    // Save question to database
    await prisma.behavioralQuestion.create({
      data: {
        prompt: question,
      
      },
    });

    // Return AI feedback
    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error) {
    console.error("Error in getFeedback API:", error);
    return NextResponse.json(
      { error: "Failed to get feedback" },
      { status: 500 }
    );
  }
}
