// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes except for static files and public routes
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
    // Ensure API routes are also protected
    '/api/(.*)',
  ],
};
