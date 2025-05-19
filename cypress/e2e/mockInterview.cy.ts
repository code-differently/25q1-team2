describe('Mock Interview Page', () => {
    beforeEach(() => {
      cy.visit('/mock-interview');
    });
  
    it('displays a question and allows user to type an answer', () => {
      cy.contains('Question:');
      cy.get('textarea').type('Here is my answer to the mock interview question.');
      cy.get('button').contains('Submit Answer').should('not.be.disabled');
    });
  
    it('shows feedback after submitting', () => {
      cy.get('textarea').type('I once led a group project under pressure...');
      cy.get('button').contains('Submit Answer').click();
  
      cy.contains('Submitting...');
  
      cy.intercept('POST', '/api/getFeedback', {
        statusCode: 200,
        body: {
          feedback: 'Great job demonstrating leadership under pressure!',
        },
      }).as('getFeedback');
  
      cy.wait('@getFeedback');
  
      cy.contains('AI Feedback');
      cy.contains('Great job demonstrating leadership under pressure!');
    });
  });
  