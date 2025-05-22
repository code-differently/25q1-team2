// cypress/e2e/mockInterview.cy.ts

describe('Mock Interview Full Flow', () => {
  it('logs in, navigates to mock interview, answers a question, gets feedback, saves it', () => {
    
    cy.visit('/');

    cy.contains('button', /^login$/i).click();

    cy.get('input#identifier-field').type("testbot123@gmail.com", { force: true });
    cy.contains('button', /^continue$/i).click();

    cy.get('input#password-field').type('Thisisate$t');
    cy.contains('button', /^continue$/i).click();

    cy.url({ timeout: 30000 }).should('include', '/dashboard');
    cy.contains('Welcome to Hired.exe!');

    cy.contains('Mock Interview').click();
    cy.url().should('include', '/dashboard/mockInterview');

    const answer = 'This is my STAR method answer.';
    cy.get('textarea').type(answer).should('have.value', answer);

    // Submit the answer
    cy.contains('Submit Answer').click();

    // Wait until loading finishes (Submit button disappears or switches text)
    cy.contains('Submitting...').should('not.exist');

    // Feedback should appear
    cy.contains('AI Feedback', { timeout: 90000 }).should('be.visible');

    // Save Feedback
    cy.contains('button', /^Save Feedback$/i, { timeout: 40000 }).click();

    // Assert that the feedback was saved (alert)
    cy.on('window:alert', (str) => {
      expect(str).to.match(/saved/i);
    });
  });
});
