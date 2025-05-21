// cypress/e2e/voiceInterview.cy.ts

describe('Voice Interview Assistant Flow', () => {
    const email = 'testbot123@gmail.com';
    const password = 'Thisisate$t';
    const textAnswer = 'I am a junior full‑stack engineer.';
  
    beforeEach(() => {
      // --- login ---
      cy.visit('/');
      cy.contains('button', /^login$/i).click();
      cy.get('input#identifier-field').type(email, { force: true });
      cy.contains('button', /^continue$/i).click();
      cy.get('input#password-field').type(password);
      cy.contains('button', /^continue$/i).click();
      cy.url({ timeout: 30000 }).should('include', '/dashboard');
    });
  
    it('displays greeting and handles Text‑mode Q&A', () => {
      // --- navigate to Voice Interview ---
      cy.contains('Voice Interview').click();
      cy.url().should('include', '/dashboard/voiceInterview');
  
      // --- greeting appears & is spoken ---
      cy.window().then((win) => {
        cy.stub(win.speechSynthesis, 'speak').as('ttsSpeak');
      });
      cy.contains('Welcome to your AI mock interview!', { timeout: 10000 })
        .should('be.visible');
  
      // --- switch to Text mode ---
      cy.contains('🎚️ Switch to Text').click();
  
      // --- type an answer and submit ---
      cy.get('input[placeholder="Type your answer..."]')
        .type(textAnswer)
        .should('have.value', textAnswer);
  
      // intercept the transcription API
      cy.intercept('POST', '/api/transcribe', (req) => {
        // JSON‑body case
        if (req.headers['content-type']?.includes('application/json')) {
          req.reply({ aiText: 'Great answer!', transcript: textAnswer });
        }
      }).as('transcribe');
  
      cy.contains('🚀 Send').click();
      cy.wait('@transcribe');
  
      // AI response appears and TTS was invoked
      cy.contains('Great answer!').should('be.visible');
      cy.get('@ttsSpeak').should('have.been.called');
  
      // --- stop any speaking in flight ---
      cy.contains('⏹️ Stop Speaking').click();
    });
  
    it('toggles back to Voice mode and shows record button', () => {
      cy.contains('Voice Interview').click();
  
      // by default voice mode, so start button is there
      cy.contains('🎙️ Start Speaking').should('be.visible');
  
      // clicking it should flip to Stop Recording
      cy.contains('🎙️ Start Speaking').click();
      cy.contains('🛑 Stop Recording').should('be.visible');
    });
  });
  