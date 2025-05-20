describe('Clerk E2E Auth', () => {
    it('logs in and visits dashboard', () => {
      cy.task('createClerkUserWithSession').then(({ sessionId }) => {
        cy.setCookie('__session', sessionId, { domain: 'localhost' }); // or your domain
        cy.visit('/dashboard'); // or your protected route
        cy.contains('Mock Interview Practice'); // change text to whatever proves you're logged in!
      });
    });
  });
  