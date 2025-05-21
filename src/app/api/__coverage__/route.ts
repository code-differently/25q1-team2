<<<<<<< HEAD
// src/app/api/__coverage__/route.ts

export async function POST() {
    if (process.env.NODE_ENV === 'test') {
      // Store or process code coverage data if needed
    }
  
    return new Response(null, { status: 200 });
  }
  
=======
import { createNextHandler } from '@cypress/code-coverage/next';

export const POST = createNextHandler();
>>>>>>> 110031a4 (feat: adds way to test code coverage, currently at 83% coverage)
