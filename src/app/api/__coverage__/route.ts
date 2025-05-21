// src/app/api/__coverage__/route.ts

export async function POST() {
    if (process.env.NODE_ENV === 'test') {
      // Store or process code coverage data if needed
    }
  
    return new Response(null, { status: 200 });
  }
  