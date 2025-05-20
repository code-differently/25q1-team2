import { createClerkClient } from '@clerk/backend';
import { clerkSetup } from '@clerk/testing/cypress';
import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY as string,
});

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    screenshotOnRunFailure: true,

    // This is the correct way to set up node events and register tasks
    setupNodeEvents(on, config) {
    
      on('task', {
        async createClerkUserWithSession() {
          const timestamp = Date.now();
          const username = `testuser${timestamp}`;
          const email = `testuser${timestamp}@example.com`;
          const password = `Test1234!Aa`;

          // Create a Clerk user
          const user = await clerkClient.users.createUser({
            emailAddress: [email],
            username,
            password,
            firstName: 'Test',
            lastName: 'Bot',
          });

          // Create a session for that user
          const session = await clerkClient.sessions.createSession({
            userId: user.id,
          });

          return {
            sessionId: session.id,
            email,
            password,
          };
        },
      });

      // You can return config here if you want to mutate it
      return clerkSetup({ config })
    },
  },
});
