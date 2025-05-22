describe("Feedback History Page", () => {
  const mockEntries = [
    {
      id: 1,
      question: "First question?",
      answer: "First answer.",
      feedback: "Great job on first!",
      createdAt: "2025-05-22T12:00:00Z",
    },
    {
      id: 2,
      question: "Second question?",
      answer: "Second answer.",
      feedback: "Well done on second!",
      createdAt: "2025-05-22T13:00:00Z",
    },
  ];

  beforeEach(() => {
    // Stub the GET history endpoint
    cy.intercept("GET", "/api/getFeedbackHistory", {
      statusCode: 200,
      body: mockEntries,
    }).as("getHistory");

    cy.visit("/dashboard/feedback-history");
    cy.wait("@getHistory");
  });

  it("renders entries in descending date order", () => {
    // The most recent (id:2) should appear first
    cy.get("details")
      .first()
      .within(() => {
        cy.get(".preview").should("contain", "Well done on second!");
      });
  });

  it("filters entries via search input", () => {
    cy.get('input[placeholder="🔍 Search feedback..."]')
      .type("first")
      .should("have.value", "first");

    cy.get("details")
      .should("have.length", 1)
      .first()
      .find(".summaryText")
      .should("contain", "First question?");

    // Clear and show both again
    cy.get("input").clear();
    cy.get("details").should("have.length", 2);
  });

  it("opens and closes the “View Full” modal", () => {
    // Expand first card and click View Full
    cy.get("details")
      .first()
      .within(() => {
        cy.get("summary").click();
        cy.contains("View Full").click();
      });
    // Modal appears with full question + answer + feedback
    cy.get(".modal").should("be.visible");
    cy.get(".modal").within(() => {
      cy.contains("First question?");
      cy.contains("First answer.");
      cy.contains("Great job on first!");
      // Close
      cy.get("button").contains("X").click();
    });
    cy.get(".modal").should("not.exist");
  });

  it("copies feedback text to clipboard", () => {
    // stub clipboard
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText").as("writeText");
    });

    cy.get("details")
      .eq(1)
      .within(() => {
        cy.get(".preview").click();
        cy.get('button[title="Copy feedback"]').click();
      });
    cy.get("@writeText").should("have.been.calledWith", "Well done on second!");
  });

  it("deletes an entry on confirm", () => {
    // stub confirm dialog to auto‑accept
    cy.on("window:confirm", () => true);

    cy.intercept("DELETE", "/api/saveUserAnswer", {
      statusCode: 200,
      body: { success: true },
    }).as("deleteEntry");

    // Delete the first entry
    cy.get("details")
      .first()
      .within(() => {
        cy.get("button").contains("Trash2").click();
      });
    cy.wait("@deleteEntry");
    // Should remove the first entry from the list
    cy.get("details").should("have.length", 1);
    cy.get("details")
      .first()
      .find(".summaryText")
      .should("not.contain", "Second question?");
  });
});
