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
          difficulty: 'easy',
        },
        {
          text: 'What does REST stand for?',
          answer: 'Representational State Transfer',
          difficulty: 'medium',
        },
        {
          text: "What is a data structure?",
          answer: "A data structure is a way of organizing and storing data in a computer so it can be used efficiently.",
          difficulty: "easy",

        },
        {
          text: "What is an array?",
          answer: "An array is a fundamental data structure in programming that stores a collection of elements of the same data type in contiguous memory locations.",
          difficulty: "easy",

        },
        {
          text: "What is a linked list?",
          answer: "An ordered set of data elements, each containing a link to its successor.",
          difficulty: "easy",

        },
        {
          text: "What is the difference between an array and a linked list?",
          answer: "Arrays store elements in contiguous memory locations, allowing for direct access to elements by their index. Linked lists store elements in nodes, which are not necessarily located in contiguous memory, and elements are linked to each other through pointers.",
          difficulty: "medium",


        },
        {
          text: "What is LIFO?",
          answer: "LIFO stands for Last In First Out.",
          difficulty: "easy",


        },
        { 
          text: "What is FIFO?",
          answer: "FIFO stands for First In First Out.",
          difficulty: "easy",
        },
        {
          text: "What is a stack?",
          answer:"A stack is a data structure that follows the Last-In, First-Out (LIFO) principle.",
          difficulty: "easy",

        },
        {
          text: "What are binary trees?",
          answer: "A data structure in which a record is linked to two successor records.",
          difficulty:"medium",

        },
        {
          text: "What are binary search trees?",
          answer: "A binary search tree is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node's left subtree and less than the ones in its right subtree.",
          difficulty: "medium",
        },
        {
          text: "What is object-oriented programming?",
          answer: " Object-oriented programming (OOP) is a programming paradigm that organizes code around objects which are data structures that contain both data (attributes) and the code that operates on that data (methods).",
          difficulty: "hard",


        },
        {
          text: "What is the purpose of a loop in programming?",
          answer: "In programming, a loop is a sequence of instructions that is repeated until a specific condition is met.",
          difficulty: "hard",

        },
        {
          text: "What is a conditional statement?",
          answer: "A conditional statement is a logical construct that asserts a relationship between two statements based on a condition.",
          difficulty: "medium",

        },
        {
          text: "What is debugging?",
          answer: " Debugging is the process of identifying, locating, and correcting errors or bugs in a computer program.",
          difficulty: "medium",
        },
        {
          text: "What is recursion?",
          answer: "Recursion is a programming technique where a function calls itself, either directly or indirectly, to solve a problem by breaking it down into smaller, similar subproblems.",
          difficulty: "hard",

        },
        { 
          text: "What are the differences between linear and non-linear data structures?",
          answer: "Linear data structures arrange elements sequentially, meaning each element is connected to its predecessor and successor. Non-linear data structures, on the other hand, organize elements hierarchically or in a tree-like structure, allowing for more complex relationships between elements.",
          difficulty: "hard",
        },
        { 
          text: "How do you reverse a string?",
          answer: `function reverseString(str: string): string {
 
          return str.split("").reverse().join("");}`,
          difficulty: "easy",
        },
        {
          text: "How do you determine if a string is a palindrome?",
          answer: `function isPalindrome(str: string): boolean {
 const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
 const reversedStr = cleanStr.split('').reverse().join('');
 return cleanStr === reversedStr;
}
`,
          difficulty: "medium",
        },
        {
          text:"How do you calculate the number of numerical digits in a string?",
          answer:`function countDigits(inputString: string): number {
   let digitCount = 0;
   for (const char of inputString) {
       if (/\d/.test(char)) {
           digitCount++;
       }
   }
   return digitCount;
}
`,
          difficulty: "hard",

        }

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
