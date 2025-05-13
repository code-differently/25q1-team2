    // prisma/seed.ts
    import { PrismaClient } from '@prisma/client';
    const prisma = new PrismaClient();

    async function main() {
    const existingQuestions = await prisma.question.findMany();

    if (existingQuestions.length === 0) {
        await prisma.question.createMany({
        data: [
            {
            text: 'What is a closure in JavaScript?',
            answer: 'A closure is a function that has access to its outer function scope even after the outer function has returned.',
            },
            {
            text: 'What does REST stand for?',
            answer: 'Representational State Transfer',
            },
            // Add more questions here...
        ],
        });

        console.log('✅ Seeded questions successfully!');
    } else {
        console.log('⚠️ Questions already exist. Skipping seeding.');
    }
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
