/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email = Cypress.env("email"), password = Cypress.env("password")) => {
  if (typeof email !== "string") throw TypeError();
  if (typeof password !== "string") throw TypeError();

  cy.visit("/admin/login");
  cy.get("login-form").should("be.visible");
  cy.get("login-form").shadow().as("login-form-shadow");
  cy.get("@login-form-shadow").find("input#email").should("be.visible");
  cy.get("@login-form-shadow").find("input#email").should("not.be.disabled")
  cy.get("@login-form-shadow").find("input#email").type(email);
  cy.get("@login-form-shadow").find("input#password").should("be.visible");
  cy.get("@login-form-shadow").find("input#password").should("not.be.disabled")
  cy.get("@login-form-shadow").find("input#password").type(password);
  cy.get("@login-form-shadow").find("button").click();
  cy.url().should("eq", Cypress.config().baseUrl + "admin");
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
