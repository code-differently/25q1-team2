/// <reference types="cypress" />

describe('Flashcards Page – create, flip, delete', () => {
    const email = 'testbot123@gmail.com';
    const password = 'Thisisate$t';
    const newCard = {
      id: 42,
      questionText: 'What is Cypress?',
      answer: 'A front‑end testing tool.',
    };
  
    beforeEach(() => {
      // ==== login ====
      cy.visit('/');
      cy.contains('button', /^login$/i).click();
      cy.get('input#identifier-field').type(email, { force: true });
      cy.contains('button', /^continue$/i).click();
      cy.get('input#password-field').type(password);
      cy.contains('button', /^continue$/i).click();
      cy.url({ timeout: 30000 }).should('include', '/dashboard');
  
      // ==== navigate to Flashcards page ====
      cy.visit('/dashboard/flashcards');
    });
  
    it('shows empty state, lets me add a card, flip it, and delete it', () => {
      // 1) stub initial GET → empty
      cy.intercept('GET', '/api/flashcards', {
        statusCode: 200,
        body: [],
      }).as('getEmpty');
      cy.wait('@getEmpty');
      cy.contains('No flashcards yet. Add some!').should('be.visible');
  
      // 2) stub POST for new card
      cy.intercept('POST', '/api/flashcards', {
        statusCode: 201,
        body: newCard,
      }).as('createCard');
  
      // open modal and create flashcard
      cy.get('button[title="Add new flashcard"]').click();
      cy.get('form').should('be.visible');
      cy.get('input[placeholder="Question"]').type(newCard.questionText);
      cy.get('input[placeholder="Answer"]').type(newCard.answer);
      cy.contains('button', 'Create Flashcard').click();
      cy.wait('@createCard');
  
      // 3) assert new card appears
      cy.contains(newCard.questionText).should('be.visible');
  
      // flip by clicking the question text
      cy.contains(newCard.questionText).click();
  
      // assert the answer exists in the DOM
      cy.contains(newCard.answer).should('exist');
  
      // assert the card container has aria-pressed="true"
      cy.contains(newCard.questionText)
        .parents('div')
        .filter('[class*="cardHoverWrapper"]')
        .find('div[role="button"]')
        .should('have.attr', 'aria-pressed', 'true');
  
      // 4) delete: stub DELETE + auto‑confirm
      cy.intercept('DELETE', `/api/flashcards/${newCard.id}`, {
        statusCode: 200,
        body: {},
      }).as('deleteCard');
      cy.on('window:confirm', () => true);
  
      // find the wrapper and click its delete button
      cy.contains(newCard.questionText)
        .parents('div')
        .filter('[class*="cardHoverWrapper"]')
        .within(() => {
          cy.get('button.deleteButton').click();
        });
  
      cy.wait('@deleteCard');
      cy.contains(newCard.questionText).should('not.exist');
    });
  });