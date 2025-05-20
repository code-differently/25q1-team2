describe('Clerk Sign In', () => {
    it('logs in an existing test user', () => {
      cy.visit('/');
      cy.contains('button', /^login$/i).click();
      // Switch to Clerk’s domain if modal is cross-origin, or just interact if on same domain
      cy.get('input#identifier-field').type('testuser1747710952403@example.com');
      cy.contains('button', /^continue$/i).click();

      cy.get('input#password-field').type('SuperSecret!a1');
      cy.contains('button', /sign in/i).click();
      cy.url({ timeout: 20000 }).should('include', '/dashboard');
      cy.contains('Mock Interview Practice'); // Update for your dashboard
    });
  });
  