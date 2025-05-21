import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
<<<<<<< HEAD
    '/((?!_next/static|_next/image|favicon.ico|public|api/__coverage__).*)',
=======
    // Protect all routes except for static files and public routes
    '/((?!_next/static|_next/image|favicon.ico|public|api/__coverage__).*)',
    // Ensure API routes are also protected
>>>>>>> 110031a4 (feat: adds way to test code coverage, currently at 83% coverage)
    '/api/(.*)',
  ],
};
