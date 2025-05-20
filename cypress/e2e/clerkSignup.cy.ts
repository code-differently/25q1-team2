// cypress/e2e/clerkSignup.cy.ts

describe('Clerk E2E Signup', () => {
  it('signs up a user with email and accesses dashboard', () => {
    const timestamp = Date.now();
    const email = `testuser${timestamp}@example.com`;
    const username = `testuser${timestamp}`;
    const password = `StrongP@ssword8008`;

    cy.visit('/');

    // Click "Sign Up" on the landing page
    cy.contains('button', /sign up/i).click();

    // Now fill out the form fields. 
    cy.get('input[placeholder="First name"], input#firstName-field').type('Test', { force: true });
    cy.get('input[placeholder="Last name"], input#lastName-field').type('User', { force: true });
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
