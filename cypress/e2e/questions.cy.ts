describe('Interview Questions Page', () => {
    beforeEach(() => {
      // Clear localStorage to reset seen questions
      cy.clearLocalStorage();
      cy.visit('/dashboard/questions'); // Adjust the path if necessary
    });
  
    it('loads 5 questions on page load', () => {
      cy.contains('Answer the Questions');
      cy.get('input').should('have.length', 5);
    });
  
    it('allows typing answers into all fields', () => {
      cy.get('input').each((input, index) => {
        cy.wrap(input).type(`Test answer ${index + 1}.`);
      });
    });
  
    it('submits answers and shows results', () => {
      // Fill answers
      cy.get('input').each((input, index) => {
        cy.wrap(input).type(`Test answer ${index + 1}.`);
      });
  
      // Submit form
      cy.get('button[type="submit"]').click();
  
      // Check results summary appears
      cy.contains('Your Score:').should('exist');
  
      // Check that answers and correctness feedback appear
      cy.get('p').contains('Your answer:').should('exist');
      cy.get('p').contains(/Correct!|Wrong!/).should('exist');
    });
  
    it('resets questions when reset button is clicked', () => {
      // Fill and submit form
      cy.get('input').first().type('Something.');
      cy.get('button[type="submit"]').click();
  
      // Click reset button
      cy.get('button').contains('Reset Questions').click();
  
      // Should go back to the form
      cy.contains('Answer the Questions');
      cy.get('input').should('have.length', 5);
    });
  });
  