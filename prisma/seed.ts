import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.question.createMany({
    data: [
      {
        text: 'What is the output of 1 + "2" in JavaScript?',
        answer: '12',
        difficulty: 'easy',
      },
      {
        text: 'What does SQL stand for?',
        answer: 'Structured Query Language',
        difficulty: 'easy',
      },
      // Add more sample questions here
    ],
  })
}

main()
  .then(() => console.log('Seeding complete.'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
