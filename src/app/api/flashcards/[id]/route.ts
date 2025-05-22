import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // Extract ID from URL
  const numericId = Number(id);

  if (!numericId) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.flashcard.delete({
      where: { id: numericId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE ERROR]", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 },
    );
  }
}
