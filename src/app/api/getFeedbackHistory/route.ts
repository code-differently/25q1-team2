// src/app/api/getFeedbackHistory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
