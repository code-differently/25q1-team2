"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var existingQuestions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.question.findMany()];
                case 1:
                    existingQuestions = _a.sent();
                    if (!(existingQuestions.length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.question.createMany({
                            data: [
                                {
                                    text: 'What is a closure in JavaScript?',
                                    answer: 'A closure is a function that has access to its outer function scope even after the outer function has returned.',
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
                                    answer: "A stack is a data structure that follows the Last-In, First-Out (LIFO) principle.",
                                    difficulty: "easy",
                                },
                                {
                                    text: "What are binary trees?",
                                    answer: "A data structure in which a record is linked to two successor records.",
                                    difficulty: "medium",
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
                                    answer: "function reverseString(str: string): string {\n \n          return str.split(\"\").reverse().join(\"\");}",
                                    difficulty: "easy",
                                },
                                {
                                    text: "How do you determine if a string is a palindrome?",
                                    answer: "function isPalindrome(str: string): boolean {\n const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n const reversedStr = cleanStr.split('').reverse().join('');\n return cleanStr === reversedStr;\n}\n",
                                    difficulty: "medium",
                                },
                                {
                                    text: "How do you calculate the number of numerical digits in a string?",
                                    answer: "function countDigits(inputString: string): number {\n   let digitCount = 0;\n   for (const char of inputString) {\n       if (/d/.test(char)) {\n           digitCount++;\n       }\n   }\n   return digitCount;\n}\n",
                                    difficulty: "hard",
                                }
                            ],
                        })];
                case 2:
                    _a.sent();
                    console.log('✅ Seeded questions successfully!');
                    return [3 /*break*/, 4];
                case 3:
                    console.log('⚠️ Questions already exist. Skipping seeding.');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return console.log('Seeding complete.'); })
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return prisma.$disconnect(); });
