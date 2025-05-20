describe('Mock Interview Full Flow', () => {
  it('logs in, navigates to mock interview, answers a question, gets feedback, saves it', () => {
    cy.visit('/');

    cy.contains('button', /^login$/i).click();
    cy.get('input#identifier-field').type("testbot123@gmail.com", { force: true });
    cy.contains('button', /^continue$/i).click();
    cy.get('input#password-field').type('Thisisate$t');
    cy.contains('button', /^continue$/i).click();
    cy.url({ timeout: 20000 }).should('include', '/dashboard');
    cy.contains('Welcome to Hired.exe!');

    cy.contains('Mock Interview').click();
    cy.url().should('include', '/dashboard/mockInterview');

    // 💡 Intercept the API call before clicking submit
    cy.intercept('POST', '/api/getFeedback', {
      statusCode: 200,
      body: {
        feedback: "This is your mock AI feedback. Great job using the STAR method!",
      },
    }).as('mockGetFeedback');

    const answer = 'This is my STAR method answer.';
    cy.get('textarea').type(answer).should('have.value', answer);

    cy.contains('Submit Answer').click();

    // 🕒 Wait for the fake API to resolve
    cy.wait('@mockGetFeedback');

    // 🔄 Wait for the loading state to disappear
    cy.contains('Submitting...').should('not.exist', { timeout: 30000 });

    // ✅ Feedback section should now show
    cy.contains('AI Feedback').should('be.visible');

    // 💾 Save feedback
    cy.contains('button', /^Save Feedback$/i, { timeout: 10000 }).click();

    cy.on('window:alert', (str) => {
      expect(str).to.match(/saved/i);
    });
  });
});
