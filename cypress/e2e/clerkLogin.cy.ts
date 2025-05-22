describe("Clerk Sign In", () => {
  it("logs in an existing test user", () => {
    cy.visit("/");
    cy.contains("button", /^login$/i).click();
    // Switch to Clerk’s domain if modal is cross-origin, or just interact if on same domain
    cy.get("input#identifier-field").type("testbot123@gmail.com", {
      force: true,
    });
    cy.contains("button", /^continue$/i).click();

    cy.get("input#password-field").type("Thisisate$t");
    cy.contains("button", /^continue$/i).click();
    cy.url({ timeout: 10000 }).should("include", "/dashboard");
    cy.contains("Welcome to Hired.exe!"); // Update for your dashboard
  });
});
