// cypress/e2e/mockInterview.cy.ts

describe('Mock Interview Page', () => {
  beforeEach(() => {
    cy.visit('/dashboard/mockInterview');
  });

  it('displays a random question and allows answer submission', () => {
    cy.contains('Mock Interview Practice');
    cy.get('textarea').should('exist').type('This is my test answer.');

    cy.intercept('POST', '/api/getFeedback', {
      statusCode: 200,
      body: {
        feedback: `Great structure!\nTry to include more specific details.\nEnd with a result.`,
      },
    }).as('getFeedback');

    cy.contains('Submit Answer').click();
    cy.contains('Submitting...'); // loading state

    cy.wait('@getFeedback');

    cy.contains('AI Feedback').should('be.visible');
    cy.get('ul').within(() => {
      cy.contains('Great structure!');
      cy.contains('Try to include more specific details.');
      cy.contains('End with a result.');
    });
  });

  it('generates a new question on Next Question', () => {
    cy.get('p').eq(1).invoke('text').then((firstQuestion) => {
      cy.contains('Next Question').click();
      cy.get('p').eq(1).invoke('text').should((newQuestion) => {
        expect(newQuestion).to.not.equal(firstQuestion);
      });
    });
  });

  it('saves feedback after submission', () => {
    cy.intercept('POST', '/api/getFeedback', {
      statusCode: 200,
      body: {
        feedback: 'Well structured answer.',
      },
    }).as('getFeedback');

    cy.intercept('POST', '/api/saveUserAnswer', {
      statusCode: 200,
    }).as('saveFeedback');

    cy.get('textarea').type('Another mock answer');
    cy.contains('Submit Answer').click();
    cy.wait('@getFeedback');

    cy.contains('AI Feedback');
    cy.contains('Save Feedback').click();
    cy.wait('@saveFeedback');
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Feedback saved!');
    });
  });
});
