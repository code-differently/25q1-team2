// cypress/e2e/clerkSignup.cy.ts

import { setupClerkTestingToken } from '@clerk/testing/cypress';

describe('Clerk E2E Signup', () => {
  it('signs up a user with email and accesses dashboard', () => {

    const email = `testuser1747710952403@example.com`;
    const username = `testuser1747710952403`;
    const password = `StrongP@ssword8008`;

    setupClerkTestingToken(); // This sets a test session cookie

    cy.visit('/signin');

    cy.get(`button`).contains(/login).click({force: true});

    cy.get('input#username-field').type(username, { force: true });
    cy.get('input#emailAddress-field').type(email, { force: true });
    cy.get('input#password-field').type(password, { force: true });

    // Click the Continue or Sign Up button
    cy.get('button').contains(/continue|sign up/i).click({ force: true });

    // Should redirect to dashboard
    cy.url({ timeout: 20000 }).should('include', '/dashboard');
    cy.contains('Mock Interview Practice', { timeout: 10000 }).should('be.visible');
  });
});
