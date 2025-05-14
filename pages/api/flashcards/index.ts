// pages/api/flashcards/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { question, answer } = req.body;

    try {
      const newFlashcard = await prisma.flashcard.create({
        data: { question, answer },
      });
      res.status(201).json(newFlashcard);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create flashcard';
      res.status(500).json({ error: errorMessage });
    }
  } else if (req.method === 'GET') {
    const cards = await prisma.flashcard.findMany();
    res.status(200).json(cards);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
