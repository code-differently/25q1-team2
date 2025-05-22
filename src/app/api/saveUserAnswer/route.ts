// app/api/feedback/route.ts
// app/api/feedback/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

/**
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4a8c8ce (task:added javadoc comments to code and finished feedback test)
 * Handles POST requests to save a user's mock interview answer and AI feedback.
 *
 * This endpoint:
 * - Authenticates the user using Clerk.
 * - Validates the incoming request body to ensure all fields are present.
 * - Upserts the user record to ensure the user exists in the database.
 * - Saves the answer and feedback to the database.
 * - Returns a 401 if the user is not authenticated.
 * - Returns a 400 if required fields are missing.
 * - Returns a 500 if an internal error occurs.
 *
 * @param req The incoming Next.js request object containing JSON with `questionId`, `answer`, and `feedback`.
 * @returns A JSON response with the saved record or an error message.
<<<<<<< HEAD
 */
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req); 

=======
 * Save a new feedback entry
 */
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
>>>>>>> 92ec69c (Feat deployment fix (#63))
=======
 */
export async function POST(req: NextRequest) {
  const { userId } = getAuth(req); 

>>>>>>> 4a8c8ce (task:added javadoc comments to code and finished feedback test)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { questionId, answer, feedback } = await req.json();
    if (!questionId || !answer || !feedback) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Ensure user exists

    // Ensure user exists
    await prisma.user.upsert({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4a8c8ce (task:added javadoc comments to code and finished feedback test)
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          
        },
      });
<<<<<<< HEAD
=======
      where: { id: userId },
      update: {},
      create: { id: userId }
    });

>>>>>>> 92ec69c (Feat deployment fix (#63))
=======
>>>>>>> 4a8c8ce (task:added javadoc comments to code and finished feedback test)
    const saved = await prisma.userAnswer.create({
      data: { userId, questionId, answer, feedback }
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('[SAVE ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
  }
}

/**
 * Delete an existing feedback entry
 */
export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Verify ownership
    const entry = await prisma.userAnswer.findUnique({ where: { id } });
    if (!entry || entry.userId !== userId) {
      return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 });
    }

    await prisma.userAnswer.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE ANSWER ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete answer' }, { status: 500 });
  }
}
