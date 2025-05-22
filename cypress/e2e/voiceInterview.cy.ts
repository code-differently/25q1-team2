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
