Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add("forgot", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
  cy.contains("Forgot your password?").click();

  cy.url().should("include", "/requestPasswordResetCode");
});

Cypress.Commands.add("empty", () => {
  cy.get('button[type="submit"]').click();
  cy.get(".oxd-input-field-error-message")
    .should("be.visible")
    .and("contain", "Required");
});

Cypress.Commands.add("social", (url, targetUrl) => {
  cy.visit("https://opensource-demo.orangehrmlive.com/");
  cy.get(`a[href*="${url}"]`)
    .should("exist")
    .and("have.attr", "href")
    .and("include", targetUrl);

  cy.get(`a[href*="${url}"]`).invoke("removeAttr", "target").click();
});
