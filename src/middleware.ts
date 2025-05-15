// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // applies to all routes except static/image
};
