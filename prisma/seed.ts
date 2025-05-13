import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.question.createMany({
    data: [
      {
        text: "What is a closure in JavaScript?",
        answer: "A closure is a function that retains access to its lexical scope."
      },
      {
        text: "What is Big O notation?",
        answer: "Big O notation describes the performance or complexity of an algorithm."
      }
    ]
  });
}

main()
  .then(() => console.log('Database seeded!'))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
