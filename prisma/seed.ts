// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const questions = [
    {
      question: 'What is a closure in JavaScript?',
      correctAnswer: 'A closure is a function that has access to its outer function scope even after the outer function has returned.',
    },
    {
      question: 'What does REST stand for?',
      correctAnswer: 'Representational State Transfer',
    },
    // Add more questions here...
  ];

  for (const q of questions) {
    await prisma.question.upsert({
      where: { question: q.question }, // assumes `question` is unique
      update: {}, // don’t update if exists
      create: q,  // create if doesn't exist
    });
  }

  console.log('✅ Seeded questions successfully without duplication!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
