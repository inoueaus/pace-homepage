const createRandomText = () => Math.random().toString(24);

describe("Create Posts", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/admin/blog");
  });

  it("Create Post", () => {
    cy.get("new-post-form").should("be.visible");
    cy.get("new-post-form")
      .shadow()
      .find("input#title")
      .type(`Coffe Pot Post ${Math.random().toString(24)}`);
    cy.get("new-post-form").blur();
    cy.get("new-post-form")
      .shadow()
      .find("firebase-markdown-textarea")
      .shadow()
      .find("textarea")
      .type(`Coffe Pot Post ${createRandomText()}`);
    cy.get("new-post-form").find("button", { includeShadowDom: true }).click();
  });

  it("Create Post and Use Toolbar", () => {
    cy.get("new-post-form").should("be.visible");
    cy.get("new-post-form").shadow().find("input#title").type(`Coffe Pot Post ${createRandomText()}`);
    cy.get("new-post-form").blur();
    cy.get("new-post-form")
      .shadow()
      .find("firebase-markdown-textarea")
      .shadow()
      .find("textarea")
      .type(`Coffe Pot Post ${createRandomText()}`);
    cy.get("new-post-form").blur();
    cy.get("new-post-form").shadow().find("firebase-markdown-textarea").shadow().find("nav ul li#h1").click();
    cy.get("new-post-form").blur();
    cy.get("new-post-form")
      .shadow()
      .find("firebase-markdown-textarea")
      .shadow()
      .find("textarea")
      .type("A Coffee Title{enter} A coffee paragraph.");
    cy.get("new-post-form").find("button", { includeShadowDom: true }).click();
  });
});
