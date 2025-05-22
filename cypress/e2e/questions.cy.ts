describe("Interview Questions Full Flow", () => {
  it("logs in, navigates to interview questions, answers all five questions, submits, receives score, and resets questions", () => {
    // Visit landing page and click Login
    cy.visit("/");
    cy.contains("button", /^login$/i).click();

    // Login form
    cy.get("input#identifier-field").type("testbot123@gmail.com", {
      force: true,
    });
    cy.contains("button", /^continue$/i).click();

    cy.get("input#password-field").type("Thisisate$t");
    cy.contains("button", /^continue$/i).click();

    // Wait for dashboard to load
    cy.url({ timeout: 30000 }).should("include", "/dashboard");
    cy.contains("Welcome to Hired.exe!");

    // Navigate to Interview Questions
    cy.contains("Interview Questions").click();
    cy.url({ timeout: 30000 }).should("include", "/dashboard/questions");
    cy.contains("Answer the Questions");

    // Ensure 5 questions are rendered
    cy.get("input").should("have.length", 5);

    // Type in answers for each input
    cy.get("input").each((_, index: number) => {
      cy.get("input")
        .eq(index)
        .should("be.visible")
        .clear()
        .type(`Test answer ${index + 1}.`);
    });

    // Submit answers
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 30000 }).should("include", "/dashboard/questions");

    // Validate results
    cy.contains("Your Score:").should("exist");
    cy.get("p").contains("Your answer:").should("exist");
    cy.get("p")
      .contains(/Correct!|Wrong!/)
      .should("exist");

    // Reset questions
    cy.get("button").contains("Reset Questions").click();

    // Confirm form has reset
    cy.contains("Answer the Questions");
    cy.get("input").should("have.length", 5);
  });
});
