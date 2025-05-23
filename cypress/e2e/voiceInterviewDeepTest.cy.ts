// cypress/e2e/voiceInterview.cy.ts

describe("Voice Interview Assistant interactions", () => {
  const email = "testbot123@gmail.com";
  const password = "Thisisate$t";
  const userAnswer = "Hello AI, how are you?";

  beforeEach(() => {
    // reuse your login flow
    cy.visit("/");
    cy.contains("button", /^login$/i).click();
    cy.get("input#identifier-field").type(email, { force: true });
    cy.contains("button", /^continue$/i).click();
    cy.get("input#password-field").type(password);
    cy.contains("button", /^continue$/i).click();
    cy.url({ timeout: 30000 }).should("include", "/dashboard");

    // navigate to the Voice Interview page
    cy.contains("Voice Interview").click();
    cy.url().should("include", "/dashboard/voiceInterview");
  });

  it("switches to text mode, submits an answer, and hears the AI response", () => {
    // stub TTS so we can assert it was called
    cy.window().then((win) =>
      cy.stub(win.speechSynthesis, "speak").as("ttsSpeak"),
    );

    // switch to text mode
    cy.contains("🎚️ Switch to Text").click();

    // type and submit
    cy.get('input[placeholder="Type your answer..."]')
      .type(userAnswer)
      .should("have.value", userAnswer);

    // intercept the transcription API
    cy.intercept("POST", "/api/transcribe", (req) => {
      req.reply({ transcript: userAnswer, aiText: "I am fine, thanks!" });
    }).as("transcribe");

    cy.contains("🚀 Send").click();
    cy.wait("@transcribe");

    // assert AI bubble appears and TTS was called
    cy.contains("I am fine, thanks!").should("be.visible");
    cy.get("@ttsSpeak").should("have.been.called");
  });

  it("stops speech, toggles back to voice mode, and simulates recording", () => {
    // stub cancel so we can assert it fires
    cy.window().then((win) =>
      cy.stub(win.speechSynthesis, "cancel").as("ttsCancel"),
    );

    // hit the stop‑speaking button
    cy.contains("⏹️ Stop Speaking").click();
    cy.get("@ttsCancel").should("have.been.called");

    // simulate starting and stopping recording
    cy.contains("🎙️ Start Speaking").click();
    cy.contains("🛑 Stop Recording").should("be.visible");
    cy.contains("🛑 Stop Recording").click();
    cy.contains("⏹️ Stop Speaking").click();
  });
});
