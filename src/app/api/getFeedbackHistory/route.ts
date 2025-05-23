// src/app/api/getFeedbackHistory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Handles GET requests to retrieve the feedback history for the authenticated user.
 *
 * This endpoint:
 * - Authenticates the user via Clerk.
 * - Fetches the user's previous answers from the database, ordered by most recent.
 * - Returns a 401 response if the user is not authenticated.
 * - Returns a 500 response if there's an error retrieving the data.
 * - Returns a 200 response with the user's feedback history if successful.
 * @param req The incoming Next.js request object.
 * @returns A JSON response with the user's feedback history or an error message.
 */
export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const answers = await prisma.userAnswer.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(answers, { status: 200 });
  } catch (error) {
    console.error("[GET ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 },
    );
  }
}
