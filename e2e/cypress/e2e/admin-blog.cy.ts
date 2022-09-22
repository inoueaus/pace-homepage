describe('empty spec', () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/admin/blog");
  })
  it('passes', () => {
    cy.pause();
    cy.get("new-post-form").should("be.visible");
  })
})
