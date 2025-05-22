// cypress/e2e/voiceInterview.cy.ts

describe('Voice Interview Assistant', () => {
    beforeEach(() => {
      cy.visit('/dashboard/voice-interview');
    });
  
    it('shows a welcome message from the AI on load', () => {
      // The AI greeting is typed out in the chat window
      cy.get('.chatWindow .bubble.ai')
        .should('contain.text', 'Welcome to your AI mock interview');
    });
  
    it('toggles into Text mode, sends a text answer, and displays AI response', () => {
      // Switch from voice → text
      cy.get('button.toggleMode').contains('Switch to Text').click();
  
      // Stub the transcript endpoint
      cy.intercept('POST', '/api/transcribe', {
        statusCode: 200,
        body: { aiText: 'That was a great answer!' }
      }).as('transcribeText');
  
      // Type and submit
      cy.get('input.textInput').type('This is my test answer.');
      cy.get('button.sendButton').click();
  
      // Wait for the fake AI response
      cy.wait('@transcribeText');
  
      // Verify both user and AI bubbles appear
      cy.get('.chatWindow .bubble.user')
        .last()
        .should('contain.text', 'This is my test answer.');
  
      cy.get('.chatWindow .bubble.ai')
        .last()
        .should('contain.text', 'That was a great answer!');
    });
  
    it('toggles back to Voice mode', () => {
      // Only click if still in Text mode
      cy.get('button.toggleMode').then($btn => {
        if ($btn.text().includes('Voice')) {
          $btn.click();
        }
      });
  
      cy.get('button.toggleMode').should('contain.text', 'Switch to Text');
      cy.get('button.recordButton').should('exist');
    });
  
    it('starts & stops voice recording (stubbed)', () => {
      // Stub getUserMedia and MediaRecorder
      cy.window().then(win => {
        // fake a stream
        cy.stub(win.navigator.mediaDevices, 'getUserMedia').resolves(new MediaStream());
        class DummyRecorder {
          ondataavailable = null as any;
          onstop = null as any;
          start() { this.ondataavailable({ data: new Blob() }); }
          stop() { this.onstop(); }
        }
        cy.stub(win, 'MediaRecorder').callsFake(() => new DummyRecorder());
      });
  
      // Stub transcription endpoint
      cy.intercept('POST', '/api/transcribe', {
        statusCode: 200,
        body: { transcript: 'Audio transcribed', aiText: 'Audio AI feedback' }
      }).as('transcribeAudio');
  
      // Click record/stop
      cy.get('button.recordButton').click();             // start
      cy.get('button.recordButton').contains('Stop').click(); // stop
  
      cy.wait('@transcribeAudio');
  
      // Verify transcript & AI feedback in chat
      cy.get('.chatWindow .bubble.user')
        .last()
        .should('contain.text', 'Audio transcribed');
      cy.get('.chatWindow .bubble.ai')
        .last()
        .should('contain.text', 'Audio AI feedback');
    });
  
    it('allows stopping speech synthesis', () => {
      // Spy on speechSynthesis.cancel
      cy.window().then(win => {
        cy.spy(win.speechSynthesis, 'cancel').as('cancelSpeak');
      });
  
      cy.get('button.stopButton').click();
      cy.get('@cancelSpeak').should('have.been.called');
    });
  });