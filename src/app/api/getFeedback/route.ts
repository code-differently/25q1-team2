import { NextResponse } from "next/server";
import { getFeedbackOnAnswer } from "../../lib/openai";

export async function POST(request: Request) {
  try {
    // Parse JSON body
    const { question, answer } = await request.json();

    // Validate input
    if (typeof question !== "string" || typeof answer !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid question or answer" },
        { status: 400 }
      );
    }

    // Call your OpenAI helper function
    const feedback = await getFeedbackOnAnswer(question, answer);

    // Return feedback as JSON
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error in getFeedback API:", error);

    return NextResponse.json(
      { error: "Failed to get feedback" },
      { status: 500 }
    );
  }
}
