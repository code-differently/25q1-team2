describe('Clerk User Creation Task', () => {
  it('creates a new Clerk user', () => {
    cy.task('createClerkUser').then((response: any) => {
      const { email, username } = response;
      cy.log(`Created user: ${email} with username: ${username}`);
      expect(email).to.include('@example.com');
      expect(username).to.match(/^testuser\d+$/);
    });
  });
});
