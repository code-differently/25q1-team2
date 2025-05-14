// pages/api/flashcards/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * API route handler for managing flashcards.
 * 
 * Handles `POST` requests to create a new flashcard and `GET` requests to retrieve all flashcards.
 * 
 * @param req - The incoming HTTP request object from Next.js.
 * @param res - The HTTP response object used to return data to the client.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST request - Create a new flashcard
  if (req.method === 'POST') {
    const { question, answer } = req.body;

    try {
      /**
       * Creates a new flashcard in the database using Prisma.
       */
      const newFlashcard = await prisma.flashcard.create({
        data: { question, answer },
      });

      // Respond with 201 Created and the new flashcard data
      res.status(201).json(newFlashcard);
    } catch (error) {
      // Handle errors and respond with a 500 status code
      const errorMessage = error instanceof Error ? error.message : 'Failed to create flashcard';
      res.status(500).json({ error: errorMessage });
    }

  // Handle GET request - Retrieve all flashcards
  } else if (req.method === 'GET') {
    /**
     * Fetches all flashcards from the database.
     */
    const cards = await prisma.flashcard.findMany();

    // Respond with 200 OK and the list of flashcards
    res.status(200).json(cards);

  // Handle unsupported HTTP methods
  } else {
    // Inform the client which methods are allowed
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
