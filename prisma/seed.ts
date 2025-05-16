import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  
  const existingQuestions = await prisma.question.findMany();

  if (existingQuestions.length === 0) {
    await prisma.question.createMany({
      data: [
        {
          text: 'What is a closure in JavaScript?',
          answer:
            'A closure is a function that has access to its outer function scope even after the outer function has returned.',
            keywords: ['function', 'scope', 'returned'],
          difficulty: 'easy',
        },
        {
          text: 'What does REST stand for?',
          answer: 'Representational State Transfer',
          keywords: ['representational', 'state', 'transfer'],
          difficulty: 'medium',
        },
        {
          text: "What is a data structure?",
          answer: "A data structure is a way of organizing and storing data in a computer so it can be used efficiently.",
          keywords: ["data", "organizing", "storing", "efficiently"],
          difficulty: "easy",

        },
        {
          text: "What is an array?",
          answer: "An array is a fundamental data structure in programming that stores a collection of elements of the same data type in contiguous memory locations.",
          keywords: ["fundamental", "collection", "contiguous"],
          difficulty: "easy",

        },
        {
          text: "What is a linked list?",
          answer: "An ordered set of data elements, each containing a link to its successor.",
          keywords: ["ordered", "data", "elements", "successor"],
          difficulty: "easy",

        },
        {
          text: "What is the difference between an array and a linked list?",
          answer: "Arrays store elements in contiguous memory locations, allowing for direct access to elements by their index. Linked lists store elements in nodes, which are not necessarily located in contiguous memory, and elements are linked to each other through pointers.",
          keywords: ["contiguous", "memory", "direct", "access"],
          difficulty: "medium",


        },
        {
          text: "What is LIFO?",
          answer: "LIFO stands for Last In First Out.",
          keywords: ["last", "in", "first", "out"],
          difficulty: "easy",


        },
        { 
          text: "What is FIFO?",
          answer: "FIFO stands for First In First Out.",
          keywords: ["first", "in", "first", "out"],
          difficulty: "easy",
        },
        {
          text: "What is a stack?",
          answer:"A stack is a data structure that follows the Last-In, First-Out (LIFO) principle.",
          keywords: ["data", "structure", "last", "first"],
          difficulty: "easy",

        },
        {
          text: "What are binary trees?",
          answer: "A data structure in which a record is linked to two successor records.",
          keywords: ["data", "structure", "two", "records","linked", "successor"],
          difficulty:"medium",

        },
        {
          text: "What are binary search trees?",
          answer: "A binary search tree is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node's left subtree and less than the ones in its right subtree.",
          keywords: ["binary", "search", "tree", "left", "right", "subtree"],
          difficulty: "medium",
        },
        {
          text: "What is object-oriented programming?",
          answer: " Object-oriented programming (OOP) is a programming paradigm that organizes code around objects which are data structures that contain both data (attributes) and the code that operates on that data (methods).",
          keywords: ["programming", "paradigm", "objects", "data", "attributes", "methods"],
          difficulty: "hard",


        },
        {
          text: "What is the purpose of a loop in programming?",
          answer: "In programming, a loop is a sequence of instructions that is repeated until a specific condition is met.",
          keywords: ["sequence", "instructions", "repeated", "condition", "repeat", "loop"],
          difficulty: "hard",

        },
        {
          text: "What is a conditional statement?",
          answer: "A conditional statement is a logical construct that asserts a relationship between two statements based on a condition.",
          keywords: ["logical", "construct", "asserts", "relationship", "condition", "if", "then", "logic"],
          difficulty: "medium",

        },
        {
          text: "What is debugging?",
          answer: " Debugging is the process of identifying, locating, and correcting errors or bugs in a computer program.",
          keywords: ["identifying", "locating", "correcting", "errors", "bugs"],
          difficulty: "medium",
        },
        {
          text: "What is recursion?",
          answer: "Recursion is a programming technique where a function calls itself, either directly or indirectly, to solve a problem by breaking it down into smaller, similar subproblems.",
          keywords: ["programming", "technique", "function", "calls", "itself", "problem"],
          difficulty: "hard",

        },
        { 
          text: "What are the differences between linear and non-linear data structures?",
          answer: "Linear data structures arrange elements sequentially, meaning each element is connected to its predecessor and successor. Non-linear data structures, on the other hand, organize elements hierarchically or in a tree-like structure, allowing for more complex relationships between elements.",
          keywords: ["linear", "data", "structures", "sequentially", "predecessor", "successor", "hierarchical", "tree", "complex"],
          difficulty: "hard",
        },

      ],
    });

    console.log('✅ Seeded questions successfully!');
  } else {
    console.log('⚠️ Questions already exist. Skipping seeding.');
  }


  const behavioralPrompts = [
    'Describe a time when you had to step up and demonstrate leadership skills.',
    'Tell me about a time you were under a lot of pressure at work or school. What was going on, and how did you get through it?',
    'Give me an example of a time you managed numerous responsibilities. How did you handle that?',
  ];

  for (const prompt of behavioralPrompts) {
    const existing = await prisma.behavioralQuestion.findFirst({
      where: { prompt },
    });
  
    if (!existing) {
      await prisma.behavioralQuestion.create({
        data: { prompt },
      });
    }
  }
  
  console.log('✅ Seeded behavioral questions successfully!');

}



main()
  .then(() => console.log('Seeding complete.'))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
