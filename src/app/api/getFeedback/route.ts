// src/app/api/getFeedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { getFeedbackOnAnswer } from "../../lib/openai";

const prisma = new PrismaClient();

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

    // Save to database
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
